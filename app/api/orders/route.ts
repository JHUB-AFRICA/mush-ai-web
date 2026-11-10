import { query, queryOne, withTransaction } from "@/lib/db";
import { mapProduct, type ProductRow } from "@/lib/db/mappers";
import {
  ApiError,
  asNumber,
  asString,
  fail,
  handleError,
  isEmail,
  ok,
  readJson,
} from "@/lib/api";

type ItemInput = { productId: string; quantity: number };

type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type CreatedOrder = {
  id: string;
  status: string;
  currency: string;
  subtotal: number;
  total: number;
  items: OrderLine[];
  createdAt: string;
};

function parseItems(raw: unknown): ItemInput[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new ApiError(400, "Order must contain at least one item");
  }
  if (raw.length > 100) throw new ApiError(400, "Order contains too many items");

  const seen = new Set<string>();
  return raw.map((entry) => {
    const item = entry as { productId?: unknown; quantity?: unknown };
    const productId = asString(item.productId);
    const quantity = asNumber(item.quantity);

    if (!productId) throw new ApiError(400, "Each item needs a productId");
    if (quantity === null || !Number.isInteger(quantity) || quantity < 1) {
      throw new ApiError(400, "Each item needs a positive whole-number quantity");
    }
    if (quantity > 1000) throw new ApiError(400, "Quantity per item is capped at 1000");
    if (seen.has(productId)) {
      throw new ApiError(400, `Duplicate item in cart: ${productId}`);
    }
    seen.add(productId);

    return { productId, quantity };
  });
}

function toNumber(value: string | number): number {
  return Number(value);
}

/**
 * POST /api/orders — create an order from a cart plus shipping details.
 *
 * Prices are always read from the `products` table server-side; the client
 * only sends product ids and quantities, so a tampered payload cannot alter
 * what is charged.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJson(request);
    const items = parseItems(body.items);

    const shipping = (body.shipping ?? {}) as Record<string, unknown>;
    const firstName = asString(shipping.firstName);
    const lastName = asString(shipping.lastName);
    const phone = asString(shipping.phone);
    const email = asString(shipping.email)?.toLowerCase();
    const county = asString(shipping.county);
    const town = asString(shipping.town);
    const address = asString(shipping.address);
    const pickupOption = asString(shipping.pickupOption) ?? "jkuat";

    if (!firstName) throw new ApiError(400, "First name is required");
    if (!lastName) throw new ApiError(400, "Last name is required");
    if (!phone) throw new ApiError(400, "Phone number is required");
    if (!email || !isEmail(email)) throw new ApiError(400, "A valid email is required");
    if (!county) throw new ApiError(400, "County is required");
    if (!town) throw new ApiError(400, "Town/Area is required");
    if (!address) throw new ApiError(400, "Additional details are required");
    if (pickupOption !== "jkuat" && pickupOption !== "delivery") {
      throw new ApiError(400, "pickupOption must be 'jkuat' or 'delivery'");
    }

    const userId = asString(body.userId);

    const order = await withTransaction(async (client) => {
      // Lock the product rows so concurrent stock/price reads stay consistent.
      const ids = items.map((i) => i.productId);
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
      const { rows } = await client.query<ProductRow>(
        `SELECT * FROM products WHERE id IN (${placeholders}) FOR UPDATE`,
        ids,
      );

      const byId = new Map(rows.map((row) => [row.id, row]));
      const missing = ids.filter((id) => !byId.has(id));
      if (missing.length > 0) {
        throw new ApiError(400, `Unknown product(s): ${missing.join(", ")}`);
      }

      const lines: OrderLine[] = items.map((item) => {
        const product = byId.get(item.productId)!;
        const unitPrice = toNumber(product.price);
        return {
          productId: item.productId,
          name: product.name,
          quantity: item.quantity,
          unitPrice,
          lineTotal: unitPrice * item.quantity,
        };
      });

      const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
      if (!Number.isFinite(subtotal) || subtotal <= 0) {
        throw new ApiError(400, "Order total must be greater than zero");
      }

      const orderRow = await client.query<{
        id: string;
        status: string;
        currency: string;
        created_at: Date;
      }>(
        `INSERT INTO orders (
           user_id, status, first_name, last_name, phone, email,
           county, town, address, pickup_option, subtotal, total
         )
         VALUES ($1, 'pending', $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
         RETURNING id, status, currency, created_at`,
        [
          userId ?? null,
          firstName,
          lastName,
          phone,
          email,
          county,
          town,
          address,
          pickupOption,
          subtotal.toFixed(2),
        ],
      );

      const created = orderRow.rows[0];
      if (!created) throw new ApiError(500, "Could not create order");

      for (const line of lines) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (order_id, product_id) DO UPDATE
             SET quantity = EXCLUDED.quantity, unit_price = EXCLUDED.unit_price`,
          [created.id, line.productId, line.quantity, line.unitPrice.toFixed(2)],
        );
      }

      return {
        id: created.id,
        status: created.status,
        currency: created.currency,
        subtotal,
        total: subtotal,
        items: lines,
        createdAt: created.created_at.toISOString(),
      } satisfies CreatedOrder;
    });

    return ok({ order }, 201);
  } catch (error) {
    return handleError(error);
  }
}

type OrderItemRow = {
  product_id: string;
  quantity: number;
  unit_price: string | number;
};

/**
 * GET /api/orders?id=… — look up a single order by id.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return fail("Missing ?id= query parameter");

    const order = await queryOne<{
      id: string;
      status: string;
      currency: string;
      subtotal: string | number;
      total: string | number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      county: string;
      town: string;
      address: string;
      pickup_option: string;
      created_at: Date;
    }>(
      `SELECT id, status, currency, subtotal, total, first_name, last_name,
              email, phone, county, town, address, pickup_option, created_at
       FROM orders WHERE id = $1`,
      [id],
    );
    if (!order) return fail("Order not found", 404);

    const items = await query<OrderItemRow>(
      "SELECT product_id, quantity, unit_price FROM order_items WHERE order_id = $1",
      [id],
    );

    const productRows = await query<ProductRow>(
      `SELECT * FROM products WHERE id IN (
         SELECT DISTINCT product_id FROM order_items WHERE order_id = $1
       )`,
      [id],
    );
    const names = new Map(productRows.map((row) => [row.id, mapProduct(row).name]));

    return ok({
      order: {
        id: order.id,
        status: order.status,
        currency: order.currency,
        subtotal: toNumber(order.subtotal),
        total: toNumber(order.total),
        shipping: {
          firstName: order.first_name,
          lastName: order.last_name,
          email: order.email,
          phone: order.phone,
          county: order.county,
          town: order.town,
          address: order.address,
          pickupOption: order.pickup_option,
        },
        items: items.map((item) => ({
          productId: item.product_id,
          name: names.get(item.product_id) ?? item.product_id,
          quantity: item.quantity,
          unitPrice: toNumber(item.unit_price),
          lineTotal: toNumber(item.unit_price) * item.quantity,
        })),
        createdAt: order.created_at.toISOString(),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

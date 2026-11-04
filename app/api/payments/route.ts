import { queryOne, withTransaction } from "@/lib/db";
import {
  ApiError,
  asNumber,
  asString,
  fail,
  handleError,
  normalisePhone,
  ok,
  readJson,
} from "@/lib/api";

type PaymentMethod = "mpesa" | "card";

type CreatedPayment = {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: string;
  amount: number;
  currency: string;
  reference: string;
  createdAt: string;
};

/**
 * POST /api/payments — record a payment against an order.
 *
 * The upstream gateways (Safaricom Daraja STK Push, Paystack/Flutterwave)
 * are not wired up yet, so payments are recorded as `completed` in
 * simulation mode and the order flips to `paid`. When a real gateway is
 * added, replace the simulation block with the gateway call and let the
 * callback endpoint set the final status instead.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJson(request);

    const orderId = asString(body.orderId);
    const method = asString(body.method)?.toLowerCase();
    const rawAmount = asNumber(body.amount);
    const phone = asString(body.phone);

    if (!orderId) throw new ApiError(400, "orderId is required");
    if (method !== "mpesa" && method !== "card") {
      throw new ApiError(400, "method must be 'mpesa' or 'card'");
    }

    // The amount is always taken from the order, never from the client.
    const order = await queryOne<{
      id: string;
      status: string;
      total: string | number;
      currency: string;
    }>(
      "SELECT id, status, total, currency FROM orders WHERE id = $1 FOR UPDATE",
      [orderId],
    );
    if (!order) throw new ApiError(404, "Order not found");
    if (order.status === "cancelled") {
      throw new ApiError(409, "This order has been cancelled");
    }
    if (order.status === "paid") {
      throw new ApiError(409, "This order has already been paid");
    }

    const amount = Number(order.total);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ApiError(400, "Order total must be greater than zero");
    }

    // Guard against a client sending a mismatched amount.
    if (rawAmount !== null && Math.abs(rawAmount - amount) > 0.01) {
      throw new ApiError(400, "Amount does not match the order total");
    }

    let normalisedPhone: string | null = null;
    if (method === "mpesa") {
      normalisedPhone = normalisePhone(phone ?? "");
      if (!normalisedPhone) {
        throw new ApiError(
          400,
          "A valid Kenyan phone number is required for M-Pesa",
        );
      }
    }

    const payment = await withTransaction(async (client) => {
      const reference =
        method === "mpesa"
          ? `MPESA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          : `CARD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      const paymentRow = await client.query<{
        id: string;
        created_at: Date;
      }>(
        `INSERT INTO payments (order_id, method, status, amount, currency, phone, reference)
         VALUES ($1, $2, 'completed', $3, $4, $5, $6)
         RETURNING id, created_at`,
        [
          orderId,
          method,
          amount.toFixed(2),
          order.currency,
          normalisedPhone,
          reference,
        ],
      );

      const created = paymentRow.rows[0];
      if (!created) throw new ApiError(500, "Could not record payment");

      await client.query("UPDATE orders SET status = 'paid' WHERE id = $1", [
        orderId,
      ]);

      return {
        id: created.id,
        orderId,
        method,
        status: "completed",
        amount,
        currency: order.currency,
        reference,
        createdAt: created.created_at.toISOString(),
      } satisfies CreatedPayment;
    });

    return ok({ payment }, 201);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/payments?id=… — look up a payment by id.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return fail("Missing ?id= query parameter");

    const row = await queryOne<{
      id: string;
      order_id: string;
      method: string;
      status: string;
      amount: string | number;
      currency: string;
      phone: string | null;
      reference: string | null;
      created_at: Date;
    }>(
      `SELECT id, order_id, method, status, amount, currency, phone, reference, created_at
       FROM payments WHERE id = $1`,
      [id],
    );
    if (!row) return fail("Payment not found", 404);

    return ok({
      payment: {
        id: row.id,
        orderId: row.order_id,
        method: row.method,
        status: row.status,
        amount: Number(row.amount),
        currency: row.currency,
        phone: row.phone,
        reference: row.reference,
        createdAt: row.created_at.toISOString(),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

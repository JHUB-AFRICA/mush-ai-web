import { queryOne } from "@/lib/db";
import { mapProduct, type ProductRow } from "@/lib/db/mappers";
import { fail, handleError, ok } from "@/lib/api";

type Params = { params: Promise<{ productId: string }> };

/**
 * GET /api/products/[productId] — a single product.
 */
export async function GET(_request: Request, { params }: Params): Promise<Response> {
  try {
    const { productId } = await params;

    const row = await queryOne<ProductRow>(
      "SELECT * FROM products WHERE id = $1",
      [productId],
    );
    if (!row) return fail("Product not found", 404);

    return ok({ product: mapProduct(row) });
  } catch (error) {
    return handleError(error);
  }
}

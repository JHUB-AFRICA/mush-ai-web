import type { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { mapProduct, type ProductRow } from "@/lib/db/mappers";
import { fail, handleError, ok } from "@/lib/api";

/**
 * GET /api/products         — full catalogue
 * GET /api/products?category=Strains & Spawn — filtered by category
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const category = request.nextUrl.searchParams.get("category");

    const rows = category
      ? await query<ProductRow>(
          "SELECT * FROM products WHERE category = $1 ORDER BY name",
          [category],
        )
      : await query<ProductRow>("SELECT * FROM products ORDER BY name");

    return ok({ products: rows.map(mapProduct) });
  } catch (error) {
    if (error instanceof Error && error.message.includes("column") ) {
      return fail("Unknown category filter", 400);
    }
    return handleError(error);
  }
}

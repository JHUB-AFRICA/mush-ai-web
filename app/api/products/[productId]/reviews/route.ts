import { randomUUID } from "node:crypto";
import { query, queryOne } from "@/lib/db";
import { mapReview, type ReviewRow } from "@/lib/db/mappers";
import {
  ApiError,
  asNumber,
  asString,
  fail,
  handleError,
  ok,
  readJson,
} from "@/lib/api";

type Params = { params: Promise<{ productId: string }> };

/**
 * GET /api/products/[productId]/reviews — reviews for one product,
 * newest first.
 */
export async function GET(_request: Request, { params }: Params): Promise<Response> {
  try {
    const { productId } = await params;

    const rows = await query<ReviewRow>(
      `SELECT * FROM reviews
       WHERE product_id = $1
       ORDER BY date DESC, created_at DESC`,
      [productId],
    );

    const reviews = rows.map(mapReview);
    const avg =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return ok({ reviews, averageRating: Number(avg.toFixed(1)) });
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/products/[productId]/reviews — submit a new review.
 */
export async function POST(request: Request, { params }: Params): Promise<Response> {
  try {
    const { productId } = await params;

    const product = await queryOne("SELECT 1 FROM products WHERE id = $1", [productId]);
    if (!product) return fail("Product not found", 404);

    const body = await readJson(request);
    const author = asString(body.author);
    const title = asString(body.title);
    const text = asString(body.body);
    const location = asString(body.location) ?? "Nairobi, Kenya";
    const rating = asNumber(body.rating);

    if (!author) throw new ApiError(400, "Name is required");
    if (!title) throw new ApiError(400, "Review headline is required");
    if (!text) throw new ApiError(400, "Review details are required");
    if (rating === null || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new ApiError(400, "Rating must be a whole number between 1 and 5");
    }

    const id = `review-${randomUUID()}`;
    const row = await queryOne<ReviewRow>(
      `INSERT INTO reviews (id, product_id, author, location, rating, title, body, verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
       RETURNING *`,
      [id, productId, author, location, rating, title, text],
    );
    if (!row) throw new ApiError(500, "Could not save review");

    return ok({ review: mapReview(row) }, 201);
  } catch (error) {
    return handleError(error);
  }
}

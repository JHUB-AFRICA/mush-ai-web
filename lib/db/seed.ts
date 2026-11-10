/**
 * Seeds the `products` table from the static catalogue in lib/products.ts,
 * plus the sample reviews in `reviewsData`.
 *
 * Safe to re-run: products are upserted by id, and seeded reviews are only
 * inserted when the product has no reviews at all.
 *
 *   bun run db:seed
 */
import { Pool } from "pg";
import { products, reviewsData } from "../products";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER ?? "postgres"}:${
    process.env.POSTGRES_PASSWORD ?? "mushai_local_dev"
  }@${process.env.POSTGRES_HOST ?? "127.0.0.1"}:${
    process.env.POSTGRES_PORT ?? "5432"
  }/${process.env.POSTGRES_DB ?? "mush_ai"}`;

const pool = new Pool({ connectionString });

async function seedProducts() {
  for (const product of products) {
    await pool.query(
      `INSERT INTO products (
         id, name, category, badge, badge_tone, rating, review_count,
         description, long_description, features, specs, unit, price,
         cta, image, image_alt
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,$12,$13,$14,$15,$16)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         category = EXCLUDED.category,
         badge = EXCLUDED.badge,
         badge_tone = EXCLUDED.badge_tone,
         rating = EXCLUDED.rating,
         description = EXCLUDED.description,
         long_description = EXCLUDED.long_description,
         features = EXCLUDED.features,
         specs = EXCLUDED.specs,
         unit = EXCLUDED.unit,
         price = EXCLUDED.price,
         cta = EXCLUDED.cta,
         image = EXCLUDED.image,
         image_alt = EXCLUDED.image_alt`,
      [
        product.id,
        product.name,
        product.category,
        product.badge,
        product.badgeTone,
        product.rating,
        parseReviewCount(product.reviews),
        product.description,
        product.longDescription ?? null,
        JSON.stringify(product.features),
        JSON.stringify(product.specs ?? []),
        product.unit,
        product.price,
        product.cta,
        product.image,
        product.imageAlt,
      ],
    );
  }
}

/** "150+ reviews" / "28 reviews" → 150 / 28 */
function parseReviewCount(label: string): number {
  const match = label.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

async function seedReviews() {
  for (const [productId, reviews] of Object.entries(reviewsData)) {
    const existing = await pool.query(
      "SELECT 1 FROM reviews WHERE product_id = $1 LIMIT 1",
      [productId],
    );
    if (existing.rowCount && existing.rowCount > 0) continue;

    for (const review of reviews) {
      await pool.query(
        `INSERT INTO reviews (id, product_id, author, location, rating, date, title, body, verified)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (id) DO NOTHING`,
        [
          review.id,
          productId,
          review.author,
          review.location,
          review.rating,
          review.date,
          review.title,
          review.body,
          review.verified,
        ],
      );
    }
  }
}

async function main() {
  console.log("Seeding products…");
  await seedProducts();
  console.log("Seeding reviews…");
  await seedReviews();

  const { rows } = await pool.query(
    `SELECT (SELECT count(*) FROM products) AS products,
            (SELECT count(*) FROM reviews) AS reviews`,
  );
  console.log(`Done. ${rows[0].products} products, ${rows[0].reviews} reviews.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

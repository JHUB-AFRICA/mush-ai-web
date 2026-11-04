import type { Product, ReviewItem } from "@/lib/products";

/** Shape of a `products` row as returned by Postgres. */
export type ProductRow = {
  id: string;
  name: string;
  category: string;
  badge: string;
  badge_tone: string;
  rating: string | number;
  review_count: number;
  description: string;
  long_description: string | null;
  features: string[] | null;
  specs: { label: string; value: string }[] | null;
  unit: string;
  price: string | number;
  cta: string;
  image: string;
  image_alt: string;
};

/** Shape of a `reviews` row as returned by Postgres. */
export type ReviewRow = {
  id: string;
  product_id: string;
  author: string;
  location: string;
  rating: number;
  date: string | Date;
  title: string;
  body: string;
  verified: boolean;
};

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value.slice(0, 10);
}

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Product["category"],
    badge: row.badge,
    badgeTone: row.badge_tone as Product["badgeTone"],
    rating: Number(row.rating),
    reviews: `${row.review_count} reviews`,
    description: row.description,
    ...(row.long_description ? { longDescription: row.long_description } : {}),
    features: row.features ?? [],
    ...(row.specs && row.specs.length > 0 ? { specs: row.specs } : {}),
    unit: row.unit,
    price: Number(row.price),
    cta: row.cta as Product["cta"],
    image: row.image,
    imageAlt: row.image_alt,
  };
}

export function mapReview(row: ReviewRow): ReviewItem {
  return {
    id: row.id,
    author: row.author,
    location: row.location,
    rating: row.rating,
    date: toIsoDate(row.date),
    title: row.title,
    body: row.body,
    verified: row.verified,
  };
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductById,
  getRelatedProducts,
  reviewsData,
} from "@/lib/products";
import ProductDetailClient from "@/components/shop/ProductDetailPage";

// Generate static params for all product IDs
export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

// Generate dynamic metadata based on the product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!product) {
    return { title: "Product Not Found | SmartMushroom" };
  }
  return {
    title: `${product.name} | SmartMushroom Shop`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 3);
  const reviews = reviewsData[product.id] ?? [];

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={related}
      reviews={reviews}
    />
  );
}

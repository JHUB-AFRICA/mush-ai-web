"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  relatedProducts: Product[];
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  if (relatedProducts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-on-surface sm:text-2xl mt-1">
            You Might Also Like
          </h2>
          <p className="mt-1 text-xs text-on-surface-variant">
            Complementary mushroom strains, equipment, and resources for your farm
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
        >
          View All
          <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

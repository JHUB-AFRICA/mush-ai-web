"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/products";

interface RelatedProductsProps {
  relatedProducts: Product[];
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  if (relatedProducts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles size={14} />
            <span>Curated Suggestions</span>
          </div>
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
          <Link key={product.id} href={`/shop/${product.id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Review Badge */}
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-on-surface shadow-xs backdrop-blur-sm">
                <Star size={11} className="fill-amber-400 text-amber-500" />
                {product.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {product.category}
              </span>
              <h3 className="mt-1 text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
                {product.description}
              </p>
              <div className="mt-auto flex items-baseline justify-between pt-3 border-t border-surface-container-high/60 mt-3">
                <div>
                  <span className="text-base font-extrabold text-on-surface">{formatKsh(product.price)}</span>
                  <span className="text-[10px] text-on-surface-variant ml-1">/ {product.unit}</span>
                </div>
                <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center">
                  View <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

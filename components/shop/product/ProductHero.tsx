"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Shield,
  Snowflake,
  Star,
} from "lucide-react";
import { formatKsh } from "@/lib/format";
import Icon from "@/components/ui/Icon";
import Stars from "../reviews/Stars";
import type { Product } from "@/lib/products";

interface ProductHeroProps {
  product: Product;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  added: boolean;
  handleAdd: () => void;
  avgRating: number;
  allReviews: { length: number } | { length: number; [key: string]: unknown };
  scrollToReviews: (e: React.MouseEvent) => void;
  categorySectionHref: string;
}

export default function ProductHero({
  product,
  qty,
  setQty,
  added,
  handleAdd,
  avgRating,
  allReviews,
  scrollToReviews,
  categorySectionHref,
}: ProductHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Column */}
        <div className="relative flex flex-col min-h-[420px] lg:min-h-full overflow-hidden rounded-3xl border border-surface-container-high/60 bg-surface-container shadow-lg">
          <div className="relative flex-1 min-h-[380px] lg:min-h-full w-full">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
          </div>

          {/* In Stock & Rating Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-md backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock &bull; Ready for Pickup
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-on-surface shadow-md backdrop-blur-sm">
              <Star
                size={12}
                className="fill-amber-400 text-amber-500"
                aria-hidden="true"
              />
              {avgRating.toFixed(1)}
              <span className="font-normal text-on-surface-variant">
                ({allReviews.length})
              </span>
            </span>
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          {/* Category & tag pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href={categorySectionHref}
              className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20 transition-colors"
            >
              {product.category}
            </Link>
            <span className="rounded-full bg-secondary-container/15 px-3 py-1 text-secondary-container">
              {product.tag}
            </span>
            <span className="rounded-full bg-surface-container px-3 py-1 text-on-surface-variant">
              {product.meta}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Rating row with anchor link to reviews */}
          <a
            href="#customer-reviews"
            onClick={scrollToReviews}
            className="mt-3 inline-flex items-center gap-2 w-fit group cursor-pointer"
          >
            <Stars rating={Math.round(avgRating)} />
            <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-primary underline underline-offset-2 font-medium">
              ({allReviews.length} verified{" "}
              {allReviews.length === 1 ? "review" : "reviews"})
            </span>
          </a>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-on-surface">
              {formatKsh(product.price)}
            </span>
            <span className="text-sm text-on-surface-variant font-medium">
              / {product.unit}
            </span>
          </div>

          {/* Feature highlights */}
          <div className="my-5 space-y-2 rounded-2xl border border-surface-container-high/60 bg-surface-container-low/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <Snowflake size={14} className="text-primary" />
              <span>Key Features &amp; Highlights</span>
            </div>
            <ul className="space-y-1.5 pl-1 text-xs text-on-surface-variant">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <Check size={13} className="mt-0.5 shrink-0 text-primary" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-auto border-t border-surface-container-high/80 pt-5">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center rounded-xl border border-surface-container-high bg-surface-container-lowest"
                role="group"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-surface-container transition-colors rounded-l-xl"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-on-surface">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(24, q + 1))}
                  className="p-3 hover:bg-surface-container transition-colors rounded-r-xl"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all active:scale-95 ${added ? "bg-primary" : "bg-secondary-container hover:bg-secondary text-on-secondary"}`}
              >
                {added ? (
                  <>
                    <Check size={18} strokeWidth={3} />
                    Added to Pickup Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add {qty} to Pickup Cart
                  </>
                )}
              </button>
            </div>

            {added && (
              <p className="mt-2 text-center text-xs font-semibold text-primary">
                Items reserved in your pickup cart. Pick up at Juja Hub.
              </p>
            )}

            {/* Trust signals */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-on-surface-variant">
              <span className="inline-flex items-center gap-1">
                <Shield size={12} className="text-primary" />
                Quality Guaranteed
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon
                  name="local_shipping"
                  className="text-[14px] text-primary"
                />
                Juja Pickup
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="verified" className="text-[14px] text-primary" />
                JKUAT Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

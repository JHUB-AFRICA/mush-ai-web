"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart, Star } from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest shadow-[0_2px_12px_rgba(35,25,22,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(35,25,22,0.08)]"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Review Badge */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-on-surface shadow-xs backdrop-blur-sm">
          <Star
            size={11}
            className="fill-amber-400 text-amber-500"
            aria-hidden="true"
          />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-on-surface-variant font-normal">
            ({product.reviews.replace(" reviews", "")})
          </span>
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-headline-sm text-base font-bold text-on-surface transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
          {product.description}
        </p>

        {/* Feature Box (soft-tinted rounded block from design) */}
        <div className="my-3 space-y-1.5 rounded-xl border border-surface-container-high/60 bg-surface-container-low/70 p-2.5 text-[11px] text-on-surface-variant">
          {product.features.slice(0, 2).map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer Price & CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-surface-container-high/70 pt-3">
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-on-surface-variant/80">
              {product.unit}
            </span>
            <span className="font-headline-sm text-base sm:text-lg font-extrabold text-on-surface">
              {formatKsh(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all duration-150 active:scale-95 ${
              justAdded
                ? "bg-primary"
                : "bg-secondary-container hover:bg-secondary text-on-secondary"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={14} strokeWidth={3} />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={13} aria-hidden="true" />
                {product.cta}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

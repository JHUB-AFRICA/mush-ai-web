"use client";

import Image from "next/image";
import { Check, ShoppingCart, Star } from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm shadow-black/5">
      <div className="relative h-40 bg-card">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white ${
            product.badgeTone === "ember" ? "bg-ember" : "bg-forest"
          }`}
        >
          {product.badge}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold">
          <Star
            size={10}
            className="fill-ember text-ember"
            aria-hidden="true"
          />
          <span className="sr-only">Rated</span>
          {product.rating.toFixed(1)} ({product.reviews})
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-[10px]">
          <span className="font-semibold text-ember">{product.meta}</span>
          <span className="text-muted">{product.tag}</span>
        </div>
        <h3 className="mt-1.5 text-sm font-bold leading-snug">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mb-4 mt-3 space-y-1 text-[11px] text-muted">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-1.5">
              <Check
                size={12}
                className="mt-0.5 shrink-0 text-forest"
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            <p className="text-[10px] text-muted">{product.unit}</p>
            <p className="text-base font-extrabold">
              {formatKsh(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => add(product.id)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ember px-3.5 py-2 text-xs font-semibold text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <ShoppingCart size={13} aria-hidden="true" />
            {product.cta}
            <span className="sr-only"> for {product.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

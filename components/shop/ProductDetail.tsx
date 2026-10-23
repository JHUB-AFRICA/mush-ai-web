"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Snowflake,
  X,
  Check,
  Calendar,
} from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  function handleAdd() {
    if (!product) return;
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const isTraining = product.category === "Training";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-surface-container-high bg-surface-container-lowest shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/90 text-on-surface shadow-md hover:bg-surface-container-high transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Image Column */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-surface-container">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 768px) 380px, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-primary shadow-xs backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cold-Chain Verified (4°C)
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                {product.category}
              </span>
              <span className="rounded-full bg-secondary-container/15 px-2.5 py-1 text-secondary-container">
                {product.badge}
              </span>
            </div>

            <h2
              id="product-detail-title"
              className="font-headline-sm mt-3 text-xl sm:text-2xl font-extrabold text-on-surface"
            >
              {product.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">
                {formatKsh(product.price)}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                / {product.unit}
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Technical agronomy bullets */}
            <div className="my-4 space-y-2 rounded-2xl border border-surface-container-high/60 bg-surface-container-low/60 p-3.5 text-xs">
              <div className="flex items-center gap-2 text-on-surface font-semibold text-[11px]">
                <Snowflake size={14} className="text-primary" />
                <span>Handling &amp; Viability Spec</span>
              </div>
              <ul className="space-y-1 pl-1 text-[11px] text-on-surface-variant">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-1.5">
                    <Check size={12} className="mt-0.5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-auto pt-4 border-t border-surface-container-high/80">
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
                    className="p-2.5 hover:bg-surface-container transition-colors rounded-l-xl"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-on-surface">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(24, q + 1))}
                    className="p-2.5 hover:bg-surface-container transition-colors rounded-r-xl"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-white shadow-xs transition-all active:scale-95 ${
                    added
                      ? "bg-primary"
                      : "bg-secondary-container hover:bg-secondary text-on-secondary"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} strokeWidth={3} />
                      Added to Pickup Cart!
                    </>
                  ) : isTraining ? (
                    <>
                      <Calendar size={15} />
                      Book {qty} {qty === 1 ? "Seat" : "Seats"}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={15} />
                      Add {qty} to Pickup Cart
                    </>
                  )}
                </button>
              </div>

              {added && (
                <p className="mt-2 text-center text-[11px] font-semibold text-primary">
                  Items reserved in your pickup cart. Pick up at Juja Hub.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

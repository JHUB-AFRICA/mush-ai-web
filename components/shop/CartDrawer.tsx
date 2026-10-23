"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X, ArrowRight, ShoppingBag } from "lucide-react";
import { formatKsh } from "@/lib/format";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { lines, total, isOpen, close, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close pickup cart"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Pickup cart drawer"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface-container-lowest shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <div className="flex items-center justify-between border-b border-surface-container-high/80 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-primary" />
            <h2 className="font-headline-sm text-base font-bold text-on-surface">
              Your Pickup Cart
            </h2>
            <span className="rounded-full bg-surface-container px-2 py-0.5 text-xs font-bold text-primary">
              {lines.reduce((s, l) => s + l.qty, 0)} items
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant/60 mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">
              Your cart is empty
            </h3>
            <p className="mt-1 max-w-xs text-xs text-on-surface-variant leading-relaxed">
              Add pure spawn, volcanic pumice kits or fresh harvest boxes to reserve for pickup.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-on-primary hover:bg-primary-container transition-colors shadow-xs"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-surface-container-high/70 overflow-y-auto px-6 py-2">
            {lines.map((line) => {
              const p = products.find((x) => x.id === line.id);
              if (!p) return null;
              return (
                <li key={line.id} className="flex gap-3.5 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-container">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-on-surface">{p.name}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {formatKsh(p.price)} &bull; {p.unit}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-surface-container-high bg-surface-container-lowest">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${p.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="p-1 text-on-surface-variant hover:text-on-surface"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-on-surface">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${p.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="p-1 text-on-surface-variant hover:text-on-surface"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${p.name}`}
                        onClick={() => remove(line.id)}
                        className="p-1.5 text-on-surface-variant hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="border-t border-surface-container-high/80 bg-surface-container-low/40 p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-xs font-medium text-on-surface-variant">Estimated Subtotal</span>
              <span className="font-headline-sm text-xl font-extrabold text-on-surface">
                {formatKsh(total)}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary px-5 py-3 text-xs font-bold shadow-xs transition-colors"
              >
                <span>Proceed to Cart Page &amp; Checkout</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={close}
                className="w-full text-center text-xs font-semibold text-on-surface-variant hover:text-on-surface py-2"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

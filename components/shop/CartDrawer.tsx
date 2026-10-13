"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close pickup cart"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/40"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Pickup cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-page shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-bold">Pickup Cart</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full p-1.5 hover:bg-card"
          >
            <X size={16} />
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="flex-1 px-5 py-8 text-xs text-muted">
            Your pickup cart is empty. Add spawn, substrate or a grow kit to
            reserve it for collection.
          </p>
        ) : (
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            {lines.map((line) => {
              const p = products.find((x) => x.id === line.id);
              if (!p) return null;
              return (
                <li key={line.id} className="flex gap-3 py-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-card">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold">{p.name}</p>
                    <p className="text-[11px] text-muted">
                      {formatKsh(p.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-line bg-white">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${p.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="p-1.5"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-6 text-center text-[11px] font-bold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${p.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="p-1.5"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${p.name}`}
                        onClick={() => remove(line.id)}
                        className="p-1.5 text-muted hover:text-ink"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="border-t border-line px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold">Total</span>
            <span className="font-extrabold">{formatKsh(total)}</span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            // TODO: route to your pickup-slot / M-Pesa checkout
            className="w-full rounded-lg bg-forest px-4 py-2.5 text-xs font-semibold text-white enabled:hover:brightness-110 disabled:opacity-40"
          >
            Choose Pickup Slot
          </button>
        </div>
      </aside>
    </div>
  );
}

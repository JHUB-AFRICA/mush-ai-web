"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";
import CartItem from "./CartItem";

interface CartItemsListProps {
  count: number;
}

export default function CartItemsList({ count }: CartItemsListProps) {
  const { lines, setQty, remove } = useCart();

  return (
    <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-surface-container-high/80 pb-4 mb-4">
        <h2 className="font-headline-sm text-base font-bold text-on-surface">
          Selected Products ({count})
        </h2>
        <span className="text-xs text-on-surface-variant">Held at 4°C storage</span>
      </div>

      <ul className="divide-y divide-surface-container-high/70">
        {lines.map((line) => {
          const product = products.find((p) => p.id === line.id);
          if (!product) return null;
          const lineTotal = product.price * line.qty;

          return (
            <CartItem
              key={line.id}
              product={product}
              qty={line.qty}
              lineTotal={lineTotal}
              onQtyChange={setQty}
              onRemove={remove}
            />
          );
        })}
      </ul>
    </div>
  );
}

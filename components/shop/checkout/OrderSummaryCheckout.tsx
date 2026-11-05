"use client";

import Image from "next/image";
import { formatKsh } from "@/lib/format";
import { products } from "@/lib/products";
import { useCart } from "@/components/shop/cart/CartProvider";

interface OrderSummaryCheckoutProps {
  showHandling?: boolean;
}

export default function OrderSummaryCheckout({ showHandling = true }: OrderSummaryCheckoutProps) {
  const { lines, total } = useCart();

  return (
    <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
      <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
        Order Summary
      </h2>
      
      <div className="space-y-3 mb-4">
        {lines.map((line) => {
          const product = products.find((p) => p.id === line.id);
          if (!product) return null;
          const lineTotal = product.price * line.qty;
          
          return (
            <div key={line.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-on-surface truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Qty: {line.qty}
                </p>
                <p className="text-sm font-semibold text-on-surface mt-1">
                  {formatKsh(lineTotal)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="pt-4 border-t border-surface-container-high/80 space-y-2 text-sm">
        <div className="flex justify-between text-on-surface-variant">
          <span>Subtotal</span>
          <span>{formatKsh(total)}</span>
        </div>
        {showHandling && (
          <div className="flex justify-between text-on-surface-variant">
            <span>Handling Fee</span>
            <span className="text-emerald-700 font-medium">Free</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-surface-container-high/80 text-base font-bold text-on-surface">
          <span>Total</span>
          <span>{formatKsh(total)}</span>
        </div>
      </div>
    </div>
  );
}

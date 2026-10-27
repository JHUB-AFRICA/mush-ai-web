"use client";

import { formatKsh } from "@/lib/format";

type Hub = "juja" | "westlands";

interface OrderSummaryProps {
  count: number;
  total: number;
  hub: Hub;
}

export default function OrderSummary({ count, total, hub }: OrderSummaryProps) {
  return (
    <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 shadow-sm sticky top-24">
      <h2 className="font-headline-sm text-lg font-extrabold text-on-surface pb-3 border-b border-surface-container-high/80">
        Order Summary
      </h2>

      <div className="space-y-3 py-4 text-xs text-on-surface-variant border-b border-surface-container-high/80">
        <div className="flex justify-between">
          <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-on-surface">{formatKsh(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Station Cold-Chain Handling</span>
          <span className="font-semibold text-emerald-700">Complimentary (KES 0)</span>
        </div>
        <div className="flex justify-between">
          <span>Pickup Hub</span>
          <span className="font-semibold text-on-surface capitalize">
            {hub === "juja" ? "Juja Innovation Farm" : "Westlands Nairobi"}
          </span>
        </div>
      </div>

      <div className="py-4 flex items-baseline justify-between">
        <span className="font-bold text-sm text-on-surface">Total Amount Due</span>
        <span className="font-headline-lg text-2xl font-black text-on-surface">
          {formatKsh(total)}
        </span>
      </div>
    </div>
  );
}

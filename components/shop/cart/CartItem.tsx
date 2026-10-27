"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

interface CartItemProps {
  product: Product;
  qty: number;
  lineTotal: number;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  product,
  qty,
  lineTotal,
  onQtyChange,
  onRemove,
}: CartItemProps) {
  return (
    <li key={product.id} className="py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface-container">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            {product.category}
          </span>
          <span className="text-[10px] text-on-surface-variant">{product.unit}</span>
        </div>
        <h3 className="font-headline-sm text-sm font-bold text-on-surface mt-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs font-semibold text-secondary-container mt-0.5">
          {formatKsh(product.price)} each
        </p>
      </div>

      {/* Quantity controls & removal */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4">
        <div className="flex items-center rounded-xl border border-surface-container-high bg-surface-container-lowest">
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => onQtyChange(product.id, qty - 1)}
            className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-xs font-bold text-on-surface">{qty}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => onQtyChange(product.id, qty + 1)}
            className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Plus size={13} />
          </button>
        </div>

        <div className="text-right sm:min-w-24">
          <span className="font-headline-sm text-sm font-extrabold text-on-surface">
            {formatKsh(lineTotal)}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Remove ${product.name} from cart`}
          onClick={() => onRemove(product.id)}
          className="p-2 text-on-surface-variant hover:text-red-600 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}

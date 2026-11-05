"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant/60 mb-6">
        <ShoppingBag size={44} />
      </div>
      <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
        Your Pickup Cart is Empty
      </h1>
      <p className="mt-2 text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
        You haven&apos;t added any items to your pickup cart yet. Explore our fresh
        mushroom harvests, pure grain spawn, or modular pumice kits.
      </p>
      <div className="mt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-sm font-bold shadow-md hover:bg-primary-container transition-all"
        >
          <ArrowLeft size={16} />
          Browse Cultivation Catalog
        </Link>
      </div>
    </div>
  );
}

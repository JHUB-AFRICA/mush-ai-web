"use client";

import { Truck } from "lucide-react";
import { useCart } from "./CartProvider";

export default function PickupPolicyBanner() {
  const { open } = useCart();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember text-white">
            <Truck size={17} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold">
              Farm &amp; Lab Pick-Up Only Policy
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">
              To safeguard strain viability and live fungal respiratory balance,
              orders are strictly fulfilled via temperature-controlled
              collection at Juja Innovation Farm or Westlands Station.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={open}
          className="shrink-0 rounded-lg bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Review Pickup Cart
        </button>
      </div>
    </section>
  );
}

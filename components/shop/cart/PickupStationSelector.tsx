"use client";

import { Truck } from "lucide-react";

type Hub = "juja" | "westlands";
type Slot = "morning" | "afternoon";

interface PickupStationSelectorProps {
  hub: Hub;
  setHub: (hub: Hub) => void;
  slot: Slot;
  setSlot: (slot: Slot) => void;
}

export default function PickupStationSelector({
  hub,
  setHub,
  slot,
  setSlot,
}: PickupStationSelectorProps) {
  return (
    <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-5 sm:p-6 shadow-xs">
      <h2 className="font-headline-sm text-base font-bold text-on-surface mb-3 flex items-center gap-2">
        <Truck size={18} className="text-primary" />
        1. Choose Cold-Chain Pickup Station
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <label
          className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
            hub === "juja"
              ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
              : "border-surface-container-high hover:border-primary/40 bg-surface-container-low/30"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-on-surface">
              Juja Innovation Farm (Main Hub)
            </span>
            <input
              type="radio"
              name="hub"
              checked={hub === "juja"}
              onChange={() => setHub("juja")}
              className="accent-primary"
            />
          </div>
          <p className="text-[11px] text-on-surface-variant">
            JKUAT Gate C agronomy farm. Full stock of spawn, pumice units, and compost.
          </p>
          <span className="mt-2 text-[10px] font-semibold text-emerald-700">
            Open 07:00 AM – 06:00 PM Daily
          </span>
        </label>

        <label
          className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
            hub === "westlands"
              ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
              : "border-surface-container-high hover:border-primary/40 bg-surface-container-low/30"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-on-surface">
              Westlands Station (Nairobi)
            </span>
            <input
              type="radio"
              name="hub"
              checked={hub === "westlands"}
              onChange={() => setHub("westlands")}
              className="accent-primary"
            />
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Ring Road Parklands cold terminal. Ideal for fresh gourmet mushrooms and spawn bags.
          </p>
          <span className="mt-2 text-[10px] font-semibold text-emerald-700">
            Open 08:30 AM – 05:30 PM Daily
          </span>
        </label>
      </div>

      {/* Time Slot */}
      <div className="mt-4 pt-4 border-t border-surface-container-high/60">
        <span className="block text-xs font-bold text-on-surface mb-2">
          Pickup Window Slot:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSlot("morning")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              slot === "morning"
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Morning Window (08:00 AM – 12:00 PM)
          </button>
          <button
            type="button"
            onClick={() => setSlot("afternoon")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              slot === "afternoon"
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Afternoon Window (01:00 PM – 05:30 PM)
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";
import Icon from "@/components/ui/Icon";

interface ShopHeaderProps {
  query?: string;
  setQuery?: (query: string) => void;
}

export default function ShopHeader({ query = "", setQuery }: ShopHeaderProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* In-page navigation between Mushroom Sales and Services */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#mushroom-sales"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs hover:bg-primary-container transition-all"
          >
            <Icon name="spa" className="text-[16px]" />
            Mushroom Sales
          </a>
          <a
            href="#services-we-offer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs hover:border-primary hover:text-primary transition-all"
          >
            <Icon
              name="construction"
              className="text-[16px] text-secondary-container"
            />
            Services We Offer
          </a>
        </div>

        {/* Bigger, prominent Search Input on the right side */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <label className="relative w-full sm:w-80 md:w-96 lg:w-[440px]">
            <span className="sr-only">Search catalog</span>
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery?.(e.target.value)}
              placeholder="Search mushrooms, spawn, grow kits, compost..."
              className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-3 pl-11 pr-10 text-sm outline-none transition-all duration-150 focus:border-primary focus:ring-4 focus:ring-primary/15 text-on-surface placeholder:text-on-surface-variant/70 shadow-xs hover:border-surface-container-highest"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery?.("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </div>
    </section>
  );
}


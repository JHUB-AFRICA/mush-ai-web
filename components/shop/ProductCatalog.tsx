"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { filterTabs, products, type FilterTab } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";

export default function ProductCatalog() {
  const [tab, setTab] = useState<FilterTab>("All Products");
  const [query, setQuery] = useState("");
  const { count, open } = useCart();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inTab = tab === "All Products" || p.category === tab;
      const inSearch =
        q === "" ||
        `${p.name} ${p.description} ${p.meta} ${p.tag}`
          .toLowerCase()
          .includes(q);
      return inTab && inSearch;
    });
  }, [tab, query]);

  return (
    <section
      aria-labelledby="catalog-heading"
      className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6"
    >
      <h2 id="catalog-heading" className="sr-only">
        Product catalog
      </h2>

      <div className="mb-5 flex flex-col gap-3 border-y border-line py-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-1.5"
        >
          {filterTabs.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                tab === t
                  ? "bg-forest text-white"
                  : "bg-card text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative flex-1 lg:w-56 lg:flex-none">
            <span className="sr-only">Search spawn, kits, sensors</span>
            <Search
              size={13}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spawn, kits, sensors..."
              className="w-full rounded-full border border-line bg-white py-1.5 pl-8 pr-3 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ember"
            />
          </label>
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold hover:bg-card"
          >
            <ShoppingCart size={13} aria-hidden="true" />
            Cart
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ember px-1 text-[9px] font-bold text-white">
              {count}
            </span>
          </button>
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.id} className="h-full">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="status"
          className="rounded-2xl border border-line bg-white/70 p-8 text-center"
        >
          <p className="text-sm font-semibold">
            No products match your search.
          </p>
          <p className="mt-1 text-xs text-muted">
            Clear the search or pick another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTab("All Products");
            }}
            className="mt-4 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white"
          >
            Show all products
          </button>
        </div>
      )}
    </section>
  );
}

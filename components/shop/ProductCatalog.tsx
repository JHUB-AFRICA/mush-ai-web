"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Wrench } from "lucide-react";
import {
  filterTabs,
  products,
  type FilterTab,
  type Product,
} from "@/lib/products";
import ProductCard from "./ProductCard";
import Icon from "@/components/ui/Icon";

// Definition of which categories fall under Mushroom Sales vs Services
const serviceCategories: string[] = ["Grow Kits & Structures", "Training"];

const categoryIcons: Record<FilterTab, string> = {
  "All Products": "apps",
  "Fresh Mushrooms": "eco",
  "Strains & Spawn": "biotech",
  "Grow Kits & Structures": "inventory_2",
  "By-products & Compost": "recycling",
  "Training": "school",
};

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

interface ProductCatalogProps {
  query?: string;
  setQuery?: (query: string) => void;
}

export default function ProductCatalog({
  query = "",
  setQuery,
}: ProductCatalogProps) {
  const [tab, setTab] = useState<FilterTab>("All Products");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inTab = tab === "All Products" || p.category === tab;
      const inSearch =
        q === "" ||
        `${p.name} ${p.description} ${p.meta} ${p.tag} ${p.category}`
          .toLowerCase()
          .includes(q);
      return inTab && inSearch;
    });
  }, [tab, query]);

  const sortItems = (items: Product[]) => {
    return [...items].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  };

  // Separate into Mushroom Sales vs Services
  const mushroomSales = useMemo(
    () =>
      sortItems(
        filtered.filter((p) => !serviceCategories.includes(p.category)),
      ),
    [filtered, sortBy],
  );

  const servicesOffer = useMemo(
    () =>
      sortItems(filtered.filter((p) => serviceCategories.includes(p.category))),
    [filtered, sortBy],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-12 space-y-12">
      {/* Category Filter and Sort By Toolbar */}
      <div className="rounded-2xl border border-surface-container-high/90 bg-surface-container-lowest p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Control Bar: Category Meta, Item Counter & Compact Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <Icon name="tune" className="text-[17px] text-primary" />
              Categories:
            </span>
            <span className="inline-flex items-center rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-semibold text-on-surface-variant">
              {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
            </span>
            {tab !== "All Products" && (
              <button
                type="button"
                onClick={() => setTab("All Products")}
                className="text-[11px] font-semibold text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <label
              htmlFor="catalog-sort"
              className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1"
            >
              <Icon name="swap_vert" className="text-[16px]" />
              Sort By:
            </label>
            <div className="relative">
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="appearance-none cursor-pointer rounded-xl border border-surface-container-high bg-surface-container/60 pl-3 pr-8 py-1.5 text-xs font-bold text-on-surface transition-all hover:bg-surface-container hover:border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
                <Icon name="expand_more" className="text-[16px]" />
              </span>
            </div>
          </div>
        </div>

        {/* Category Pills (Full width, horizontal scrolling on mobile, clean layout) */}
        <div
          role="group"
          aria-label="Filter catalog categories"
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-surface-container-high/60 pt-3.5"
        >
          {filterTabs.map((t) => {
            const countForTab =
              t === "All Products"
                ? products.length
                : products.filter((p) => p.category === t).length;
            const isTabActive = tab === t;

            return (
              <button
                key={t}
                type="button"
                aria-pressed={isTabActive}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 ${
                  isTabActive
                    ? "bg-primary text-on-primary shadow-xs ring-1 ring-primary/20"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Icon
                  name={categoryIcons[t]}
                  className={`text-[15px] ${
                    isTabActive ? "text-primary-fixed" : "text-primary/70"
                  }`}
                />
                <span>{t}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isTabActive
                      ? "bg-white/20 text-white"
                      : "bg-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {countForTab}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: MUSHROOM SALES */}
      {(tab === "All Products" || !serviceCategories.includes(tab)) && (
        <section
          id="mushroom-sales"
          aria-labelledby="mushroom-sales-heading"
          className="scroll-mt-24 pt-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-surface-container-high/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles size={14} />
                <span>FRESH HARVESTS &amp; BIOLOGICAL INPUTS</span>
              </div>
              <h2
                id="mushroom-sales-heading"
                className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl mt-1"
              >
                Mushroom Sales
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                Fresh button mushrooms harvested at dawn, pure JKUAT-certified
                spawn bags, and high-nitrogen organic compost conditioned for
                high yield.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{mushroomSales.length} In Stock for Pickup</span>
            </div>
          </div>

          {mushroomSales.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mushroomSales.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-xs text-on-surface-variant">
              No physical mushroom items match this search filter.
            </p>
          )}
        </section>
      )}

      {/* SECTION 2: SERVICES WE OFFER */}
      {(tab === "All Products" || serviceCategories.includes(tab)) && (
        <section
          id="services-we-offer"
          aria-labelledby="services-heading"
          className="scroll-mt-24 pt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-surface-container-high/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-container">
                <Wrench size={14} />
                <span>INFRASTRUCTURE, TRAINING &amp; AUTOMATION</span>
              </div>
              <h2
                id="services-heading"
                className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl mt-1"
              >
                Services &amp; Training
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                Turnkey pumice grow unit construction, certified agronomy
                masterclasses at JKUAT, and telemetry microclimate monitoring
                tailored for commercial growers.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full bg-secondary-container/15 px-3 py-1 text-xs font-semibold text-secondary-container sm:self-auto">
              <span>{servicesOffer.length} Professional Services</span>
            </div>
          </div>

          {servicesOffer.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesOffer.map((service) => (
                <li key={service.id} className="h-full">
                  <ProductCard product={service} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-xs text-on-surface-variant">
              No services match this search filter.
            </p>
          )}
        </section>
      )}

      {/* Empty State when zero items in both */}
      {mushroomSales.length === 0 && servicesOffer.length === 0 && (
        <div
          role="status"
          className="rounded-3xl border border-surface-container-high bg-surface-container-lowest p-12 text-center shadow-xs"
        >
          <Icon
            name="search_off"
            className="text-[48px] text-on-surface-variant/60 mx-auto mb-3"
          />
          <h3 className="font-headline-sm text-lg text-primary font-bold">
            No items found
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant max-w-sm mx-auto">
            Try adjusting your query or click below to view all items and
            services.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery?.("");
              setTab("All Products");
              setSortBy("featured");
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-on-primary hover:bg-primary-container transition-colors shadow-xs"
          >
            Show All Catalog &amp; Services
          </button>
        </div>
      )}
    </div>
  );
}

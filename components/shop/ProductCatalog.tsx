"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Wrench } from "lucide-react";
import {
  filterTabs,
  products,
  type FilterTab,
  type Product,
} from "@/lib/products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";
import Icon from "@/components/ui/Icon";

// Definition of which categories fall under Mushroom Sales vs Services
const serviceCategories: FilterTab[] = ["Training", "Grow Kits & Structures"];

interface ProductCatalogProps {
  onSelectProduct?: (product: Product) => void;
}

export default function ProductCatalog({
  onSelectProduct,
}: ProductCatalogProps) {
  const [tab, setTab] = useState<FilterTab>("All Products");
  const [query, setQuery] = useState("");
  const { count } = useCart();

  const handleCategoryCardClick = (cat: FilterTab) => {
    setTab((prev) => (prev === cat ? "All Products" : cat));
  };

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

  // Separate into Mushroom Sales vs Services
  const mushroomSales = useMemo(
    () => filtered.filter((p) => !serviceCategories.includes(p.category)),
    [filtered],
  );

  const servicesOffer = useMemo(
    () => filtered.filter((p) => serviceCategories.includes(p.category)),
    [filtered],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-12 space-y-12">
      {/* Unified Toolbar: filter pills + search input + cart link */}
      <div className="rounded-2xl border border-surface-container-high/90 bg-surface-container-lowest p-3 shadow-xs flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter catalog items"
          className="flex flex-wrap items-center gap-1.5"
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
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                  isTabActive
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
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

        {/* Search & Cart Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="relative flex-1 lg:w-64 lg:flex-none">
            <span className="sr-only">Search catalog</span>
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mushroom, spawn, training..."
              className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-2 pl-9 pr-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary text-on-surface placeholder:text-on-surface-variant/70"
            />
          </label>

          <Link
            href="/cart"
            id="view-cart-button"
            className="inline-flex items-center gap-2 rounded-full bg-secondary-container text-on-secondary px-4 py-2 text-xs font-bold shadow-xs hover:bg-secondary transition-colors"
          >
            <Icon name="shopping_basket" className="text-[16px]" />
            <span>Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-secondary-container text-[10px] font-black">
              {count}
            </span>
          </Link>
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
                  <ProductCard
                    product={product}
                    onOpenDetail={onSelectProduct}
                  />
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
                Services We Offer
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
                  <ProductCard
                    product={service}
                    onOpenDetail={onSelectProduct}
                  />
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
              setQuery("");
              setTab("All Products");
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

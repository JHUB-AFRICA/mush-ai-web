"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { filterTabs, products, type FilterTab, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";
import Icon from "@/components/Icon";

const categoryCards = [
  {
    category: "Grow Kits & Structures" as FilterTab,
    shortLabel: "Grow Kits",
    title: "Grow Kits & Structures",
    icon: "home_work",
    iconBg: "bg-amber-100 text-amber-800",
    description: "Ready-to-use kits & sensors / modular pumice for button mushroom yield.",
  },
  {
    category: "Strains & Spawn" as FilterTab,
    shortLabel: "Spawn",
    title: "Mushroom Strains / Spawn",
    icon: "spa",
    iconBg: "bg-emerald-100 text-emerald-800",
    description: "High purity button mushroom spawn, ready for cultivation.",
  },
  {
    category: "Fresh Mushrooms" as FilterTab,
    shortLabel: "Fresh",
    title: "Fresh Mushrooms",
    icon: "restaurant",
    iconBg: "bg-orange-100 text-orange-800",
    description: "Freshly harvested button mushrooms / daily pickup only — availability depends.",
  },
  {
    category: "By-products & Compost" as FilterTab,
    shortLabel: "By-products",
    title: "By-products",
    icon: "recycling",
    iconBg: "bg-teal-100 text-teal-800",
    description: "Organic spent compost / rich bio-fertilizer and hydration smooth packaging per kg.",
  },
  {
    category: "Training" as FilterTab,
    shortLabel: "Training",
    title: "Training & Courses",
    icon: "school",
    iconBg: "bg-amber-100 text-amber-900",
    description: "Hands-on certified practical sessions to grow or finish a mature farm efficiently.",
  },
];

interface ProductCatalogProps {
  onSelectProduct?: (product: Product) => void;
}

export default function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [tab, setTab] = useState<FilterTab>("All Products");
  const [query, setQuery] = useState("");
  const { count, open } = useCart();

  const handleCategoryCardClick = (cat: FilterTab) => {
    // Toggle: if clicking current active category, revert to all products
    setTab((prev) => (prev === cat ? "All Products" : cat));
  };

  const visible = useMemo(() => {
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

  return (
    <section
      id="catalog"
      aria-labelledby="catalog-heading"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-12"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-secondary-container">
            MUSHROOM CATEGORY
          </span>
          <h2
            id="catalog-heading"
            className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl"
          >
            Cultivation &amp; Harvest Catalog
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-surface-container-high bg-surface-container-lowest px-3.5 py-1.5 text-xs text-on-surface-variant shadow-xs sm:self-auto">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-on-surface">Cold-Chain Pickup Active</span>
          <span className="rounded-full bg-surface-container px-2 py-0.5 text-[11px] font-bold text-primary">
            {products.length} Products
          </span>
        </div>
      </div>

      {/* 5 Category Cards (from design) */}
      <div className="mb-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {categoryCards.map((card) => {
          const isSelected = tab === card.category;
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => handleCategoryCardClick(card.category)}
              className={`group flex flex-col text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-primary bg-surface-container-lowest shadow-md ring-2 ring-primary/20 -translate-y-0.5"
                  : "border-surface-container-high/80 bg-surface-container-lowest/80 hover:border-primary/40 hover:bg-surface-container-lowest hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-base ${card.iconBg}`}
                >
                  <Icon name={card.icon} />
                </span>
                {isSelected && (
                  <span className="flex h-5 items-center rounded-full bg-primary px-2 text-[10px] font-bold text-on-primary">
                    Active
                  </span>
                )}
              </div>
              <h3 className="font-headline-sm text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Toolbar: filter pills + search + cart link */}
      <div className="mb-8 rounded-2xl border border-surface-container-high/90 bg-surface-container-lowest p-3 shadow-xs flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter products by category"
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
            <span className="sr-only">Search products</span>
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, type, or region..."
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

      {/* Product Grid (3 cols x 2 rows = 6 core cards) */}
      {visible.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard
                product={product}
                onOpenDetail={onSelectProduct}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="status"
          className="rounded-3xl border border-surface-container-high bg-surface-container-lowest p-12 text-center shadow-xs"
        >
          <Icon
            name="search_off"
            className="text-[48px] text-on-surface-variant/60 mx-auto mb-3"
          />
          <h3 className="font-headline-sm text-lg text-primary font-bold">
            No mushroom products found
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant max-w-sm mx-auto">
            Try adjusting your search terms or select another category from the filters above.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTab("All Products");
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-on-primary hover:bg-primary-container transition-colors shadow-xs"
          >
            Reset Filters &amp; Show All
          </button>
        </div>
      )}
    </section>
  );
}

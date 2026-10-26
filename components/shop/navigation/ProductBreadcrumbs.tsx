"use client";

import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

interface ProductBreadcrumbsProps {
  product: {
    category: string;
    name: string;
  };
  categorySectionHref: string;
}

export default function ProductBreadcrumbs({
  product,
  categorySectionHref,
}: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
          <li>
            <Link href="/" className="transition-colors hover:text-primary font-medium">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li>
            <Link
              href="/shop"
              className="transition-colors hover:text-primary font-medium"
            >
              Shop &amp; Services
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li>
            <Link
              href={categorySectionHref}
              className="transition-colors hover:text-primary font-medium hover:underline"
            >
              {product.category}
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li
            aria-current="page"
            className="font-bold text-on-surface truncate max-w-[200px] sm:max-w-none"
          >
            {product.name}
          </li>
        </ol>

        {/* Quick Search on Detail Page */}
        <form action="/shop" method="GET" className="relative w-full sm:w-64 lg:w-72">
          <span className="sr-only">Search catalog</span>
          <Search
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            name="q"
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-2 pl-9 pr-3 text-xs outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/70 shadow-xs hover:border-surface-container-highest"
          />
        </form>
      </div>
    </nav>
  );
}

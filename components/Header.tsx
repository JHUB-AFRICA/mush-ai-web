"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { LOGO_HEADER, NAV_LINKS } from "@/lib/site";
import { useCart } from "@/components/shop/CartProvider";

export default function Header({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const effectiveCount = count > 0 ? count : cartCount;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(44,34,30,0.05)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-space-md px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-space-sm" onClick={() => setOpen(false)}>
          <Image src={LOGO_HEADER} alt="SmartMushroom logo" width={48} height={48} className="h-12 w-auto object-contain" />
          <span className="font-headline-sm text-headline-sm tracking-tight text-primary">SmartMushroom</span>
        </Link>

        <nav className="hidden items-center gap-space-lg xl:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={
                isActive(href)
                  ? "rounded-full bg-primary-container px-space-md py-space-xs font-label-md text-label-md text-on-primary-container"
                  : "font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-on-surface"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <Link
            href="/cart"
            aria-label={`Pickup Cart, ${effectiveCount} items`}
            className="relative flex items-center justify-center p-space-xs text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name="shopping_basket" />
            {effectiveCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container font-label-sm text-label-sm font-bold text-on-secondary shadow-xs">
                {effectiveCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="hidden items-center justify-center rounded-full bg-secondary-container px-space-lg py-space-sm font-label-lg text-label-lg text-on-secondary shadow-[0_4px_16px_-2px_rgba(44,34,30,0.08)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-secondary sm:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="text-[20px]" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-outline-variant/30 bg-surface px-6 py-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {[...NAV_LINKS, { label: "Login", href: "/login" }].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 font-label-lg text-label-lg ${
                    isActive(href) ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBasket, User, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/farm-structure", label: "Farm Structure" },
  { href: "/process", label: "The Process" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2">
          {/* Adjust the filename to match the logo in /public */}
          <Image
            src="/smartmushroom_logo.png"
            alt=""
            width={24}
            height={24}
            priority
          />
          <span className="text-sm font-bold">SmartMushroom</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-forest text-white"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 text-ink hover:bg-card"
          >
            <ShoppingBasket size={18} />
            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ember text-[9px] font-bold text-white">
              0
            </span>
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-ember px-4 py-1.5 text-xs font-semibold text-white hover:brightness-95"
          >
            Login
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-8 w-8 items-center justify-center rounded-full bg-forest text-white sm:flex"
          >
            <User size={15} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 hover:bg-card md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-page px-4 py-2 md:hidden">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === href ? "bg-forest text-white" : "text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

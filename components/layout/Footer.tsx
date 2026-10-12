"use client";

import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { CurrentYear } from "../core/CurrentYear";

const quickLinks = [
  { label: "Home Overview", href: "/" },
  { label: "Pumice Structures", href: "/farm-structure" },
  { label: "The IoT Process", href: "/process" },
  { label: "Fresh Spawn & Yields", href: "/shop" },
  { label: "Farmer Training", href: "/training" },
];

const badges = ["Made in Kenya", "IKUAT Innovators", "JHUB Africa Partner"];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src="/smartmushroom_logo.png"
              alt=""
              width={22}
              height={22}
            />
            <span className="text-sm font-bold">SmartMushroom</span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Smarter mushroom farming, powered by data. Precision
            climate-controlled pumice architecture and high-yield IoT substrates
            across East Africa.
          </p>
          <ul className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-medium text-muted"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold">Quick Links</h3>
          <ul className="space-y-2 text-xs text-muted">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold">Contact &amp; Hub</h3>
          <address className="space-y-2 text-xs not-italic text-muted">
            <p>Nairobi / Juja, Kenya</p>
            <p>
              Phone:{" "}
              <a href="tel:+254700000000" className="hover:text-ink">
                +254 700 000 000
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:hello@smartmushroom.africa"
                className="hover:text-ink"
              >
                hello@smartmushroom.africa
              </a>
            </p>
            <p>JKUAT Collaboration Wing</p>
          </address>
        </div>

        <div>
          <h3 className="mb-1 text-xs font-bold">Harvest Dispatch</h3>
          <p className="mb-3 text-xs text-muted">
            Weekly humidity telemetry, spawn releases, and outgrower agronomy
            reports.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <CurrentYear /> SmartMushroom Ltd. All rights reserved.
          </p>
          <ul className="flex gap-4">
            <li>
              in which category is the faq section in that is in the components
              <Link href="/privacy" className="hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/outgrower-agreement" className="hover:text-ink">
                Outgrower Agreement
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Package,
  Plus,
  Quote,
  ShoppingCart,
  Snowflake,
} from "lucide-react";
import { formatKsh } from "@/lib/format";
import { featuredProductId, products } from "@/lib/products";
import { useCart } from "./CartProvider";

/* Add these photos in /public/images/shop/ */
const gallery = [
  {
    src: "/images/shop/spawn-lab.jpg",
    alt: "Lab technician inspecting a jar of mother culture",
  },
  { src: "/images/shop/spawn-bag.jpg", alt: "Bag of colonized grain spawn" },
  {
    src: "/images/shop/spawn-colonized.jpg",
    alt: "Substrate colonized with white mycelium",
  },
  {
    src: "/images/shop/fresh-mushrooms.jpg",
    alt: "Freshly harvested button mushrooms",
  },
];

export default function ProductDetail() {
  const product = products.find((p) => p.id === featuredProductId);
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  function handleAdd() {
    add(product!.id, qty);
    setAdded(true);
  }

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6"
    >
      <div className="grid gap-8 rounded-3xl border border-line bg-white p-5 shadow-sm shadow-black/5 md:grid-cols-2 md:p-8">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
            <Image
              src={gallery[active].src}
              alt={gallery[active].alt}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold">
              <span
                className="h-1.5 w-1.5 rounded-full bg-forest"
                aria-hidden="true"
              />
              Cold Chain Sealed: 4°C Monitored
            </span>
          </div>
          <ul className="mt-3 grid grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <li key={g.src}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}: ${g.alt}`}
                  aria-current={active === i}
                  className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 bg-card ${
                    active === i ? "border-forest" : "border-transparent"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
            <span className="rounded-full bg-forest px-2.5 py-1 text-white">
              JKUAT Certified Strain
            </span>
            <span className="rounded-full bg-card px-2.5 py-1 text-ember">
              100% Viability Guaranteed
            </span>
          </div>

          <h2
            id="featured-heading"
            className="mt-3 text-2xl font-extrabold leading-tight tracking-tight"
          >
            {product.name}
          </h2>
          <p className="mt-2 text-lg font-extrabold text-ember">
            {formatKsh(product.price)}{" "}
            <span className="text-xs font-medium text-muted">
              / Bag (incl. VAT)
            </span>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Cultivated exclusively in the JKUAT Biotechnology laboratories using
            mother culture strain A-15. Acclimatized for high pinning density
            and maximum biological efficiency in East African sub-tropical
            highland conditions.
          </p>

          <div className="mt-4 grid gap-3 rounded-2xl bg-card p-4 sm:grid-cols-2">
            <div className="flex gap-2.5">
              <Snowflake
                size={16}
                className="mt-0.5 shrink-0 text-forest"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-bold">Cold Storage Rule</p>
                <p className="text-[11px] leading-relaxed text-muted">
                  Keep strictly at 2°C to 4°C. Inoculate within 14 days of
                  pickup.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Package
                size={16}
                className="mt-0.5 shrink-0 text-forest"
                aria-hidden="true"
              />
              <div>
                <p className="text-[11px] font-bold">Stock Availability</p>
                <p className="text-[11px] leading-relaxed text-muted">
                  24 Bags Ready at Juja Hub
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex items-center rounded-lg border border-line"
              role="group"
              aria-label="Quantity"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2.5 hover:bg-card"
              >
                <Minus size={13} />
              </button>
              <span
                className="w-8 text-center text-xs font-bold"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(24, q + 1))}
                className="p-2.5 hover:bg-card"
              >
                <Plus size={13} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-xs font-semibold text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ShoppingCart size={14} aria-hidden="true" />
              Add {qty} {qty === 1 ? "Bag" : "Bags"} to Pickup Cart
            </button>
          </div>
          <p role="status" className="mt-2 h-4 text-[11px] text-forest">
            {added ? "Added to your pickup cart." : ""}
          </p>

          <figure className="mt-auto rounded-2xl border border-line p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-ember">
              <Quote size={11} aria-hidden="true" />
              Verified Outgrower Reviews
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
              <span className="font-semibold text-ink">
                Samuel K. (Limuru Farmstead)
              </span>
              <span>Collected yesterday</span>
            </div>
            <blockquote className="mt-1.5 text-[11px] italic leading-relaxed text-muted">
              &ldquo;Colonization took exactly 12 days in our pumice beds. ZERO
              contamination across all 8 bags. Grain density is noticeably
              higher than imported brands.&rdquo;
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}

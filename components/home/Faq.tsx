"use client";

import { useState } from "react";
import Icon from "../Icon";

const FAQS = [
  { q: "What does SmartMushroom actually do?", a: "We grow button mushrooms using a sensor-monitored smart farm, and sell grow kits, spawn, fresh mushrooms and mushroom by-products directly to customers." },
  { q: "Do I need any technical knowledge to buy from you?", a: "Not at all. Our shop, training and products are designed for anyone — from first-time growers to experienced farmers." },
  { q: "Where are you based?", a: "We're based in Kenya, and currently offer local pickup for all orders." },
  { q: "How do I contact you?", a: "Use the contact form, WhatsApp, or email in the footer of any page — whichever is easiest for you." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm font-bold uppercase text-secondary">
            Knowledge Base
          </div>
          <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
            Frequently Asked Questions
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Everything you need to know about setting up, automated monitoring, and commercializing your mushroom yields.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl bg-surface-container-low">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-headline-sm text-headline-sm text-primary hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                  >
                    <span>{f.q}</span>
                    <Icon name="expand_more" className={`text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-body-md text-body-md text-on-surface-variant">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

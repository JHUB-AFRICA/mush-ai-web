"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

export type FaqItemData = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItemData[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-scroll-area max-h-[520px] overflow-y-auto overscroll-contain pr-2 space-y-4 rounded-2xl">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl bg-surface-container-low transition-all"
          >
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left font-headline-sm text-headline-sm text-primary hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container transition-colors"
              >
                <span>{item.question}</span>
                <Icon
                  name="expand_more"
                  className={`text-primary transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

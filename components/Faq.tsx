"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0); // first item open, like the template
  const baseId = useId();

  return (
    <section className="w-full py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <Pill bg="container" tone="secondary" className="mb-3">Knowledge Base</Pill>
          <SectionHeading className="mb-4">Frequently Asked Questions</SectionHeading>
          <p className="text-body-md text-on-surface-variant">
            Everything you need to know about setting up, automated monitoring, and
            commercializing your mushroom yields.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div
                key={item.q}
                className="bg-surface-container-low rounded-2xl overflow-hidden transition-colors duration-200"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline text-headline-sm text-primary hover:text-secondary focus-visible:outline-2 focus-visible:outline-primary-container"
                  >
                    <span>{item.q}</span>
                    <Icon
                      name="expand_more"
                      className={`transform transition-transform duration-200 text-primary ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-6 pt-0"
                >
                  <p className="text-body-md text-on-surface-variant">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

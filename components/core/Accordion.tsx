"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = { q: string; a: string };

/** Single-open accordion with proper aria wiring. Reusable on any page. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map(({ q, a }, i) => {
        const open = openIndex === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={q}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ember"
              >
                {q}
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-200 ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-xs leading-relaxed text-muted">{a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

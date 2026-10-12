"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* Placeholder answers: replace with your confirmed figures */
const faqs = [
  {
    q: "What is the construction timeline for a standard 30x20ft pumice grow room?",
    a: "A standard room is typically built in 3 to 5 weeks after the site inspection, depending on foundation conditions and material delivery.",
  },
  {
    q: "Can I retrofit my existing brick or timber building with SmartMushroom sensors?",
    a: "Yes. The sensor nodes, mist nozzles and edge hub can be fitted into existing brick, block or timber buildings. We check insulation and sealing during the site visit first.",
  },
  {
    q: "How does the pumice structure handle extreme heat during dry seasons?",
    a: "The double-leaf pumice walls hold R-18 thermal mass, so afternoon heat reaches the chamber slowly. In trials, the chamber stayed within 1.2°C while outside air peaked at 33.5°C.",
  },
  {
    q: "Do I need special agricultural permits to construct this on my land?",
    a: "Requirements differ by county. We provide the drawings and specifications for your application; confirm the exact permits with your county planning office.",
  },
  {
    q: "What are the power requirements for the ventilation and misting system?",
    a: "The fans and mist system run on a 48V solar hybrid supply averaging under 380W, and the edge hub keeps 72 hours of backup on LiFePO4 batteries.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-card/50">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold text-ember">
            Frequently asked questions
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
            Grow Room Engineering &amp; Installation
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Clear answers on construction timelines, material additions,
            retrofit options, and off-grid utility requirements.
          </p>
        </div>

        <ul className="space-y-3">
          {faqs.map(({ q, a }, i) => {
            const open = openIndex === i;
            return (
              <li
                key={q}
                className="rounded-2xl border border-line bg-white/70"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ember"
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
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`grid transition-[grid-template-rows] duration-200 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-xs leading-relaxed text-muted">
                      {a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

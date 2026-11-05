"use client";

import { useState } from "react";

export type FaqItemData = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer, id }: FaqItemData & { id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface-container-lowest border border-surface-container-high/80 rounded-2xl overflow-hidden transition-all shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-headline font-semibold text-lg text-primary hover:text-secondary transition-colors"
      >
        <span>{question}</span>
        <span
          className={`material-symbols-outlined text-secondary transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        id={`${id}-body`}
        hidden={!open}
        className="px-6 pb-6 pt-1 font-body text-on-surface-variant text-base leading-relaxed border-t border-surface-container-low"
      >
        {answer}
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItemData[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <FaqItem key={item.question} id={`faq-${i}`} {...item} />
      ))}
    </div>
  );
}

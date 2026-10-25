"use client";

import FaqAccordion, { type FaqItemData } from "@/components/core/FaqAccordion";

const FAQS: FaqItemData[] = [
  {
    question: "Does this system replace the farmer, or support them?",
    answer:
      "It supports you 100%. You remain the farmer in charge. The system acts like a 24/7 digital farm assistant: it keeps conditions steady in the room and alerts you via phone if anything needs manual attention.",
  },
  {
    question: "Why did you choose volcanic pumice over a metal sheet structure?",
    answer:
      "In East African climates, galvanized metal sheets cook mushrooms under direct sunlight and lose all humidity at night. Volcanic pumice is a locally available, cost-effective stone filled with microscopic air pockets. It acts as a natural thermos — blocking midday heat and retaining high moisture naturally, saving you thousands on electricity.",
  },
  {
    question: "Can I build a similar structure myself or adapt an existing building?",
    answer:
      "Yes. You can build a new pumice masonry room using our standardized modular plans, or retrofit an existing brick, block, or timber building. Our team inspects your location, tests airflow, and installs the sensor and misting nodes to match your space.",
  },
  {
    question: "What happens during a power blackout or if a sensor reading goes outside the safe range?",
    answer:
      "First, the pumice walls provide natural thermal buffer, so room temperatures only shift ~1.2°C over several hours. Second, our edge controller and sensor hub include a battery backup lasting up to 72 hours, maintaining automated logging and emergency alerts.",
  },
  {
    question: "Can this process work on a small home setup, not just a full commercial farm?",
    answer:
      "Yes. The same principles apply whether you have 50 bags in a backyard shed or 5,000 bags in a commercial facility. We offer scaled kits tailored for beginner outgrowers and large producers alike.",
  },
  {
    question: "Is the farm open for visits and site inspections?",
    answer:
      "Yes! Our demonstration site in Juja (in collaboration with JKUAT / JHUB) is open for scheduled farmer tours. You can see the pumice masonry, examine the sensor nodes in action, and inspect live mushroom flushes.",
  },
];

export default function FarmerFaqSection() {
  return (
    <section className="py-16 lg:py-24 bg-surface-container-low/30 border-t border-surface-container-high/60">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
            Got Questions?
          </span>
          <h2 className="mt-2 font-headline-lg text-headline-lg tracking-tight text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">
            Clear answers on the structure, sensors, costs, and how it works for your farm.
          </p>
        </div>

        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

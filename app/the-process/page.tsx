import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion, { type FaqItemData } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "How SmartMushroom senses, understands, advises and acts to keep every grow room healthy.",
};

const steps = [
  {
    number: 1,
    title: "Sense",
    icon: "sensors",
    text: "Sensors placed throughout the grow room continuously track temperature, humidity, CO₂, light and moisture, 24 hours a day.",
    accent: false,
  },
  {
    number: 2,
    title: "Understand",
    icon: "analytics",
    text: "Readings are checked against the ideal conditions for healthy mushroom growth, and any drift is flagged immediately.",
    accent: false,
  },
  {
    number: 3,
    title: "Advise",
    icon: "tips_and_updates",
    text: "Instead of raw numbers, the system translates readings into clear, practical guidance — what's changing, and what to do about it.",
    accent: false,
  },
  {
    number: 4,
    title: "Act",
    icon: "tune",
    text: "Fans, humidifiers, heaters and ventilation respond automatically — or the farmer adjusts conditions manually based on the guidance given.",
    accent: true, // orange number + icon like the Stitch design
  },
];

const faqs: FaqItemData[] = [
  {
    question: "Does this replace the farmer, or support them?",
    answer:
      "It supports them. The system flags problems and suggests action — the farmer stays in control.",
  },
  {
    question: "What happens if a sensor reading goes outside the safe range?",
    answer:
      "The system automatically adjusts equipment like fans or humidifiers where possible, and alerts are generated for anything that needs manual attention.",
  },
  {
    question:
      "Can this process work on a small home setup, not just a full farm?",
    answer:
      "Yes — the same principles apply at smaller scale, and our grow kits are built with this in mind.",
  },
];

export default function TheProcessPage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Page background: sits only behind this page's content, so the
          header and footer from layout.tsx are not covered */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/the-process-bg.jpg')" }}
      />
      {/* Tint so text stays readable. Lower the /80 to show more photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-surface-container-low/80"
      />

      {/* 1. Hero */}
      <section className="w-full px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-5">
          <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-tight text-balance">
            How SmartMushroom keeps every grow room healthy.
          </h1>
          <p className="font-body text-base sm:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            No guesswork. No missed changes. Just consistent conditions,
            monitored continuously.
          </p>
        </div>
      </section>

      {/* 2. Step by Step */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <h2 className="font-headline font-bold text-2xl sm:text-4xl text-primary tracking-tight">
            Step by Step
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 list-none p-0 m-0">
          {steps.map((step) => (
            <li
              key={step.number}
              className="bg-surface-container-lowest rounded-2xl p-6 lg:p-7 border border-surface-container-high/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span
                  className={`w-10 h-10 rounded-xl font-headline font-bold text-lg flex items-center justify-center ${
                    step.accent
                      ? "bg-secondary-container text-on-secondary"
                      : "bg-primary text-on-primary"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined text-2xl ${
                    step.accent ? "text-secondary-container" : "text-primary"
                  }`}
                >
                  {step.icon}
                </span>
              </div>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-primary mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="font-body text-on-surface-variant text-sm sm:text-base leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. The Result */}
      <section className="w-full bg-surface-container-low/60 backdrop-blur-sm py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-12 border-y border-surface-container-high/60">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-headline font-bold text-2xl sm:text-4xl text-primary tracking-tight mb-4 sm:mb-5">
            The Result
          </h2>
          <p className="font-body text-base sm:text-xl text-on-surface-variant leading-relaxed mb-8 max-w-2xl">
            Fewer surprises, healthier crops, less time spent manually checking
            conditions and mushrooms grown the same reliable way, every cycle.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/farm-structure"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-semibold text-base px-7 py-3 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>See the Grow Room</span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[18px]"
              >
                arrow_forward
              </span>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-base px-7 py-3 rounded-full border border-surface-container-high transition-colors shadow-sm"
            >
              <span>Shop Our Products</span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[18px]"
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline font-bold text-2xl sm:text-4xl text-primary">
            FAQs
          </h2>
        </div>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}

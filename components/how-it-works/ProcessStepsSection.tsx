"use client";

import { motion } from "motion/react";
import Icon from "@/components/Icon";

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Sense",
    icon: "sensors",
    description:
      "Sensors placed throughout the grow room continuously track temperature, humidity, CO₂, light, and moisture 24 hours a day.",
    accent: false,
  },
  {
    number: "2",
    title: "Understand",
    icon: "analytics",
    description:
      "Readings are checked against the ideal conditions for healthy mushroom growth, and any drift or drop is flagged immediately.",
    accent: false,
  },
  {
    number: "3",
    title: "Advise",
    icon: "tips_and_updates",
    description:
      "Instead of confusing raw graphs, the system translates numbers into clear, practical guidance on what is changing and what to do.",
    accent: false,
  },
  {
    number: "4",
    title: "Act",
    icon: "tune",
    description:
      "Fans, humidifiers, and ventilation respond automatically — or the farmer adjusts conditions easily. You remain in complete control.",
    accent: true,
  },
];

export default function ProcessStepsSection() {
  return (
    <section id="the-process" className="scroll-mt-24 py-16 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
            Continuous Intelligence
          </span>
          <h2 className="mt-2 font-headline-lg text-headline-lg tracking-tight text-primary">
            Step by Step: How It Keeps Every Room Healthy
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            No guesswork. No missed changes. Just consistent conditions monitored continuously day and night.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-7 shadow-xs transition-all duration-200 hover:shadow-md"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl font-headline font-bold text-lg ${
                      step.accent
                        ? "bg-secondary-container text-on-secondary"
                        : "bg-primary text-on-primary"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-[26px] ${
                      step.accent ? "text-secondary-container" : "text-primary"
                    }`}
                  >
                    <Icon name={step.icon} />
                  </span>
                </div>

                <h3 className="mb-3 font-headline-sm text-headline-sm font-bold text-primary">
                  {step.title}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 border-t border-surface-container-high/50 pt-4">
                <span className="font-label-sm text-label-sm font-semibold text-secondary">
                  {step.number === "1" && "24/7 Monitoring"}
                  {step.number === "2" && "Early Drift Flagging"}
                  {step.number === "3" && "Plain Phone Guidance"}
                  {step.number === "4" && "Farmer in Control"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

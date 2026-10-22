"use client";

import { motion } from "motion/react";
import Icon from "@/components/Icon";

const COMPARISON_ROWS = [
  {
    factor: "Thermal Insulation",
    pumice: "Excellent natural insulation — porous volcanic stone stops midday equatorial heat.",
    metal: "Poor — heats up quickly under the sun like an oven.",
  },
  {
    factor: "Temperature Stability",
    pumice: "Holds steady day and night within 1–2°C, preventing thermal shock to pinheads.",
    metal: "Large temperature fluctuations between hot afternoons and cold nights.",
  },
  {
    factor: "Humidity Retention",
    pumice: "Naturally absorbs and buffers moisture in the air to sustain 85–95% RH.",
    metal: "Moisture condenses against cold sheet metal and drains away as water runoff.",
  },
  {
    factor: "Energy & Electricity",
    pumice: "Low energy draw — runs easily on small solar systems without heavy AC chillers.",
    metal: "High electric bills from continuous fans and mechanical air conditioning.",
  },
  {
    factor: "Ventilation & Durability",
    pumice: "Easy to customize, pest resistant, rust-free, and simple to sanitize between flushes.",
    metal: "Prone to rust, hard to insulate airtight, and difficult to sanitize without leaks.",
  },
];

export default function GrowRoomSection() {
  return (
    <section id="grow-room" className="scroll-mt-24 py-16 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
            Natural Thermal Insulation
          </span>
          <h2 className="mt-2 font-headline-lg text-headline-lg tracking-tight text-primary">
            The Grow Room: Why Brick Beats Metal
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Our structure uses a volcanic pumice brick design rather than iron sheet metal.
            Mushrooms are sensitive to heat and dry air: pumice stone naturally stabilizes temperature and
            holds humidity so you don&apos;t have to rely on expensive commercial air conditioners.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="overflow-hidden rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest shadow-sm">
          {/* Header row on desktop */}
          <div className="hidden grid-cols-12 border-b border-surface-container-high bg-surface-container-low px-8 py-5 md:grid">
            <div className="col-span-3 font-headline-sm text-headline-sm text-primary">
              Factor
            </div>
            <div className="col-span-5 flex items-center gap-2 font-headline-sm text-headline-sm text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary text-[14px]">
                ✓
              </span>
              <span>Pumice Structure (SmartMushroom)</span>
            </div>
            <div className="col-span-4 flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface-variant">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant text-[14px]">
                ✕
              </span>
              <span>Metallic / Iron Structure</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-surface-container-high/60">
            {COMPARISON_ROWS.map((row, idx) => (
              <motion.div
                key={row.factor}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`grid grid-cols-1 gap-4 p-6 md:grid-cols-12 md:items-center md:gap-6 md:px-8 md:py-6 ${
                  idx % 2 === 1 ? "bg-surface-container-lowest" : "bg-surface-container-low/30"
                }`}
              >
                <div className="md:col-span-3">
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    {row.factor}
                  </span>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 md:col-span-5 md:border-0 md:bg-transparent md:p-0">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary md:hidden">
                    ✓ Pumice Structure
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Icon name="check_circle" className="text-[20px] text-primary shrink-0 mt-0.5" />
                    <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                      {row.pumice}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-surface-container-high bg-surface-container-low/50 p-4 md:col-span-4 md:border-0 md:bg-transparent md:p-0">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant md:hidden">
                    ✕ Metallic Structure
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Icon name="cancel" className="text-[20px] text-outline shrink-0 mt-0.5" />
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {row.metal}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trial Proof Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid grid-cols-1 items-center gap-6 rounded-3xl border border-surface-container-high/70 bg-surface-container-low p-6 md:grid-cols-3 md:p-8"
        >
          <div className="md:col-span-2">
            <span className="inline-block rounded-full bg-secondary-container/20 px-3 py-1 font-label-sm text-label-sm font-bold text-secondary mb-2">
              Proven Field Performance
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
              Afternoon Sun vs Inside Chamber
            </h3>
            <p className="mt-2 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              During field trials, outside ambient temperatures fluctuated from 14°C at dawn to 33.5°C in the afternoon sun.
              Inside our pumice grow room, temperature stayed steady within 1.2°C at 92% RH — completely safe from heat shock.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 border border-surface-container-high/70">
            <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
              <span className="text-xs text-on-surface-variant font-medium">Outside Peak</span>
              <span className="font-bold text-sm text-error">33.5°C (Extreme)</span>
            </div>
            <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
              <span className="text-xs text-on-surface-variant font-medium">Inside Chamber</span>
              <span className="font-bold text-sm text-primary">18.2°C (Protected)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Chamber Humidity</span>
              <span className="font-bold text-sm text-secondary-container">92% RH (Optimal)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

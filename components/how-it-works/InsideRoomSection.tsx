"use client";

import { motion } from "motion/react";
import Icon from "@/components/Icon";

const ROOM_PILLARS = [
  {
    icon: "sensors",
    title: "Sensors Across Grow Zones",
    description:
      "Placed at the ceiling, mid-canopy, and substrate bags to track temperature, humidity, CO₂, and air movement with zero blind spots.",
  },
  {
    icon: "air",
    title: "Ventilation & Fresh Air",
    description:
      "Filtered fresh air intakes and quiet exhaust fans safely evacuate heavy CO₂ buildup so mushrooms grow full, thick caps instead of thin stems.",
  },
  {
    icon: "water_drop",
    title: "Fine Fog Humidity Control",
    description:
      "Micro-mist nozzles deliver fine, cool fog that stays suspended in the air (85–95% RH) without soaking or rotting delicate mushroom pinheads.",
  },
  {
    icon: "grid_view",
    title: "Pumice Substrate Racks",
    description:
      "Multi-tier porous aggregate shelving engineered for optimal airflow circulation around every single substrate bag and easy harvesting.",
  },
];

export default function InsideRoomSection() {
  return (
    <section id="inside-room" className="scroll-mt-24 py-16 lg:py-24 bg-surface-container-low/40 border-y border-surface-container-high/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
            Uniform Growing Environment
          </span>
          <h2 className="mt-2 font-headline-lg text-headline-lg tracking-tight text-primary">
            Inside the Room: Everything in Balance
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            The room is fitted with sensors and climate-control equipment placed for even coverage —
            no cold spots, no dry corners, and no missed readings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROOM_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group flex flex-col rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-low text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <Icon name={pillar.icon} className="text-[28px]" />
              </div>
              <h3 className="mb-3 font-headline-sm text-headline-sm font-bold text-primary">
                {pillar.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why It Matters Callout Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 rounded-3xl bg-surface-container-lowest p-8 lg:p-10 border border-surface-container-high shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">
              Why It Matters
            </span>
            <h3 className="mt-1 font-headline-sm text-headline-sm font-bold text-primary">
              Good Architecture Does Half the Work First
            </h3>
            <p className="mt-2 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              A well-built room does half the work before any technology is even switched on.
              Ours is designed first for the mushrooms, then fitted with the sensors that keep it that way.
            </p>
          </div>
          <a
            href="#the-process"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-lg text-label-lg font-semibold text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container"
          >
            <span>See How the System Works</span>
            <Icon name="arrow_downward" className="text-[18px]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

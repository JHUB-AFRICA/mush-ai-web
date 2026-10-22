"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Icon from "@/components/Icon";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-16 lg:py-24 border-b border-surface-container-high/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <h1 className="mb-6 font-headline-xl text-headline-xl tracking-tight text-primary md:text-[54px] md:leading-[62px]">
            Built for the climate. Designed for consistency.
          </h1>

          <p className="mb-10 max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Our grow room pairs local volcanic pumice insulation with 24/7
            intelligent climate control — keeping temperature and humidity
            perfectly stable so farmers harvest reliable mushroom yields every
            cycle without expensive equipment.
          </p>

          {/* Quick-Jump Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#grow-room"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-label-lg text-label-lg font-semibold text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container hover:shadow-md"
            >
              <span>The Grow Room Structure</span>
              <Icon name="arrow_downward" className="text-[18px]" />
            </a>
            <a
              href="#the-process"
              className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest px-7 py-3.5 font-label-lg text-label-lg font-semibold text-primary shadow-xs transition-all duration-200 hover:bg-surface-container"
            >
              <span>The 4-Step Process</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
          </div>
        </motion.div>

        {/* Hero Feature Image with Real Grow Chamber */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-14 relative overflow-hidden rounded-3xl border border-surface-container-high shadow-xl bg-surface-container-lowest"
        >
          <div className="relative h-[300px] sm:h-[420px] md:h-[480px] w-full">
            <Image
              src="/images/farm-structure/grow-room.jpg"
              alt="Inside the SmartMushroom pumice grow room with tiered substrate bags and misting nozzles"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-secondary-container px-3 py-1 font-label-sm text-label-sm font-bold text-on-secondary mb-2">
                  Juja Demonstration Site #01
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-white">
                  Pumice Stone Envelope + Multi-Tier Climate Sensors
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  Maintains optimal cool pinning microclimate in hot equatorial
                  conditions with 74% less energy.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-surface-container-lowest/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
                <Icon
                  name="verified"
                  className="text-[28px] text-secondary-container"
                />
                <div className="text-left text-xs">
                  <p className="font-bold text-white uppercase tracking-wider">
                    Zero Heat Shock
                  </p>
                  <p className="text-white/80">Continuous 1.2°C Stability</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Icon from "@/components/ui/Icon";

export default function ResultMetricsSection() {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-surface-container-low p-8 md:p-14 border border-surface-container-high/80 text-center"
        >
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
            The Result: Dependable Harvests, Every Cycle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Fewer surprises, healthier crops, less time spent manually checking conditions,
            and mushrooms grown the same reliable way every single cycle.
          </p>

          {/* 3 Metric Pills */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-surface-container-lowest p-6 border border-surface-container-high/60 shadow-xs">
              <span className="font-headline-xl text-3xl md:text-4xl font-bold text-primary">
                -74%
              </span>
              <p className="mt-2 font-label-md text-label-md text-on-surface font-semibold">
                Lower Cooling Energy
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Natural pumice thermal insulation
              </p>
            </div>

            <div className="rounded-2xl bg-surface-container-lowest p-6 border border-surface-container-high/60 shadow-xs">
              <span className="font-headline-xl text-3xl md:text-4xl font-bold text-secondary-container">
                92%+
              </span>
              <p className="mt-2 font-label-md text-label-md text-on-surface font-semibold">
                Consistent Pinning RH
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Automated fine-fog misting
              </p>
            </div>

            <div className="rounded-2xl bg-surface-container-lowest p-6 border border-surface-container-high/60 shadow-xs">
              <span className="font-headline-xl text-3xl md:text-4xl font-bold text-primary">
                72 Hours
              </span>
              <p className="mt-2 font-label-md text-label-md text-on-surface font-semibold">
                Outage Autonomy
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Solar & battery emergency sync
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-lg text-label-lg font-bold text-on-primary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-container"
            >
              <span>Shop Mushroom Kits &amp; Spawn</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

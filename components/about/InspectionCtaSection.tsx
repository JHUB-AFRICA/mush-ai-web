"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Icon from "@/components/ui/Icon";

export default function InspectionCtaSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-12 text-on-primary shadow-xl"
        >
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-primary-container px-3 py-1 font-label-sm text-label-sm font-bold text-on-primary-container mb-3">
              Juja / JKUAT Agritech Hub
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">
              Ready to build or upgrade your mushroom farm?
            </h2>
            <p className="mt-3 font-body-lg text-body-lg text-on-primary/85 leading-relaxed">
              Whether you need a complete turnkey pumice grow room, smart sensor retrofit for your existing shed,
              or a site inspection from our team — we are ready to assist.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-3.5 font-label-lg text-label-lg font-bold text-on-secondary shadow-md transition-all duration-200 hover:bg-secondary hover:shadow-lg"
              >
                <span>Book a Demonstration Visit</span>
                <Icon name="event_available" className="text-[18px]" />
              </Link>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 font-label-lg text-label-lg font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                <Icon name="chat" className="text-[18px]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
          {/* Background design accents */}
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary-container/40 blur-3xl pointer-events-none" />
          <div className="absolute right-10 top-10 opacity-10 pointer-events-none">
            <Icon name="eco" className="text-[160px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

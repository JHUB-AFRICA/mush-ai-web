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
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-primary md:font-headline-lg md:text-headline-lg">
              Ready to build or upgrade your mushroom farm?
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-inverse-on-surface/90 leading-relaxed">
              Whether you need a complete turnkey pumice grow room, smart sensor retrofit for your existing shed,
              or a site inspection from our team — we are ready to assist.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-4 font-label-lg text-label-lg font-bold text-on-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary"
              >
                <span>Book a Demonstration Visit</span>
                <Icon name="event_available" className="text-[18px]" />
              </Link>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-label-lg text-label-lg font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
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

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  "Natural pumice grow rooms",
  "24/7 monitoring by Mush AI",
  "Zero-waste, closed-loop farming",
];

export default function HeroSection() {
  return (
    <section className="w-full bg-primary text-on-primary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:px-12">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-fixed-dim">
            <Sparkles size={14} />
            <span>About SmartMushroom</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl text-on-primary">
            Smarter mushroom farming, built for Kenya
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-on-primary/85 md:text-lg">
            We grow mushrooms in natural volcanic pumice rooms that keep the air cool and moist on their own, and
            Mush AI watches over every shelf day and night. Here is how it all fits together.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-on-primary/90">
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#structure"
              className="rounded-full bg-secondary-container px-6 py-3 font-semibold text-on-secondary shadow-md transition hover:bg-secondary"
            >
              See how it works
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/25 bg-surface/10 px-6 py-3 font-semibold text-on-primary backdrop-blur-sm transition hover:bg-surface/20"
            >
              Shop &amp; Services
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border-4 border-primary-fixed-dim/40 shadow-2xl">
          <Image
            src="/images/about/mushrooms-white.jpg"
            alt="White button mushrooms growing on compost beds"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const HIGHLIGHTS = [
  "Natural pumice grow rooms",
  "24/7 monitoring by Mush AI",
  "Zero-waste, closed-loop farming",
];

export default function HeroSection() {
  return (
    <section className="relative -mt-20 w-full overflow-hidden bg-primary pb-20 pt-28 text-on-primary md:pb-24 md:pt-36">
      {/* Background photo with dual green gradient overlay, matching Home Hero */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mushroom.jpg"
          alt="Mushroom farm background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/80 to-primary/45" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-primary/30" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:px-12">
        <div className="flex max-w-2xl flex-col items-start">
          <h1 className="mb-6 font-headline-xl-mobile text-headline-xl-mobile tracking-tight text-on-primary md:font-headline-xl md:text-headline-xl">
            Smarter mushroom farming, <span className="text-secondary-fixed">built for Kenya.</span>
          </h1>
          <p className="mb-8 max-w-xl font-body-lg text-body-lg leading-relaxed text-inverse-on-surface/90">
            We grow mushrooms in natural volcanic pumice rooms that keep the air cool and moist on their own, and
            Mush AI watches over every shelf day and night. Here is how it all fits together.
          </p>

          <ul className="mb-10 flex flex-wrap gap-2.5">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-label-md text-label-md text-on-primary/90 backdrop-blur-xs"
              >
                {h}
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
            <Link
              href="#structure"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-container px-8 py-4 font-label-lg text-label-lg font-bold text-on-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary"
            >
              <span>See how it works</span>
              <Icon name="arrow_downward" className="text-[18px]" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-on-primary/20 bg-white/10 px-8 py-4 font-label-lg text-label-lg font-semibold text-on-primary backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            >
              <span>Shop &amp; Services</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-primary-container/20 shadow-2xl backdrop-blur-xs">
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

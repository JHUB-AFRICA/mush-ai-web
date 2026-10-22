import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative w-full -mt-20 pt-28 pb-24 overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-primary/80" />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 md:pt-20">
        <div className="max-w-3xl flex flex-col items-start">
          <h1 className="text-headline-xl-mobile md:text-headline-xl text-on-primary tracking-tight mb-6">
            Smarter mushroom farming,{" "}
            <span className="text-secondary-fixed">powered by data.</span>
          </h1>
          <p className="text-body-lg text-inverse-on-surface/90 mb-10 max-w-2xl leading-relaxed">
            From grow room to your table — SmartMushroom combines sensor-monitored growing
            conditions with hands-on farming expertise to produce healthier button mushrooms,
            consistently.
          </p>
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-secondary-container hover:bg-secondary text-on-secondary text-label-lg px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-surface/10 hover:bg-surface/20 text-on-primary text-label-lg px-8 py-4 rounded-full backdrop-blur-md transition-all duration-200 border border-on-primary/10"
            >
              <Icon name="login" className="text-[18px]" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

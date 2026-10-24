import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  return (
    <section className="relative -mt-20 w-full overflow-hidden bg-primary pb-24 pt-28 text-on-primary">
      {/* Background photo, sitting behind the green overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mushroom.jpg"
          alt="Racks of button mushrooms growing inside a grow room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Green tint: strong on the left for text contrast, lighter on the right so the mushrooms show */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/75 to-primary/40" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-primary/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:pt-20 lg:px-12">
        <div className="flex max-w-3xl flex-col items-start">
          <h1 className="mb-6 font-headline-xl-mobile text-headline-xl-mobile tracking-tight text-on-primary md:font-headline-xl md:text-headline-xl">
            Smarter mushroom farming, <span className="text-secondary-fixed">powered by data.</span>
          </h1>
          <p className="mb-10 max-w-2xl font-body-lg text-body-lg leading-relaxed text-inverse-on-surface/90">
            From grow room to your table — SmartMushroom combines sensor-monitored growing conditions with hands-on farming expertise to produce healthier button mushrooms, consistently.
          </p>
          <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-container px-8 py-4 font-label-lg text-label-lg text-on-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary">
              Shop Now <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-on-primary/10 bg-surface/10 px-8 py-4 font-label-lg text-label-lg text-on-primary backdrop-blur-md transition-all duration-200 hover:bg-surface/20">
              <Icon name="login" className="text-[18px]" /> Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

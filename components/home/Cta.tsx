import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-16 text-on-primary">
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:px-12">
        <div className="max-w-2xl">
          <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-primary md:font-headline-lg md:text-headline-lg">
            Ready to Grow Smarter?
          </h2>
          <p className="font-body-lg text-body-lg text-inverse-on-surface/80">
            Whether you&apos;re looking to buy fresh mushrooms, start your own grow kit, or partner with us — we&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/shop" className="rounded-full bg-secondary-container px-8 py-4 font-label-lg text-label-lg text-on-secondary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary">
            Explore the Shop
          </Link>
          <Link href="/contact" className="rounded-full border border-on-primary/10 bg-surface/10 px-8 py-4 font-label-lg text-label-lg text-on-primary backdrop-blur-md transition-all hover:bg-surface/20">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

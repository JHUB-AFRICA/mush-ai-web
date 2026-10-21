import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="w-full py-16 bg-primary text-on-primary relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-primary tracking-tight mb-4">
            Ready to Grow Smarter?
          </h2>
          <p className="text-body-lg text-inverse-on-surface/80">
            Whether you&apos;re looking to buy fresh mushrooms, start your own grow kit, or partner
            with us — we&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#"
            className="bg-secondary-container hover:bg-secondary text-on-secondary text-label-lg px-8 py-4 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
          >
            Explore the Shop
          </Link>
          <Link
            href="#"
            className="bg-surface/10 hover:bg-surface/20 text-on-primary text-label-lg px-8 py-4 rounded-full backdrop-blur-md transition-all border border-on-primary/10"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

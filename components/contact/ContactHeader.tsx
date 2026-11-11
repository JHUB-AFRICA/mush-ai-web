import { Sparkles } from "lucide-react";

export default function ContactHeader() {
  return (
    <section className="px-6 py-16 text-center md:py-20">
      <div className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-fixed-dim">
      </div>

      <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
        Have a question about our products, orders, or mushroom farming
        solutions? We&apos;re happy to help.
      </p>
    </section>
  );
}


import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function ShopHeader() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl">
        <h1 className="font-headline-xl mt-1 text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Shop &amp; Services
        </h1>
        <p className="mt-3 text-sm text-on-surface-variant sm:text-base lg:text-lg leading-relaxed max-w-3xl">
          Everything you need to grow, learn and succeed with button mushrooms —
          fresh harvests, laboratory-certified spawn, modular pumice
          infrastructure, and hands-on agronomy masterclasses.
        </p>

        {/* In-page navigation between Mushroom Sales and Services */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#mushroom-sales"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-4 py-2 text-xs font-bold shadow-xs hover:bg-primary-container transition-all"
          >
            <Icon name="spa" className="text-[14px]" />
            Mushroom Sales
          </a>
          <a
            href="#services-we-offer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface px-4 py-2 text-xs font-bold shadow-xs hover:border-primary hover:text-primary transition-all"
          >
            <Icon
              name="construction"
              className="text-[14px] text-secondary-container"
            />
            Services We Offer
          </a>
        </div>
      </div>
    </section>
  );
}

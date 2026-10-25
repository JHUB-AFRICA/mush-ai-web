import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function ShopHeader() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl">
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

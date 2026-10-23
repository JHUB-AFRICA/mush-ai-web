import Icon from "@/components/Icon";

export default function ShopHeader() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl">
        <h1 className="font-headline-xl text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Everything you need to grow, learn and enjoy button mushrooms.
        </h1>
        <p className="mt-3 text-sm text-on-surface-variant sm:text-base lg:text-lg leading-relaxed max-w-3xl">
          Grow kits, strains, fresh mushrooms, by-products and training, all available for local pickup.
        </p>
      </div>

      {/* Trust pill row (combining agronomic data & pickup assurance) */}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
        <div className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest px-3.5 py-1.5 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-on-surface">Juja &amp; Westlands Stations</span>
          <span className="text-on-surface-variant/70">Pick-up Active</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest px-3.5 py-1.5 shadow-xs">
          <Icon name="ac_unit" className="text-[14px] text-primary" />
          <span className="font-semibold text-on-surface">Cold Room 4.2°C</span>
          <span className="text-on-surface-variant/70">Bio-viability Guaranteed</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest px-3.5 py-1.5 shadow-xs">
          <Icon name="verified" className="text-[14px] text-secondary-container" />
          <span className="font-semibold text-on-surface">JKUAT Endorsed Strains</span>
        </div>
      </div>
    </section>
  );
}

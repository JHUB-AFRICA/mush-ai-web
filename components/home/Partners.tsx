import Icon from "@/components/ui/Icon";

const PARTNERS = [
  { icon: "hub", name: "JHUB Africa" },
  { icon: "school", name: "JKUAT Research" },
  { icon: "psychiatry", name: "KALRO" },
  { icon: "public", name: "MoA • Kilimo Kenya" },
];

// One "set" of logos, repeated so it is always wider than the viewport.
function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {[...PARTNERS, ...PARTNERS].map((p, i) => (
        <li key={i} className="flex items-center gap-2 whitespace-nowrap text-on-surface">
          <Icon name={p.icon} className="text-primary-container" />
          <span className="font-headline-sm text-headline-sm font-bold tracking-tight">{p.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section className="w-full bg-surface-container-low py-8 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row lg:px-12">
        {/* Static label: does not scroll */}
        <div className="flex shrink-0 items-center gap-3">
          <Icon name="verified" className="text-[24px] text-primary" />
          <span className="font-label-lg text-label-lg font-semibold text-on-surface">
            Supported by National Innovation Ecosystems:
          </span>
        </div>

        {/* Scrolling partners (pauses on hover, static if reduced motion is on) */}
        <div
          className="relative w-full min-w-0 flex-1 overflow-hidden opacity-85 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            <PartnerSet />
            <PartnerSet hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

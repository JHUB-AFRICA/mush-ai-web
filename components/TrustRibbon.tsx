import { Icon } from "@/components/ui/Icon";
import { partners } from "@/lib/content";

function PartnerList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 lg:gap-12 pr-8 lg:pr-12"
    >
      {partners.map((p) => (
        <li key={p.name} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-on-surface">
          <Icon name={p.icon} className="text-primary-container" />
          <span className="font-headline text-headline-sm font-bold tracking-tight">{p.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustRibbon() {
  return (
    <section className="w-full bg-surface-container-low py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Stationary label */}
        <div className="flex shrink-0 items-center gap-3">
          <Icon name="verified" className="text-primary text-[24px]" />
          <span className="text-label-lg text-on-surface font-semibold">
            Supported by National Innovation Ecosystems:
          </span>
        </div>

        {/* Moving carousel: the list is rendered twice so the loop is seamless */}
        <div
          className="relative w-full min-w-0 flex-1 overflow-hidden opacity-85 motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            <PartnerList />
            <PartnerList hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

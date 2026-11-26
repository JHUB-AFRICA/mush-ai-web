import Image from "next/image";

/*
  Partners strip: a static section header, logos scrolling in an editorial continuous track.
  Each logo is rendered inside a uniform standardized frame with crisp aspect-fit display.
*/
const PARTNERS = [
  { name: "JKUAT", src: "/partners/jkuat.png" },
  { name: "Mush&", src: "/partners/mush.png" },
  { name: "KOICA", src: "/partners/koica.png" },
  { name: "JHUB Africa", src: "/partners/jhub.png" },
  { name: "European Union (EU)", src: "/partners/eu.png" },
  { name: "BRIDGE-AI", src: "/partners/bridge-ai.png" },
  { name: "gDIH", src: "/partners/gdih.png" },
  { name: "Gates Foundation", src: "/partners/gates.png" },
];

function PartnerList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-4 pr-4"
    >
      {PARTNERS.map((p) => (
        <li
          key={p.name}
          className="flex h-16 shrink-0 items-center gap-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-2 shadow-xs transition-colors hover:border-primary/30"
        >
          <div className="relative flex h-10 w-28 shrink-0 items-center justify-center">
            <Image
              src={p.src}
              alt={hidden ? "" : `${p.name} logo`}
              width={200}
              height={100}
              quality={95}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="whitespace-nowrap font-label-md text-label-md font-semibold text-on-surface">
            {p.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section aria-label="Our partners" className="w-full bg-surface py-12 md:py-16">
      {/* Title: aligned with the other section titles */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
          Our Partners &amp; Supporters
        </h2>
      </div>

      {/* Full-width marquee */}
      <div className="partners-marquee relative mt-8 w-full overflow-hidden border-y border-outline-variant/40 bg-surface py-5">
        <div className="partners-track flex w-max">
          <PartnerList />
          <PartnerList hidden />
          <PartnerList hidden />
          <PartnerList hidden />
        </div>
      </div>

      <style>{`
        .partners-track { animation: partners-scroll 55s linear infinite; }
        .partners-track:hover { animation-play-state: paused; }
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track { animation: none; }
          .partners-marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}


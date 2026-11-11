import Image from "next/image";
import { Handshake } from "lucide-react";

/*
  Partners strip: a static label on the left, logos scrolling on the right.
  Logo files live in /public/partners. To add a partner, drop a PNG there and
  add one line to PARTNERS (w = display width in px; height follows the image).
*/
const PARTNERS = [
  { name: "JKUAT", src: "/partners/jkuat.png", w: 44, h: 38 },
  { name: "Mush&", src: "/partners/mush.png", w: 100, h: 19 },
  { name: "KOICA", src: "/partners/koica.png", w: 84, h: 37 },
  { name: "gDIH", src: "/partners/gdih.png", w: 88, h: 35 },
  { name: "JHUB Africa", src: "/partners/jhub.png", w: 76, h: 31 },
  { name: "European Union (EU)", src: "/partners/eu.png", w: 96, h: 18 },
  { name: "BRIDGE-AI", src: "/partners/bridge-ai.png", w: 52, h: 38 },
  { name: "Gates Foundation", src: "/partners/gates.png", w: 38, h: 37 },
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
          className="flex shrink-0 items-center gap-3 rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-2.5 shadow-xs"
        >
          <Image
            src={p.src}
            alt={hidden ? "" : `${p.name} logo`}
            width={p.w * 2}
            height={p.h * 2}
            style={{ width: p.w, height: "auto" }}
            className="shrink-0"
          />
          <span className="whitespace-nowrap text-[13px] font-semibold text-on-surface">
            {p.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section aria-label="Our partners" className="w-full bg-surface py-12 md:py-14">
      {/* Title: aligned with the other section titles */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
          Our Partners &amp; Supporters
        </h2>
      </div>

      {/* Full-width marquee: runs from one edge of the page to the other */}
      <div className="partners-marquee relative mt-6 w-full overflow-hidden border-y border-surface-container-high bg-surface py-5">
        <div className="partners-track flex w-max">
          <PartnerList />
          <PartnerList hidden />
          <PartnerList hidden />
          <PartnerList hidden />
        </div>
      </div>

      <style>{`
        .partners-track { animation: partners-scroll 60s linear infinite; }
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

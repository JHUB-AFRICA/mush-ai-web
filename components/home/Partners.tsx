import Image from "next/image";

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
  { name: "Bill & Melinda Gates Foundation", src: "/partners/gates.png", w: 40, h: 36 },
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
          className="flex shrink-0 items-center gap-3 rounded-xl border border-[#f1dfd8] bg-white px-4 py-2.5"
        >
          <Image
            src={p.src}
            alt={hidden ? "" : `${p.name} logo`}
            width={p.w * 2}
            height={p.h * 2}
            style={{ width: p.w, height: "auto" }}
            className="shrink-0"
          />
          <span className="whitespace-nowrap text-[13px] font-semibold text-[#231916]">
            {p.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section aria-label="Our partners" className="bg-surface px-4 py-10 md:px-8">
      {/* Pill-shaped frame: rounded ends, thin grey outline */}
      <div className="mx-auto flex max-w-6xl items-stretch overflow-hidden rounded-full border-2 border-[#231916]/35 bg-[#fff8f6]">
        {/* Static label (left end): does not move */}
        <div className="flex w-36 shrink-0 items-center bg-[#fff0ec] py-4 pl-7 pr-3 sm:w-56 sm:pl-10 sm:pr-5 md:w-64">
          <p className="text-xs font-semibold leading-snug text-[#231916] sm:text-sm">
            Our partners &amp; supporters
          </p>
        </div>

        {/* Moving logos */}
        <div className="partners-mask relative min-w-0 flex-1 self-center overflow-hidden py-4">
          <div className="partners-track flex w-max">
            <PartnerList />
            <PartnerList hidden />
          </div>
        </div>
      </div>

      <style>{`
        .partners-track { animation: partners-scroll 40s linear infinite; }
        .partners-track:hover { animation-play-state: paused; }
        .partners-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track { animation: none; }
          .partners-mask { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}

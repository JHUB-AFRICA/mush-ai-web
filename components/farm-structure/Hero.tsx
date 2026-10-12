import Image from "next/image";
import { ArrowDown } from "lucide-react";

const stats = [
  {
    label: "Thermal insulation",
    value: "R-18 Pumice",
    note: "Zero AC Compressor Load",
  },
  {
    label: "Batch capacity",
    value: "1,200 Substrate Bags",
    note: "4 Tiers, High-Density",
  },
  {
    label: "Air quality factor",
    value: "99.97% HEPA",
    note: "Positive Pressure Airflow",
  },
  {
    label: "Energy footprint",
    value: "48V Solar Hybrid",
    note: "< 380W Average Draw",
  },
];

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="rounded-full bg-forest px-3 py-1 font-semibold text-white">
          Pumice Pioneer–Thermal Shield
        </span>
        <span className="text-muted">
          Patent-pending IKUAT &amp; JHUB Agritech Architecture
        </span>
      </div>

      <div className="mb-6 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Engineered for East African Climates: Our Smart Grow Room
            Architecture
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A high-performance thermal envelope crafted from local volcanic
            pumice and interlocking masonry, engineered to maintain cool, humid
            mushroom pinning without expensive AC units.
          </p>
        </div>

        <div className="w-full max-w-[220px] rounded-2xl border border-line bg-card p-4 md:justify-self-end">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Thermal shift reduction
          </p>
          <p className="mt-1 text-lg font-extrabold">12.4°C Buffer</p>
          <a
            href="#blueprint"
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            Explore Blueprint
            <ArrowDown size={13} />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-forest">
        <div className="relative h-[280px] sm:h-[360px] md:h-[420px]">
          {/* Will add photo later /public/images/grow-room.jpg */}
          <Image
            src="/images/grow-room.jpg"
            alt="Mushroom grow chamber with tiered substrate bags inside a pumice masonry room"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          Active Grow Chamber #04 · 92% Pinning RH · 18.2°C Ambient
        </div>
      </div>

      <dl className="relative -mt-10 mx-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lg shadow-black/5 sm:mx-6 md:grid-cols-4">
        {stats.map(({ label, value, note }) => (
          <div key={label} className="bg-white/95 p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-bold">{value}</dd>
            <dd className="text-[11px] text-muted">{note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

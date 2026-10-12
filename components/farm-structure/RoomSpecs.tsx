import {
  Boxes,
  Droplets,
  Fan,
  Layers,
  PanelTop,
  type LucideIcon,
} from "lucide-react";
import Eyebrow from "@/components/ui/EyeBrow";

type Spec = { icon: LucideIcon; title: string; body: string };

const specs: Spec[] = [
  {
    icon: Layers,
    title: "Double-Leaf Volcanic Pumice Walls",
    body: "Interlocking R-18 pumice aggregate units provide a natural insulation barrier against daytime equatorial solar radiance without active mechanical chillers.",
  },
  {
    icon: Boxes,
    title: "Modular Envelope (30ft x 20ft x 11ft)",
    body: "Standard commercial footprint expandable in parallel modules. Holds 1,200 substrate bags across 4 vertical tiers with optimized cubic picking geometry.",
  },
  {
    icon: Droplets,
    title: "Sloped Bio-Secure Concrete Floor",
    body: "Epoxy-sealed slope (1:50 fall) running into a central drain sump. Allows high-pressure washdowns and steam sanitation on flush turns.",
  },
  {
    icon: PanelTop,
    title: "Sandwich EPS Ceiling & Overhead Ducting",
    body: "100mm high-density expanded polystyrene thermal panels with integrated anti-water vapor barrier preventing spore contamination and mold traps.",
  },
  {
    icon: Fan,
    title: "Controlled HEPA Intake & Solar Fans",
    body: "Multi-stage micro-louver with F7 pre-filter and H13 HEPA mesh, coupled with variable DC extraction fans to evacuate heavier-than-air CO2 pockets.",
  },
];

/* Simple front-elevation drawing of the chamber */
function CrossSection() {
  const tiers = [90, 125, 160, 195];
  const racks = [
    { x: 110, label: "left" },
    { x: 410, label: "right" },
  ];

  return (
    <svg
      viewBox="0 0 600 270"
      role="img"
      aria-label="Cross-section of the 30ft by 20ft chamber showing pumice walls, EPS ceiling, two four-tier racks and a central aisle"
      className="h-auto w-full"
    >
      <text x="300" y="14" textAnchor="middle" fontSize="9" fill="#6f625b">
        100mm EPS Sandwich Panel Ceiling with Vapor Barrier
      </text>
      <rect x="40" y="20" width="520" height="12" rx="2" fill="#0e3a2a" />

      <rect x="40" y="32" width="18" height="206" fill="#e9b8a0" />
      <rect x="542" y="32" width="18" height="206" fill="#e9b8a0" />
      <text
        x="26"
        y="135"
        fontSize="8"
        fill="#6f625b"
        transform="rotate(-90 26 135)"
        textAnchor="middle"
      >
        Pumice Cavity R-18
      </text>
      <text
        x="576"
        y="135"
        fontSize="8"
        fill="#6f625b"
        transform="rotate(90 576 135)"
        textAnchor="middle"
      >
        Airflow Return
      </text>

      {racks.map(({ x, label }) => (
        <g key={label}>
          <rect x={x} y="75" width="5" height="150" fill="#7a4a2b" />
          <rect x={x + 75} y="75" width="5" height="150" fill="#7a4a2b" />
          {tiers.map((y) => (
            <g key={y}>
              <rect x={x} y={y} width="80" height="5" fill="#7a4a2b" />
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={x + 8 + i * 17}
                  y={y - 22}
                  width="13"
                  height="22"
                  rx="3"
                  fill="#fdf1ea"
                  stroke="#d9a48a"
                />
              ))}
            </g>
          ))}
        </g>
      ))}

      <line
        x1="215"
        y1="150"
        x2="385"
        y2="150"
        stroke="#f26a1b"
        strokeDasharray="4 3"
      />
      <path d="M215 146v8M385 146v8" stroke="#f26a1b" />
      <text
        x="300"
        y="142"
        textAnchor="middle"
        fontSize="9"
        fill="#1f1a17"
        fontWeight="600"
      >
        1.4m Ergonomic Aisle
      </text>

      <rect x="40" y="238" width="520" height="10" fill="#5b5550" />
      <text x="300" y="264" textAnchor="middle" fontSize="8" fill="#6f625b">
        Sloped Bio-Secure Concrete Floor
      </text>
    </svg>
  );
}

export default function RoomSpecs() {
  return (
    <section id="blueprint" className="scroll-mt-20 bg-card/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 grid items-end gap-4 md:grid-cols-2">
          <div>
            <Eyebrow>Bio-engineered infrastructure</Eyebrow>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              The Room Design &amp; Engineering Specifications
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted md:max-w-sm md:justify-self-end">
            Built using East African volcanic aggregate masonry for unmatched
            thermal mass, coupled with hygienic clean-room seals.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <figure className="rounded-2xl border border-line bg-white/60 p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Architectural elevation
                </p>
                <h3 className="text-sm font-bold">
                  30ft x 20ft Turnkey Chamber Cross-Section
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold text-muted">
                Scale: 1:50 Metric
              </span>
            </div>

            <div className="rounded-xl bg-card p-3">
              <CrossSection />
            </div>

            <figcaption className="mt-4 grid grid-cols-1 gap-1 text-[11px] text-muted sm:grid-cols-3">
              <span>
                External Footprint: 600 sq ft (55.7 sqm)
                <br />
                1,200 Substrate Capacity
              </span>
              <span className="sm:col-start-3 sm:text-right">
                Total Cubic Volume: 6,600 cu ft
              </span>
            </figcaption>
          </figure>

          <ul className="space-y-3">
            {specs.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-3 rounded-2xl border border-line bg-white/60 p-4"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-ember">
                  <Icon size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

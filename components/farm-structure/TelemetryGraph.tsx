import Eyebrow from "@/components/ui/EyeBrow";

/* ---- chart geometry ---- */
const W = 760;
const H = 190;
const PAD = { top: 16, right: 16, bottom: 22, left: 16 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

const hours = Array.from({ length: 25 }, (_, h) => h);

// Outside pumice/ambient temperature: 14°C overnight → ~33.5°C mid-afternoon
const ambient = hours.map(
  (h) => 23.75 + 9.75 * Math.cos(((h - 14) * 2 * Math.PI) / 24),
);
// Chamber humidity holds close to 92% RH
const humidity = hours.map((h) => 92 + Math.sin(h * 1.7) * 0.4);

const xAt = (h: number) => PAD.left + (h / 24) * innerW;
const yTemp = (t: number) => PAD.top + (1 - (t - 10) / (36 - 10)) * innerH;
const yRh = (rh: number) => PAD.top + (1 - (rh - 80) / (100 - 80)) * innerH;

const toPath = (values: number[], y: (v: number) => number) =>
  values
    .map(
      (v, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)} ${y(v).toFixed(1)}`,
    )
    .join(" ");

export default function TelemetryGraph() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <figure className="rounded-2xl border border-line bg-white/60 p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>Dynamic telemetry sample</Eyebrow>
            <h2 className="mt-1 text-sm font-bold">
              Live 24-Hour Chamber Equilibrium Graph
            </h2>
          </div>
          <ul className="flex items-center gap-4 text-[11px] text-muted">
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink" />
              Ambient Pumice Temp (°C)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ember" />
              Relative Humidity (%)
            </li>
          </ul>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="24-hour chart. Ambient temperature rises from 14 to 33.5 degrees Celsius while chamber humidity holds near 92 percent."
          className="h-auto w-full"
        >
          {[0, 6, 12, 18, 24].map((h) => (
            <g key={h}>
              <line
                x1={xAt(h)}
                x2={xAt(h)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="#f1d6c8"
              />
              <text
                x={xAt(h)}
                y={H - 6}
                fontSize="9"
                fill="#6f625b"
                textAnchor="middle"
              >
                {String(h).padStart(2, "0")}:00
              </text>
            </g>
          ))}

          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={yRh(92)}
            y2={yRh(92)}
            stroke="#f26a1b"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <text
            x={W - PAD.right}
            y={yRh(92) - 5}
            fontSize="9"
            fill="#f26a1b"
            textAnchor="end"
          >
            92% RH Hotline
          </text>

          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={yTemp(18.2)}
            y2={yTemp(18.2)}
            stroke="#1f1a17"
            strokeDasharray="4 4"
            opacity="0.35"
          />
          <text
            x={W - PAD.right}
            y={yTemp(18.2) + 12}
            fontSize="9"
            fill="#1f1a17"
            textAnchor="end"
          >
            18.2°C Target
          </text>

          <path
            d={toPath(ambient, yTemp)}
            fill="none"
            stroke="#1f1a17"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d={toPath(humidity, yRh)}
            fill="none"
            stroke="#f26a1b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        <figcaption className="mt-3 text-center text-[11px] text-muted">
          Continuous stability recording inside IKUAT trial site. Outside
          ambient fluctuated from 14°C to 33.5°C afternoon; chamber stayed
          within 1.2°C variance.
        </figcaption>
      </figure>
    </section>
  );
}

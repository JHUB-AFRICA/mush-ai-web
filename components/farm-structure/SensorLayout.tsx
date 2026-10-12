import {
  ArrowUpToLine,
  Cloud,
  Cpu,
  Gauge,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Eyebrow from "@/components/ui/EyeBrow";

type Sensor = {
  icon: LucideIcon;
  zone?: string;
  title: string;
  body: string;
  specLabel: string;
  specValue: string;
};

const sensors: Sensor[] = [
  {
    icon: ArrowUpToLine,
    title: "Top Tier Sensor Node",
    body: "Suspended 20cm below the EPS ceiling to detect warm-air stratification, convective heat build-up, and condensation vapor pressure that could stress mushrooms.",
    specLabel: "Metric Range",
    specValue: "12°C – 35°C / 0–100% RH",
  },
  {
    icon: Gauge,
    title: "Canopy Mid-Level Sensor Node",
    body: "Mounted directly at tier 2 and 3 fruit height. Continuously captures mushroom primordia pinhead microclimate, calculating real-time vapor pressure deficits (VPD).",
    specLabel: "CO2 Sensitivity",
    specValue: "NDIR Optical (±30 ppm)",
  },
  {
    icon: MapPin,
    title: "Substrate Probe Sensors",
    body: "Food-grade 316 stainless steel needle probes inserted deep into compost bags to monitor mycelial heat spikes and moisture decay across flushing flushes.",
    specLabel: "Penetration Depth",
    specValue: "180mm Core Probe",
  },
  {
    icon: Cloud,
    title: "Automated Ultrasonic Mist Nozzles",
    body: "Arranged along the central ceiling spine with anti-drip check valves. Generates dry fog droplets (< 10 microns) that stay suspended without wetting mushroom caps.",
    specLabel: "Atomization Rate",
    specValue: "6.5 L/hr Piezoelectric",
  },
];

const hubSpecs = [
  { label: "Enclosure", value: "IP67 Rated" },
  { label: "Cellular", value: "4G LTE / GSM" },
  { label: "Backup Power", value: "72h LiFePO4" },
  { label: "Actuation", value: "Relay x 8 CH" },
];

function SensorCard({ icon: Icon, title, body, specLabel, specValue }: Sensor) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-5">
      <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ember">
        <Icon size={15} />
      </span>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{body}</p>
      <p className="mt-4 border-t border-line pt-3 text-[11px] text-muted">
        <span className="font-semibold text-ink">{specLabel}:</span> {specValue}
      </p>
    </article>
  );
}

export default function SensorLayout() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Eyebrow>Precision telemetry architecture</Eyebrow>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
        Sensor &amp; Component Placement Visual Layout
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Uniform climate cannot be achieved with single-point room sensors. Our
        multi-strata IoT layout continuously calculates thermal inversion, vapor
        saturation, and mycelial metabolic activity.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {sensors.slice(0, 3).map((s) => (
          <SensorCard key={s.title} {...s} />
        ))}
        <SensorCard {...sensors[3]} />

        <article className="relative rounded-2xl bg-forest p-5 text-white md:col-span-2">
          <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold">
            Edge-Computing Brain
          </span>
          <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
            <Cpu size={15} />
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            Central master controller
          </p>
          <h3 className="mt-1 text-base font-bold">
            IP67 Edge Hub with Cellular Telemetry
          </h3>
          <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-white/75">
            Equipped with a sunlight-readable e-Paper display, robust GSM/4G SIM
            for instant cloud sync to our farmer dashboard, and internal LiFePO4
            batteries providing 72 hours of autonomy during power outages.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4 sm:grid-cols-4">
            {hubSpecs.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[10px] text-white/55">{label}</dt>
                <dd className="text-xs font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}

import Image from "next/image";

// Icons live in /public/images/monitor
const ITEMS = [
  { icon: "/images/monitor/temperature.png", title: "Temperature", text: "Maintained between 18°C–22°C to ensure steady mycelial vegetative colonization." },
  { icon: "/images/monitor/humidity.png", title: "Humidity", text: "85%–92% RH micro-misting prevents pinhead cap drying without blotch." },
  { icon: "/images/monitor/co2.png", title: "CO₂ levels", text: "Automated damper control keeping carbon dioxide under 1,200 ppm for thick caps." },
  { icon: "/images/monitor/light.png", title: "Light", text: "Safeguards against light exposure to preserve pure white button pigmentation." },
  { icon: "/images/monitor/moisture.png", title: "Moisture", text: "Substrate capacitive monitoring ensuring balanced 65%–70% casing hydration." },
];

export default function Monitor() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-container-highest px-3 py-1 font-label-sm text-label-sm font-bold uppercase text-primary">
              Precision Telemetry
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
              What We Monitor
            </h2>
          </div>
          <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
            Continuous environmental supervision engineered specifically for sensitive button mushroom varieties.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((i) => (
            <div key={i.title} className="flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container">
                <Image src={i.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </div>
              <h3 className="mb-2 font-headline-sm text-headline-sm text-on-surface">{i.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

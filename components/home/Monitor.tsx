const ITEMS = [
  { emoji: "🌡️", title: "Temperature", text: "Maintained between 18°C–22°C to ensure steady mycelial vegetative colonization.", tone: "text-secondary" },
  { emoji: "💧", title: "Humidity", text: "85%–92% RH micro-misting prevents pinhead cap drying without blotch.", tone: "text-primary" },
  { emoji: "🫧", title: "CO₂ levels", text: "Automated damper control keeping carbon dioxide under 1,200 ppm for thick caps.", tone: "text-secondary" },
  { emoji: "💡", title: "Light", text: "Safeguards against light exposure to preserve pure white button pigmentation.", tone: "text-primary" },
  { emoji: "🌱", title: "Moisture", text: "Substrate capacitive monitoring ensuring balanced 65%–70% casing hydration.", tone: "text-secondary" },
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
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container ${i.tone}`}>
                <span className="text-[24px]" aria-hidden="true">{i.emoji}</span>
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

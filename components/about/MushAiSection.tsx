import Icon from "@/components/ui/Icon";

const FLOW = [
  { icon: "sensors", title: "Sensor data", text: "Collects temperature, humidity and CO₂." },
  { icon: "psychology", title: "AI analysis", text: "Compares readings to what your strain needs." },
  { icon: "notifications_active", title: "Farmer alerts", text: "Sends alerts and simple tips to your phone." },
  { icon: "query_stats", title: "Learning loop", text: "Uses past harvests to give better advice." },
];

const WATCHES = [
  {
    icon: "thermostat",
    title: "Temperature",
    text: "Checks the room and substrate against the right range for each growth stage.",
  },
  {
    icon: "water_drop",
    title: "Humidity",
    text: "Spots dry or damp spells that cause contamination or poorly formed mushrooms.",
  },
  {
    icon: "co2",
    title: "CO₂",
    text: "Tracks air quality, which matters for healthy growth and yield quality.",
  },
];

export default function MushAiSection() {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-20 text-on-primary md:py-28">
      {/* Ambient lighting accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary-container/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-primary md:font-headline-lg md:text-headline-lg">
            Your farm&apos;s eyes, <span className="text-secondary-fixed">day and night</span>
          </h2>
          <p className="mt-4 font-body-lg text-body-lg text-inverse-on-surface/90 leading-relaxed">
            Mush AI is a smart advisor built for mushroom farmers. It combines sensor data with verified growing
            knowledge, and you can ask it questions in plain language from your phone.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((f, i) => (
            <li
              key={f.title}
              className="relative rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs shadow-xs"
            >
              <span className="text-xs font-bold text-secondary-fixed">0{i + 1}</span>
              <span className="mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-xs">
                <Icon name={f.icon} className="text-[24px]" />
              </span>
              <h3 className="mt-4 font-headline text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-inverse-on-surface/80">{f.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 text-center font-headline-md text-headline-md font-bold text-white">
          What it keeps an eye on
        </h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {WATCHES.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xs"
            >
              <Icon name={w.icon} className="text-[32px] text-secondary-fixed" />
              <h4 className="mt-4 font-headline text-lg font-semibold text-white">{w.title}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-inverse-on-surface/80">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

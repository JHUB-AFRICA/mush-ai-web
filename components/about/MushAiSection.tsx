import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

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
    <section className="w-full bg-[#002e20] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#a7d1ae]">Meet Mush AI</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your farm&apos;s eyes, day and night</h2>
          <p className="mt-4 text-base leading-7 text-white/85 md:text-lg">
            Mush AI is a smart advisor built for mushroom farmers. It combines sensor data with verified growing
            knowledge, and you can ask it questions in plain language from your phone.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {FLOW.map((f, i) => (
            <li key={f.title} className="relative rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
              <span className="text-xs font-bold text-[#a7d1ae]">0{i + 1}</span>
              <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#00a94e] text-white">
                <Icon name={f.icon} className="text-[22px]" />
              </span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/75">{f.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 text-center text-xl font-bold">What it keeps an eye on</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {WATCHES.map((w) => (
            <div key={w.title} className="rounded-2xl border border-white/20 p-6">
              <Icon name={w.icon} className="text-[28px] text-[#a7d1ae]" />
              <h4 className="mt-3 font-semibold">{w.title}</h4>
              <p className="mt-1 text-sm leading-6 text-white/75">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

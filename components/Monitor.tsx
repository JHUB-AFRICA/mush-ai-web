import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metrics } from "@/lib/content";

export function Monitor() {
  return (
    <section className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Pill className="mb-3">Precision Telemetry</Pill>
            <SectionHeading>What We Monitor</SectionHeading>
          </div>
          <p className="text-body-md text-on-surface-variant max-w-md">
            Continuous environmental supervision engineered specifically for sensitive button
            mushroom varieties.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((m) => (
            <li
              key={m.title}
              className="bg-surface-container-lowest rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-4 ${
                  m.tone === "secondary" ? "text-secondary" : "text-primary"
                }`}
              >
                <span className="text-[24px]" aria-hidden="true">
                  {m.emoji}
                </span>
              </div>
              <h3 className="text-headline-sm text-on-surface mb-2">{m.title}</h3>
              <p className="text-body-sm text-on-surface-variant">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

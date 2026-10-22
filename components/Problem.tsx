import { SectionHeading } from "@/components/ui/SectionHeading";

export function Problem() {
  return (
    <section className="w-full py-16 bg-surface-container-low border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionHeading className="mb-4">
            Mushroom farming is fragile and demanding.
          </SectionHeading>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Small shifts in temperature, humidity and air quality can affect an entire harvest —
            and most farms still rely on manual checks that miss changes until it&apos;s too late.
          </p>
        </div>
      </div>
    </section>
  );
}

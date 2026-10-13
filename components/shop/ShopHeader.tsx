import EyeBrow from "@/components/ui/EyeBrow";

const hubStats = [
  { label: "Hub Cold Room", value: "4.2°C" },
  { label: "Substrate Viability", value: "99.8%" },
  { label: "Pick-up Points", value: "Juja & Westlands" },
];

export default function ShopHeader() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-6 pt-8 sm:px-6">
      <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <EyeBrow>Direct agronomy supplies &amp; infrastructure</EyeBrow>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Smart Agronomy Supply Hub
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Precision-bred mycelium, certified pumice farm infrastructure, IoT
            telemetric units, and peak-grade fresh harvests. Strictly maintained
            under certified cold-chain conditions.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-line bg-white/70 p-4 text-left">
          {hubStats.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[10px] font-semibold text-muted">{label}</dt>
              <dd className="mt-0.5 text-sm font-extrabold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

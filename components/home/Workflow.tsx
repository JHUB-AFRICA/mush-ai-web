import Icon from "../Icon";

const STEPS = [
  { n: "01", icon: "sensors", title: "Sense", text: "Sensors continuously watch the grow room, capturing microclimate data in real time." },
  { n: "02", icon: "analytics", title: "Understand", text: "The system flags anything unusual, analyzing subtle changes before stress symptoms occur." },
  { n: "03", icon: "notifications_active", title: "Advise", text: "Farmers get clear, simple guidance directly via SMS, WhatsApp, and actionable alerts." },
  { n: "04", icon: "tune", title: "Act", text: "Conditions get adjusted before a problem affects the crop, safeguarding high flush yields." },
];

export default function Workflow() {
  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
          <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
            Sense → Understand → Advise → Act
          </h2>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Sensors continuously watch the grow room. The system flags anything unusual. Farmers get clear, simple guidance. Conditions get adjusted before a problem affects the crop.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="group rounded-3xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  <Icon name={s.icon} className="text-[24px]" />
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-secondary-container">{s.n}</span>
              </div>
              <h3 className="mb-3 font-headline-sm text-headline-sm text-primary">{s.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Icon from "@/components/ui/Icon";

const PILLARS = [
  {
    icon: "domain",
    style: "bg-primary-container text-on-primary-container",
    title: "Purpose-Built Structure",
    text: "A well-designed physical farm built for stable growing conditions.",
  },
  {
    icon: "sensors",
    style: "bg-secondary-fixed text-on-secondary-fixed",
    title: "Continuous Monitoring",
    text: "Sensors that catch problems before they affect yield.",
  },
  {
    icon: "support_agent",
    style: "bg-tertiary-fixed text-on-tertiary-fixed",
    title: "Training & Support",
    text: "Hands-on training and support, so farmers aren't left to interpret data alone.",
  },
];

export default function Approach() {
  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-3 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
            Our Approach
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We combine three things most mushroom farms treat separately:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-3xl bg-surface-container-low p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${p.style}`}>
                <Icon name={p.icon} className="text-[28px]" />
              </div>
              <h3 className="mb-3 font-headline-sm text-headline-sm text-primary">{p.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

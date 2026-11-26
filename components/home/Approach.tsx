
const PILLARS = [
  {
    index: "01",
    title: "Purpose Built Structure",
    text: "A well designed physical farm built for stable growing conditions.",
  },
  {
    index: "02",
    title: "Continuous Monitoring",
    text: "Sensors that catch problems before they affect yield.",
  },
  {
    index: "03",
    title: "Training & Support",
    text: "Hands on training and support, so farmers aren't left to interpret data alone.",
  },
];

export default function Approach() {
  return (
    <section className="w-full bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Editorial Section Header: Left title, Right subtitle */}
        <div className="flex flex-col justify-between gap-4 border-b border-outline-variant/40 pb-10 md:flex-row md:items-end lg:pb-14">
          <div>
            <span className="mb-2 block font-label-md text-label-md font-semibold uppercase tracking-widest text-primary/70">
              Core Methodology
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
              Our Approach
            </h2>
          </div>
          <p className="max-w-md font-body-md text-body-md text-on-surface-variant md:text-right">
            We combine three things most mushroom farms treat separately:
          </p>
        </div>

        {/* Minimalist Architectural Grid: Hairline vertical dividers on desktop, horizontal on mobile */}
        <div className="grid grid-cols-1 divide-y divide-outline-variant/40 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {PILLARS.map((p, idx) => (
            <div
              key={p.title}
              className={`group flex flex-col justify-between py-10 transition-colors duration-200 md:py-12 ${
                idx === 0
                  ? "md:pr-8 lg:pr-12"
                  : idx === 1
                  ? "md:px-8 lg:px-12"
                  : "md:pl-8 lg:pl-12"
              }`}
            >
              {/* Top row: Tabular index on left, unified stroke icon on right */}
              <div className="mb-8 flex items-baseline justify-between lg:mb-12">
                <span className="font-headline-sm text-2xl font-light tabular-nums tracking-tighter text-outline/80 transition-colors duration-200 group-hover:text-primary">
                  {p.index}
                </span>
               
              </div>

              {/* Middle: Crisp title and concise description */}
              <div className="space-y-3">
                <h3 className="font-headline-sm text-headline-sm font-semibold tracking-tight text-primary">
                  {p.title}
                </h3>
                <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


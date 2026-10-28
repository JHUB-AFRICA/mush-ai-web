import Icon from "@/components/ui/Icon";

const TESTIMONIALS = [
  {
    quote:
      "The hands-on support and purpose-built room design eliminated the guesswork from our daily mushroom yields.",
    name: "Musee Maluki",
    role: "Commercial Grower, Machakos",
    avatar: "bg-primary-container text-on-primary-container",
  },
  {
    quote:
      "Having real sensor guidance combined with practical farming advice made all the difference for our farm.",
    name: "Karambu Muchina",
    role: "Outgrower Lead, Nakuru",
    avatar: "bg-secondary-fixed text-on-secondary-fixed",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-3 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
            What Our Customers Say
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Real feedback from growers across Kenya
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="m-0 flex flex-col justify-between rounded-3xl bg-surface-container-low p-8 shadow-sm"
            >
              <blockquote className="m-0 mb-6 font-body-lg text-body-lg italic leading-relaxed text-on-surface">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-surface-container-high pt-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.avatar}`}>
                  <Icon name="person" className="text-[20px]" />
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-primary">{t.name}</p>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

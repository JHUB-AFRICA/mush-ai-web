import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Joseph M.",
    role: "Kenya Grower",
    initials: "JM",
    avatarBg: "bg-primary text-on-primary",
    rating: 5,
    quote:
      "The pumice is a game changer for our first flush within 18 days. The consistency is unlike any frames I've tried.",
  },
  {
    name: "Sarah N.",
    role: "Nairobi Chef",
    initials: "SN",
    avatarBg: "bg-secondary-container text-on-secondary",
    rating: 5,
    quote:
      "Super fresh button mushrooms, picked straight from the Juja insulation hub. Fast turnaround, great taste.",
  },
  {
    name: "Peter K.",
    role: "Agrientrepreneur",
    initials: "PK",
    avatarBg: "bg-primary-container text-on-primary-container",
    rating: 5,
    quote:
      "The hands-on training took the intimidation out of humidity and ventilation control.",
  },
];

export default function GrowerTestimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-12">
      <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-low/50 p-6 sm:p-8 lg:p-10">
        <div className="max-w-2xl">
          <h2 className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl">
            What East African Growers Say
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Real and authentic feedback from farmers, culinary chefs, and training graduates cultivating directly from HUB.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-xs"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label="5 out of 5 stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 flex items-center gap-3 pt-3 border-t border-surface-container-high/60">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${t.avatarBg}`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-headline-sm text-xs font-bold text-on-surface">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-on-surface-variant font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

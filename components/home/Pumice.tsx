import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const POINTS = [
  { title: "Passive Climate Buffering", text: "Absorbs daytime scorching heat and releases it gently through cold East African nights." },
  { title: "Zero Chemical Mold Growth", text: "Inorganic mineral composition stops Trichoderma green mold from colonizing wall joints." },
  { title: "Turnkey Turnaround in 14 Days", text: "Prefabricated modular panels erected on your parcel with complete solar-ready sensor wiring." },
];

export default function Pumice() {
  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWY5BHZoWLvPARQuqFizq0dt7nMUr2JBQtbfXiF3WEb_VM4Vk5lppKluR9hPhKj0T_hAfoOy9fJ-0VvwUpuWhkDG4fTd6XESUxPw4sLWpKw4laekNbCfdSSSKXrQMcGa9CNg5cyNGRhbpKwJeR7jP19Ks5ptSc2cG5AuNk4WsF45cF750-lK6z4oCTC9OW1yT9TJPTbdC4JrbE7LoamkQ0s4Qosra0vFHRmbFeKAetExLU8LtRDr_9"
                alt="Insulated mushroom growing house built from volcanic pumice stone"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-surface-container-lowest/90 p-6 backdrop-blur-md">
                <p className="font-label-lg text-label-lg font-bold text-primary">Volcanic Pumice Architecture</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Reduces electrical HVAC cooling costs by up to 74% compared to metal shipping containers.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm font-bold uppercase text-secondary">
              Patented Shed Architecture
            </div>
            <h2 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
              Engineered with Local Volcanic Pumice for Unrivaled Thermal Inertia
            </h2>
            <p className="mb-8 font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              Conventional galvanized sheds cook mushroom beds under equatorial sun, driving massive electricity bills. SmartMushroom structures use locally quarried porous volcanic stone with micro-cellular air voids that trap humidity and regulate internal chamber temperatures naturally.
            </p>
            <div className="mb-8 w-full space-y-4">
              {POINTS.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <Icon name="check_circle" className="mt-0.5 text-[22px] text-primary" />
                  <div>
                    <p className="font-label-lg text-label-lg font-bold text-on-surface">{p.title}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/how-it-works#grow-room" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-lg text-label-lg text-on-primary transition-all duration-200 hover:bg-primary-container">
              Explore about <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

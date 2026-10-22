import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, pumiceFeatures } from "@/lib/content";

export function PumiceShowcase() {
  return (
    <section className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <div className="relative w-full h-[480px]">
                <Image
                  src={images.pumice}
                  alt="Insulated mushroom growing house built with porous Kenyan volcanic pumice stone blocks, with misting lines and rustic timber frames"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md">
                <p className="text-label-lg font-bold text-primary">Volcanic Pumice Architecture</p>
                <p className="text-body-sm text-on-surface-variant">
                  Reduces electrical HVAC cooling costs by up to 74% compared to metal shipping
                  containers.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start">
            <Pill bg="container" tone="secondary" className="mb-4">
              Patented Shed Architecture
            </Pill>
            <SectionHeading className="mb-6">
              Engineered with Local Volcanic Pumice for Unrivaled Thermal Inertia
            </SectionHeading>
            <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Conventional galvanized sheds cook mushroom beds under equatorial sun, driving
              massive electricity bills. SmartMushroom structures use locally quarried porous
              volcanic stone with micro-cellular air voids that trap humidity and regulate
              internal chamber temperatures naturally.
            </p>

            <ul className="space-y-4 w-full mb-8">
              {pumiceFeatures.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-primary text-[22px] mt-0.5" />
                  <div>
                    <p className="text-label-lg font-bold text-on-surface">{f.title}</p>
                    <p className="text-body-sm text-on-surface-variant">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary text-label-lg px-8 py-4 rounded-full transition-all duration-200"
            >
              <span>Explore Farm Structure Specs</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

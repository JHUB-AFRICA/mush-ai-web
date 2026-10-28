import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

const RENDERS = [
  { src: "/images/about/pumice-exterior.jpg", alt: "Pumice grow room, front and door" },
  { src: "/images/about/pumice-rear.jpg", alt: "Pumice grow room, side and roof vent" },
];

const BENEFITS = [
  {
    icon: "eco",
    title: "Lower energy demand",
    text: "The walls do much of the cooling work, so the room stays at the right microclimate with far less power.",
  },
  {
    icon: "savings",
    title: "Lower construction cost",
    text: "Pumice is more affordable and easier to install than the brick structure we considered.",
  },
  {
    icon: "view_module",
    title: "Smarter use of space",
    text: "The layout of shelves and components is refined so every square metre grows mushrooms.",
  },
];

export default function GrowRoomSection() {
  return (
    <section id="structure" className="w-full scroll-mt-20 bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="The farm structure"
          title="A grow room that keeps itself cool"
          intro="Our new rooms are built from natural volcanic pumice. It is light, insulating and holds moisture, which is exactly what mushrooms like."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {RENDERS.map((r) => (
            <div key={r.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-md">
              <Image src={r.src} alt={r.alt} fill sizes="(max-width: 640px) 90vw, 45vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-[#f1dfd8] bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#002e20] text-white">
                <Icon name={b.icon} className="text-[22px]" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-on-surface">{b.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

const PROBLEMS = [
  {
    icon: "bolt",
    title: "Too much electricity",
    text: "Power bills were so high that the model was not affordable for smallholder farmers.",
  },
  {
    icon: "ac_unit",
    title: "Constant mechanical cooling",
    text: "Machines had to cool and humidify the room non-stop just to protect the crop.",
  },
  {
    icon: "wb_sunny",
    title: "Heat trapped inside",
    text: "Black steel interiors soaked up the outside heat and pushed temperatures up.",
  },
];

export default function ProblemSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/about/container-farm.jpg"
            alt="The original container mushroom farm"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Where we started"
            title="The first design worked, but it cost too much"
            intro="Our existing container farm grew mushrooms well. The problem was what it took to keep them cool."
          />
          <ul className="mt-8 space-y-5">
            {PROBLEMS.map((p) => (
              <li key={p.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#002e20] text-white">
                  <Icon name={p.icon} className="text-[22px]" />
                </span>
                <div>
                  <h3 className="font-semibold text-on-surface">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

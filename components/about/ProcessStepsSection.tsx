import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: "grass",
    title: "Prepare the substrate",
    text: "Farm waste like bagasse, wheat straw or coffee husks becomes the growing medium.",
  },
  {
    icon: "science",
    title: "Add the spawn",
    text: "We seed the substrate with high-yield JKUAT strains, JAMBO101 and MAMBO101.",
  },
  {
    icon: "home_work",
    title: "Grow in the pumice room",
    text: "The room holds a steady, cool and humid climate while the mushrooms develop.",
  },
  {
    icon: "sensors",
    title: "Mush AI keeps watch",
    text: "Sensors and alerts catch problems early, so the farmer can act in time.",
  },
  {
    icon: "agriculture",
    title: "Harvest and return",
    text: "Mushrooms are harvested and processed. Spent substrate goes back to farmers as fertilizer.",
  },
];

export default function ProcessStepsSection() {
  return (
    <section className="w-full bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          center
          eyebrow="The process"
          title="From farm waste to fresh harvest"
          intro="Five steps, and nothing goes to waste."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-[#f1dfd8] bg-white p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-[#00a94e] px-3 py-0.5 text-xs font-bold text-white">
                Step {i + 1}
              </span>
              <span className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#002e20] text-white">
                <Icon name={s.icon} className="text-[24px]" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-on-surface">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

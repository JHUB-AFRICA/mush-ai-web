import Image from "next/image";
import SectionHeading from "./SectionHeading";

const PARTS = [
  { title: "Pumice walls", text: "Insulate the room and soften outside heat and dryness." },
  { title: "Stacked shelves", text: "Growing levels use height instead of land, so no arable land is needed." },
  { title: "Substrate beds", text: "Bagasse, wheat straw or coffee husks that the mushrooms grow in." },
  { title: "Smart sensors", text: "Read temperature, humidity and CO₂ on every grow unit." },
  { title: "Roof vents", text: "Let stale air out and fresh air in to keep CO₂ down." },
];

export default function InsideRoomSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Inside the room"
          title="What you will find in every grow room"
          intro="Five simple parts working together."
        />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-md">
              <Image
                src="/images/about/pumice-cutaway.jpg"
                alt="Cutaway of a pumice grow room showing stacked shelves"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/about/mushrooms-brown.jpg"
                alt="Brown mushrooms fruiting on beds inside a grow room"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <ol className="space-y-4">
            {PARTS.map((p, i) => (
              <li key={p.title} className="flex items-start gap-4 rounded-2xl border border-[#f1dfd8] bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00a94e] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-on-surface">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

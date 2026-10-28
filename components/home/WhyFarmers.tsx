import Icon from "@/components/ui/Icon";

/*
  "Why farmers should choose us"
  Layout (wide screens): broad half-ellipse | two overlapping circles | broad half-ellipse
  The outer shapes touch the edges of the page. Below 1280px everything stacks:
  left shape, the two circles (overlapping vertically), right shape.
  Colors: heading and titles #002e20 (jungle green), shapes #fff0ec (pink).
*/

type Item = { icon: string; title: string; text: string };

const CLIMATE: Item = {
  icon: "verified_user",
  title: "Guaranteed Climate Stability",
  text: "Pumice stone architecture + AI assisted systems eliminates the 95% crop failure risk.",
};
const ROI: Item = {
  icon: "payments",
  title: "Rapid ROI",
  text: "High-yield biotech strains ensure full capital return within 60 days.",
};
const DATA: Item = {
  icon: "speed",
  title: "Data-Driven Confidence",
  text: "Bridge-AI sends predictive alerts straight to the farmer's device, no guesswork.",
};
const MARKET: Item = {
  icon: "storefront",
  title: "Guaranteed Market Access",
  text: "Direct integration into our agro-processing buy-back network ensures every harvest has a buyer.",
};

function Content({ item }: { item: Item }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#002e20] text-white xl:h-12 xl:w-12">
        <Icon name={item.icon} className="text-[20px] xl:text-[24px]" />
      </span>
      <h3 className="mb-2 text-base font-bold leading-snug text-[#002e20] xl:text-lg">
        {item.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-[#231916]/80 xl:text-sm 2xl:text-base">
        {item.text}
      </p>
    </div>
  );
}

// Broad half-ellipse: 0.8 as wide as it is tall, flat side on the page edge.
function Half({ item, side }: { item: Item; side: "left" | "right" }) {
  const left = side === "left";
  return (
    <li
      style={{
        borderRadius: left
          ? "0 100% 100% 0 / 0 50% 50% 0"
          : "100% 0 0 100% / 50% 0 0 50%",
      }}
      className={`flex h-[min(88vw,24rem)] w-[min(70.4vw,19.2rem)] shrink-0 items-center border border-[#f1dfd8] bg-[#fff0ec] shadow-sm xl:aspect-[4/5] xl:h-auto xl:w-[22.4%] xl:self-auto ${
        left ? "self-start" : "self-end"
      }`}
    >
      <div className={`w-[68%] ${left ? "ml-[7%]" : "ml-auto mr-[7%]"}`}>
        <Content item={item} />
      </div>
    </li>
  );
}

// One of the two overlapping circles. The text is nudged away from the overlap.
function Ring({ item, which }: { item: Item; which: "a" | "b" }) {
  const a = which === "a";
  return (
    <div
      className={`flex h-[min(88vw,24rem)] w-[min(88vw,24rem)] items-center justify-center rounded-full border-2 border-[#002e20]/20 bg-[#fff0ec] mix-blend-multiply xl:absolute xl:top-0 xl:aspect-square xl:h-full xl:w-auto ${
        a
          ? "xl:left-0"
          : "-mt-[min(17.6vw,4.8rem)] xl:right-0 xl:mt-0"
      }`}
    >
      <div
        className={`relative w-[68%] ${
          a
            ? "-top-[10%] xl:-left-[10%] xl:top-0"
            : "top-[10%] xl:left-[10%] xl:top-0"
        }`}
      >
        <Content item={item} />
      </div>
    </div>
  );
}

export default function WhyFarmers() {
  return (
    <section className="w-full overflow-x-hidden bg-surface py-20">
      <h2 className="mb-12 px-6 text-center font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-[#002e20] md:mb-16 md:font-headline-lg md:text-headline-lg">
        Why Farmers Should Choose Us
      </h2>

      <ul className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        <Half item={CLIMATE} side="left" />

        {/* The two circles overlap; `isolate` keeps the tint of the overlap inside this pair */}
        <li className="relative isolate flex flex-col items-center xl:block xl:aspect-[9/5] xl:w-[50.4%]">
          <Ring item={ROI} which="a" />
          <Ring item={DATA} which="b" />
        </li>

        <Half item={MARKET} side="right" />
      </ul>
    </section>
  );
}

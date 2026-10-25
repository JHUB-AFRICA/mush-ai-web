export default function Mission() {
  // Width and height are set to the same value so the shape is always a true circle.
  const size = "min(90vw, 36rem)";

  return (
    <section className="flex w-full items-center justify-center bg-surface px-4 py-20 md:py-28">
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 flex-col items-center justify-center rounded-full bg-[#002e20] p-8 text-center text-on-primary shadow-xl ring-8 ring-[#002e20]/15 sm:p-14 md:p-16"
      >
        <h2 className="mb-3 font-headline-lg-mobile text-2xl font-bold tracking-tight text-on-primary sm:mb-5 md:font-headline-lg md:text-4xl">
          Our Mission
        </h2>
        <p className="font-body-md text-sm leading-relaxed text-inverse-on-surface/90 sm:text-base md:font-body-lg md:text-lg">
          To help farmers — from first-time growers to established operations — produce healthier
          mushroom harvests with fewer surprises, using tools that are simple to understand and easy
          to act on.
        </p>
      </div>
    </section>
  );
}

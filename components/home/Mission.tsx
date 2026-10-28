import Image from "next/image";

// Satellite circles: one on each diagonal corner of the main circle,
// with 1/4 of its diameter tucked behind it.
const satellites = [
  { src: "/images/mission/mushroom.jpg", alt: "Brown mushrooms growing on compost beds", pos: "top-left", delay: "0ms" },
  { src: "/images/mission/mission_1.png", alt: "White button mushrooms growing in a farm room", pos: "top-right", delay: "150ms" },
  { src: "/images/mission/mission_2.png", alt: "Container mushroom farm", pos: "bottom-left", delay: "300ms" },
  { src: "/images/mission/mission_3.png", alt: "Shiitake mushroom crisps", pos: "bottom-right", delay: "450ms" },
] as const;

export default function Mission() {
  return (
    <section className="flex w-full items-center justify-center overflow-hidden bg-surface px-4 py-20 md:py-28">
      {/*
        --s  = main circle diameter
        --k  = satellite size as a fraction of --s (0.5 on small screens, 0.72 on large)
        --d  = satellite diameter
        --o  = x/y offset of each satellite centre from the main centre (diagonal).
        The margin reserves room for the satellites poking out past the wrapper.
      */}
      <div
        style={
          {
            "--s": "min(70vw, 28rem)",
            "--d": "calc(var(--s) * var(--k))",
            width: "var(--s)",
            height: "var(--s)",
            "--o": "calc((var(--s) / 2 + var(--d) / 4) * 0.7071)",
            margin: "calc(var(--s) * (0.7071 * (0.5 + var(--k) / 4) + var(--k) / 2 - 0.5 + 0.03))",
          } as React.CSSProperties
        }
        className="relative shrink-0 [--k:0.5] lg:[--k:0.72]"
      >
        {/* Satellite image circles (behind the main circle) */}
        {satellites.map(({ src, alt, pos, delay }) => {
          // Centre of each satellite is R + d/4 from the main centre (along the
          // diagonal), so exactly 1/4 of its diameter is hidden behind the main circle.
          const x = pos.endsWith("left") ? "-1 * var(--o)" : "var(--o)";
          const y = pos.startsWith("top") ? "-1 * var(--o)" : "var(--o)";
          const place: React.CSSProperties = {
            left: `calc(50% + ${x} - var(--d) / 2)`,
            top: `calc(50% + ${y} - var(--d) / 2)`,
          };

          return (
            <div
              key={src}
              style={{ width: "var(--d)", height: "var(--d)", animationDelay: delay, ...place }}
              className="absolute z-0 animate-[float_5s_ease-in-out_infinite]"
            >
              <div
                style={{ animationDelay: delay }}
                className="relative h-full w-full animate-[pop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both] overflow-hidden rounded-full border-[6px] border-[#002e20] shadow-[0_20px_50px_-10px_rgba(0,46,32,0.55)] ring-8 ring-[#002e20]/15 transition-transform duration-300 hover:scale-105"
              >
                <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 35vw, 20rem" className="object-cover" />
              </div>
            </div>
          );
        })}

        {/* Main mission circle (on top) */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-[#002e20] p-6 text-center text-on-primary shadow-xl ring-8 ring-[#002e20]/15 sm:p-10 md:p-12">
          <h2 className="mb-2 font-headline-lg-mobile text-xl font-bold tracking-tight text-on-primary sm:mb-4 md:font-headline-lg md:text-3xl">
            Our Mission
          </h2>
          <p className="font-body-md text-xs leading-relaxed text-inverse-on-surface/90 sm:text-sm md:font-body-lg md:text-base">
            To help farmers — from first-time growers to established operations — produce healthier
            mushroom harvests with fewer surprises, using tools that are simple to understand and easy
            to act on.
          </p>
        </div>
      </div>

      {/* Pop-in keyframes */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

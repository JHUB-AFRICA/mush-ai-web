export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00a94e]">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-7 text-on-surface-variant md:text-lg">{intro}</p>}
    </div>
  );
}

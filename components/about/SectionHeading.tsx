import { Sparkles } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  icon,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary ${center ? "justify-center" : ""}`}>
        {icon ?? <Sparkles size={14} />}
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-7 text-on-surface-variant md:text-lg">{intro}</p>}
    </div>
  );
}

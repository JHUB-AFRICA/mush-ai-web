type Props = {
  children: React.ReactNode;
  bg?: "container" | "highest";
  tone?: "primary" | "secondary";
  className?: string;
};

/** Small uppercase eyebrow label ("PRECISION TELEMETRY", etc.) */
export function Pill({ children, bg = "highest", tone = "primary", className = "" }: Props) {
  const bgClass = bg === "highest" ? "bg-surface-container-highest" : "bg-surface-container";
  const toneClass = tone === "primary" ? "text-primary" : "text-secondary";
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase ${bgClass} ${toneClass} ${className}`}
    >
      {children}
    </div>
  );
}

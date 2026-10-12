type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-wider text-ember ${className}`}
    >
      {children}
    </p>
  );
}

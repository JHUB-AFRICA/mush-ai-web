type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${className}`}
    >
      {children}
    </p>
  );
}


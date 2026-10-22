export function SectionHeading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={`text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight ${className}`}
    >
      {children}
    </Tag>
  );
}

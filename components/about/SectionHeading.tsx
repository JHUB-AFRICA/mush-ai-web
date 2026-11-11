

export default function SectionHeading({
  title,
  intro,
  center = false,
}: {
  title: string;
  intro?: string;
  center?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
}


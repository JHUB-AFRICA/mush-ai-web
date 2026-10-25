const steps = [
  {
    step: "1",
    title: "Cart Summary",
    description:
      "Review your items, subtotal KES & quantities of morning & evening items.",
    color: "bg-primary text-on-primary",
  },
  {
    step: "2",
    title: "Contact Details",
    description:
      "Provide your collection name, mobile number and email address for order routing.",
    color: "bg-primary-container text-on-primary-container",
  },
  {
    step: "3",
    title: "Payment Method",
    description:
      "Choose from M-Pesa paybill or card with instant SMS & Paybill integration.",
    color: "bg-primary text-on-primary",
  },
  {
    step: "4",
    title: "Pickup Slot",
    description:
      "Select your convenient date and 4hr morning/evening window slot.",
    color: "bg-primary-container text-on-primary-container",
  },
  {
    step: "5",
    title: "Pass & Pickup",
    description:
      "Receive your instant QR/PIN by SMS and email to show at our Juja/pickup hub.",
    color: "bg-secondary-container text-on-secondary",
  },
];

export default function LocalPickupSteps() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="max-w-2xl">
          <h2 className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl">
            How Local Pickup Works
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            5 steps to enjoy seamless farming process designed for an ease-to-follow hub freshness from farm to table.
          </p>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col rounded-2xl border border-surface-container-high/70 bg-surface-container-low/40 p-4 transition-all duration-200 hover:bg-surface-container-low/70"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black mb-3 ${item.color}`}
              >
                {item.step}
              </span>
              <h3 className="font-headline-sm text-xs font-bold text-on-surface mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

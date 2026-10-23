import Accordion, { type AccordionItem } from "@/components/core/Accordion";

const faqs: AccordionItem[] = [
  {
    q: "Do you deliver, or is it pickup only?",
    a: "Orders are currently fulfilled via scheduled pickup at our Juja Innovation Farm (JKUAT Gate C) or Westlands Cold Station. Because mushroom spawn and fresh button caps are sensitive biological items, holding them in calibrated 4°C cold-storage until you arrive guarantees maximum viability and eliminates heat damage during transit.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Lipa Na M-Pesa (both instant Online STK push and official Paybill) as well as major Debit and Credit Cards (Visa and Mastercard) through our secure Kenyan payment gateway.",
  },
  {
    q: "How fresh are the mushrooms when I pick them up?",
    a: "Button mushrooms are harvested daily at 06:00 AM directly inside our automated pumice grow units and held in cold rooms. You collect mushrooms that were picked within 6 hours, ensuring culinary-grade texture and extended shelf life.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "We stand behind our strains with a 100% bio-viability guarantee. If any spawn bag fails to colonize within the stated incubation window or shows mold contamination upon pickup, report it with photos within 72 hours for a free replacement.",
  },
  {
    q: "How does training booking work?",
    a: "When you book a workshop seat, your spot in the 2-day hands-on cohort at JKUAT is reserved immediately. You receive SMS confirmations, training course materials, and access details 48 hours before the cohort begins.",
  },
];

export default function ShopFaq() {
  return (
    <section
      aria-labelledby="shop-faq-heading"
      className="mx-auto w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-12"
    >
      <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="max-w-2xl mb-6">
          <h2
            id="shop-faq-heading"
            className="font-headline-lg text-2xl font-extrabold text-on-surface sm:text-3xl"
          >
            FAQs
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Quick answers about order collection, biological strain storage, and agronomy masterclasses.
          </p>
        </div>

        <Accordion items={faqs} />
      </div>
    </section>
  );
}

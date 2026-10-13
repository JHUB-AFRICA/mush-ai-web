import Accordion, { type AccordionItem } from "@/components/core/Accordion";
import EyeBrow from "@/components/ui/EyeBrow";

/* Placeholder answers: replace with your confirmed policies */
const faqs: AccordionItem[] = [
  {
    q: "Why is physical pickup required instead of standard home delivery?",
    a: "Spawn and fresh mushrooms are living products. Pickup lets us hand them over straight from cold storage, so they never sit in an uncontrolled courier vehicle.",
  },
  {
    q: "How does the M-Pesa payment verification work?",
    a: "You pay through M-Pesa and enter the confirmation code at checkout. We match it to your order and confirm your pickup slot by SMS.",
  },
  {
    q: "What is your replacement policy for spawn batches?",
    a: "If a batch shows contamination or fails to colonize in the stated window, send photos within 72 hours of collection. After a quick review we replace it.",
  },
  {
    q: "Can I reschedule my pickup time slot if I am delayed in traffic?",
    a: "Yes. Reschedule from your order confirmation or call the hub before your slot. Cold-chain items are held for up to 24 hours.",
  },
];

export default function ShopFaq() {
  return (
    <section
      aria-labelledby="shop-faq-heading"
      className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
    >
      <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-8">
        <EyeBrow>Agronomy &amp; order support</EyeBrow>
        <h2
          id="shop-faq-heading"
          className="mt-1 text-2xl font-extrabold tracking-tight"
        >
          Frequently Asked Questions
        </h2>
        <p className="mb-5 mt-2 max-w-lg text-sm text-muted">
          Everything you need to know about biological product handling and
          collecting your supplies.
        </p>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}

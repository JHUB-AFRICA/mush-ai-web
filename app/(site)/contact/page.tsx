import type { Metadata } from "next";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactSocials from "@/components/contact/ContactSocials";

export const metadata: Metadata = {
  title: "Contact Us | SmartMushroom Kenya",
  description:
    "Get in touch with the SmartMushroom team for product inquiries, orders, grow kits, spawn, training, and smart farm consultation in Juja, Kenya.",
  openGraph: {
    title: "Contact Us | SmartMushroom Kenya",
    description:
      "Get in touch with the SmartMushroom team for product inquiries, orders, grow kits, spawn, training, and smart farm consultation in Juja, Kenya.",
  },
};

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-screen text-white">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mushroom-bg.jpg')" }}
      />
      {/* Consistent primary dark overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-primary/90" />

      {/* Page header */}
      <ContactHeader />

      {/* Main content grid */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-2 md:pb-24">
        <ContactInfo />
        <ContactForm />
      </section>

      {/* Social links */}
      <ContactSocials />
    </main>
  );
}

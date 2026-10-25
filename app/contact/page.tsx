"use client";

import { FormEvent, useState } from "react";

/*
  Palette (from the rest of the site)
  primary green   #00a94e
  hover green     #009143
  light green     #a7d1ae
  warm off-white  #fff8f6
  warm border     #f1dfd8
  dark text       #231916
*/

const CONTACT_DETAILS = [
  {
    icon: "✉",
    title: "Email Address",
    value: "info@mushai.com",
    href: "mailto:info@mushai.com",
  },
  {
    icon: "☎",
    title: "Phone Number",
    value: "+254 700 000 000",
    href: "tel:+254700000000",
  },
  {
    icon: "📍",
    title: "Our Location",
    value: "Juja, Kiambu County, Kenya",
  },
  {
    icon: "◷",
    title: "Working Hours",
    value: "Monday – Friday, 8:00 AM – 5:00 PM",
  },
];

// Options shown in the "Subject" dropdown. Edit this list to add or remove topics.
const TOPICS = [
  "Product inquiries",
  "Grow kits & spawn",
  "Training",
  "Workshops",
  "IoT & smart farm monitoring",
  "Pumice farm structures",
  "Orders & delivery",
  "Partnerships",
  "Other",
];

const inputClass =
  "w-full rounded-lg border border-[#f1dfd8] bg-white px-4 py-3 text-sm text-[#231916] outline-none transition placeholder:text-[#231916]/40 focus:border-[#00a94e] focus:ring-2 focus:ring-[#a7d1ae]";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      String(message),
    ].join("\n");

    const mailto = `mailto:info@mushai.com?subject=${encodeURIComponent(
      String(subject)
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  }

  return (
    <main className="relative isolate min-h-screen text-white">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mushroom-bg.jpg')" }}
      />
      {/* Dark overlay so text stays readable. Lower /80 to show more photo. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#231916]/80" />

      {/* Page header */}
      <section className="px-6 py-16 text-center md:py-20">
        <p className="mb-3 text-sm font-semibold text-[#a7d1ae]">
          Mush AI Support
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
          Have a question about our products, orders, or mushroom farming
          solutions? We&apos;re happy to help.
        </p>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-2 md:pb-24">
        {/* Contact details */}
        <div>
          <h2 className="text-2xl font-bold">Contact Information</h2>

          <p className="mt-3 max-w-md leading-7 text-white/80">
            Reach out to the Mush AI team for product inquiries, order
            assistance, and general support.
          </p>

          <div className="mt-8 space-y-6">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00a94e] text-xl text-white">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-sm text-white/80 transition hover:text-[#a7d1ae]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-white/80">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-[#f1dfd8] bg-[#fff8f6] p-6 text-[#231916] shadow-lg md:p-8">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>

          <p className="mt-2 text-sm leading-6 text-[#231916]/70">
            Fill in the form below and tell us how we can help.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium"
              >
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-10 invalid:text-[#231916]/40`}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic} className="text-[#231916]">
                      {topic}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#231916]/60"
                  fill="currentColor"
                >
                  <path d="M5.5 7.5 10 12l4.5-4.5-1.4-1.4L10 9.2 6.9 6.1z" />
                </svg>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Write your message here..."
                required
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#00a94e] px-6 py-3 font-semibold text-white transition hover:bg-[#009143] focus:outline-none focus:ring-2 focus:ring-[#00a94e] focus:ring-offset-2 focus:ring-offset-[#fff8f6]"
            >
              Send Message
            </button>

            {sent && (
              <p className="text-sm text-[#009143]">
                Your email app should open with your message ready to send.
                Please complete sending it there.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

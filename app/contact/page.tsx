"use client";

import { FormEvent, useState, type SVGProps } from "react";
import Image from "next/image";

/*
  Palette (from the rest of the site)
  home dark green #002e20 (icon boxes, send button)
  accent green    #00a94e
  hover green     #009143
  light green     #a7d1ae
  warm off-white  #fff8f6
  warm border     #f1dfd8
  dark text       #231916
*/

/*
  Contact icons (inlined SVGs). They use currentColor, so they pick up the
  text color of the icon box (white) and can be restyled with Tailwind classes.
*/
type IconProps = SVGProps<SVGSVGElement>;

function EmailIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
      />
    </svg>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M9.004 3.416C8.432 2.606 7.64 2.241 6.8 2.25c-.797.008-1.573.349-2.221.803A6.2 6.2 0 0 0 2.92 4.79c-.41.649-.706 1.416-.666 2.165c.193 3.603 2.22 7.453 5.067 10.302c2.845 2.846 6.644 4.824 10.48 4.446c.752-.074 1.463-.457 2.044-.945a5.8 5.8 0 0 0 1.443-1.84c.34-.692.543-1.49.431-2.267c-.116-.81-.569-1.534-1.402-2.014a16 16 0 0 1-.512-.31c-.15-.093-.31-.194-.504-.31a7.5 7.5 0 0 0-1.249-.618c-.447-.163-.958-.27-1.49-.197c-.551.076-1.063.336-1.506.802c-.341.36-.843.472-1.549.268c-.718-.208-1.526-.724-2.228-1.422c-.702-.696-1.233-1.51-1.46-2.245c-.224-.728-.125-1.263.225-1.632c.473-.498.725-1.052.778-1.638c.052-.57-.09-1.106-.293-1.574c-.304-.699-.82-1.394-1.224-1.936a22 22 0 0 1-.3-.41"
      />
    </svg>
  );
}

function LocationIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
      />
    </svg>
  );
}

function WorkingHoursIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V7h-1V2H4v12h3v1H3.5a.5.5 0 0 1-.5-.5zM11 5H5V4h6zM9 7H5V6h4zm-2 4.5A3.5 3.5 0 0 1 10.5 8a.5.5 0 0 1 .5.5V11h2.5a.5.5 0 0 1 .5.5a3.5 3.5 0 1 1-7 0"
      />
    </svg>
  );
}

const CONTACT_DETAILS = [
  {
    Icon: EmailIcon,
    title: "Email Address",
    value: "info@mushai.com",
    href: "mailto:info@mushai.com",
  },
  {
    Icon: PhoneIcon,
    title: "Phone Number",
    value: "+254 700 000 000",
    href: "tel:+254700000000",
  },
  {
    Icon: LocationIcon,
    title: "Our Location",
    value: "Juja, Kiambu County, Kenya",
  },
  {
    Icon: WorkingHoursIcon,
    title: "Working Hours",
    value: "Monday – Friday, 8:00 AM – 5:00 PM",
  },
];

// Social links. Replace each "#" with your real profile URL.
const SOCIALS = [
  { name: "Instagram", icon: "/images/social/instagram.png", href: "#" },
  { name: "TikTok", icon: "/images/social/tiktok.png", href: "#" },
  { name: "LinkedIn", icon: "/images/social/linkedin.png", href: "#" },
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
  "w-full rounded-xl border border-surface-container-high bg-white px-4 py-3 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

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
      <section className="px-6 py-16 text-center md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-fixed-dim">
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
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container border border-white/10">
                  <item.Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-sm text-white/80 transition hover:text-primary-fixed-dim"
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
        <div className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 text-on-surface shadow-xl md:p-8">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>

          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
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
                  className={`${inputClass} appearance-none pr-10 invalid:text-on-surface-variant/60`}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic} className="text-on-surface">
                      {topic}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant"
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
              disabled={sending}
              className="w-full rounded-xl bg-secondary-container px-6 py-3.5 font-label-lg text-label-lg font-bold text-on-secondary shadow-md transition-all duration-200 hover:bg-secondary disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>

            {sent && (
              <p className="text-sm font-semibold text-primary">
                Thanks — your message has been sent. We&apos;ll get back to you
                within one business day.
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm font-semibold text-error">
                {error}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Get featured: social links */}
      <section className="border-t border-white/15 px-6 py-14 text-center md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Get Featured and Tag Us On...</h2>

        <p className="mt-2 text-sm font-semibold text-primary-fixed-dim md:text-base">
          See how our community brings it to life..
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
          Share your farm stories, mushroom trends and news with us. Tag us in your posts and we may feature
          you on our live feeds.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow us on ${s.name}`}
                className="group flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2 pl-2 pr-5 transition hover:border-primary-fixed-dim hover:bg-white/20"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                  <Image src={s.icon} alt="" width={26} height={26} className="h-[26px] w-[26px]" />
                </span>
                <span className="text-sm font-semibold text-white transition group-hover:text-primary-fixed-dim">
                  {s.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

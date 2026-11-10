"use client";

import { FormEvent, useState } from "react";
import { validateEmail } from "@/lib/validation";

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

export default function ContactForm() {
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

    const emailCheck = validateEmail(payload.email);
    if (!emailCheck.isValid) {
      setError(emailCheck.error ?? "Please enter a valid email address.");
      return;
    }

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
  );
}


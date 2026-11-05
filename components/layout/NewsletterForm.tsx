"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Subscription failed");
      }

      setDone(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ember"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-60"
      >
        {submitting ? "Subscribing…" : "Subscribe"}
      </button>
      {done && (
        <p role="status" className="text-xs text-forest">
          You&apos;re subscribed. Look out for the next dispatch.
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}

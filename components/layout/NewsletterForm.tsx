"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send `email` to your newsletter API route
    setDone(true);
    setEmail("");
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
        className="w-full rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
      >
        Subscribe
      </button>
      {done && (
        <p role="status" className="text-xs text-forest">
          You&apos;re subscribed. Look out for the next dispatch.
        </p>
      )}
    </form>
  );
}

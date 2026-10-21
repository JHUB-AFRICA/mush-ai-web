"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus("error");
    // TODO: POST to your API / email provider here
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-space-xs">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        placeholder="Enter your email"
        aria-label="Email address"
        className="w-full rounded-xl bg-surface-container-lowest px-space-md py-space-sm font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
      />
      <button type="submit" className="w-full rounded-xl bg-primary py-space-sm font-label-lg text-label-lg text-on-primary transition-colors hover:bg-primary-container">
        Subscribe
      </button>
      {status === "error" && <p role="alert" className="font-label-sm text-label-sm text-error">Please enter a valid email address.</p>}
      {status === "success" && <p role="status" className="font-label-sm text-label-sm text-primary">Thanks! You&apos;re on the list.</p>}
    </form>
  );
}

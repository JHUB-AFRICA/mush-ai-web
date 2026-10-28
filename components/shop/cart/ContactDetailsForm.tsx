"use client";

import { Smartphone } from "lucide-react";

interface ContactDetailsFormProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
}

export default function ContactDetailsForm({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
}: ContactDetailsFormProps) {
  return (
    <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-5 sm:p-6 shadow-xs">
      <h2 className="font-headline-sm text-base font-bold text-on-surface mb-3 flex items-center gap-2">
        <Smartphone size={18} className="text-primary" />
        2. Order Contact &amp; M-Pesa Phone
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-bold text-on-surface mb-1">
            Full Name / Farm Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Samuel Kariuki"
            className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-on-surface mb-1">
            Kenyan Mobile Number (M-Pesa)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XX XXX XXX or +254 7XX..."
            className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-on-surface mb-1">
            Email Address (for QR Pickup Pass &amp; Receipt)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="samuel@farmkenya.co.ke"
            className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}

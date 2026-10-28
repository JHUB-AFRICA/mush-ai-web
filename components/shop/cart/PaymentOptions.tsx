"use client";

import { CreditCard } from "lucide-react";

interface PaymentOptionsProps {
  onMpesaPay: () => void;
  onCardPay: () => void;
}

export default function PaymentOptions({
  onMpesaPay,
  onCardPay,
}: PaymentOptionsProps) {
  return (
    <div className="mt-4 pt-4 border-t border-surface-container-high/80 space-y-3">
      <span className="block text-xs font-bold text-on-surface uppercase tracking-wider">
        Select Payment Method (Kenya)
      </span>

      {/* M-PESA BUTTON */}
      <button
        type="button"
        onClick={onMpesaPay}
        className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#00a94e] hover:bg-[#009143] text-white p-4 shadow-md transition-all duration-150 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#00a94e] font-black text-sm shadow-xs">
            M
          </div>
          <div className="text-left">
            <p className="font-headline-sm text-sm font-extrabold leading-tight">
              Pay with M-Pesa
            </p>
            <p className="text-[11px] text-white/90">Instant STK Push to your Safaricom line</p>
          </div>
        </div>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase">
          Instant PIN
        </span>
      </button>

      {/* CARD PAYMENT BUTTON */}
      <button
        type="button"
        onClick={onCardPay}
        className="group flex w-full items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container-low/80 hover:bg-surface-container p-4 text-on-surface shadow-xs transition-all duration-150 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
            <CreditCard size={18} />
          </div>
          <div className="text-left">
            <p className="font-headline-sm text-sm font-bold text-on-surface leading-tight">
              Pay with Debit / Credit Card
            </p>
            <p className="text-[11px] text-on-surface-variant">
              Visa, Mastercard, Local Kenyan Debit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant">
          <span>3D-Secure</span>
        </div>
      </button>

      <p className="text-[11px] text-center text-on-surface-variant pt-2 leading-relaxed">
        Payment triggers instant order placement and sends your collection QR code via SMS.
      </p>
    </div>
  );
}

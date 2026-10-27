"use client";

import { formatKsh } from "@/lib/format";

interface CardModalProps {
  total: number;
  onClose: () => void;
}

export default function CardModal({ total, onClose }: CardModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="12" height="8" x="2" y="3" rx="1" ry="1" />
            <path d="M7 10v6" />
          </svg>
        </div>
        <h3 className="font-headline-sm text-lg font-bold text-on-surface">
          Debit / Credit Card Checkout
        </h3>
        <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
          Card processing modal configured for Kenyan banks (Equity, KCB, I&amp;M,
          Standard Chartered):
        </p>

        <div className="my-4 rounded-2xl border border-surface-container-high bg-surface-container-low/40 p-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Gateway:</span>
            <span className="font-bold text-on-surface">
              Paystack / Flutterwave Kenya
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Amount:</span>
            <span className="font-extrabold text-on-surface text-sm">
              {formatKsh(total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Security:</span>
            <span className="font-bold text-emerald-700">3D-Secure 2.0 OTP</span>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 mb-5">
          <strong>Notice:</strong> This card payment button is structured for instant
          integration with your Kenyan payment aggregator when ready.
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-xs font-bold shadow-md transition-colors"
        >
          Acknowledge &amp; Close Preview
        </button>
      </div>
    </div>
  );
}

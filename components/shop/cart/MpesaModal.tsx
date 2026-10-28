"use client";

import { formatKsh } from "@/lib/format";

interface MpesaModalProps {
  phone: string;
  total: number;
  onClose: () => void;
}

export default function MpesaModal({ phone, total, onClose }: MpesaModalProps) {
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

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a94e]/10 text-[#00a94e] font-black text-xl mb-4">
          M
        </div>
        <h3 className="font-headline-sm text-lg font-bold text-on-surface">
          Lipa Na M-Pesa Online
        </h3>
        <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
          In production, this will trigger the Safaricom Daraja STK Push prompt
          on your mobile phone:
        </p>

        <div className="my-4 rounded-2xl border border-[#00a94e]/30 bg-[#00a94e]/5 p-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Paybill / Merchant:</span>
            <span className="font-bold text-on-surface">
              SmartMushroom (JHUB)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Phone Number:</span>
            <span className="font-bold text-on-surface">
              {phone || "07XX XXX XXX"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Amount:</span>
            <span className="font-extrabold text-[#00a94e] text-sm">
              {formatKsh(total)}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 mb-5">
          <strong>Notice:</strong> This button is wired and ready for API
          credentials. In the upcoming phase, connecting your Safaricom Consumer
          Key &amp; Passkey will send the live USSD PIN popup directly to the
          customer.
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-[#00a94e] hover:bg-[#009143] text-white py-3 text-xs font-bold shadow-md transition-colors"
        >
          Confirm &amp; Simulate STK Push
        </button>
      </div>
    </div>
  );
}

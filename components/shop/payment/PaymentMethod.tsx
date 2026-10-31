"use client";

import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import { formatKsh } from "@/lib/format";

interface PaymentMethodProps {
  total: number;
  onPaymentSelect: (method: "mpesa" | "card") => void;
}

export default function PaymentMethod({ total, onPaymentSelect }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card" | null>(null);

  const handleSelect = (method: "mpesa" | "card") => {
    setSelectedMethod(method);
    onPaymentSelect(method);
  };

  return (
    <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
      <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
        Payment Method
      </h2>
      
      <div className="space-y-3 mb-4">
        <button
          type="button"
          onClick={() => handleSelect("mpesa")}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === "mpesa"
              ? "border-[#00a94e] bg-[#00a94e]/5"
              : "border-surface-container-high hover:border-[#00a94e]/50"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a94e] text-white font-black text-lg">
            M
          </div>
          <div className="flex-1">
            <p className="font-semibold text-on-surface">M-Pesa</p>
            <p className="text-xs text-on-surface-variant">Pay via M-Pesa STK Push</p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-surface-container-high flex items-center justify-center">
            {selectedMethod === "mpesa" && (
              <div className="w-3 h-3 rounded-full bg-[#00a94e]" />
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("card")}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === "card"
              ? "border-primary bg-primary/5"
              : "border-surface-container-high hover:border-primary/50"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CreditCard size={22} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-on-surface">Card Payment</p>
            <p className="text-xs text-on-surface-variant">Visa, Mastercard, Debit Cards</p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-surface-container-high flex items-center justify-center">
            {selectedMethod === "card" && (
              <div className="w-3 h-3 rounded-full bg-primary" />
            )}
          </div>
        </button>
      </div>

      <div className="pt-4 border-t border-surface-container-high/80">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-on-surface">Amount to Pay</span>
          <span className="text-xl font-bold text-on-surface">{formatKsh(total)}</span>
        </div>
      </div>
    </div>
  );
}

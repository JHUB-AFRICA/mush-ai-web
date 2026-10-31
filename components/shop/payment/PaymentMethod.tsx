"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { formatKsh } from "@/lib/format";

interface PaymentMethodProps {
  total: number;
  phone?: string;
  onPaymentSelect: (method: "mpesa" | "card") => void;
}

export default function PaymentMethod({ total, phone = "", onPaymentSelect }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card" | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleSelect = (method: "mpesa" | "card") => {
    setSelectedMethod(method);
    onPaymentSelect(method);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
      <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
        Payment Method
      </h2>
      
      <div className="space-y-3">
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

        {selectedMethod === "mpesa" && (
          <div className="ml-4 p-4 rounded-xl border border-[#00a94e]/30 bg-[#00a94e]/5 space-y-3">
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Phone Number:</span>
                <span className="font-semibold text-on-surface">{phone || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Amount:</span>
                <span className="font-bold text-[#00a94e]">{formatKsh(total)}</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-[#00a94e] hover:bg-[#009143] text-white py-2.5 text-sm font-semibold transition-colors"
              onClick={() => alert("STK Push sent to your phone. Please check your M-Pesa for the prompt.")}
            >
              Send STK Push
            </button>
            <p className="text-[10px] text-on-surface-variant text-center">
              You will receive a prompt on your phone to enter your M-Pesa PIN
            </p>
          </div>
        )}

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

        {selectedMethod === "card" && (
          <div className="ml-4 p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-on-surface mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full rounded-lg border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full rounded-lg border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength={4}
                  className="w-full rounded-lg border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardChange}
                placeholder="Name on card"
                className="w-full rounded-lg border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-primary hover:bg-primary-container text-on-primary py-2.5 text-sm font-semibold transition-colors"
              onClick={() => alert("Payment processed successfully!")}
            >
              Pay {formatKsh(total)}
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-surface-container-high/80">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-on-surface">Amount to Pay</span>
          <span className="text-xl font-bold text-on-surface">{formatKsh(total)}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  CreditCard,
  Smartphone,
  X,
} from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { products } from "@/lib/products";
import { formatKsh } from "@/lib/format";
import Icon from "@/components/Icon";

export default function CartPage() {
  const { lines, total, count, setQty, remove, clearCart } = useCart();

  // Pickup selections
  const [hub, setHub] = useState<"juja" | "westlands">("juja");
  const [slot, setSlot] = useState<"morning" | "afternoon">("morning");

  // Contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Payment modal state
  const [paymentModal, setPaymentModal] = useState<"mpesa" | "card" | null>(null);

  const handleMpesaPay = () => {
    setPaymentModal("mpesa");
  };

  const handleCardPay = () => {
    setPaymentModal("card");
  };

  if (count === 0) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant/60 mb-6">
          <ShoppingBag size={44} />
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
          Your Pickup Cart is Empty
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          You haven&apos;t added any items to your pickup cart yet. Explore our fresh mushroom harvests, pure grain spawn, or modular pumice kits.
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-sm font-bold shadow-md hover:bg-primary-container transition-all"
          >
            <ArrowLeft size={16} />
            Browse Cultivation Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      {/* Breadcrumb / Back link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Catalog
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="mb-8">
        <h1 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
          Pickup Cart &amp; Checkout
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-on-surface-variant">
          Review your items and select your preferred cold-chain collection station and payment method.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Cart items & collection preferences */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cart items list */}
          <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-surface-container-high/80 pb-4 mb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Selected Products ({count})
              </h2>
              <span className="text-xs text-on-surface-variant">
                Held at 4°C storage
              </span>
            </div>

            <ul className="divide-y divide-surface-container-high/70">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.id);
                if (!product) return null;
                const lineTotal = product.price * line.qty;

                return (
                  <li key={line.id} className="py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface-container">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          {product.unit}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-sm font-bold text-on-surface mt-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs font-semibold text-secondary-container mt-0.5">
                        {formatKsh(product.price)} each
                      </p>
                    </div>

                    {/* Quantity controls & removal */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4">
                      <div className="flex items-center rounded-xl border border-surface-container-high bg-surface-container-lowest">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-on-surface">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right sm:min-w-24">
                        <span className="font-headline-sm text-sm font-extrabold text-on-surface">
                          {formatKsh(lineTotal)}
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => remove(line.id)}
                        className="p-2 text-on-surface-variant hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Pickup Station Selection */}
          <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-5 sm:p-6 shadow-xs">
            <h2 className="font-headline-sm text-base font-bold text-on-surface mb-3 flex items-center gap-2">
              <Truck size={18} className="text-primary" />
              1. Choose Cold-Chain Pickup Station
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                  hub === "juja"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-surface-container-high hover:border-primary/40 bg-surface-container-low/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-on-surface">
                    Juja Innovation Farm (Main Hub)
                  </span>
                  <input
                    type="radio"
                    name="hub"
                    checked={hub === "juja"}
                    onChange={() => setHub("juja")}
                    className="accent-primary"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  JKUAT Gate C agronomy farm. Full stock of spawn, pumice units, and compost.
                </p>
                <span className="mt-2 text-[10px] font-semibold text-emerald-700">
                  Open 07:00 AM – 06:00 PM Daily
                </span>
              </label>

              <label
                className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                  hub === "westlands"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-surface-container-high hover:border-primary/40 bg-surface-container-low/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-on-surface">
                    Westlands Station (Nairobi)
                  </span>
                  <input
                    type="radio"
                    name="hub"
                    checked={hub === "westlands"}
                    onChange={() => setHub("westlands")}
                    className="accent-primary"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Ring Road Parklands cold terminal. Ideal for fresh gourmet mushrooms and spawn bags.
                </p>
                <span className="mt-2 text-[10px] font-semibold text-emerald-700">
                  Open 08:30 AM – 05:30 PM Daily
                </span>
              </label>
            </div>

            {/* Time Slot */}
            <div className="mt-4 pt-4 border-t border-surface-container-high/60">
              <span className="block text-xs font-bold text-on-surface mb-2">
                Pickup Window Slot:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSlot("morning")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    slot === "morning"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  Morning Window (08:00 AM – 12:00 PM)
                </button>
                <button
                  type="button"
                  onClick={() => setSlot("afternoon")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    slot === "afternoon"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  Afternoon Window (01:00 PM – 05:30 PM)
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details */}
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
        </div>

        {/* Right Column: Order Summary & Kenyan Payment Options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 shadow-sm sticky top-24">
            <h2 className="font-headline-sm text-lg font-extrabold text-on-surface pb-3 border-b border-surface-container-high/80">
              Order Summary
            </h2>

            <div className="space-y-3 py-4 text-xs text-on-surface-variant border-b border-surface-container-high/80">
              <div className="flex justify-between">
                <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                <span className="font-semibold text-on-surface">{formatKsh(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Station Cold-Chain Handling</span>
                <span className="font-semibold text-emerald-700">Complimentary (KES 0)</span>
              </div>
              <div className="flex justify-between">
                <span>Pickup Hub</span>
                <span className="font-semibold text-on-surface capitalize">
                  {hub === "juja" ? "Juja Innovation Farm" : "Westlands Nairobi"}
                </span>
              </div>
            </div>

            <div className="py-4 flex items-baseline justify-between">
              <span className="font-bold text-sm text-on-surface">Total Amount Due</span>
              <span className="font-headline-lg text-2xl font-black text-on-surface">
                {formatKsh(total)}
              </span>
            </div>

            {/* Payment Options Section (For Kenyans: M-Pesa & Card) */}
            <div className="mt-4 pt-4 border-t border-surface-container-high/80 space-y-3">
              <span className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                Select Payment Method (Kenya)
              </span>

              {/* M-PESA BUTTON */}
              <button
                type="button"
                onClick={handleMpesaPay}
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
                    <p className="text-[11px] text-white/90">
                      Instant STK Push to your Safaricom line
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase">
                  Instant PIN
                </span>
              </button>

              {/* CARD PAYMENT BUTTON */}
              <button
                type="button"
                onClick={handleCardPay}
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

            {/* Assurance badges */}
            <div className="mt-6 rounded-2xl bg-surface-container-low/60 p-3.5 space-y-2 text-[11px] text-on-surface-variant">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-primary shrink-0" />
                <span>100% Bio-Viability Guarantee at Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-primary shrink-0" />
                <span>Encrypted payment processing &amp; official e-receipt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* M-PESA & CARD INTERACTIVE MODALS */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPaymentModal(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setPaymentModal(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <X size={18} />
            </button>

            {paymentModal === "mpesa" ? (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a94e]/10 text-[#00a94e] font-black text-xl mb-4">
                  M
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Lipa Na M-Pesa Online
                </h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                  In production, this will trigger the Safaricom Daraja STK Push prompt on your mobile phone:
                </p>

                <div className="my-4 rounded-2xl border border-[#00a94e]/30 bg-[#00a94e]/5 p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Paybill / Merchant:</span>
                    <span className="font-bold text-on-surface">SmartMushroom (JHUB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Phone Number:</span>
                    <span className="font-bold text-on-surface">{phone || "07XX XXX XXX"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Amount:</span>
                    <span className="font-extrabold text-[#00a94e] text-sm">{formatKsh(total)}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 mb-5">
                  <strong>Notice:</strong> This button is wired and ready for API credentials. In the upcoming phase, connecting your Safaricom Consumer Key &amp; Passkey will send the live USSD PIN popup directly to the customer.
                </div>

                <button
                  type="button"
                  onClick={() => setPaymentModal(null)}
                  className="w-full rounded-xl bg-[#00a94e] hover:bg-[#009143] text-white py-3 text-xs font-bold shadow-md transition-colors"
                >
                  Confirm &amp; Simulate STK Push
                </button>
              </div>
            ) : (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <CreditCard size={24} />
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Debit / Credit Card Checkout
                </h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                  Card processing modal configured for Kenyan banks (Equity, KCB, I&amp;M, Standard Chartered):
                </p>

                <div className="my-4 rounded-2xl border border-surface-container-high bg-surface-container-low/40 p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Gateway:</span>
                    <span className="font-bold text-on-surface">Paystack / Flutterwave Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Amount:</span>
                    <span className="font-extrabold text-on-surface text-sm">{formatKsh(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Security:</span>
                    <span className="font-bold text-emerald-700">3D-Secure 2.0 OTP</span>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 mb-5">
                  <strong>Notice:</strong> This card payment button is structured for instant integration with your Kenyan payment aggregator when ready.
                </div>

                <button
                  type="button"
                  onClick={() => setPaymentModal(null)}
                  className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-xs font-bold shadow-md transition-colors"
                >
                  Acknowledge &amp; Close Preview
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

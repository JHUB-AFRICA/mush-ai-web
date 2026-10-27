"use client";

import { useState } from "react";
import { useCart } from "@/components/shop/cart/CartProvider";
import CartEmpty from "@/components/shop/cart/CartEmpty";
import CartItemsList from "@/components/shop/cart/CartItemsList";
import PickupStationSelector from "@/components/shop/cart/PickupStationSelector";
import ContactDetailsForm from "@/components/shop/cart/ContactDetailsForm";
import OrderSummary from "@/components/shop/cart/OrderSummary";
import PaymentOptions from "@/components/shop/cart/PaymentOptions";
import MpesaModal from "@/components/shop/cart/MpesaModal";
import CardModal from "@/components/shop/cart/CardModal";

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
    return <CartEmpty />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      {/* Breadcrumb / Back link */}
      <div className="mb-6 flex items-center justify-between">
        <a
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Catalog
        </a>
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
          Review your items and select your preferred cold-chain collection station
          and payment method.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Cart items & collection preferences */}
        <div className="lg:col-span-7 space-y-6">
          <CartItemsList count={count} />
          <PickupStationSelector
            hub={hub}
            setHub={setHub}
            slot={slot}
            setSlot={setSlot}
          />
          <ContactDetailsForm
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
          />
        </div>

        {/* Right Column: Order Summary & Kenyan Payment Options */}
        <div className="lg:col-span-5 space-y-6">
          <OrderSummary count={count} total={total} hub={hub} />
          <PaymentOptions onMpesaPay={handleMpesaPay} onCardPay={handleCardPay} />
        </div>
      </div>

      {/* M-PESA & CARD INTERACTIVE MODALS */}
      {paymentModal === "mpesa" ? (
        <MpesaModal phone={phone} total={total} onClose={() => setPaymentModal(null)} />
      ) : paymentModal === "card" ? (
        <CardModal total={total} onClose={() => setPaymentModal(null)} />
      ) : null}
    </div>
  );
}

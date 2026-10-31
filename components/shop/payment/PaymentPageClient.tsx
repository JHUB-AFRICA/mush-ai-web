"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/shop/cart/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import Breadcrumbs from "@/components/ui/breadcrumbs/Breadcrumbs";
import PaymentMethod from "@/components/shop/payment/PaymentMethod";
import OrderSummaryCheckout from "@/components/shop/checkout/OrderSummaryCheckout";
import MpesaModal from "@/components/shop/cart/MpesaModal";
import CardModal from "@/components/shop/cart/CardModal";

export default function PaymentPageClient() {
  const router = useRouter();
  const { total, count } = useCart();
  const { user } = useAuth();
  const [paymentModal, setPaymentModal] = useState<"mpesa" | "card" | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card" | null>(null);

  if (count === 0) {
    router.push("/cart");
    return null;
  }

  if (!user) {
    router.push("/auth/login?redirect=/payment");
    return null;
  }

  const handlePaymentSelect = (method: "mpesa" | "card") => {
    setSelectedMethod(method);
  };

  const handlePayNow = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }
    setPaymentModal(selectedMethod);
  };

  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Payment" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-surface">
          Payment
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Choose your preferred payment method
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <PaymentMethod total={total} onPaymentSelect={handlePaymentSelect} />
          
          <button
            onClick={handlePayNow}
            disabled={!selectedMethod}
            className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-sm font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedMethod === "mpesa" ? "Pay with M-Pesa" : selectedMethod === "card" ? "Pay with Card" : "Select Payment Method"}
          </button>
        </div>
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <OrderSummaryCheckout showHandling={false} />
          </div>
        </div>
      </div>

      {paymentModal === "mpesa" && user && (
        <MpesaModal phone={user.phone || ""} total={total} onClose={() => setPaymentModal(null)} />
      )}
      {paymentModal === "card" && user && (
        <CardModal total={total} onClose={() => setPaymentModal(null)} />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/shop/cart/CartProvider";
import Breadcrumbs from "@/components/ui/breadcrumbs/Breadcrumbs";
import PaymentMethod from "@/components/shop/payment/PaymentMethod";
import OrderSummaryCheckout from "@/components/shop/checkout/OrderSummaryCheckout";
import MpesaModal from "@/components/shop/cart/MpesaModal";
import CardModal from "@/components/shop/cart/CardModal";
import { loadShipping, clearShipping } from "@/lib/checkout";
import { createOrder, createPayment } from "@/lib/orders";

export default function PaymentPageClient() {
  const router = useRouter();
  const { total, count, lines, clearCart } = useCart();
  const [paymentModal, setPaymentModal] = useState<"mpesa" | "card" | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  useEffect(() => {
    const s = loadShipping();
    if (s?.phone) {
      setShippingPhone(s.phone);
    }
  }, []);

  if (count === 0 && !submitting) {
    router.push("/cart");
    return null;
  }

  const handlePaymentSelect = (method: "mpesa" | "card") => {
    setSelectedMethod(method);
  };

  const handlePayNow = () => {
    if (!selectedMethod) {
      setError("Please select a payment method");
      return;
    }
    setPaymentModal(selectedMethod);
  };

  /**
   * Creates the order on the server, records the payment against it, then
   * clears the local cart.
   */
  const processPayment = async (method: "mpesa" | "card"): Promise<void> => {
    const shipping = loadShipping();
    if (!shipping) {
      setError("Your shipping details are missing — please restart checkout.");
      setPaymentModal(null);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const order = await createOrder({
        items: lines.map((line) => ({ productId: line.id, quantity: line.qty })),
        shipping,
      });

      await createPayment({
        orderId: order.id,
        method,
        amount: order.total,
        ...(method === "mpesa" ? { phone: shipping.phone } : {}),
      });

      clearShipping();
      clearCart();
      setPaymentModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setPaymentModal(null);
    } finally {
      setSubmitting(false);
    }
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

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <PaymentMethod
            total={total}
            phone={shippingPhone}
            onPaymentSelect={handlePaymentSelect}
            onPayNow={handlePayNow}
            paying={submitting}
          />
        </div>
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <OrderSummaryCheckout showHandling={false} />
          </div>
        </div>
      </div>

      {paymentModal === "mpesa" && (
        <MpesaModal
          phone={shippingPhone}
          total={total}
          paying={submitting}
          onConfirm={() => processPayment("mpesa")}
          onClose={() => setPaymentModal(null)}
        />
      )}
      {paymentModal === "card" && (
        <CardModal
          total={total}
          paying={submitting}
          onConfirm={() => processPayment("card")}
          onClose={() => setPaymentModal(null)}
        />
      )}
    </div>
  );
}

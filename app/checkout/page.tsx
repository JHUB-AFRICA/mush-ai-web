"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/shop/cart/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import Breadcrumbs from "@/components/ui/breadcrumbs/Breadcrumbs";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummaryCheckout from "@/components/checkout/OrderSummaryCheckout";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { count, total } = useCart();
  const { user } = useAuth();
  const [shippingData, setShippingData] = useState(null);

  if (count === 0) {
    router.push("/cart");
    return null;
  }

  if (!user) {
    router.push("/auth/login?redirect=/checkout");
    return null;
  }

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    router.push("/payment");
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
          Checkout
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Complete your order details
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ShippingForm onSubmit={handleShippingSubmit} />
        </div>
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <OrderSummaryCheckout />
            <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-4">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Lock size={14} />
                <span>Secure checkout - Your information is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

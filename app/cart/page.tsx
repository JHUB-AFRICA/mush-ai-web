"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/shop/cart/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import CartEmpty from "@/components/shop/cart/CartEmpty";
import Image from "next/image";
import { formatKsh } from "@/lib/format";
import { products } from "@/lib/products";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/shop/product/ProductCard";

export default function CartPage() {
  const router = useRouter();
  const { lines, total, count, setQty, remove } = useCart();
  const { user } = useAuth();

  if (count === 0) {
    return <CartEmpty />;
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Shopping Cart" },
  ];

  // Get suggested products (products not in cart)
  const cartProductIds = new Set(lines.map(l => l.id));
  const suggestedProducts = products
    .filter(p => !cartProductIds.has(p.id))
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-surface">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          {count} {count === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="mb-12">
        {/* Cart Items */}
        <div className="mb-6">
          <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-surface-container-high/80">
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Cart Items
              </h2>
            </div>
            <div className="divide-y divide-surface-container-high/60">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.id);
                if (!product) return null;
                const lineTotal = product.price * line.qty;

                return (
                  <div key={line.id} className="p-4 sm:p-6 flex gap-4">
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-2">
                        <div>
                          <Link href={`/shop/${product.id}`} className="font-semibold text-on-surface hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                          <p className="text-xs text-on-surface-variant mt-0.5">{product.unit}</p>
                        </div>
                        <button
                          onClick={() => remove(line.id)}
                          className="text-on-surface-variant hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(line.id, Math.max(1, line.qty - 1))}
                            className="w-7 h-7 rounded-lg border border-surface-container-high flex items-center justify-center hover:bg-surface-container transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{line.qty}</span>
                          <button
                            onClick={() => setQty(line.id, line.qty + 1)}
                            className="w-7 h-7 rounded-lg border border-surface-container-high flex items-center justify-center hover:bg-surface-container transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-on-surface">{formatKsh(lineTotal)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
            <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({count} items)</span>
                <span>{formatKsh(total)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Handling</span>
                <span className="text-emerald-700">Free</span>
              </div>
              <div className="pt-3 border-t border-surface-container-high/80 flex justify-between text-base font-bold text-on-surface">
                <span>Total</span>
                <span>{formatKsh(total)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-sm font-bold shadow-md transition-colors"
            >
              Proceed to Checkout
            </button>
            {!user && (
              <p className="text-xs text-center text-on-surface-variant mt-3">
                You&apos;ll need to sign in to checkout
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Suggestions */}
      {suggestedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

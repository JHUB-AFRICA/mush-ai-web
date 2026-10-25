"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import AnnouncementBar from "@/components/shop/AnnouncementBar";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductCatalog from "@/components/shop/ProductCatalog";
import ProductDetail from "@/components/shop/ProductDetail";
import GrowerTestimonials from "@/components/shop/GrowerTestimonials";
import LocalPickupSteps from "@/components/shop/LocalPickupSteps";
import ShopFaq from "@/components/shop/ShopFaq";
import CartDrawer from "@/components/shop/CartDrawer";

export default function ShopPageClient() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <ShopHeader />
      <ProductCatalog onSelectProduct={(p) => setSelectedProduct(p)} />
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <GrowerTestimonials />
      <LocalPickupSteps />
      <ShopFaq />
      <CartDrawer />
    </>
  );
}

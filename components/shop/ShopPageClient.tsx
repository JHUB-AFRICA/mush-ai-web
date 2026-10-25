"use client";

import ShopHeader from "@/components/shop/ShopHeader";
import ProductCatalog from "@/components/shop/ProductCatalog";
import GrowerTestimonials from "@/components/shop/GrowerTestimonials";
import LocalPickupSteps from "@/components/shop/LocalPickupSteps";
import ShopFaq from "@/components/shop/ShopFaq";

export default function ShopPageClient() {
  return (
    <>
      <ShopHeader />
      <ProductCatalog />
      <GrowerTestimonials />
      <LocalPickupSteps />
      <ShopFaq />
    </>
  );
}


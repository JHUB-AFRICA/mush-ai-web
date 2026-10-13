import type { Metadata } from "next";
import { CartProvider } from "@/components/shop/CartProvider";
import AnnouncementBar from "@/components/shop/AnnouncementBar";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductCatalog from "@/components/shop/ProductCatalog";
import ProductDetail from "@/components/shop/ProductDetail";
import PickupPolicy from "@/components/shop/PickupPolicy";
import ShopFaq from "@/components/shop/ShopFaq";
import CartDrawer from "@/components/shop/CartDrawer";

export const metadata: Metadata = {
  title: "Shop | SmartMushroom",
  description:
    "Certified mushroom spawn, pumice grow units, IoT sensor kits and fresh harvests, available for cold-chain pickup in Juja and Westlands.",
};

export default function ShopPage() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <ShopHeader />
      <ProductCatalog />
      <ProductDetail />
      <PickupPolicy />
      <ShopFaq />
      <CartDrawer />
    </CartProvider>
  );
}

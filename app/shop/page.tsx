import type { Metadata } from "next";
import ShopPageClient from "@/components/shop/ShopPageClient";

export const metadata: Metadata = {
  title: "Shop Cultivation & Harvest Catalog | SmartMushroom Kenya",
  description:
    "Order certified button mushroom spawn, modular volcanic pumice grow units, IoT telemetry hubs, and peak-grade fresh harvests for pickup in Juja and Westlands.",
};

export default function ShopPage() {
  return <ShopPageClient />;
}

import type { Metadata } from "next";
import ShopView from "@/components/shop/ShopView";

export const metadata: Metadata = {
  title: "Shop & Services | SmartMushroom Kenya",
  description:
    "Order fresh button mushrooms, certified grain spawn, modular pumice grow units, IoT telemetry hubs, and book agronomy training for pickup in Juja and Westlands.",
};

export default function ShopPage() {
  return <ShopView />;
}


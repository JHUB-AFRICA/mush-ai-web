import type { Metadata } from "next";
import Hero from "@/components/farm-structure/Hero";
import RoomSpecs from "@/components/farm-structure/RoomSpecs";
import SensorLayout from "@/components/farm-structure/SensorLayout";
import TelemetryGraph from "@/components/farm-structure/TelemetryGraph";
import FaqSection from "@/components/farm-structure/FaqSection";
import SiteInspectionCta from "@/components/farm-structure/SiteInspectionCta";

export const metadata: Metadata = {
  title: "Farm Structure | SmartMushroom",
  description:
    "Our smart grow room architecture: volcanic pumice walls, HEPA filtration and precision IoT telemetry for East African climates.",
};

export default function FarmStructurePage() {
  return (
    <>
      <Hero />
      <RoomSpecs />
      <SensorLayout />
      <TelemetryGraph />
      <FaqSection />
      <SiteInspectionCta />
    </>
  );
}

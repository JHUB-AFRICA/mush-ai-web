import type { Metadata } from "next";
import HeroSection from "@/components/how-it-works/HeroSection";
import GrowRoomSection from "@/components/how-it-works/GrowRoomSection";
import InsideRoomSection from "@/components/how-it-works/InsideRoomSection";
import ProcessStepsSection from "@/components/how-it-works/ProcessStepsSection";
import ResultMetricsSection from "@/components/how-it-works/ResultMetricsSection";
import FarmerFaqSection from "@/components/how-it-works/FarmerFaqSection";
import InspectionCtaSection from "@/components/how-it-works/InspectionCtaSection";

export const metadata: Metadata = {
  title: "How It Works — Farm Structure & Process | SmartMushroom",
  description:
    "See how our natural volcanic pumice grow rooms and 24/7 smart monitoring system keep mushroom conditions steady and profitable without complex equipment.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex w-full flex-col bg-background">
      <HeroSection />
      <GrowRoomSection />
      <InsideRoomSection />
      <ProcessStepsSection />
      <ResultMetricsSection />
      <FarmerFaqSection />
      <InspectionCtaSection />
    </div>
  );
}

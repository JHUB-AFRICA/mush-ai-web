import type { Metadata } from "next";
import HeroSection from "@/components/about/HeroSection";
import ProblemSection from "@/components/about/ProblemSection";
import GrowRoomSection from "@/components/about/GrowRoomSection";
import InsideRoomSection from "@/components/about/InsideRoomSection";
import ProcessStepsSection from "@/components/about/ProcessStepsSection";
import MushAiSection from "@/components/about/MushAiSection";
import ResultMetricsSection from "@/components/about/ResultMetricsSection";
import FarmerFaqSection from "@/components/about/FarmerFaqSection";
import InspectionCtaSection from "@/components/about/InspectionCtaSection";

export const metadata: Metadata = {
  title: "About — Farm Structure & Process | SmartMushroom",
  description:
    "See how our natural volcanic pumice grow rooms and 24/7 Mush AI monitoring keep mushroom conditions steady and profitable without complex equipment.",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col bg-background">
      <HeroSection />
      <ProblemSection />
      <GrowRoomSection />
      <InsideRoomSection />
      <ProcessStepsSection />
      <MushAiSection />
      <ResultMetricsSection />
      <FarmerFaqSection />
      <InspectionCtaSection />
    </div>
  );
}

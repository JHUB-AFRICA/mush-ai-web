import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Problem from "@/components/home/Problem";
import Approach from "@/components/home/Approach";
import Monitor from "@/components/home/Monitor";
import Mission from "@/components/home/Mission";
import WhyFarmers from "@/components/home/WhyFarmers";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Problem />
      <Approach />
      <Monitor />
      <Partners />
      <Mission />
      <WhyFarmers />
      <Faq />
      <Cta />
    </div>
  );
}

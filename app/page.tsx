import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import Partners from "@/components/home/Partners";
import Workflow from "@/components/home/Workflow";
import Monitor from "@/components/home/Monitor";
import Pumice from "@/components/home/Pumice";
import Community from "@/components/home/Community";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Problem />
      <Partners />
      <Workflow />
      <Monitor />
      <Pumice />
      <Community />
      <Faq />
      <Cta />
    </div>
  );
}

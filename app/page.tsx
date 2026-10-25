import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import Partners from "@/components/home/Partners";
import Monitor from "@/components/home/Monitor";
import Community from "@/components/home/Community";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Problem />
      <Partners />
      <Monitor />
      <Community />
      <Faq />
      <Cta />
    </div>
  );
}

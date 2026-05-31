import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogosMarquee from "@/components/LogosMarquee";
import LeadForm from "@/components/LeadForm";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Method from "@/components/Method";
import Objections from "@/components/Objections";
import About from "@/components/About";
import Differentials from "@/components/Differentials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { FloatingOrb } from "@/components/icons";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <LogosMarquee />
      <LeadForm />
      <Stats />
      <Services />
      <Method />
      <Objections />
      <About />
      <Differentials />
      <FinalCta />
      <Footer />
      <div className="fixed bottom-12 right-12 z-40 pointer-events-none hidden md:block">
        <FloatingOrb />
      </div>
    </div>
  );
}

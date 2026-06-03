import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogosMarquee from "@/components/LogosMarquee";
import IntakeForm from "@/components/IntakeForm";
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

      {/* Hero + card flutuando na fronteira */}
      <div className="relative">
        <Hero />

        {/* Card: absolute bottom-0 translate-y-1/2 = metade na hero, metade fora */}
        <div
          id="form"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-[680px] px-4 md:px-0 z-[60]"
        >
          <IntakeForm inHero />
        </div>
      </div>

      {/* Espaço para acomodar a metade inferior do card */}
      <div className="pt-[360px] md:pt-[380px]">
        <Stats />
      </div>

      <LogosMarquee />
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

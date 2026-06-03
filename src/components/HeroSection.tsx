import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/icons";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="service-title"
      className="bg-black min-h-screen flex items-center text-white relative overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 sm:pt-28 pb-16 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="max-w-4xl lg:max-w-5xl text-left order-2 lg:order-1">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6"
              id="service-title"
            >
              AI-Powered MVP Development
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8">
              Launch a production-ready AI MVP in just 2-3 weeks. Our team blends
              rapid prototyping with enterprise-grade AI/ML engineering to
              validate your idea, attract investors, and win early customers.
            </p>
            <div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#05d664] hover:bg-transparent hover:border-[#05d664] border-2 border-[#05d664] text-black hover:text-[#05d664] transition-all duration-200 text-sm font-medium px-6 py-2.5 h-auto">
                Discuss Your Idea
                <ArrowRight className="lucide lucide-arrow-right ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0">
            <div className="relative z-10 flex items-center justify-center">
              <LogoMark className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

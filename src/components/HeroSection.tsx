import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/icons";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="service-title"
      className="bg-black min-h-screen flex items-center text-white relative overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          loop
          autoPlay
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-section-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 sm:pt-28 pb-16 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="max-w-4xl lg:max-w-5xl text-left order-2 lg:order-1">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6"
              id="service-title"
            >
              Desenvolvimento de MVP com IA
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8">
              Lance um MVP de IA pronto para produção em apenas 2-3 semanas.
              Nosso time combina prototipagem rápida com engenharia de IA/ML de
              nível enterprise para validar sua ideia, atrair investidores e
              conquistar os primeiros clientes.
            </p>
            <div>
              <button data-ab-cta="book-call" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium px-6 py-2.5 h-auto">
                Conte sua Ideia
                <ArrowRight className="lucide lucide-arrow-right ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 mt-8 lg:mt-0">
            <div className="relative z-10 flex items-center justify-center">
              <LogoMark className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

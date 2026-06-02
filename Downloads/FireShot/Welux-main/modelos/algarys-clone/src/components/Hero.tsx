import EmanatingChars from "@/components/ui/emanating-chars";

export default function Hero() {
  return (
    <section
      id="home"
      className="md:min-h-[62vh] min-h-[62vh] flex items-center justify-center relative overflow-visible border-b border-accent section-px pb-[100px] md:pb-[140px]"
    >
      <EmanatingChars />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.78) 100%)",
        }}
      />

      {/* eslint-disable @next/next/no-img-element */}
      <img alt="" className="absolute bottom-0 left-0 w-full pointer-events-none" src="/pages/home/glow/1.svg" style={{ filter: "blur(10px)" }} />
      <img alt="" className="absolute bottom-0 left-0 w-full pointer-events-none" src="/pages/home/glow/2.svg" style={{ filter: "blur(20px)" }} />
      <img alt="" className="absolute bottom-0 left-0 w-full pointer-events-none" src="/pages/home/glow/3.svg" />
      {/* eslint-enable @next/next/no-img-element */}

      <div className="section-container flex flex-col md:items-center md:justify-center gap-3 z-10">
        <h1 className="slide-in-blur slide-in-blur-1 text-3xl md:text-6xl font-regular text-heading md:text-center tracking-tight">
          A maioria das empresas paga <br className="hidden md:block" /> caro por IAs que não funcionam
        </h1>
        <h2 className="slide-in-blur slide-in-blur-2 text-base md:text-lg text-body md:text-center leading-1.4">
          A gente entra na sua operação, mostra onde a IA gera retorno, constrói o que fizer sentido e entrega{" "}
          <br className="hidden md:block" /> com sua equipe usando. 4 fases. Tudo com retorno calculado antes da primeira entrega
        </h2>
        <a href="#form" className="slide-in-blur slide-in-blur-2 btn-pulse inline-block bg-accent text-base md:text-lg font-medium text-black px-4 py-2 mt-3 rounded-md w-fit cursor-pointer">
          Agendar análise gratuita
        </a>
      </div>
    </section>
  );
}

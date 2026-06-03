import RainingLetters from "@/components/ui/raining-letters";

export default function Hero() {
  return (
    <section
      id="home"
      className="md:min-h-[62vh] min-h-[80vh] flex items-center justify-center relative overflow-visible border-b border-accent section-px pt-[120px] md:pt-0 pb-[300px] md:pb-[180px]"
    >
      <RainingLetters />

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

      <div className="section-container flex flex-col md:items-center md:justify-center gap-6 z-10">
        <h1 className="slide-in-blur slide-in-blur-1 text-3xl md:text-6xl font-regular text-heading md:text-center tracking-tight">
          Sua operação sangra dinheiro enquanto você tenta adaptar IAs de prateleira.{" "}
          <br className="hidden md:block" />
          Nós construímos motores de lucro sob medida.
        </h1>
        <h2 className="slide-in-blur slide-in-blur-2 text-base md:text-lg text-body md:text-center leading-1.4">
          A maioria das empresas paga caro por inteligências artificiais genéricas que a equipe não usa. A Welux é uma{" "}
          <br className="hidden md:block" />
          Software House de IA: entramos na sua operação, mapeamos os gargalos de custo, provamos o ROI matematicamente e entregamos a engenharia pronta. Sem achismos.
        </h2>
        <a href="#form" className="slide-in-blur slide-in-blur-2 btn-pulse inline-block bg-accent text-base md:text-lg font-medium text-black px-4 py-2 mt-6 rounded-md w-fit cursor-pointer">
          Agendar Sessão de Viabilidade
        </a>
        <p className="slide-in-blur slide-in-blur-2 text-xs text-muted text-center mt-0">
          Apenas para empresas faturando acima de R$ 5M/ano buscando escala operacional.
        </p>
      </div>
    </section>
  );
}

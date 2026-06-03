const TEXTURE_GREEN = "/pages/home/textures/testura_white.webp";
const TEXTURE_WHITE_BLUR = "/pages/home/textures/testura_white_blur.webp";

const tex = (url: string) => ({
  backgroundImage: `url("${url}")`,
  backgroundSize: "500px",
  backgroundRepeat: "repeat" as const,
});

const CORNER = "absolute z-10 size-[14px] bg-background border border-[#807f7f]";

function CtaRings({ wave }: { wave: 1 | 2 | 3 }) {
  return (
    <div className={`cta-rings cta-wave${wave} absolute w-full h-full pointer-events-none`}>
      <div className="cta-ring1 absolute w-full h-full" style={tex(TEXTURE_GREEN)} />
      <div className="cta-ring2 absolute w-full h-full" style={tex(TEXTURE_GREEN)} />
      <div className="cta-ring3 absolute w-full h-full" style={tex(TEXTURE_WHITE_BLUR)} />
    </div>
  );
}

export default function FinalCta() {
  return (
    <section id="cta-final" className="relative section-px py-[55px] md:py-[120px]">
      <div className="section-container">
        <div className="animate-fade-up relative w-full h-fit py-12 md:h-[360px] border border-[#454545]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={tex(TEXTURE_GREEN)} />
            <CtaRings wave={1} />
            <CtaRings wave={2} />
            <CtaRings wave={3} />
          </div>
          <span aria-hidden className={`${CORNER} -top-[7px] -left-[7px]`} />
          <span aria-hidden className={`${CORNER} -top-[7px] -right-[7px]`} />
          <span aria-hidden className={`${CORNER} -bottom-[7px] -left-[7px]`} />
          <span aria-hidden className={`${CORNER} -bottom-[7px] -right-[7px]`} />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-10 gap-6 md:gap-8">
            <h2 className="font-medium text-[20px] md:text-[40px] leading-1.1 text-primary text-center max-w-[820px]">
              Se você não sabe por onde começar, este é o botão que você deve clicar.
            </h2>
            <p className="text-sm md:text-base text-muted text-center max-w-[600px]">
              Agende uma call de 30 minutos com nossos fundadores. Sem jargões, sem pressão. Se a sua empresa não tiver maturidade de dados para IA agora, seremos os primeiros a avisar para você não rasgar dinheiro.
            </p>
            <a href="#form" className="btn-pulse inline-block bg-accent text-base md:text-lg font-medium text-black px-6 py-3 md:px-5 md:py-2.5 rounded-md w-fit cursor-pointer hover:bg-accent-hover">
              Solicitar Análise de Viabilidade Técnica
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="cta-final" className="relative section-px py-[40px] md:py-[100px]">
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
              A dúvida que sobrou é exatamente
              <br className="hidden md:block" /> o que a gente resolve na primeira <br className="md:hidden" />
              conversa.
            </h2>
            <button className="btn-pulse bg-accent text-base md:text-lg font-medium text-black px-6 py-3 md:px-5 md:py-2.5 rounded-md w-fit cursor-pointer hover:bg-accent-hover">
              Falar com a Welux
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

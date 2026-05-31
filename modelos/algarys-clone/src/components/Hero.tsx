const TEXTURE_GREEN = "/pages/home/textures/testura_white.webp";
const TEXTURE_WHITE = "/pages/home/textures/testura_white.webp";
const TEXTURE_WHITE_BLUR = "/pages/home/textures/testura_white_blur.webp";

const tex = (url: string) => ({
  backgroundImage: `url("${url}")`,
  backgroundSize: "500px",
  backgroundRepeat: "repeat" as const,
});

function RingsWrapper({ wave }: { wave: 1 | 2 | 3 }) {
  return (
    <div className={`rings-wrapper wave${wave} absolute w-full h-full`}>
      <div className="ring1 absolute w-full h-full" style={tex(TEXTURE_WHITE)} />
      <div className="ring2 absolute w-full h-full" style={tex(TEXTURE_GREEN)} />
      <div className="ring3 absolute w-full h-full" style={tex(TEXTURE_GREEN)} />
      <div className="ring4 absolute w-full h-full" style={tex(TEXTURE_WHITE_BLUR)} />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="md:min-h-screen min-h-screen-almost flex items-center justify-center relative overflow-hidden border-b border-accent section-px"
    >
      <div className="absolute inset-0 opacity-5" style={tex(TEXTURE_GREEN)} />
      <RingsWrapper wave={1} />
      <RingsWrapper wave={2} />
      <RingsWrapper wave={3} />

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
        <button className="slide-in-blur slide-in-blur-2 btn-pulse bg-accent text-base md:text-lg font-medium text-black px-4 py-2 mt-3 rounded-md w-fit cursor-pointer">
          Agendar análise gratuita
        </button>
      </div>
    </section>
  );
}

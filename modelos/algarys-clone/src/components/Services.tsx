interface ServiceCard {
  code: string;
  video: string;
  videoLabel: string;
  title: string;
  body: string;
}

const cards: ServiceCard[] = [
  {
    code: "ALG 0.1",
    video: "/pages/home/video/Timelineredred.mp4",
    videoLabel: "Bloco isométrico com IA central e nós conectados por linhas tracejadas",
    title: "Desenvolvimento Personalizado de IA",
    body: "Pra empresas que já decidiram implementar IA e precisam de engenharia real por trás. Construímos o que foi provado que funciona sob medida, integrado na sua operação e com resultado acompanhado.",
  },
  {
    code: "ALG 0.2",
    video: "/pages/home/video/Timelinered.mp4",
    videoLabel: "Pilha de camadas isométricas com lupa indicando análise de dados",
    title: "Diagnóstico IA - 30 dias",
    body: "Pra empresas que querem saber onde IA gera resultado antes de investir em desenvolvimento. Diagnóstico profundo do seu negócio, retorno calculado com base nos seus dados reais e protótipo funcionando.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="section-px py-[54px] md:py-[103px] scroll-mt-25">
      <div className="section-container flex flex-col items-center gap-[40px] md:gap-[55px]">
        <div className="flex w-full flex-col gap-[25px]">
          <h2 className="font-medium text-[28px] leading-1.1 text-primary md:text-[40px] md:max-w-[737px]">
            Do diagnóstico à implementação:
            <span className="text-[#aaa]"> o nível de maturidade define o próximo passo</span>
          </h2>
          <p className="font-light text-[15px] leading-1.4 text-muted md:text-[20px] md:max-w-[487px]">
            O caminho certo depende do momento da sua empresa. Te ajudamos a identificar qual faz sentido agora.
          </p>
        </div>
        <div className="flex w-full flex-col gap-[43px] md:flex-row md:items-stretch md:gap-[40px]">
          {cards.map((c, i) => (
            <div key={c.code} className="contents">
              <article className="flex flex-1 flex-col gap-[17px] md:h-[514px] md:justify-between md:gap-0">
                <p className="font-light text-[15px] leading-1.4 text-[#373737]">{c.code}</p>
                <div className="flex w-full items-center justify-center overflow-hidden md:py-2">
                  <video
                    src={c.video}
                    aria-label={c.videoLabel}
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="metadata"
                    className="h-auto w-full max-w-[420px] object-contain mix-blend-screen md:max-w-[400px]"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-bold text-[15px] leading-1.1 text-primary">{c.title}</h3>
                  <p className="font-light text-[15px] leading-1.4 text-muted">{c.body}</p>
                </div>
              </article>
              {i === 0 && (
                <div aria-hidden="true" className="hidden md:block w-px self-stretch bg-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

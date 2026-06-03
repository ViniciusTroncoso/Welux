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
    title: "Engenharia e Implementação",
    body: "Para quem já tem diagnóstico ou demandas claras de infraestrutura. Nossos engenheiros constroem agentes e sistemas de IA robustos, integrados ao seu ERP, CRM e banco de dados — com código, não com prompts genéricos. A IA se adapta à sua empresa, não o contrário.",
  },
  {
    code: "ALG 0.2",
    video: "/pages/home/video/Timelinered.mp4",
    videoLabel: "Pilha de camadas isométricas com lupa indicando análise de dados",
    title: "Diagnóstico de Risco Zero — 30 dias",
    body: "Para quem sabe que precisa de IA, mas não sabe onde o ROI está escondido. Em 30 dias, fazemos um raio-x dos seus processos. O entregável: um protótipo funcional e um Business Case com o cálculo exato de horas e reais economizados. Você vê a matemática antes de aprovar qualquer desenvolvimento.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="section-px py-[70px] md:py-[120px] scroll-mt-25">
      <div className="section-container flex flex-col items-center gap-[48px] md:gap-[70px]">
        <div className="flex w-full flex-col gap-[30px]">
          <h2 className="font-medium text-[28px] leading-1.1 text-primary md:text-[40px] md:max-w-[737px]">
            Pare de tentar adivinhar o que construir.
            <span className="text-[#aaa]"> Nós ditamos a arquitetura ideal.</span>
          </h2>
          <p className="font-light text-[15px] leading-1.4 text-muted md:text-[20px] md:max-w-[487px]">
            Não vendemos software por vender. O nível de maturidade dos seus dados define o seu próximo passo estratégico.
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

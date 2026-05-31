interface Diff {
  icon: string;
  alt: string;
  title: React.ReactNode;
  body: string;
  mobile: { width: string; height: string; inset: string };
  desktopInset: string;
}

const items: Diff[] = [
  {
    icon: "/pages/home/diferenciais/search.svg",
    alt: "Ícone de lupa",
    title: "Método próprio de diagnóstico",
    body: "Na Welux, antes de desenvolver, diagnosticamos onde IA gera retorno e provamos com seus dados.",
    mobile: { width: "39.197px", height: "39.197px", inset: "-331.52%" },
    desktopInset: "-331.52%",
  },
  {
    icon: "/pages/home/diferenciais/atom.svg",
    alt: "Ícone de átomo",
    title: (
      <>
        Foco exclusivo
        <br />
        em IA
      </>
    ),
    body: "Enquanto o mercado adiciona IA, a Welux nasceu para gerar resultado real no cliente.",
    mobile: { width: "57px", height: "58px", inset: "-219.71% -226.15% -220.36% -223.39%" },
    desktopInset: "-328.94%",
  },
  {
    icon: "/pages/home/diferenciais/hard-hat.svg",
    alt: "Ícone de capacete",
    title: "Engenheiros especializados",
    body: "Welux entrega engenharia, profundidade técnica, responsabilidade e resultado em produção.",
    mobile: { width: "58px", height: "51px", inset: "-246.62% -225.62% -255.23% -224.63%" },
    desktopInset: "-325.64% -333.98% -321.48%",
  },
  {
    icon: "/pages/home/diferenciais/chart-bars.svg",
    alt: "Ícone de gráfico de barras",
    title: "Resultado calculado antes de começar",
    body: "Antes de investir, você sabe o impacto exato da solução ou avisamos antes.",
    mobile: { width: "53px", height: "59px", inset: "-218.62% -244.41% -217.42% -233.9%" },
    desktopInset: "-331.52% -323.18%",
  },
  {
    icon: "/pages/home/diferenciais/settings.svg",
    alt: "Ícone de engrenagem",
    title: "Acompanhamento pós-entrega",
    body: "A Welux monitora a IA em produção e garante resultado real na operação.",
    mobile: { width: "56px", height: "58px", inset: "-222.71% -231.81% -225.67% -227.21%" },
    desktopInset: "-333.05% -328.77%",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="section-px py-[55px] md:py-[100px] scroll-mt-25">
      <div className="section-container">
        <ul className="flex flex-col gap-[75px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[113px] md:gap-y-[80px]">
          {items.map((it, i) => (
            <li
              key={i}
              className="animate-fade-up flex flex-col gap-[12px] md:w-[360px] md:gap-[14px]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* mobile icon */}
              <div className="relative shrink-0 md:hidden" style={{ width: it.mobile.width, height: it.mobile.height }}>
                <div className="absolute" style={{ inset: it.mobile.inset }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={it.alt} className="block h-full w-full max-w-none" src={it.icon} />
                </div>
              </div>
              {/* desktop icon */}
              <div className="relative hidden size-[40.573px] shrink-0 md:block mb-4">
                <div className="absolute" style={{ inset: it.desktopInset }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={it.alt} className="block h-full w-full max-w-none" src={it.icon} />
                </div>
              </div>
              <h3 className="font-regular text-[30px] leading-1.1 text-primary md:text-[40px]">{it.title}</h3>
              <p className="font-normal text-[12px] leading-1.4 text-muted md:text-[16px]">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

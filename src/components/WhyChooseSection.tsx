'use client';

import { useEffect, useRef, useState } from 'react';

const items = [
  {
    heading: 'Expertise Nativa em IA',
    description:
      'Nossa equipe é especializada em tecnologias de IA de ponta, incluindo LLMs, machine learning e IA generativa',
    image: '/Differentiators/image.webp',
  },
  {
    heading: 'Lançamento Rápido no Mercado',
    description:
      'Lance seu MVP de IA em 2 a 3 semanas com nosso processo de desenvolvimento ágil e frameworks comprovados',
    image: '/Differentiators/image-2.webp',
  },
  {
    heading: 'Qualidade de Nível Produção',
    description:
      'Qualidade de código, segurança e escalabilidade de nível enterprise em cada solução de IA que entregamos',
    image: '/Differentiators/image-3.webp',
  },
  {
    heading: 'Suporte de Ponta a Ponta',
    description:
      'Da ideia à implantação e além, oferecemos suporte completo durante toda a sua jornada de IA',
    image: '/Differentiators/image.webp',
  },
  {
    heading: 'Soluções com Bom Custo-Benefício',
    description:
      'Tenha desenvolvimento de IA de nível enterprise a preços acessíveis para startups, sem abrir mão da qualidade',
    image: '/Differentiators/image-2.webp',
  },
  {
    heading: 'Histórico Comprovado',
    description:
      'Mais de 100 projetos de IA entregues com sucesso para startups e grandes empresas de diversos setores',
    image: '/Differentiators/image-3.webp',
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setOffset(0);
        return;
      }

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const maxOffset = track.scrollWidth - window.innerWidth;
      if (maxOffset <= 0) {
        setOffset(0);
        return;
      }

      setOffset(progress * maxOffset);
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white sm:h-[calc(100vh+140vw)]">
      {/* Desktop: pinned horizontal-scroll gallery */}
      <div className="hidden sm:block sm:sticky sm:top-0 sm:h-screen sm:overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-medium text-gray-900 mb-2 font-general-sans">
                Por que escolher a Welux para Desenvolvimento de IA
              </h2>
              <p className="text-[18px] sm:text-lg md:text-xl font-normal text-gray-600 max-w-3xl font-general-sans">
                <span className="text-green-700 font-semibold"></span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex items-start overflow-hidden">
            <div
              ref={trackRef}
              className="flex flex-row gap-28 will-change-transform pr-[20vw]"
              style={{ transform: `translateX(${-offset}px)` }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-[22rem]">
                  <div
                    className={
                      index % 2 === 0
                        ? 'flex flex-col h-full'
                        : 'flex flex-col-reverse h-full'
                    }
                  >
                    <div className="mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-56 object-cover"
                        src={item.image}
                        alt={item.heading}
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-gray-900 font-general-sans font-medium">
                        {item.heading}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed font-general-sans font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical snap list */}
      <div className="sm:hidden px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-[32px] font-medium text-gray-900 mb-2 font-general-sans">
              Por que escolher a Welux para Desenvolvimento de IA
            </h2>
            <p className="text-[18px] font-normal text-gray-600 font-general-sans">
              <span className="text-green-600 font-semibold"></span>
            </p>
          </div>
          <div className="snap-y snap-mandatory overflow-y-auto space-y-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="snap-start min-h-[50vh] flex flex-col justify-center"
              >
                <div className="flex flex-col">
                  <div className="space-y-2 mb-5">
                    <h3 className="text-[24px] font-semibold text-gray-900 font-general-sans font-medium">
                      {item.heading}
                    </h3>
                    <p className="text-[18px] text-gray-600 leading-relaxed font-general-sans font-normal">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-56 object-cover rounded-lg"
                      src={item.image}
                      alt={item.heading}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

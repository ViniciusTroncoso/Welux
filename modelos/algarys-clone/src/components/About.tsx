"use client";

import { useEffect, useState } from "react";

const FOTO_1 = "/pages/home/quem_somos/foto_1.webp";
const FOTO_2 = "/pages/home/quem_somos/foto_2.webp";

function Paragraphs({ className }: { className: string }) {
  return (
    <>
      <p className={className}>
        <span className="text-white">Somos uma software house especializada exclusivamente em IA aplicada a negócios.</span>{" "}
        Não atuamos com soluções genéricas nem com múltiplos serviços. Nosso foco é um só: estruturar, desenvolver e
        acompanhar sistemas de IA que geram impacto real na operação.
      </p>
      <p className={className}>
        Fundada por <span className="text-white">Júlio Matzenbacher e Eduardo Melo,</span>{" "}
        <span className="text-white">a Welux opera desde Brasília com um time de engenheiros, analistas e product owners especializados em IA.</span>{" "}
        Cada projeto é conduzido por profissionais técnicos de verdade não por quem aprendeu numa ferramenta de automação.
      </p>
    </>
  );
}

export default function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % 2), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Desktop */}
      <section id="quem-somos" className="hidden h-[599px] scroll-mt-25 px-[100px] md:flex md:flex-col md:items-center md:justify-center">
        <div className="animate-fade-up relative flex h-full w-full max-w-container items-center gap-[50px] rounded-b-[28px] border border-border bg-surface/90 px-[44px] py-[16px] backdrop-blur-[20px]">
          <div className="relative h-full w-[513px] shrink-0 overflow-hidden rounded-[12px]">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              alt="Equipe Welux em conversa estratégica"
              loading="lazy"
              className="absolute left-[43px] top-[48px] h-[443px] w-[229px] rounded-[20px] object-cover"
              src={FOTO_1}
              style={{ objectPosition: "65% 50%" }}
            />
            <img
              alt="Apresentação da metodologia Welux"
              loading="lazy"
              className="absolute left-[238px] top-[86px] h-[444px] w-[230px] rounded-[20px] object-cover -scale-x-100"
              src={FOTO_2}
            />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
          <div className="flex h-[513px] flex-1 flex-col justify-center">
            <div className="flex w-full flex-col gap-[30px]">
              <h2 className="font-medium leading-1.1 text-white text-[30px]">
                Quem está por trás da <span className="text-white">Welux</span>
              </h2>
              <Paragraphs className="font-normal text-[16px] leading-1.4 text-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="flex flex-col items-center gap-[38px] scroll-mt-25 border-y border-border bg-surface/90 px-[24px] pt-[25px] pb-[40px] backdrop-blur-[20px] md:hidden">
        <div className="animate-fade-up relative h-[343px] w-[327px] overflow-hidden rounded-[12px]">
          {[FOTO_1, FOTO_2].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              src={src}
            />
          ))}
          <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 gap-[6px]">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-[5px] w-[50px] rounded-full border-[0.2px] border-[#6c6c6c] transition-colors ${i === current ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
        <div className="animate-fade-up flex w-full flex-col gap-[30px]" style={{ animationDelay: "100ms" }}>
          <h2 className="font-medium leading-1.1 text-white text-[30px]">
            Quem está por trás da <span className="text-white">Welux</span>
          </h2>
          <Paragraphs className="font-normal text-[15px] leading-[1.6] text-[#ababab]" />
        </div>
      </section>
    </>
  );
}

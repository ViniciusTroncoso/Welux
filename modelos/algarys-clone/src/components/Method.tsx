"use client";

import { useState } from "react";
import { methodSteps } from "@/lib/content";

const NUMBER_GRADIENT =
  "bg-clip-text text-transparent bg-gradient-to-b from-[#171717] from-[15%] to-[#0f0f0f] to-[83%]";

export default function Method() {
  const [active, setActive] = useState(0);

  return (
    <section id="metodologia" className="section-px pt-[50px] pb-[20px] md:pt-[115px] md:pb-[40px] scroll-mt-25">
      <div className="section-container flex flex-col items-center gap-[29px] md:gap-[52px]">
        <div className="flex w-full flex-col gap-[25px]">
          <h2 className="font-medium text-[28px] leading-1.1 text-muted md:text-[40px]">
            O método que <span className="text-primary">garante previsibilidade</span> em projetos de{" "}
            <span className="text-primary">IA</span>
          </h2>
          <p className="font-light text-[15px] leading-1.4 text-muted md:text-[20px] md:max-w-[889px]">
            Transparência em cada etapa. Você investe no que já foi provado e acompanha o retorno do início ao fim.
          </p>
        </div>

        {/* Mobile: stacked static cards */}
        <ul className="flex w-full flex-col gap-[7px] md:hidden">
          {methodSteps.map((step, i) => (
            <li
              key={step.number}
              className="animate-fade-up relative flex w-full flex-col gap-[20px] overflow-hidden rounded-[8px] border border-[#454545]/20 bg-[#0f0f0f] px-[20px] py-[40px]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold leading-1.1 text-[179px] tracking-[-5.97px] ${NUMBER_GRADIENT}`}
              >
                {step.number}
              </span>
              <h3 className="relative font-normal text-[25px] leading-1.1 text-primary tracking-[-1.1px]">{step.title}</h3>
              <p className="relative font-light text-[10px] leading-1.4 text-muted">{step.description}</p>
            </li>
          ))}
        </ul>

        {/* Desktop: horizontal click accordion */}
        <div className="hidden w-full md:flex md:gap-[12.7px]">
          {methodSteps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.number}
                type="button"
                aria-expanded={isActive}
                aria-label={`Etapa ${step.number}: ${step.label}`}
                onClick={() => setActive(i)}
                className="group relative h-[535px] cursor-pointer overflow-hidden rounded-[8px] border border-border bg-surface text-left"
                style={{
                  flex: isActive ? "1 1 0%" : "0 0 120px",
                  minWidth: 0,
                  transition: "flex-grow 600ms ease-out, flex-basis 500ms ease-out, flex-shrink 500ms ease-out",
                }}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-[21%] -translate-x-1/2 -translate-y-1/2 select-none font-bold leading-1.1 text-[179px] tracking-[-5.63px] whitespace-nowrap ${NUMBER_GRADIENT} transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-[79%] origin-center whitespace-nowrap font-normal text-[33.27px] text-primary tracking-[-1.05px] leading-1.1 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
                  style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
                >
                  {step.label}
                </span>
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 h-full transition-opacity duration-300 ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{ width: 989 }}
                >
                  <div className="absolute inset-0 bg-[#0f0f0f]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" src={step.image} />
                  <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(185deg, rgba(5,5,5,0) 6%, rgb(5,5,5) 79%)" }} />
                </div>
                <div
                  className={`pointer-events-none absolute top-0 left-0 h-full flex flex-col justify-end gap-[11px] px-[54px] py-[40px] transition-opacity duration-300 ${isActive ? "opacity-100 delay-200" : "opacity-0"}`}
                  style={{ width: 989 }}
                >
                  <p className="font-normal text-[31px] leading-1.1 text-primary tracking-[-1.05px] whitespace-nowrap">{step.title}</p>
                  <p className="font-light text-[16px] leading-1.4 text-muted">{step.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

const photos = [
  "/pages/home/carrosel_fotos/felipe.webp?v=2",
  "/pages/home/carrosel_fotos/pedro.webp?v=2",
  "/pages/home/carrosel_fotos/imagem_form.webp?v=2",
];

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative w-full">
      <select
        name={name}
        aria-label={label}
        required
        defaultValue=""
        className="input-field appearance-none bg-surface pr-10 text-placeholder"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-primary">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-placeholder" />
    </div>
  );
}

export default function LeadForm() {
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="form"
      className="scroll-mt-25 relative overflow-hidden flex flex-col py-12 md:py-16 md:px-[100px] items-center justify-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div
          className="w-[220%] md:w-[1100px] h-[420px] md:h-[260px] mb-[200px] opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 100%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.18) 48%, transparent 72%)",
            transform: "rotate(-22deg)",
          }}
        />
      </div>

      <div className="section-container relative z-10 flex section-px flex-col md:flex-row items-center bg-surface/95 justify-center px-6 py-10 md:p-4 md:pr-16 gap-8 md:gap-16 md:rounded-2xl border border-border">
        {/* Photo carousel (desktop) */}
        <div className="relative w-full h-[763.1px] overflow-hidden rounded-xl hidden md:flex items-center justify-center">
          {photos.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              loading="lazy"
              decoding="async"
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              src={src}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50 w-2"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-center gap-6 md:gap-8 w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-3xl font-normal text-heading">
              Preencha abaixo. Em até 5 minutos a gente te chama no WhatsApp pra uma conversa rápida
            </h1>
            <p className="text-base md:text-lg text-body max-w-text">
              &quot;O que a gente vai fazer na primeira conversa: entender sua operação, mapear onde a IA gera resultado e te
              mostrar se faz sentido avançar
            </p>
          </div>
          <form className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-3 w-full md:max-w-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <input aria-label="Qual seu nome?" required placeholder="Qual seu nome?" className="input-field" type="text" name="nome" />
              <input aria-label="WhatsApp com DDD" required placeholder="WhatsApp com DDD" maxLength={15} className="input-field" type="tel" name="telefone" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <input aria-label="Seu melhor e-mail" required placeholder="Seu melhor e-mail" className="input-field" type="email" name="email" />
              <input aria-label="Nome da empresa" required placeholder="Nome da empresa" className="input-field" type="text" name="empresa" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <input aria-label="Seu cargo" required placeholder="Seu cargo" className="input-field" type="text" name="cargo" />
              <Select
                name="tamanho"
                label="Tamanho da empresa"
                options={[
                  { value: "0-10", label: "0-10 funcionários" },
                  { value: "10-20", label: "10-20 funcionários" },
                  { value: "20-50", label: "20-50 funcionários" },
                  { value: "50+", label: "50+ funcionários" },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <Select
                name="faturamento"
                label="Faturamento mensal"
                options={[
                  { value: "ate-50k", label: "Até R$ 50 mil/mês" },
                  { value: "50k-150k", label: "R$ 50 mil a R$ 150 mil/mês" },
                  { value: "150k-500k", label: "R$ 150 mil a R$ 500 mil/mês" },
                  { value: "500k+", label: "Acima de R$ 500 mil/mês" },
                ]}
              />
              <Select
                name="ia_implementada"
                label="Já implementou IA na empresa antes?"
                options={[
                  { value: "sim", label: "Sim, já tentei" },
                  { value: "nao", label: "Não, ainda não" },
                ]}
              />
            </div>
            <textarea
              name="gargalo"
              aria-label="Qual o maior gargalo da sua operação hoje?"
              required
              placeholder="Qual o maior gargalo da sua operação hoje?"
              className="input-field min-h-[80px] resize-none w-full"
            />
            <button type="submit" className="btn-primary">
              Enviar
            </button>
            <a href="/termos" className="text-xs text-secondary text-center hover:text-primary transition-colors">
              Ao enviar, você concorda com nossos termos de serviço.
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

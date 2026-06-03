"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";

function getVariant(): "a" | "b" {
  const m = document.cookie.match(/(?:^|;\s*)ab-variant=(a|b)/);
  return (m?.[1] as "a" | "b") ?? "b";
}

const SELECTS = [
  {
    name: "tamanho",
    label: "Tamanho da empresa",
    options: [
      ["0-10", "0-10 funcionários"],
      ["10-20", "10-20 funcionários"],
      ["20-50", "20-50 funcionários"],
      ["50+", "50+ funcionários"],
    ],
  },
  {
    name: "faturamento",
    label: "Faturamento mensal",
    options: [
      ["ate-50k", "Até R$ 50 mil/mês"],
      ["50k-150k", "R$ 50 mil a R$ 150 mil/mês"],
      ["150k-500k", "R$ 150 mil a R$ 500 mil/mês"],
      ["500k+", "Acima de R$ 500 mil/mês"],
    ],
  },
  {
    name: "ia_implementada",
    label: "Já implementou IA antes?",
    options: [
      ["sim", "Sim, já tentei"],
      ["nao", "Não, ainda não"],
    ],
  },
] as const;

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none transition-colors";

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Open when any "Agende uma Call" CTA ([data-ab-cta="book-call"]) is clicked.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-ab-cta="book-call"]')) {
        e.preventDefault();
        setDone(false);
        setOpen(true);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string)?.trim() || "";
    const variant = getVariant();
    const meta = {
      cargo: get("cargo"),
      tamanho: get("tamanho"),
      faturamento: get("faturamento"),
      ia_implementada: get("ia_implementada"),
      gargalo: get("gargalo"),
    };
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          variant,
          origem: "clone-popup",
          nome: get("nome"),
          email: get("email"),
          telefone: get("telefone"),
          empresa: get("empresa"),
          mensagem: get("gargalo"),
          meta,
        }),
      });
      // A lead submission counts as the A/B conversion for this variant.
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ variant, event: "conversion" }),
      }).catch(() => {});
      setDone(true);
    } catch {
      // keep the form open so the user can retry
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-medium text-black">Recebemos seus dados!</h3>
            <p className="mt-2 text-sm text-gray-600">
              Em até 5 minutos a gente te chama no WhatsApp pra uma conversa rápida.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-lg border-2 border-black bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-medium text-black">Agende uma Call</h3>
            <p className="mt-1 mb-6 text-sm text-gray-600">
              Preencha abaixo. Em até 5 minutos a gente te chama no WhatsApp.
            </p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="nome" required placeholder="Seu nome" className={inputCls} />
                <input
                  name="telefone"
                  required
                  type="tel"
                  maxLength={20}
                  placeholder="WhatsApp com DDD"
                  className={inputCls}
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className={inputCls}
                />
                <input name="empresa" required placeholder="Nome da empresa" className={inputCls} />
                <input name="cargo" placeholder="Seu cargo" className={`${inputCls} sm:col-span-2`} />
                {SELECTS.map((s) => (
                  <select
                    key={s.name}
                    name={s.name}
                    defaultValue=""
                    className={`${inputCls} appearance-none ${s.name === "ia_implementada" ? "sm:col-span-2" : ""}`}
                  >
                    <option value="" disabled>
                      {s.label}
                    </option>
                    {s.options.map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
              <textarea
                name="gargalo"
                placeholder="Qual o maior gargalo da sua operação hoje?"
                className={`${inputCls} min-h-[80px] resize-none`}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-1 rounded-lg bg-black px-6 py-3 text-sm font-medium uppercase text-white transition-all duration-300 hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Enviar"}
              </button>
              <p className="text-center text-xs text-gray-400">
                Ao enviar, você concorda com nossos termos de serviço.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

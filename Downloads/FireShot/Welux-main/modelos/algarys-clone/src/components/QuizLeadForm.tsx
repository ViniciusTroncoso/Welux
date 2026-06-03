"use client"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import ResultScreen from "@/components/quiz/ResultScreen"
import type { Routing } from "@/lib/scoring"

// ── Questions mapped to scoring fields ────────────────────────────────────────

const QUESTIONS = [
  {
    field: "cargo",
    text: "Qual é o seu papel na empresa?",
    options: [
      { label: "Fundador / CEO",            value: "Fundador / CEO" },
      { label: "Gestor / Diretor",           value: "Gestor / Diretor" },
      { label: "Analista / Colaborador",     value: "Analista / Colaborador" },
      { label: "Outra função",               value: "Outra função" },
    ],
  },
  {
    field: "tamanho",
    text: "Quantas pessoas trabalham na empresa?",
    options: [
      { label: "Menos de 10",       value: "<10" },
      { label: "10 a 50 pessoas",   value: "10-50" },
      { label: "50 a 200 pessoas",  value: "50-200" },
      { label: "Mais de 200",       value: "200+" },
    ],
  },
  {
    field: "ia_antes",
    text: "Como sua empresa se relaciona com IA hoje?",
    options: [
      { label: "Ainda não usamos IA",              value: "começar" },
      { label: "Testamos, mas sem resultado real",  value: "testar" },
      { label: "Usamos algumas ferramentas",        value: "ferramentas" },
      { label: "Já usamos e queremos escalar",      value: "escalar" },
    ],
  },
] as const

type Answer = { label: string; value: string }

// ── Shared styles ─────────────────────────────────────────────────────────────

const sectionBg = {
  background: "#050505",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
}

const Glow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)",
    }}
  />
)

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuizLeadForm({ inHero = false }: { inHero?: boolean }) {
  const [step, setStep] = useState(0)                    // 0-2 = questions, 3 = contact
  const [answers, setAnswers] = useState<Answer[]>([])
  const [screen, setScreen] = useState<null | "loading" | Routing>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [resultDismissed, setResultDismissed] = useState(false)
  const expandedRef = useRef(false)

  const TOTAL_STEPS = QUESTIONS.length + 1              // 3 questions + contact

  // ── handlers ────────────────────────────────────────────────────────────────

  function handleOption(opt: Answer) {
    if (!expandedRef.current) {
      expandedRef.current = true
      setIsExpanded(true)
    }
    const next = [...answers, opt]
    setAnswers(next)
    setStep((s) => s + 1)
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !whatsapp.trim() || submitting) return
    setSubmitting(true)
    setScreen("loading")

    const a = answers
    const gargaloLabel = a[2]?.label ?? ""

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cargo:        a[0]?.value ?? "",
          tamanho:      a[1]?.value ?? "",
          faturamento:  "",
          ia_antes:     a[2]?.value ?? "",
          gargalo_tags: [gargaloLabel],
          gargalo:      `${a[0]?.label ?? ""} em empresa de ${a[1]?.label ?? ""}. IA: ${gargaloLabel}.`,
          nome,
          whatsapp,
        }),
      })
      const { routing } = (await res.json()) as { routing: Routing }
      setScreen(routing)
    } catch {
      setScreen("warm")
    }
  }

  // ── result ───────────────────────────────────────────────────────────────────

  if (screen && screen !== "loading" && !resultDismissed) {
    const inner = (
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <ResultScreen screen={screen} />
      </div>
    )

    if (inHero) {
      return createPortal(
        <div className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
          <Glow />
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setResultDismissed(true)}
            className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/40 hover:text-white hover:border-white/40 transition-all font-mono text-[20px] rounded-sm"
          >
            ×
          </button>
          {inner}
        </div>,
        document.body
      )
    }
    return (
      <section className="relative flex flex-col min-h-dvh" style={sectionBg}>
        <Glow />
        {inner}
      </section>
    )
  }

  // ── progress header ──────────────────────────────────────────────────────────

  const progressPct = screen === "loading" ? 100 : (step / TOTAL_STEPS) * 100

  const header = (
    <div className="relative z-10 flex flex-col gap-0 px-5 md:px-6 pt-5 flex-shrink-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 border border-white/[0.12] px-2.5 py-1 rounded-sm font-mono text-[11px] text-white/40 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
          Aria · IA Welux
        </span>
      </div>
      <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/50 rounded-full"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="font-mono text-[10px] text-white/20 tracking-wider uppercase">
          Diagnóstico gratuito
        </span>
        <span className="font-mono text-[10px] text-white/20 tracking-wider">
          {Math.min(step + 1, TOTAL_STEPS)}/{TOTAL_STEPS}
        </span>
      </div>
    </div>
  )

  // ── loading ───────────────────────────────────────────────────────────────────

  if (screen === "loading") {
    const loadingInner = (
      <>
        {header}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 px-6">
          <motion.div
            className="w-10 h-10 rounded-full border border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            style={{ borderTopColor: "rgba(255,255,255,0.65)" }}
          />
          <p className="font-mono text-[12px] text-white/35 tracking-widest uppercase text-center leading-relaxed">
            Aria está calculando<br />seu diagnóstico
          </p>
        </div>
      </>
    )
    if (inHero && isExpanded) {
      return createPortal(
        <section className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
          <Glow />
          {loadingInner}
        </section>,
        document.body
      )
    }
    return (
      <div
        className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]"
        style={sectionBg}
      >
        {loadingInner}
      </div>
    )
  }

  // ── quiz body ─────────────────────────────────────────────────────────────────

  const isContactStep = step === QUESTIONS.length

  const body = (
    <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center px-5 md:px-6 py-5">
      <AnimatePresence mode="wait">
        {isContactStep ? (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="text-[clamp(20px,3vw,30px)] font-light tracking-[-0.5px] text-white leading-[1.15]">
                Último passo.
              </p>
              <p className="text-white/35 text-[13px] mt-1.5">
                Onde enviamos seu diagnóstico?
              </p>
            </div>
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-2.5">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] rounded-sm px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp (com DDD)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] rounded-sm px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!nome.trim() || !whatsapp.trim()}
                className="mt-1 bg-white text-black px-5 py-3 rounded-sm text-[14px] font-semibold hover:bg-white/90 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                Ver meu diagnóstico →
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4"
          >
            <p className="text-[clamp(18px,2.8vw,28px)] font-light tracking-[-0.5px] text-white leading-[1.2]">
              {QUESTIONS[step].text}
            </p>
            <div className="flex flex-col gap-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOption({ label: opt.label, value: opt.value })}
                  className="text-left border border-white/[0.09] px-4 py-3 rounded-sm text-[13px] text-white/50 hover:border-white/[0.35] hover:text-white hover:bg-white/[0.03] transition-all duration-150 flex items-center gap-3 group"
                >
                  <span className="w-3.5 h-3.5 rounded-sm border border-white/20 flex-shrink-0 group-hover:border-white/45 transition-colors" />
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  // ── render: fullscreen ────────────────────────────────────────────────────────

  if (inHero && isExpanded) {
    return createPortal(
      <section className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
        <Glow />
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setIsExpanded(false)}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/40 hover:text-white hover:border-white/40 transition-all font-mono text-[20px] rounded-sm"
        >
          ×
        </button>
        {header}
        {body}
      </section>,
      document.body
    )
  }

  // ── render: card (completed state) ───────────────────────────────────────────

  if (screen) {
    return (
      <div
        className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]"
        style={sectionBg}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <div className="w-8 h-8 rounded-full border border-white/[0.18] flex items-center justify-center">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase">
            Diagnóstico enviado
          </p>
        </div>
      </div>
    )
  }

  // ── render: card ──────────────────────────────────────────────────────────────

  return (
    <div
      className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]"
      style={sectionBg}
    >
      {header}
      {body}
    </div>
  )
}

"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import ResultScreen from "@/components/quiz/ResultScreen"
import type { Routing } from "@/lib/scoring"

// ── Data ──────────────────────────────────────────────────────────────────────

const FREE_DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com",
  "yahoo.com.br","hotmail.com.br","live.com","uol.com.br","terra.com.br",
  "bol.com.br","ig.com.br","globo.com","protonmail.com","tutanota.com",
]

// Cargo + tamanho cruzados em um único card
const CARGO_ROLE = [
  {
    value: "hot_founder",
    label: "Sou Fundador / C-Level",
    desc:  "Lidero uma equipe de 10 ou mais pessoas",
  },
  {
    value: "warm_founder",
    label: "Sou Fundador / C-Level",
    desc:  "Operação enxuta — 1 a 9 pessoas",
  },
  {
    value: "warm_director",
    label: "Sou Diretor / Gerente",
    desc:  "Busco inovação para minha área",
  },
  {
    value: "cold_operator",
    label: "Sou da operação",
    desc:  "Quero sugerir melhorias para o time",
  },
]

const DOR = [
  {
    value: "vendas",
    label: "Vendas e Conversão",
    desc:  "Meus leads esfriam porque o atendimento é lento ou manual",
  },
  {
    value: "custo",
    label: "Custo Operacional",
    desc:  "Minha equipe gasta horas em tarefas repetitivas e burocráticas",
  },
  {
    value: "retencao",
    label: "Retenção e CS",
    desc:  "Meu suporte não dá conta do volume e a experiência do cliente cai",
  },
  {
    value: "dados",
    label: "Dados e Gestão",
    desc:  "Não tenho visibilidade em tempo real — dados espalhados e desorganizados",
  },
]

const MATURIDADE = [
  {
    value: "crm",
    label: "Usamos CRMs e ERPs maduros",
    desc:  "HubSpot, Salesforce, RD Station, Bling, SAP ou similar",
  },
  {
    value: "planilhas",
    label: "Usamos planilhas e ferramentas ágeis",
    desc:  "Google Sheets, Trello, Notion, ClickUp",
  },
  {
    value: "manual",
    label: "Está no WhatsApp, no papel ou na cabeça",
    desc:  "Processos ainda não documentados ou sistematizados",
  },
]

const ORCAMENTO = [
  {
    value: "mvp",
    label: "Até R$ 5.000",
    desc:  "Automações rápidas e pontuais (MVP)",
  },
  {
    value: "5k-15k",
    label: "R$ 5.000 a R$ 15.000",
    desc:  "Integrar sistemas, CRM e automatizar fluxos inteiros",
  },
  {
    value: "above15k",
    label: "R$ 15.000 a R$ 30.000+",
    desc:  "Agentes autônomos de IA e infraestrutura robusta",
  },
  {
    value: "none",
    label: "Sem orçamento no momento",
    desc:  "Só quero entender como a tecnologia funciona",
  },
]

// ── Styles ────────────────────────────────────────────────────────────────────

const sectionBg = {
  background: "#050505",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
}

const Glow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
)

function richCard(active: boolean) {
  return `text-left border rounded-sm p-4 transition-all duration-150 flex flex-col gap-1 cursor-pointer ${
    active
      ? "border-white/50 bg-white/[0.05]"
      : "border-white/[0.09] hover:border-white/[0.28] hover:bg-white/[0.02]"
  }`
}

const inputCls = "w-full bg-white/[0.03] border border-white/[0.10] rounded-sm px-3 py-2.5 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
const labelCls = "text-[10px] text-white/30 tracking-widest uppercase font-mono"

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  cargoRole:  string
  dor:        string
  maturidade: string
  orcamento:  string
  nome:       string
  email:      string
  whatsapp:   string
}

const EMPTY: FormData = {
  cargoRole: "", dor: "", maturidade: "", orcamento: "",
  nome: "", email: "", whatsapp: "",
}

const TOTAL = 5  // screens 0–4

// ── Component ─────────────────────────────────────────────────────────────────

export default function IntakeForm({ inHero = false }: { inHero?: boolean }) {
  const [step,            setStep]            = useState(-1)
  const [data,            setData]            = useState<FormData>(EMPTY)
  const [emailError,      setEmailError]      = useState("")
  const [screen,          setScreen]          = useState<null | "loading" | Routing>(null)
  const [resultDismissed, setResultDismissed] = useState(false)
  const [isExpanded,      setIsExpanded]      = useState(false)

  function setField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setData(d => ({ ...d, [k]: v }))
  }

  function validateEmail(e: string): string {
    if (!e.includes("@")) return "E-mail inválido"
    const domain = e.split("@")[1]?.toLowerCase() ?? ""
    return FREE_DOMAINS.includes(domain) ? "Use seu e-mail corporativo" : ""
  }

  // Single-select screens: set value then advance after brief highlight
  function autoAdvance(field: keyof FormData, val: string) {
    setData(d => ({ ...d, [field]: val }))
    setTimeout(() => setStep(s => s + 1), 180)
  }

  function canAdvance(): boolean {
    if (step !== 4) return false
    const err = validateEmail(data.email)
    return !!(data.nome.trim() && data.email && !err && data.whatsapp.trim())
  }

  async function handleContactSubmit() {
    const err = validateEmail(data.email)
    if (err) { setEmailError(err); return }
    if (!canAdvance()) return
    setScreen("loading")
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const { routing, calendly } = await res.json() as { routing: Routing; calendly?: string }
      if (routing === "hot" && calendly) { window.location.href = calendly; return }
      setScreen(routing)
    } catch {
      setScreen("warm")
    }
  }

  // ── Progress ──────────────────────────────────────────────────────────────────

  const progressPct = step < 0 ? 0 : screen === "loading" ? 100 : (step / TOTAL) * 100

  // ── Helpers (called as functions, not as JSX components) ──────────────────────

  function renderHeader() {
    return (
      <div className="relative z-10 flex flex-col px-5 md:px-6 pt-5 flex-shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 border border-white/[0.12] px-2.5 py-1 rounded-sm font-mono text-[11px] text-white/40 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
            Aria · IA Welux
          </span>
        </div>
        <div className="h-px w-full bg-white/[0.06] overflow-hidden">
          <motion.div className="h-full bg-white/50"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-mono text-[10px] text-white/20 tracking-wider uppercase">Raio-X de IA</span>
          {step >= 0 && (
            <span className="font-mono text-[10px] text-white/20 tracking-wider">{step + 1} / {TOTAL}</span>
          )}
        </div>
      </div>
    )
  }

  function renderClose(onClick: () => void) {
    return (
      <button type="button" aria-label="Fechar" onClick={onClick}
        className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/40 hover:text-white hover:border-white/40 transition-all font-mono text-[20px] rounded-sm">
        ×
      </button>
    )
  }

  // ── Screens ───────────────────────────────────────────────────────────────────

  function renderStep() {
    // ── 0: Cargo + Tamanho ────────────────────────────────────────────────────
    if (step === 0) return (
      <div className="flex flex-col gap-3">
        <p className="text-[clamp(17px,2.8vw,24px)] font-light tracking-[-0.4px] text-white mb-1">
          Qual é o seu papel e o tamanho da sua operação?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {CARGO_ROLE.map(opt => (
            <button key={opt.value} type="button" onClick={() => autoAdvance("cargoRole", opt.value)}
              className={richCard(data.cargoRole === opt.value)}>
              <span className={`text-[14px] font-medium leading-snug ${data.cargoRole === opt.value ? "text-white" : "text-white/70"}`}>
                {opt.label}
              </span>
              <span className="text-[12px] text-white/30 leading-relaxed">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    )

    // ── 1: Dor financeira ─────────────────────────────────────────────────────
    if (step === 1) return (
      <div className="flex flex-col gap-3">
        <p className="text-[clamp(17px,2.8vw,24px)] font-light tracking-[-0.4px] text-white mb-1">
          Se você pudesse resolver um único gargalo com IA para aumentar sua margem, qual seria?
        </p>
        <div className="flex flex-col gap-2">
          {DOR.map(opt => (
            <button key={opt.value} type="button" onClick={() => autoAdvance("dor", opt.value)}
              className={richCard(data.dor === opt.value)}>
              <span className={`text-[14px] font-medium leading-snug ${data.dor === opt.value ? "text-white" : "text-white/70"}`}>
                {opt.label}
              </span>
              <span className="text-[12px] text-white/30 leading-relaxed">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    )

    // ── 2: Maturidade de dados ────────────────────────────────────────────────
    if (step === 2) return (
      <div className="flex flex-col gap-3">
        <p className="text-[clamp(17px,2.8vw,24px)] font-light tracking-[-0.4px] text-white mb-1">
          Como você organiza as informações e processos da empresa hoje?
        </p>
        <div className="flex flex-col gap-2">
          {MATURIDADE.map(opt => (
            <button key={opt.value} type="button" onClick={() => autoAdvance("maturidade", opt.value)}
              className={richCard(data.maturidade === opt.value)}>
              <span className={`text-[14px] font-medium leading-snug ${data.maturidade === opt.value ? "text-white" : "text-white/70"}`}>
                {opt.label}
              </span>
              <span className="text-[12px] text-white/30 leading-relaxed">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    )

    // ── 3: Orçamento com ancoragem de ROI ─────────────────────────────────────
    if (step === 3) return (
      <div className="flex flex-col gap-4">
        <div className="border border-white/[0.06] rounded-sm px-4 py-3 bg-white/[0.02]">
          <p className="text-[12px] text-white/35 leading-relaxed">
            Projetos de IA não são software de prateleira. São sistemas sob medida construídos
            por engenheiros para <span className="text-white/55">reduzir custos e aumentar vendas</span>.
          </p>
        </div>
        <p className="text-[clamp(17px,2.8vw,24px)] font-light tracking-[-0.4px] text-white">
          Para resolver esse gargalo, qual nível de investimento está no radar da empresa?
        </p>
        <div className="flex flex-col gap-2">
          {ORCAMENTO.map(opt => (
            <button key={opt.value} type="button" onClick={() => autoAdvance("orcamento", opt.value)}
              className={richCard(data.orcamento === opt.value)}>
              <span className={`text-[14px] font-medium leading-snug ${data.orcamento === opt.value ? "text-white" : "text-white/70"}`}>
                {opt.label}
              </span>
              <span className="text-[12px] text-white/30 leading-relaxed">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    )

    // ── 4: Contato ────────────────────────────────────────────────────────────
    if (step === 4) return (
      <div className="flex flex-col gap-4">
        <p className="text-[clamp(17px,2.8vw,24px)] font-light tracking-[-0.4px] text-white mb-1">
          Para onde enviamos o resultado da sua análise?
        </p>
        <div className="flex flex-col gap-1">
          <span className={labelCls}>Nome completo</span>
          <input className={inputCls} placeholder="Seu nome" value={data.nome}
            onChange={e => setField("nome", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <span className={labelCls}>E-mail corporativo</span>
          <input className={`${inputCls} ${emailError ? "border-red-500/40" : ""}`}
            type="email" placeholder="voce@empresa.com" value={data.email}
            onChange={e => { setField("email", e.target.value); setEmailError("") }} />
          {emailError && <span className="text-[11px] text-red-400/70 font-mono">{emailError}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <span className={labelCls}>WhatsApp (com DDD)</span>
          <input className={inputCls} type="tel" placeholder="(11) 99999-9999" value={data.whatsapp}
            onChange={e => setField("whatsapp", e.target.value)} />
        </div>
      </div>
    )

    return null
  }

  // ── Portals ───────────────────────────────────────────────────────────────────

  if (screen === "loading" && inHero) {
    return createPortal(
      <section className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
        <Glow />
        {renderHeader()}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 px-6">
          <motion.div className="w-10 h-10 rounded-full border border-white/20"
            animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            style={{ borderTopColor: "rgba(255,255,255,0.65)" }} />
          <p className="font-mono text-[12px] text-white/35 tracking-widest uppercase text-center leading-relaxed">
            Aria está analisando<br />seu raio-x
          </p>
        </div>
      </section>,
      document.body
    )
  }

  if (screen && screen !== "loading" && !resultDismissed && inHero) {
    return createPortal(
      <div className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
        <Glow />
        {renderClose(() => setResultDismissed(true))}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <ResultScreen screen={screen} />
        </div>
      </div>,
      document.body
    )
  }

  if (screen) {
    return (
      <div className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]" style={sectionBg}>
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/[0.18] flex items-center justify-center">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Diagnóstico enviado</p>
        </div>
      </div>
    )
  }

  if (inHero && isExpanded && step >= 0) {
    const showNext = step === 4
    return createPortal(
      <section className="fixed inset-0 z-[200] flex flex-col" style={sectionBg}>
        <Glow />
        {renderClose(() => setIsExpanded(false))}
        {renderHeader()}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-5 md:px-6 py-5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}>
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
        {showNext && (
          <div className="relative z-10 flex-shrink-0 px-5 md:px-6 pb-6 pt-3 border-t border-white/[0.04]">
            <button type="button" onClick={handleContactSubmit} disabled={!canAdvance()}
              className="w-full bg-white text-black py-3 rounded-sm text-[14px] font-semibold hover:bg-white/90 disabled:opacity-25 disabled:cursor-not-allowed transition-all">
              Ver meu diagnóstico →
            </button>
          </div>
        )}
      </section>,
      document.body
    )
  }

  // ── Teaser card ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]" style={sectionBg}>
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 gap-6">
        <span className="inline-flex items-center gap-1.5 border border-white/[0.12] px-2.5 py-1 rounded-sm font-mono text-[11px] text-white/40 tracking-widest uppercase w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
          Aria · IA Welux
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-[clamp(22px,3.5vw,38px)] font-light tracking-[-1px] text-white leading-[1.1]">
            Sua operação tem maturidade para Inteligência Artificial?
          </p>
          <p className="text-[13px] text-white/35 leading-relaxed">
            Descubra em 2 minutos se sua empresa está pronta para escalar com IA ou se você estaria apenas rasgando dinheiro.
          </p>
        </div>
        <button type="button" onClick={() => { setIsExpanded(true); setStep(0) }}
          className="w-fit border border-white/[0.18] px-6 py-2.5 rounded-sm text-[13px] text-white/60 hover:border-white/45 hover:text-white hover:bg-white/[0.04] transition-all duration-150 font-mono tracking-wider">
          Iniciar Raio-X Gratuito →
        </button>
      </div>
    </div>
  )
}

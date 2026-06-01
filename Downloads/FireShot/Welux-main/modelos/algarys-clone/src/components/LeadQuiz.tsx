// src/components/LeadQuiz.tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProgressBar from "@/components/quiz/ProgressBar"
import CardStep from "@/components/quiz/CardStep"
import GargaloStep from "@/components/quiz/GargaloStep"
import ContactStep from "@/components/quiz/ContactStep"
import ResultScreen from "@/components/quiz/ResultScreen"
import type { FormData, Routing } from "@/lib/scoring"

// ── Constants ─────────────────────────────────────────

const TOTAL_STEPS = 6

const PHOTOS = [
  "/pages/home/carrosel_fotos/felipe.webp?v=2",
  "/pages/home/carrosel_fotos/pedro.webp?v=2",
  "/pages/home/carrosel_fotos/imagem_form.webp?v=2",
]

const CARD_STEPS = [
  {
    key: "cargo",
    question: "Qual é o seu papel na empresa?",
    sub: "Isso ajuda a direcionar a conversa certa.",
    options: [
      { value: "Fundador / CEO", label: "Fundador / CEO" },
      { value: "Gestor / Diretor", label: "Gestor / Diretor" },
      { value: "Analista / Operacional", label: "Analista / Operacional" },
      { value: "Outro", label: "Outro" },
    ],
  },
  {
    key: "tamanho",
    question: "Quantos funcionários tem sua empresa?",
    sub: null,
    options: [
      { value: "1-10", label: "1 a 10" },
      { value: "10-50", label: "10 a 50" },
      { value: "50-200", label: "50 a 200" },
      { value: "200+", label: "Mais de 200" },
    ],
  },
  {
    key: "faturamento",
    question: "Qual o faturamento mensal da empresa?",
    sub: "Confidencial — usado apenas para calibrar a proposta.",
    options: [
      { value: "ate-50k", label: "Até R$ 50 mil" },
      { value: "50k-150k", label: "R$ 50k a R$ 150k" },
      { value: "150k-500k", label: "R$ 150k a R$ 500k" },
      { value: "500k+", label: "Acima de R$ 500k" },
    ],
  },
  {
    key: "ia_antes",
    question: "Já tentou implementar IA na sua empresa?",
    sub: null,
    options: [
      { value: "nunca", label: "Nunca tentei" },
      { value: "falhou", label: "Tentei e não funcionou" },
      { value: "escalar", label: "Já uso e quero escalar" },
    ],
  },
]

const INITIAL_FORM: FormData = {
  cargo: "",
  tamanho: "",
  faturamento: "",
  ia_antes: "",
  gargalo_tags: [],
  gargalo: "",
  nome: "",
  whatsapp: "",
}

// ── Component ──────────────────────────────────────────

export default function LeadQuiz() {
  const [photo, setPhoto] = useState(0)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [screen, setScreen] = useState<null | "loading" | Routing>(null)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)

  // Auto photo carousel
  useEffect(() => {
    const id = setInterval(() => setPhoto((p) => (p + 1) % PHOTOS.length), 4000)
    return () => clearInterval(id)
  }, [])

  function advance() {
    setDirection(1)
    setStep((s) => s + 1)
  }

  function back() {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  function selectCard(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setTimeout(advance, 180)
  }

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      gargalo_tags: f.gargalo_tags.includes(tag)
        ? f.gargalo_tags.filter((t) => t !== tag)
        : [...f.gargalo_tags, tag],
    }))
  }

  async function submit() {
    setScreen("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { routing: Routing }
      setScreen(data.routing)
    } catch {
      setScreen("warm")
    }
  }

  // Result screen — full-width, no photo layout
  if (screen) {
    return (
      <section
        id="form"
        className="scroll-mt-25 flex items-center justify-center py-16 px-6"
      >
        <ResultScreen screen={screen} />
      </section>
    )
  }

  return (
    <section
      id="form"
      className="scroll-mt-25 relative overflow-hidden flex flex-col py-12 md:py-16 md:px-[100px] items-center justify-center"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          className="w-[220%] md:w-[1100px] h-[420px] md:h-[260px] mb-[200px] opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 100%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.18) 48%, transparent 72%)",
            transform: "rotate(-22deg)",
          }}
        />
      </div>

      <div className="section-container relative z-10 flex section-px flex-col md:flex-row items-stretch bg-surface/95 justify-center px-6 py-10 md:p-4 md:pr-16 gap-8 md:gap-16 md:rounded-2xl border border-border">

        {/* Photo carousel — desktop only */}
        <div
          className="relative w-full overflow-hidden rounded-xl hidden md:flex items-center justify-center"
          style={{ minHeight: 640 }}
        >
          {PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === photo ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhoto(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === photo ? "bg-white w-6" : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quiz area */}
        <div
          className="flex flex-col justify-between gap-6 w-full"
          style={{ minHeight: 520 }}
        >
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* Animated step content */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-6"
              >
                {step < 4 && (
                  <CardStep
                    config={CARD_STEPS[step]}
                    value={form[CARD_STEPS[step].key as keyof FormData] as string}
                    onSelect={(v) => selectCard(CARD_STEPS[step].key, v)}
                  />
                )}
                {step === 4 && (
                  <GargaloStep
                    tags={form.gargalo_tags}
                    text={form.gargalo}
                    onToggleTag={toggleTag}
                    onTextChange={(v) => setForm((f) => ({ ...f, gargalo: v }))}
                    onNext={advance}
                  />
                )}
                {step === 5 && (
                  <ContactStep
                    nome={form.nome}
                    whatsapp={form.whatsapp}
                    onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))}
                    onSubmit={submit}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Back button */}
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="text-xs text-secondary hover:text-primary transition-colors self-start"
            >
              ← Voltar
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

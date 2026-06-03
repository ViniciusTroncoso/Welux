"use client"

import { motion } from "framer-motion"

type Screen = "loading" | "hot" | "warm" | "cold"

interface ResultScreenProps {
  screen: Screen
}

const CONTENT = {
  hot: {
    heading: "Alto fit identificado.",
    body: "Seu perfil passou pelo filtro. Nossa equipe recebeu seu raio-x e você receberá o link de agendamento no WhatsApp em instantes.",
    detail: "Call técnica de 30 min · sem pressão · sem jargões.",
  },
  warm: {
    heading: "Perfil promissor.",
    body: "Seu nível de maturidade é sólido. Um especialista da Welux vai validar algumas informações com você pelo WhatsApp ainda hoje.",
    detail: "Fique de olho no WhatsApp.",
  },
  cold: {
    heading: "Sua operação ainda não está pronta.",
    body: "Pela análise do seu raio-x, implementar IA agora não traria o ROI ideal — você estaria rasgando dinheiro antes de ter os processos organizados.",
    detail: "Enviamos um guia de organização de processos no seu WhatsApp. Esse é o primeiro passo real.",
  },
}

function CheckIcon() {
  return (
    <svg
      className="w-6 h-6 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function ResultScreen({ screen }: ResultScreenProps) {
  if (screen === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Analisando seu perfil"
        className="flex flex-col items-center gap-6 py-24 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full"
        />
        <p className="text-body">Analisando seu perfil...</p>
      </div>
    )
  }

  const c = CONTENT[screen]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center gap-4 py-24 text-center max-w-sm mx-auto"
    >
      <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center">
        <CheckIcon />
      </div>
      <h2 className="text-3xl font-normal text-heading">{c.heading}</h2>
      <p className="text-body">{c.body}</p>
      <p className="text-sm text-secondary">{c.detail}</p>
    </motion.div>
  )
}

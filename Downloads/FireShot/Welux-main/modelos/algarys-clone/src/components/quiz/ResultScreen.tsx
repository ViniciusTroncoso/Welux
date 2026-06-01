"use client"

import { motion } from "framer-motion"

type Screen = "loading" | "hot" | "warm" | "cold"

interface ResultScreenProps {
  screen: Screen
}

const CONTENT = {
  hot: {
    heading: "Tudo certo.",
    body: "Nossa equipe recebeu seu perfil e entra em contato pelo WhatsApp em até 5 minutos.",
    detail: "Deixe o celular por perto.",
  },
  warm: {
    heading: "Recebemos seu contato.",
    body: "Você será chamado ainda hoje pelo nosso time.",
    detail: "Fique de olho no WhatsApp.",
  },
  cold: {
    heading: "Obrigado pelo interesse.",
    body: "Antes de falar com a gente, preparamos um diagnóstico gratuito de IA para operações.",
    detail: "Enviamos o material no WhatsApp que você informou.",
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

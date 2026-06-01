// src/components/quiz/ContactCard.tsx
"use client"

import { useState } from "react"

interface ContactCardProps {
  onSubmit: (nome: string, whatsapp: string) => void
  disabled?: boolean
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function ContactCard({ onSubmit, disabled = false }: ContactCardProps) {
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const canSubmit =
    nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 11

  function handleSubmit() {
    if (!canSubmit || disabled) return
    const rawPhone = whatsapp.replace(/\D/g, "")
    const normalized = rawPhone.startsWith("55") ? rawPhone : `55${rawPhone}`
    onSubmit(nome.trim(), normalized)
  }

  return (
    <div className="flex flex-col gap-3 pt-1">
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={disabled}
        autoComplete="name"
        aria-label="Seu nome"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-heading placeholder:text-secondary/50 focus:outline-none focus:border-white/25 transition-colors disabled:opacity-50"
      />
      <input
        type="tel"
        placeholder="WhatsApp com DDD"
        value={whatsapp}
        onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
        disabled={disabled}
        autoComplete="tel"
        inputMode="numeric"
        aria-label="WhatsApp com DDD"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-heading placeholder:text-secondary/50 focus:outline-none focus:border-white/25 transition-colors disabled:opacity-50"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || disabled}
        className="w-full rounded-lg bg-primary text-background text-sm font-medium py-2 transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </div>
  )
}

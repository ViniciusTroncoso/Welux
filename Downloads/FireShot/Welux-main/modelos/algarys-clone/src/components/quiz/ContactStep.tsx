"use client"

interface ContactStepProps {
  nome: string
  whatsapp: string
  onChange: (key: "nome" | "whatsapp", value: string) => void
  onSubmit: () => void
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function ContactStep({
  nome,
  whatsapp,
  onChange,
  onSubmit,
}: ContactStepProps) {
  const canSubmit =
    nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl md:text-3xl font-normal text-heading" style={{ lineHeight: 1.1 }}>
          Perfeito. Como a gente te chama no WhatsApp?
        </h2>
        <p className="text-sm text-secondary">
          Em até 5 minutos você recebe nossa ligação.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => onChange("nome", e.target.value)}
          className="input-field"
          aria-label="Seu nome"
          autoComplete="name"
        />
        <input
          type="tel"
          placeholder="WhatsApp com DDD"
          value={whatsapp}
          onChange={(e) => onChange("whatsapp", formatPhone(e.target.value))}
          className="input-field"
          aria-label="WhatsApp com DDD"
          autoComplete="tel"
          inputMode="numeric"
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Quero ser chamado
        </button>
        <span className="text-xs text-secondary">
          Ao continuar, você concorda com nossos{" "}
          <a href="/termos" className="hover:text-primary transition-colors">
            termos de serviço
          </a>
          .
        </span>
      </div>
    </div>
  )
}

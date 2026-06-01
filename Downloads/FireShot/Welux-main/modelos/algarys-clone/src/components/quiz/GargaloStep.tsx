"use client"

const TAGS = [
  "Atendimento",
  "Processos repetitivos",
  "Dados / BI",
  "Vendas",
  "Financeiro",
  "RH",
  "Outro",
]

interface GargaloStepProps {
  tags: string[]
  text: string
  onToggleTag: (tag: string) => void
  onTextChange: (value: string) => void
  onNext: () => void
}

export default function GargaloStep({
  tags,
  text,
  onToggleTag,
  onTextChange,
  onNext,
}: GargaloStepProps) {
  const canAdvance = tags.length > 0 || text.trim().length >= 5

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl md:text-3xl font-normal text-heading" style={{ lineHeight: 1.1 }}>
          Qual é o maior gargalo da sua operação hoje?
        </h2>
        <p className="text-sm text-secondary">Selecione uma ou mais áreas.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={tags.includes(tag)}
            onClick={() => onToggleTag(tag)}
            className={[
              "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
              tags.includes(tag)
                ? "border-white/30 bg-white/8 text-heading"
                : "border-border text-body hover:border-white/20",
            ].join(" ")}
          >
            {tag}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Descreva com suas palavras (opcional, mas ajuda muito)"
        className="input-field min-h-[80px] resize-none w-full"
        aria-label="Descrição do gargalo"
      />

      <button
        type="button"
        onClick={onNext}
        disabled={!canAdvance}
        className="btn-primary self-start disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
    </div>
  )
}

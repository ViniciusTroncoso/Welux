"use client"

interface CardOption {
  value: string
  label: string
}

interface CardStepConfig {
  key: string
  question: string
  sub: string | null
  options: CardOption[]
}

interface CardStepProps {
  config: CardStepConfig
  value: string
  onSelect: (value: string) => void
}

export default function CardStep({ config, value, onSelect }: CardStepProps) {
  const cols =
    config.options.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-2"

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl md:text-3xl font-normal text-heading" style={{ lineHeight: 1.1 }}>
          {config.question}
        </h2>
        {config.sub && (
          <p className="text-sm text-secondary">{config.sub}</p>
        )}
      </div>

      <div className={`grid gap-2 ${cols}`}>
        {config.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={[
              "rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
              value === opt.value
                ? "border-white/30 bg-white/8 text-heading"
                : "border-border bg-surface/50 text-body hover:border-white/20 hover:bg-white/5",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

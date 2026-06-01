"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  step: number
  total: number
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-secondary">
          Etapa {step + 1} de {total}
        </span>
        <span className="text-xs text-secondary">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso do formulário"
        className="h-1 bg-border rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

interface ChatHeadingProps {
  subtext?: string
}

export default function ChatHeading({
  subtext = "3 minutos · sem pitch · resultado calculado",
}: ChatHeadingProps) {
  return (
    <motion.div
      className="px-5 md:px-12 pt-7 pb-4 flex-shrink-0 relative z-10 overflow-hidden"
      initial={{ opacity: 1, height: "auto" }}
      exit={{
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h2 className="text-[clamp(28px,4.5vw,52px)] font-light tracking-[-1.5px] leading-[1.05] text-white">
        Diagnóstico de IA
      </h2>
      <p className="font-mono text-[10px] tracking-[2.5px] text-white/20 uppercase mt-2">
        {subtext}
      </p>
    </motion.div>
  )
}

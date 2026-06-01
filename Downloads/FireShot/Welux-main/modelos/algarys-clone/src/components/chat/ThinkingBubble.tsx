"use client"

import { useEffect, useState } from "react"

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

export default function ThinkingBubble() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 80)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-2 max-w-[280px] border-l-2 border-white/40 pl-5 pr-4 py-3 bg-white/[0.015] rounded-r-lg">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[13px] text-white/50 leading-none">{FRAMES[frame]}</span>
        <span className="font-mono text-[9px] tracking-[3px] text-white/30 uppercase">
          Aria processando
        </span>
      </div>
      <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full"
          style={{ animation: "thinking-progress 2.4s ease-in-out infinite" }}
        />
      </div>
    </div>
  )
}

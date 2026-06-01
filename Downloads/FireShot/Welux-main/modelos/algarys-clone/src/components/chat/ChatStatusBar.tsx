"use client"

import { useEffect, useState } from "react"

export default function ChatStatusBar() {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex justify-between items-center px-5 md:px-12 py-4 border-b border-white/[0.04] flex-shrink-0 relative z-10">
      <span className="font-mono text-[10px] tracking-[3px] text-white/25 uppercase hidden md:block">
        WELUX.AI / ARIA — DIAGNÓSTICO OPERACIONAL
      </span>
      <span className="font-mono text-[10px] tracking-[2px] text-white/25 uppercase md:hidden">
        WELUX.AI / ARIA
      </span>
      <div className="flex items-center gap-2 font-mono text-[9px] tracking-[2px] text-white/45 border border-white/10 px-3 py-[5px] rounded-sm">
        <span
          className="w-[5px] h-[5px] rounded-full bg-white flex-shrink-0 transition-opacity duration-1000"
          style={{ opacity: pulse ? 1 : 0.25 }}
        />
        LIVE SESSION
      </div>
    </div>
  )
}

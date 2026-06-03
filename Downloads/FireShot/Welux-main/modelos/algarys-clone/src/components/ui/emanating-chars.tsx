"use client"

import { useEffect, useRef } from "react"

const ALL_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?" +
  "αβγδεζηθλμνξπρστυφχψωΩΣΔΦΨΓΛΘΠ"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  char: string
  size: number
  life: number
  maxLife: number
  alpha: number
}

function rndChar() {
  return ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
}

function spawnParticle(cx: number, cy: number): Particle {
  const angle = Math.random() * Math.PI * 2
  // nasce perto do centro do sol (raio pequeno = fonte)
  const birthR = Math.random() * 20
  const speed = 0.3 + Math.random() * 1.1
  return {
    x: cx + Math.cos(angle) * birthR,
    y: cy + Math.sin(angle) * birthR,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    char: rndChar(),
    size: 8 + Math.random() * 7,
    life: Math.random(),
    maxLife: 0.55 + Math.random() * 0.8,
    alpha: 0.45 + Math.random() * 0.45,
  }
}

export default function EmanatingChars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let W = 0
    let H = 0
    let cx = 0
    let cy = 0
    let rafId: number = 0
    let particles: Particle[] = []
    let started = false

    function init(w: number, h: number) {
      W = w
      H = h
      cx = W / 2
      cy = H * 0.82  // sol na base — atrás do chat card
      canvas!.width = W
      canvas!.height = H
      particles = Array.from({ length: 120 }, () => spawnParticle(cx, cy))
    }

    function frame(ts: number) {
      ctx.clearRect(0, 0, W, H)

      // sol: glow suave, queda rápida — não vira blob
      const pulse = 0.65 + 0.35 * Math.sin(ts / 1800)
      const glowR = Math.min(W * 0.38, 320)
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
      g.addColorStop(0,    `rgba(255,255,255,${(0.18 * pulse).toFixed(3)})`)
      g.addColorStop(0.18, `rgba(255,255,255,${(0.06 * pulse).toFixed(3)})`)
      g.addColorStop(0.45, `rgba(255,255,255,${(0.02 * pulse).toFixed(3)})`)
      g.addColorStop(1,    "transparent")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      for (const p of particles) {
        // desacelera conforme se afasta — energia dissipando
        const decel = Math.max(0.05, 1 - (p.life / p.maxLife) * 0.72)
        p.x += p.vx * decel
        p.y += p.vy * decel
        p.life += 0.007

        if (p.life > p.maxLife || p.x < -30 || p.x > W + 30 || p.y < -30 || p.y > H + 30) {
          Object.assign(p, spawnParticle(cx, cy))
          continue
        }

        const t = p.life / p.maxLife
        const fade = t < 0.12 ? t / 0.12 : t > 0.68 ? (1 - t) / 0.32 : 1
        ctx.fillStyle = `rgba(220,220,215,${(p.alpha * fade).toFixed(3)})`
        ctx.font = `${p.size}px monospace`
        ctx.fillText(p.char, p.x, p.y)
      }

      rafId = requestAnimationFrame(frame)
    }

    // ResizeObserver: dimensiona correto no mount e no mobile
    const ro = new ResizeObserver((entries) => {
      const e = entries[0]
      if (!e) return
      const { width, height } = e.contentRect
      if (width === 0 || height === 0) return
      init(width, height)
      if (!started) {
        started = true
        rafId = requestAnimationFrame(frame)
      }
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-[1]"
    />
  )
}

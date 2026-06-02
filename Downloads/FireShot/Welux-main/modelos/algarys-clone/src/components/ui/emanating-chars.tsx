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

function spawnParticle(cx: number, cy: number, ringRX: number, ringRY: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const jitter = (Math.random() - 0.5) * 28
  const x = cx + Math.cos(angle) * (ringRX + jitter)
  const y = cy + Math.sin(angle) * (ringRY + jitter * 0.48)
  const speed = 0.07 + Math.random() * 0.16
  const upward = angle > Math.PI
    ? -(0.04 + Math.random() * 0.12)
    : -(0.02 + Math.random() * 0.07)
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed * 0.3 + upward,
    char: rndChar(),
    size: 7 + Math.random() * 6,
    life: Math.random(),
    maxLife: 0.7 + Math.random() * 0.8,
    alpha: 0.18 + Math.random() * 0.44,
  }
}

export default function EmanatingChars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const geo = {
      cx: W / 2,
      cy: H,
      ringRX: Math.min(W * 0.44, 420),
      ringRY: 0,
    }
    geo.ringRY = geo.ringRX * 0.48

    const particles: Particle[] = Array.from({ length: 55 }, () =>
      spawnParticle(geo.cx, geo.cy, geo.ringRX, geo.ringRY)
    )

    let rafId: number

    function frame(ts: number) {
      ctx!.clearRect(0, 0, W, H)

      const pulse = 0.65 + 0.35 * Math.sin(ts / 1800)
      const g = ctx!.createRadialGradient(geo.cx, geo.cy, 0, geo.cx, geo.cy, geo.ringRX * 1.3)
      g.addColorStop(0, `rgba(255,255,255,${(0.22 * pulse).toFixed(3)})`)
      g.addColorStop(0.4, `rgba(255,255,255,${(0.07 * pulse).toFixed(3)})`)
      g.addColorStop(1, "transparent")
      ctx!.fillStyle = g
      ctx!.fillRect(0, 0, W, H)

      ctx!.beginPath()
      ctx!.ellipse(geo.cx, geo.cy, geo.ringRX, geo.ringRY, 0, 0, Math.PI * 2)
      ctx!.strokeStyle = "rgba(255,255,255,0.04)"
      ctx!.lineWidth = 1
      ctx!.stroke()

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life += 0.005

        if (p.life > p.maxLife || p.x < -20 || p.x > W + 20 || p.y < -20) {
          Object.assign(p, spawnParticle(geo.cx, geo.cy, geo.ringRX, geo.ringRY))
          continue
        }

        const t = p.life / p.maxLife
        const fade = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1
        ctx!.fillStyle = `rgba(195,195,195,${(p.alpha * fade * 0.8).toFixed(3)})`
        ctx!.font = `${p.size}px monospace`
        ctx!.fillText(p.char, p.x, p.y)
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    function handleResize() {
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width = W
      canvas!.height = H
      geo.cx = W / 2
      geo.cy = H
      geo.ringRX = Math.min(W * 0.44, 420)
      geo.ringRY = geo.ringRX * 0.48
      particles.forEach((_, i) => {
        particles[i] = spawnParticle(geo.cx, geo.cy, geo.ringRX, geo.ringRY)
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
    />
  )
}

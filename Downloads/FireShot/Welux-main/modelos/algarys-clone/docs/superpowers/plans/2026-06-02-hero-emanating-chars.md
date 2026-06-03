# Hero EmanatingChars Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `RainingLetters` (600 spans React + RAF em state) por `EmanatingChars` — canvas puro onde caracteres nascem na borda de um anel elíptico pulsante atrás do chat card.

**Architecture:** Um único componente canvas `"use client"` com `useEffect` + `requestAnimationFrame`. Zero `useState`. Geometria do anel centralizada na base do canvas (onde o chat card fica). `RainingLetters` permanece no disco — reversão é 1 linha no `Hero.tsx`.

**Tech Stack:** React 18, canvas 2D API, TypeScript, Tailwind v4

---

## File Map

| Ação | Arquivo |
|------|---------|
| Criar | `src/components/ui/emanating-chars.tsx` |
| Modificar | `src/components/Hero.tsx` |
| Manter intacto | `src/components/ui/raining-letters.tsx` (backup vivo) |

---

### Task 1: Commit de backup

**Files:**
- Read: `src/components/Hero.tsx` (verificar estado atual)

- [ ] **Verificar estado limpo do git**

```bash
git status
```

- [ ] **Commitar estado atual como backup**

```bash
git add src/components/Hero.tsx src/components/ui/raining-letters.tsx
git commit -m "backup: pre-emanating-chars hero effect"
```

Expected: commit criado. Se não houver mudanças staged, não há nada a commitar — OK, prosseguir.

---

### Task 2: Criar `src/components/ui/emanating-chars.tsx`

**Files:**
- Create: `src/components/ui/emanating-chars.tsx`

- [ ] **Criar o arquivo com implementação completa**

```tsx
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
      ctx.clearRect(0, 0, W, H)

      const pulse = 0.65 + 0.35 * Math.sin(ts / 1800)
      const g = ctx.createRadialGradient(geo.cx, geo.cy, 0, geo.cx, geo.cy, geo.ringRX * 1.3)
      g.addColorStop(0, `rgba(255,255,255,${(0.22 * pulse).toFixed(3)})`)
      g.addColorStop(0.4, `rgba(255,255,255,${(0.07 * pulse).toFixed(3)})`)
      g.addColorStop(1, "transparent")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      ctx.beginPath()
      ctx.ellipse(geo.cx, geo.cy, geo.ringRX, geo.ringRY, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.04)"
      ctx.lineWidth = 1
      ctx.stroke()

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
        ctx.fillStyle = `rgba(195,195,195,${(p.alpha * fade * 0.8).toFixed(3)})`
        ctx.font = `${p.size}px monospace`
        ctx.fillText(p.char, p.x, p.y)
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    function handleResize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
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
```

- [ ] **Verificar TypeScript sem erros**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -30
```

Expected: nenhum erro em `emanating-chars.tsx`.

- [ ] **Commitar**

```bash
git add src/components/ui/emanating-chars.tsx
git commit -m "feat(hero): add EmanatingChars canvas component"
```

---

### Task 3: Atualizar `Hero.tsx`

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Trocar import e componente**

Em `src/components/Hero.tsx`, substituir:

```tsx
import RainingLetters from "@/components/ui/raining-letters";
```

por:

```tsx
import EmanatingChars from "@/components/ui/emanating-chars";
```

E substituir:

```tsx
      <RainingLetters />
```

por:

```tsx
      <EmanatingChars />
```

- [ ] **Verificar TypeScript sem erros**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -30
```

Expected: sem erros.

- [ ] **Commitar**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): swap RainingLetters → EmanatingChars"
```

---

### Task 4: Verificação visual

**Files:** nenhuma edição — só verificação.

- [ ] **Subir dev server**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npm run dev
```

Abrir `http://localhost:3000`.

- [ ] **Checklist visual desktop**

  - [ ] Glow branco visível na base da hero (atrás do chat card)
  - [ ] Glow pulsa suavemente (~5-6s ciclo visual)
  - [ ] Caracteres nascem na borda do anel elíptico
  - [ ] Texto "A maioria das empresas paga caro…" legível sem sobreposição de chars
  - [ ] Anel elíptico sutil visível

- [ ] **Checklist mobile** (DevTools → 390px)

  - [ ] Anel redimensiona proporcionalmente (`W * 0.44`)
  - [ ] Caracteres não invadem zona de texto

- [ ] **Checklist prefers-reduced-motion**

  Em DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce":
  - [ ] Canvas não anima (efeito desaparece) — apenas fundo escuro da hero

- [ ] **Se algum item falhar:** ajustar parâmetros em `emanating-chars.tsx` (densidade, velocidade, raio) e commitar fix separado.

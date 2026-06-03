# Quiz Lead Form — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o `LeadForm.tsx` estático (que não faz nada) por um quiz de 6 etapas animado com Framer Motion, scoring híbrido via regras locais + Groq AI, e roteamento de leads HOT/WARM/COLD — com Evolution API mockada para integração posterior.

**Architecture:** Quiz multi-step client-side com `AnimatePresence` do Framer Motion para transições direcionais. Submit envia JSON para `/api/lead` (Next.js Route Handler) que executa scoring paralelo (regras locais + Groq `llama-3.1-8b-instant`) e retorna `{ routing, score }`. Frontend renderiza tela de resultado condicionada ao routing. Evolution API mockada com `console.log` até Phase 2.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Framer Motion v12, Tailwind v4, Groq API (OpenAI-compatible REST)

---

## Scope Split

Este plano cobre **Phase 1 (Form + API com Evolution mockada)**. Phase 2 (Evolution live) é separada e não bloqueia nada aqui.

---

## File Map

| Arquivo | Status | Responsabilidade |
|---|---|---|
| `src/lib/scoring.ts` | **Criar** | Pure functions: `localScore()`, `groqScore()`, `getRouting()`, `formatWaMessage()` |
| `src/app/api/lead/route.ts` | **Criar** | POST handler: orquestra scoring, chama Evolution mock, retorna routing |
| `src/components/LeadQuiz.tsx` | **Criar** | Componente principal: state machine, layout, orchestração de steps |
| `src/components/quiz/CardStep.tsx` | **Criar** | Card selection reutilizável (steps 0-3) |
| `src/components/quiz/GargaloStep.tsx` | **Criar** | Step 4: tags clicáveis + textarea livre |
| `src/components/quiz/ContactStep.tsx` | **Criar** | Step 5: nome + whatsapp + submit |
| `src/components/quiz/ResultScreen.tsx` | **Criar** | Telas de resultado: loading / hot / warm / cold |
| `src/components/quiz/ProgressBar.tsx` | **Criar** | Barra de progresso animada |
| `src/components/LeadForm.tsx` | **Modificar** | Re-exportar `LeadQuiz` como default (page.tsx não muda) |
| `.env.local.example` | **Criar** | Template documentado de todas as env vars |

---

## Data Contracts

### FormData (client → API)
```typescript
interface FormData {
  cargo: string        // "Fundador / CEO" | "Gestor / Diretor" | "Analista / Operacional" | "Outro"
  tamanho: string      // "1-10" | "10-50" | "50-200" | "200+"
  faturamento: string  // "ate-50k" | "50k-150k" | "150k-500k" | "500k+"
  ia_antes: string     // "nunca" | "falhou" | "escalar"
  gargalo_tags: string[]
  gargalo: string
  nome: string
  whatsapp: string     // raw com máscara: "(11) 99999-9999"
}
```

### API Response
```typescript
interface LeadResponse {
  routing: "hot" | "warm" | "cold"
  score: number  // 0-13
}
```

### Scoring Matrix (max 13)
```
cargo:       Fundador/CEO=2, Gestor/Diretor=1, outros=0
tamanho:     200+=3, 50-200=2, 10-50=1, 1-10=0
faturamento: 500k+=3, 150k-500k=2, 50k-150k=1, ate-50k=0
ia_antes:    escalar=2, falhou=1, nunca=1
groq:        0-3 (análise qualitativa do gargalo)

Routing: HOT >= 8 | WARM 5-7 | COLD <= 4
```

---

## Quiz Flow

```
Step 0: cargo       → cards 2x2, auto-advance 180ms
Step 1: tamanho     → cards 2x2, auto-advance 180ms
Step 2: faturamento → cards 2x2, auto-advance 180ms
Step 3: ia_antes    → cards 3x1, auto-advance 180ms
Step 4: gargalo     → tags + textarea, botão "Continuar" manual
Step 5: contato     → nome + whatsapp, botão "Quero ser chamado"
→ loading screen
→ result screen (hot | warm | cold)
```

**Progresso:** `(step / 6) * 100` — 0% no step 0, 100% na result screen.

**Animação direcional:**
- Avançar (direction=1): novo step entra da direita (x: 60→0), anterior sai pela esquerda (x: 0→-60)
- Voltar (direction=-1): novo step entra da esquerda (x: -60→0), anterior sai pela direita (x: 0→60)

---

## Task 1: Scoring Library

**Files:**
- Create: `src/lib/scoring.ts`

- [ ] **Step 1.1: Criar `src/lib/scoring.ts` com tipos e `localScore()`**

```typescript
// src/lib/scoring.ts

export interface FormData {
  cargo: string
  tamanho: string
  faturamento: string
  ia_antes: string
  gargalo_tags: string[]
  gargalo: string
  nome: string
  whatsapp: string
}

export type Routing = "hot" | "warm" | "cold"

export function localScore(lead: FormData): number {
  let score = 0

  if (lead.cargo === "Fundador / CEO") score += 2
  else if (lead.cargo === "Gestor / Diretor") score += 1

  if (lead.tamanho === "200+") score += 3
  else if (lead.tamanho === "50-200") score += 2
  else if (lead.tamanho === "10-50") score += 1

  if (lead.faturamento === "500k+") score += 3
  else if (lead.faturamento === "150k-500k") score += 2
  else if (lead.faturamento === "50k-150k") score += 1

  if (lead.ia_antes === "escalar") score += 2
  else score += 1

  return score
}

export async function groqScore(lead: FormData): Promise<number> {
  const apiKey = process.env.GROQ_API_KEY
  const text = [
    lead.gargalo_tags.length ? `Áreas: ${lead.gargalo_tags.join(", ")}` : "",
    lead.gargalo,
  ]
    .filter(Boolean)
    .join("\n")

  if (!apiKey || !text) return 1

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a lead qualifier for a Brazilian AI consulting firm.
Score the described pain point from 0 to 3:
3 = Specific operational pain AI directly solves (customer service, repetitive processes, data, sales automation)
2 = Real pain but vague or indirect AI application
1 = Strategic or managerial concern with indirect AI relevance
0 = No clear pain point or not AI-relevant
Return ONLY valid JSON: {"score": number}`,
          },
          { role: "user", content: text },
        ],
        max_tokens: 30,
        temperature: 0,
        response_format: { type: "json_object" },
      }),
    })

    if (!res.ok) return 1
    const data = await res.json()
    const parsed = JSON.parse(data.choices[0].message.content) as { score: number }
    return Math.min(3, Math.max(0, Number(parsed.score) ?? 1))
  } catch {
    return 1
  }
}

export function getRouting(total: number): Routing {
  if (total >= 8) return "hot"
  if (total >= 5) return "warm"
  return "cold"
}

export function formatWaMessage(lead: FormData, routing: Routing, score: number): string {
  const badge = routing === "hot" ? "🔥 HOT" : routing === "warm" ? "⚡ WARM" : "❄️ COLD"
  const lines = [
    `${badge} — Score: ${score}/13`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.nome}`,
    `📱 ${lead.whatsapp}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Cargo: ${lead.cargo}`,
    `Equipe: ${lead.tamanho} funcionários`,
    `Faturamento: ${lead.faturamento}`,
    `IA antes: ${lead.ia_antes}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Gargalo: ${lead.gargalo_tags.join(", ")}`,
    lead.gargalo || "",
  ].filter(Boolean)

  return lines.join("\n")
}
```

- [ ] **Step 1.2: Verificar compilação TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone
npx tsc --noEmit
```

Esperado: sem erros em `src/lib/scoring.ts`.

- [ ] **Step 1.3: Commit**

```bash
git add src/lib/scoring.ts
git commit -m "feat(quiz): add hybrid scoring library — local rules + groq gargalo"
```

---

## Task 2: API Route

**Files:**
- Create: `src/app/api/lead/route.ts`
- Create: `.env.local.example`

- [ ] **Step 2.1: Criar `.env.local.example`**

```bash
# .env.local.example

# ── Groq AI (free at console.groq.com)
GROQ_API_KEY=gsk_...

# ── Evolution API (Phase 2 — deixar vazio por enquanto)
EVOLUTION_API_URL=https://your-evolution.domain.com
EVOLUTION_API_KEY=your-api-key
EVOLUTION_INSTANCE=your-instance-name
SDR_WHATSAPP_NUMBER=5511999999999
NURTURING_WHATSAPP_NUMBER=5511999999998
```

- [ ] **Step 2.2: Criar `src/app/api/lead/route.ts`**

```typescript
// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server"
import { localScore, groqScore, getRouting, formatWaMessage, type FormData } from "@/lib/scoring"

export async function POST(req: NextRequest) {
  const lead = (await req.json()) as FormData

  const [local, ai] = await Promise.all([
    Promise.resolve(localScore(lead)),
    groqScore(lead),
  ])

  const total = local + ai
  const routing = getRouting(total)

  // Phase 2: Evolution API integration
  // Placeholder — descomentar quando Evolution estiver configurado
  const message = formatWaMessage(lead, routing, total)
  console.log("[LEAD]", { routing, score: total, message })

  return NextResponse.json({ routing, score: total })
}
```

- [ ] **Step 2.3: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 2.4: Testar rota com curl**

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "cargo": "Fundador / CEO",
    "tamanho": "50-200",
    "faturamento": "150k-500k",
    "ia_antes": "falhou",
    "gargalo_tags": ["Atendimento", "Processos repetitivos"],
    "gargalo": "Atendimento ao cliente custa muito e escala mal",
    "nome": "João Silva",
    "whatsapp": "(11) 99999-9999"
  }'
```

Esperado: `{"routing":"hot","score":9}` (ou similar >= 8 com groq).

Sem GROQ_API_KEY: groq retorna 1 por fallback. Score esperado sem groq: 2+2+2+1 = 7 → `warm`.

- [ ] **Step 2.5: Commit**

```bash
git add src/app/api/lead/route.ts .env.local.example
git commit -m "feat(quiz): add lead scoring API route with groq + evolution placeholder"
```

---

## Task 3: ProgressBar Component

**Files:**
- Create: `src/components/quiz/ProgressBar.tsx`

- [ ] **Step 3.1: Criar `src/components/quiz/ProgressBar.tsx`**

```typescript
// src/components/quiz/ProgressBar.tsx
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
      <div className="h-px bg-border rounded-full overflow-hidden">
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
```

- [ ] **Step 3.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 4: CardStep Component

**Files:**
- Create: `src/components/quiz/CardStep.tsx`

- [ ] **Step 4.1: Criar `src/components/quiz/CardStep.tsx`**

```typescript
// src/components/quiz/CardStep.tsx
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
  const cols = config.options.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2"

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl md:text-3xl font-normal text-heading leading-1.1">
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
                ? "border-primary/60 bg-primary/8 text-primary"
                : "border-border bg-surface/50 text-body hover:border-border/80 hover:bg-surface",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
```

> **Nota de estilo:** `bg-primary/8` usa opacidade 8% — se o Tailwind v4 não reconhecer valores arbitrários assim, usar `bg-white/[0.08]`.

- [ ] **Step 4.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 5: GargaloStep Component

**Files:**
- Create: `src/components/quiz/GargaloStep.tsx`

- [ ] **Step 5.1: Criar `src/components/quiz/GargaloStep.tsx`**

```typescript
// src/components/quiz/GargaloStep.tsx
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
        <h2 className="text-2xl md:text-3xl font-normal text-heading leading-1.1">
          Qual é o maior gargalo da sua operação hoje?
        </h2>
        <p className="text-sm text-secondary">
          Selecione uma ou mais áreas.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={[
              "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
              tags.includes(tag)
                ? "border-primary/60 bg-primary/8 text-primary"
                : "border-border text-body hover:border-border/80",
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
```

- [ ] **Step 5.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 6: ContactStep Component

**Files:**
- Create: `src/components/quiz/ContactStep.tsx`

- [ ] **Step 6.1: Criar `src/components/quiz/ContactStep.tsx`**

```typescript
// src/components/quiz/ContactStep.tsx
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
        <h2 className="text-2xl md:text-3xl font-normal text-heading leading-1.1">
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
```

- [ ] **Step 6.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 7: ResultScreen Component

**Files:**
- Create: `src/components/quiz/ResultScreen.tsx`

- [ ] **Step 7.1: Criar `src/components/quiz/ResultScreen.tsx`**

```typescript
// src/components/quiz/ResultScreen.tsx
"use client"

import { motion } from "framer-motion"

type Screen = "loading" | "hot" | "warm" | "cold"

interface ResultScreenProps {
  screen: Screen
}

const CONTENT = {
  hot: {
    heading: "Tudo certo.",
    body: "Nossa equipe recebeu seu perfil e entra em contato pelo WhatsApp em até 5 minutos.",
    detail: "Deixe o celular por perto.",
  },
  warm: {
    heading: "Recebemos seu contato.",
    body: "Você será chamado ainda hoje pelo nosso time.",
    detail: "Fique de olho no WhatsApp.",
  },
  cold: {
    heading: "Obrigado pelo interesse.",
    body: "Antes de falar com a gente, preparamos um diagnóstico gratuito de IA para operações.",
    detail: "Enviamos o material no WhatsApp que você informou.",
  },
}

function CheckIcon() {
  return (
    <svg
      className="w-6 h-6 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function ResultScreen({ screen }: ResultScreenProps) {
  if (screen === "loading") {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full"
        />
        <p className="text-body">Analisando seu perfil...</p>
      </div>
    )
  }

  const c = CONTENT[screen]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center gap-4 py-24 text-center max-w-sm mx-auto"
    >
      <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center">
        <CheckIcon />
      </div>
      <h2 className="text-3xl font-normal text-heading">{c.heading}</h2>
      <p className="text-body">{c.body}</p>
      <p className="text-sm text-secondary">{c.detail}</p>
    </motion.div>
  )
}
```

- [ ] **Step 7.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 8: LeadQuiz — Componente Principal

**Files:**
- Create: `src/components/LeadQuiz.tsx`

Este é o componente orquestrador. Importa todos os sub-componentes. Gerencia state machine (step, direction, screen, formData). Mantém o carrossel de fotos do design original.

- [ ] **Step 8.1: Criar `src/components/LeadQuiz.tsx`**

```typescript
// src/components/LeadQuiz.tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProgressBar from "@/components/quiz/ProgressBar"
import CardStep from "@/components/quiz/CardStep"
import GargaloStep from "@/components/quiz/GargaloStep"
import ContactStep from "@/components/quiz/ContactStep"
import ResultScreen from "@/components/quiz/ResultScreen"
import type { FormData, Routing } from "@/lib/scoring"

// ── Constantes ────────────────────────────────────────

const TOTAL_STEPS = 6

const PHOTOS = [
  "/pages/home/carrosel_fotos/felipe.webp?v=2",
  "/pages/home/carrosel_fotos/pedro.webp?v=2",
  "/pages/home/carrosel_fotos/imagem_form.webp?v=2",
]

const CARD_STEPS = [
  {
    key: "cargo",
    question: "Qual é o seu papel na empresa?",
    sub: "Isso ajuda a direcionar a conversa certa.",
    options: [
      { value: "Fundador / CEO", label: "Fundador / CEO" },
      { value: "Gestor / Diretor", label: "Gestor / Diretor" },
      { value: "Analista / Operacional", label: "Analista / Operacional" },
      { value: "Outro", label: "Outro" },
    ],
  },
  {
    key: "tamanho",
    question: "Quantos funcionários tem sua empresa?",
    sub: null,
    options: [
      { value: "1-10", label: "1 a 10" },
      { value: "10-50", label: "10 a 50" },
      { value: "50-200", label: "50 a 200" },
      { value: "200+", label: "Mais de 200" },
    ],
  },
  {
    key: "faturamento",
    question: "Qual o faturamento mensal da empresa?",
    sub: "Confidencial — usado apenas para calibrar a proposta.",
    options: [
      { value: "ate-50k", label: "Até R$ 50 mil" },
      { value: "50k-150k", label: "R$ 50k a R$ 150k" },
      { value: "150k-500k", label: "R$ 150k a R$ 500k" },
      { value: "500k+", label: "Acima de R$ 500k" },
    ],
  },
  {
    key: "ia_antes",
    question: "Já tentou implementar IA na sua empresa?",
    sub: null,
    options: [
      { value: "nunca", label: "Nunca tentei" },
      { value: "falhou", label: "Tentei e não funcionou" },
      { value: "escalar", label: "Já uso e quero escalar" },
    ],
  },
]

const INITIAL_FORM: FormData = {
  cargo: "",
  tamanho: "",
  faturamento: "",
  ia_antes: "",
  gargalo_tags: [],
  gargalo: "",
  nome: "",
  whatsapp: "",
}

// ── Animação direcional ───────────────────────────────

function stepVariants(direction: number) {
  return {
    initial: { x: direction * 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: direction * -60, opacity: 0 },
  }
}

// ── Componente principal ──────────────────────────────

export default function LeadQuiz() {
  const [photo, setPhoto] = useState(0)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [screen, setScreen] = useState<null | "loading" | Routing>(null)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)

  // Carrossel automático de fotos
  useEffect(() => {
    const id = setInterval(() => setPhoto((p) => (p + 1) % PHOTOS.length), 4000)
    return () => clearInterval(id)
  }, [])

  function advance() {
    setDirection(1)
    setStep((s) => s + 1)
  }

  function back() {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  function selectCard(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setTimeout(advance, 180)
  }

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      gargalo_tags: f.gargalo_tags.includes(tag)
        ? f.gargalo_tags.filter((t) => t !== tag)
        : [...f.gargalo_tags, tag],
    }))
  }

  async function submit() {
    setScreen("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { routing: Routing }
      setScreen(data.routing)
    } catch {
      setScreen("warm") // fallback gracioso — não mostra erro ao usuário
    }
  }

  // Tela de resultado (fora do layout com foto)
  if (screen) {
    return (
      <section id="form" className="scroll-mt-25 flex items-center justify-center py-16 px-6">
        <ResultScreen screen={screen} />
      </section>
    )
  }

  const v = stepVariants(direction)

  return (
    <section
      id="form"
      className="scroll-mt-25 relative overflow-hidden flex flex-col py-12 md:py-16 md:px-[100px] items-center justify-center"
    >
      {/* Glow de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          className="w-[220%] md:w-[1100px] h-[420px] md:h-[260px] mb-[200px] opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 100%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.18) 48%, transparent 72%)",
            transform: "rotate(-22deg)",
          }}
        />
      </div>

      <div className="section-container relative z-10 flex section-px flex-col md:flex-row items-stretch bg-surface/95 justify-center px-6 py-10 md:p-4 md:pr-16 gap-8 md:gap-16 md:rounded-2xl border border-border">

        {/* Carrossel de fotos (desktop) */}
        <div className="relative w-full overflow-hidden rounded-xl hidden md:flex items-center justify-center" style={{ minHeight: 640 }}>
          {PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === photo ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhoto(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === photo ? "bg-white w-6" : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Área do quiz */}
        <div className="flex flex-col justify-between gap-6 w-full" style={{ minHeight: 520 }}>
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* Steps animados */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={v.initial}
                animate={v.animate}
                exit={v.exit}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-6"
              >
                {step < 4 && (
                  <CardStep
                    config={CARD_STEPS[step]}
                    value={form[CARD_STEPS[step].key as keyof FormData] as string}
                    onSelect={(v) => selectCard(CARD_STEPS[step].key, v)}
                  />
                )}
                {step === 4 && (
                  <GargaloStep
                    tags={form.gargalo_tags}
                    text={form.gargalo}
                    onToggleTag={toggleTag}
                    onTextChange={(v) => setForm((f) => ({ ...f, gargalo: v }))}
                    onNext={advance}
                  />
                )}
                {step === 5 && (
                  <ContactStep
                    nome={form.nome}
                    whatsapp={form.whatsapp}
                    onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))}
                    onSubmit={submit}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Voltar */}
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="text-xs text-secondary hover:text-primary transition-colors self-start"
            >
              ← Voltar
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8.2: Verificar compilação**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

---

## Task 9: Atualizar LeadForm.tsx

**Files:**
- Modify: `src/components/LeadForm.tsx`

- [ ] **Step 9.1: Substituir conteúdo de `LeadForm.tsx`**

Substituir o conteúdo inteiro do arquivo por:

```typescript
// src/components/LeadForm.tsx
// Re-exporta LeadQuiz mantendo o nome esperado por page.tsx
export { default } from "@/components/LeadQuiz"
```

- [ ] **Step 9.2: Verificar compilação completa**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 9.3: Subir o dev server e testar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:3000` e verificar:
- [ ] Section `#form` renderiza com layout foto + quiz
- [ ] Step 0 (cargo) mostra 4 cards em grade 2x2
- [ ] Clicar em um card → 180ms delay → transição slide para step 1
- [ ] Progress bar avança corretamente em cada step
- [ ] Step 4 (gargalo) permite tags + textarea, botão Continuar desabilitado sem seleção
- [ ] Step 5 (contato) valida nome >= 2 chars + whatsapp >= 10 dígitos
- [ ] Botão "Voltar" aparece a partir do step 1 e retorna corretamente
- [ ] Animação direcional: avançar → slide da direita; voltar → slide da esquerda
- [ ] Submit chama `/api/lead` e renderiza result screen correta

- [ ] **Step 9.4: Commit final**

```bash
git add src/components/LeadQuiz.tsx src/components/quiz/ src/components/LeadForm.tsx src/lib/scoring.ts src/app/api/lead/ .env.local.example
git commit -m "feat(quiz): replace static form with animated 6-step lead quiz + hybrid scoring"
```

---

## Checklist de Verificação

### Spec coverage
- [x] Quiz multi-step com 6 etapas → Tasks 3-9
- [x] Animação direcional Framer Motion → Task 8 (`stepVariants`)
- [x] Auto-advance em cards → `selectCard` com `setTimeout(advance, 180)`
- [x] Scoring híbrido (local + groq) → Task 1 (`scoring.ts`)
- [x] Routing HOT/WARM/COLD → `getRouting()` em `scoring.ts`
- [x] API route → Task 2
- [x] Telas de resultado → Task 7
- [x] Evolution mockada → console.log em `route.ts`
- [x] Manter layout com foto original → carrossel preservado em `LeadQuiz.tsx`
- [x] `.env.local.example` documentado → Task 2

### Type consistency
- `FormData` exportada de `scoring.ts` e importada em `LeadQuiz.tsx` e `route.ts` ✓
- `Routing` exportada de `scoring.ts` e usada em `route.ts` e `LeadQuiz.tsx` ✓
- `CardStepConfig` definida em `CardStep.tsx`, consumida em `LeadQuiz.tsx` ✓
- `CARD_STEPS[step].key` cast para `keyof FormData` — válido pois keys batem: `cargo`, `tamanho`, `faturamento`, `ia_antes` ✓

---

## Phase 2 (fora do escopo deste plano)

Quando a Evolution API estiver pronta, criar:
- `src/lib/evolution.ts` — `sendWhatsapp(phone, message)` com retry simples
- Descomentar e wiring em `route.ts`
- Adicionar env vars no Vercel/hosting

Consultar `.env.local.example` para lista completa de variáveis.

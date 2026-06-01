# Chat Lead Form — Redesign SpaceX/Mission Control

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a UI do `ChatLeadForm` pelo design SpaceX/Mission Control aprovado — grid sutil, tipografia grande, status bar monospace, thinking animation terminal, mobile fullscreen expansion na primeira mensagem, e WA enviado ao lead após submit.

**Architecture:** 6 tasks independentes em sequência. Tasks 1-4 criam componentes atômicos sem dependências. Task 5 edita a API route (1 função nova). Task 6 reescreve o JSX do ChatLeadForm sem tocar na lógica — toda a lógica de negócio (doSubmit, handleContactSubmit, parseMessage, etc.) é preservada integralmente, apenas o visual muda.

**Tech Stack:** Next.js 16, React 19, TypeScript, Framer Motion v12, Tailwind v4 (arbitrary values), Evolution API (existing)

---

## File Map

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/app/globals.css` | Modificar | Adicionar `@keyframes thinking-progress` |
| `src/components/chat/ThinkingBubble.tsx` | Criar | Spinner Braille + progress bar animado |
| `src/components/chat/ChatStatusBar.tsx` | Criar | "WELUX.AI / ARIA" + "● LIVE SESSION" |
| `src/components/chat/ChatHeading.tsx` | Criar | Título + subtítulo com exit animation |
| `src/app/api/lead/route.ts` | Modificar | Adicionar `sendWhatsapp(lead.whatsapp, welcomeMsg)` |
| `src/components/ChatLeadForm.tsx` | Modificar | Substituir JSX + adicionar `isExpanded` state; preservar toda lógica |

---

## Contexto para o implementador

**`ChatLeadForm.tsx` atual (400 linhas):**
- Linhas 1-8: imports
- Linhas 10-55: types, constants (`LEAD_MARKER`, `OPENING_MESSAGE`, `SUGGEST_RE`, `CONTACT_FORM_RE`, `parseMessage`)
- Linhas 57-88: `WeluxAvatar`, `TypingDots` (SUBSTITUIR por importações de novos componentes)
- Linhas 90-230: lógica de negócio (`doSubmit`, `handleSubmit`, `handleContactSubmit`) — **NÃO TOCAR**
- Linhas 230-400: JSX de retorno — **SUBSTITUIR COMPLETAMENTE**

**Existing imports to keep:** `motion`, `AnimatePresence`, `ChatInput`, `ChatInputTextArea`, `ChatInputSubmit`, `ResultScreen`, `ContactCard`, `Routing`

**New imports to add:** `ChatStatusBar`, `ChatHeading`, `ThinkingBubble` de `@/components/chat/*`

---

## Task 1: @keyframes em globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1.1: Adicionar @keyframes ao final do globals.css**

Localizar o fim do arquivo (`src/app/globals.css`) e adicionar após o último bloco:

```css
/* ── Chat thinking animation ── */
@keyframes thinking-progress {
  0%   { width: 0%;   opacity: 1; }
  70%  { width: 85%;  opacity: 1; }
  100% { width: 100%; opacity: 0; }
}
```

- [ ] **Step 1.2: Verificar que não duplicou**

```bash
grep -c "thinking-progress" /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/app/globals.css
```

Esperado: `1`

- [ ] **Step 1.3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(chat): add thinking-progress keyframe for terminal spinner animation"
```

---

## Task 2: ThinkingBubble Component

**Files:**
- Create: `src/components/chat/ThinkingBubble.tsx`

- [ ] **Step 2.1: Criar diretório e arquivo**

```bash
mkdir -p /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/chat
```

- [ ] **Step 2.2: Criar `src/components/chat/ThinkingBubble.tsx`**

```typescript
// src/components/chat/ThinkingBubble.tsx
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
```

- [ ] **Step 2.3: Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 2.4: Commit**

```bash
git add src/components/chat/ThinkingBubble.tsx
git commit -m "feat(chat): add ThinkingBubble — Braille spinner + progress bar"
```

---

## Task 3: ChatStatusBar Component

**Files:**
- Create: `src/components/chat/ChatStatusBar.tsx`

- [ ] **Step 3.1: Criar `src/components/chat/ChatStatusBar.tsx`**

```typescript
// src/components/chat/ChatStatusBar.tsx
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
```

- [ ] **Step 3.2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3.3: Commit**

```bash
git add src/components/chat/ChatStatusBar.tsx
git commit -m "feat(chat): add ChatStatusBar — monospace status + pulsing live indicator"
```

---

## Task 4: ChatHeading Component

**Files:**
- Create: `src/components/chat/ChatHeading.tsx`

- [ ] **Step 4.1: Criar `src/components/chat/ChatHeading.tsx`**

```typescript
// src/components/chat/ChatHeading.tsx
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
```

> **Nota:** Usa `h2` (não `h1`) pois já existe um `h1` no Hero da página.

- [ ] **Step 4.2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 4.3: Commit**

```bash
git add src/components/chat/ChatHeading.tsx
git commit -m "feat(chat): add ChatHeading — large clamp heading with AnimatePresence exit"
```

---

## Task 5: Notificação WhatsApp ao Lead — API Route

**Files:**
- Modify: `src/app/api/lead/route.ts`

**Contexto:** Atualmente a rota envia WA para o SDR (`SDR_WHATSAPP_NUMBER`) quando o lead é HOT/WARM, e para nurturing (`NURTURING_WHATSAPP_NUMBER`) quando COLD. Falta enviar uma mensagem de boas-vindas ao próprio lead. A função `sendWhatsapp(phone, message)` já existe na rota.

- [ ] **Step 5.1: Ler o arquivo atual**

```bash
cat /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/app/api/lead/route.ts
```

- [ ] **Step 5.2: Adicionar `welcomeMessage` e envio ao lead**

Localizar o bloco após `const sdr = process.env.SDR_WHATSAPP_NUMBER` e adicionar o envio ao lead. O bloco atual termina com algo como:

```typescript
  const sdr = process.env.SDR_WHATSAPP_NUMBER
  const nurturing = process.env.NURTURING_WHATSAPP_NUMBER

  if (routing !== "cold" && sdr) {
    await sendWhatsapp(sdr, message)
  } else if (routing === "cold" && nurturing) {
    await sendWhatsapp(nurturing, message)
  }
```

Adicionar após esse bloco (antes do `console.log`):

```typescript
  // Notificar o lead imediatamente
  const leadPhone = (lead.whatsapp as string | undefined)?.replace(/\D/g, "")
  if (leadPhone && leadPhone.length >= 10) {
    const normalized = leadPhone.startsWith("55") ? leadPhone : `55${leadPhone}`
    const welcomeMessage = `Oi, ${lead.nome || "tudo bem"}! Aqui é a Welux.

Recebi seu diagnóstico e já comuniquei o time.

Vamos te chamar em até 5 minutos para uma conversa rápida.

— Aria · Welux AI`
    await sendWhatsapp(normalized, welcomeMessage)
  }
```

- [ ] **Step 5.3: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 5.4: Commit**

```bash
git add src/app/api/lead/route.ts
git commit -m "feat(lead): send welcome WhatsApp to lead immediately after contact submission"
```

---

## Task 6: ChatLeadForm — Redesign Visual Completo

**Files:**
- Modify: `src/components/ChatLeadForm.tsx`

**Contexto:** Toda a lógica de negócio (doSubmit, handleSubmit, handleContactSubmit, parseMessage, todos os estados e refs) permanece intacta. O que muda:
1. Remover `WeluxAvatar` e `TypingDots` (substituídos por imports dos novos componentes)
2. Adicionar imports: `ThinkingBubble`, `ChatStatusBar`, `ChatHeading`
3. Adicionar estado `isExpanded` + ref `expandedRef`
4. Adicionar chamada `expandOnFirstMessage()` em `handleSubmit` e nos chip clicks
5. Substituir TODO o JSX de retorno

- [ ] **Step 6.1: Ler o arquivo completo**

```bash
cat /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/ChatLeadForm.tsx
```

- [ ] **Step 6.2: Substituir imports e remover WeluxAvatar/TypingDots**

Localizar as linhas de import (1-8) e as funções `WeluxAvatar` e `TypingDots` (aprox. linhas 57-88). Substituir por:

```typescript
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input"
import ResultScreen from "@/components/quiz/ResultScreen"
import ContactCard from "@/components/quiz/ContactCard"
import ChatStatusBar from "@/components/chat/ChatStatusBar"
import ChatHeading from "@/components/chat/ChatHeading"
import ThinkingBubble from "@/components/chat/ThinkingBubble"
import type { Routing } from "@/lib/scoring"
```

(Remover as funções `WeluxAvatar` e `TypingDots` inteiramente — não são mais usadas.)

- [ ] **Step 6.3: Adicionar estado `isExpanded` e ref `expandedRef` dentro do componente**

No bloco de estados (após as linhas de `useState` existentes, antes de `useEffect`), adicionar:

```typescript
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedRef = useRef(false)
```

- [ ] **Step 6.4: Adicionar função `expandOnFirstMessage` (dentro do componente, antes de doSubmit)**

```typescript
  function expandOnFirstMessage() {
    if (!expandedRef.current) {
      expandedRef.current = true
      setIsExpanded(true)
    }
  }
```

- [ ] **Step 6.5: Chamar `expandOnFirstMessage()` em `handleSubmit`**

Localizar `handleSubmit`. Adicionar a chamada logo após o guard inicial:

```typescript
  async function handleSubmit() {
    const text = input.trim()
    if (!text || isStreaming) return

    expandOnFirstMessage()   // ← adicionar esta linha

    const userMsg: Message = { role: "user", content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput("")
    await doSubmit(history)
  }
```

- [ ] **Step 6.6: Substituir o JSX de retorno completo**

Localizar o comentário `// ── Result screen ──` até o fim do arquivo. Substituir TUDO a partir daí por:

```tsx
  // ── Result screen ──────────────────────────────────

  if (screen) {
    return (
      <section
        id="form"
        className="relative flex flex-col min-h-dvh"
        style={{
          background: "#050505",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="flex-1 flex items-center justify-center relative z-10 px-6">
          <ResultScreen screen={screen} />
        </div>
      </section>
    )
  }

  // ── Chat UI ─────────────────────────────────────────

  return (
    <section
      id="form"
      className={[
        "scroll-mt-25 flex flex-col",
        isExpanded
          ? "fixed inset-0 z-[50]"
          : "relative min-h-dvh",
      ].join(" ")}
      style={{
        background: "#050505",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Glow de topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Status bar sempre visível */}
      <ChatStatusBar />

      {/* Heading — some no mobile ao expandir */}
      <AnimatePresence>
        {!isExpanded && <ChatHeading key="heading" />}
      </AnimatePresence>

      {/* Mensagens */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto flex flex-col gap-3 md:gap-4 px-5 md:px-12 py-4 md:py-5 relative z-10"
        aria-live="polite"
        aria-label="Conversa com Aria"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1
            const isStreamingThis = isStreaming && isLast && msg.role === "assistant"

            // Thinking indicator (conteúdo vazio durante streaming)
            if (isStreamingThis && !msg.content) {
              return (
                <motion.div
                  key={`thinking-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThinkingBubble />
                </motion.div>
              )
            }

            if (!msg.content) return null

            const { text, suggestions, showContactForm } = parseMessage(msg.content)
            const showSuggestions =
              suggestions.length > 0 &&
              !isStreaming &&
              msg.role === "assistant" &&
              i === messages.length - 1
            const showCard =
              showContactForm &&
              msg.role === "assistant" &&
              i === messages.length - 1 &&
              !isStreaming

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                {msg.role === "assistant" ? (
                  <div className="border-l-2 border-white pl-5 pr-4 py-4 bg-white/[0.025] rounded-r-lg text-[17px] leading-[1.65] text-white/[0.72] max-w-[90%] md:max-w-[70%]">
                    {text}
                    {isStreamingThis && (
                      <span className="inline-block w-[2px] h-[15px] bg-white/60 ml-[3px] align-middle animate-pulse" />
                    )}
                    {showCard && (
                      <div className="mt-4 pt-4 border-t border-white/[0.08]">
                        <ContactCard
                          onSubmit={handleContactSubmit}
                          disabled={contactFormSubmitted}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white text-black px-5 py-[13px] rounded-xl rounded-br-sm text-[17px] font-semibold max-w-[80%] md:max-w-[62%]">
                    {text}
                  </div>
                )}

                {/* Quick-reply chips */}
                {showSuggestions && (
                  <div className="flex flex-wrap gap-2 pl-[2px]">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          if (isStreaming) return
                          expandOnFirstMessage()
                          const userMsg: Message = { role: "user", content: s }
                          const history = [...messages, userMsg]
                          setMessages(history)
                          void doSubmit(history)
                        }}
                        className="border border-white/[0.14] px-4 py-2 font-mono text-[12px] text-white/45 rounded-sm hover:border-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-[5px] px-5 md:px-12 pt-3 pb-5 md:pb-6 border-t border-white/[0.04] relative z-10 flex-shrink-0">
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          loading={isStreaming}
          onStop={() => abortRef.current?.abort()}
          className="border-white/[0.09] bg-white/[0.02] rounded-sm"
        >
          <ChatInputTextArea
            placeholder={isStreaming ? "Aguarde..." : "Responda ou selecione acima"}
            disabled={isStreaming}
            className="text-white placeholder:text-white/[0.16] text-[16px] bg-transparent"
          />
          <ChatInputSubmit className="bg-white text-black hover:bg-white/90 rounded-sm" />
        </ChatInput>
        <p className="font-mono text-[9px] tracking-[2px] text-white/10 text-center uppercase">
          Shift + Enter · Nova Linha
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 6.7: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Se houver erro de tipo em `ChatInputTextArea` com `disabled` (pode não aceitar esse prop diretamente), adicionar `readOnly` em vez de `disabled` ou remover o prop.

- [ ] **Step 6.8: Build de verificação**

```bash
npm run build 2>&1 | tail -12
```

Esperado: Build bem-sucedido, rotas `/` e `/api/chat-lead` e `/api/lead` listadas.

- [ ] **Step 6.9: Verificação visual no browser**

```bash
# Dev server deve estar rodando. Se não: npm run dev
# Abrir http://localhost:3000 e rolar até #form
```

Verificar:
- [ ] Grid 32px visível no fundo escuro
- [ ] Status bar monospace "WELUX.AI / ARIA" + "● LIVE SESSION" pulsando
- [ ] Heading "Diagnóstico de IA" em clamp(28px→52px) font-weight:300
- [ ] Primeira mensagem da Aria com border-left branca
- [ ] Texto do AI bubble ≥17px, user bubble com bg branco
- [ ] Ao enviar primeira mensagem (mobile < 768px): heading some, seção vira fullscreen
- [ ] Enquanto streaming: ThinkingBubble com spinner Braille + progress bar animada
- [ ] Chips estilo monospace com border/hover correto
- [ ] Input bar com prompt `›` e dica de teclado

- [ ] **Step 6.10: Commit final**

```bash
git add src/components/ChatLeadForm.tsx
git commit -m "feat(chat): redesign — SpaceX/mission control aesthetic, fullscreen mobile expansion, terminal thinking"
```

---

## Checklist de Cobertura

| Requisito do spec | Task |
|---|---|
| Grid 32px + glow radial | Task 6 — inline styles na section |
| Status bar monospace pulsante | Task 3 — ChatStatusBar |
| Heading clamp(28→52px) font-light | Task 4 — ChatHeading |
| Heading some no mobile (AnimatePresence exit) | Task 4 + Task 6 `isExpanded` |
| Mobile fullscreen na primeira mensagem | Task 6 — `expandOnFirstMessage` + `fixed inset-0` |
| ThinkingBubble Braille + progress | Task 2 — ThinkingBubble |
| @keyframes thinking-progress | Task 1 — globals.css |
| AI bubble border-left branca, 17px | Task 6 — JSX |
| User bubble bg-white text-black, 17px | Task 6 — JSX |
| Chips monospace border transparent | Task 6 — JSX |
| Input bar com dica monospace | Task 6 — JSX |
| WA enviado ao lead pós-submit | Task 5 — /api/lead |
| Result screen no tema SpaceX | Task 6 — result screen JSX |

## Type Consistency

- `expandedRef: useRef<boolean>(false)` — Task 6.3 declara, 6.4 e 6.6 consomem ✓
- `expandOnFirstMessage(): void` — Task 6.4 define, Task 6.5 (handleSubmit) e Task 6.6 (chip onClick) chamam ✓
- `isExpanded: boolean` — Task 6.3 declara, Task 6.6 usa como condição CSS e em `AnimatePresence` ✓
- `ThinkingBubble` — Task 2 cria default export, Task 6 importa de `@/components/chat/ThinkingBubble` ✓
- `ChatStatusBar` — Task 3 cria, Task 6 importa de `@/components/chat/ChatStatusBar` ✓
- `ChatHeading` — Task 4 cria, Task 6 importa de `@/components/chat/ChatHeading` ✓

## Placeholder Scan

Nenhum TBD ou placeholder. Todo código está completo em cada step.

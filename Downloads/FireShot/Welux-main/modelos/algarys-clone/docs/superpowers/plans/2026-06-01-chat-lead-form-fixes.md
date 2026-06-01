# Chat Lead Form — Fixes & SDR Overhaul

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir scroll, streaming invisível e qualificação comercial fraca do ChatLeadForm; adicionar quick-reply buttons e inline contact card na fase de handoff para zero atrito de digitação.

**Architecture:** 5 tasks independentes no mesmo par de arquivos. Quick-replies usam marcador `[SUGGEST: "a","b","c"]`. Contact card usa marcador `[CONTACT_FORM]` — ao detectá-lo, o cliente exibe um formulário inline dentro da bolha do AI com campos nome + WhatsApp; ao submeter, envia mensagem estruturada de volta ao chat e dispara LEAD_COMPLETE. Streaming fix: yield ao browser + header anti-buffer. System prompt: SDR completo com rapport → SPIN discovery → qualificação → fechamento via contact card.

**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind v4, Groq API (llama-3.1-8b-instant), SSE streaming

---

## File Map

| Arquivo | Status | Mudanças |
|---|---|---|
| `src/components/ChatLeadForm.tsx` | Modificar | Scroll fix, yield streaming, parseMessage, suggestion buttons, ContactCard inline |
| `src/components/quiz/ContactCard.tsx` | **Criar** | Formulário inline como bolha de chat (nome + whatsapp) |
| `src/app/api/chat-lead/route.ts` | Modificar | Header X-Accel-Buffering, SYSTEM_PROMPT SDR com SUGGEST + CONTACT_FORM |

---

## Context para implementador

**Scroll bug (linha 61, ChatLeadForm.tsx):**
`bottomRef.current?.scrollIntoView()` rola a JANELA inteira para o elemento, não só o container do chat. O container tem `ref={chatRef}` e `overflow-y: auto` com `maxHeight: 50vh`. Fix: usar `chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })`.

**Streaming invisível:**
React 19 batcha os `setMessages` chamados dentro do `for` loop síncrono. O Groq envia tokens em chunks — cada chunk pode conter múltiplos tokens no mesmo read. Fix: após cada atualização de estado dentro do loop, yield ao browser com `await new Promise(r => setTimeout(r, 0))`. Também adicionar `X-Accel-Buffering: no` no response da API para evitar buffering do Nginx/Vercel.

**Quick-reply protocol:**
- AI appenda `[SUGGEST: "opção1","opção2"]` ao final de cada mensagem (só para perguntas previsíveis)
- Cliente parseia com regex: `content.match(/\[SUGGEST:\s*([^\]]+)\]/)`
- Extrai sugestões, limpa o texto exibido, mostra botões
- Ao clicar: seta input + dispara submit automaticamente
- Botões só aparecem na última mensagem AI e quando não está streamando

---

## Task 1: Fix do Scroll

**Files:**
- Modify: `src/components/ChatLeadForm.tsx`

- [ ] **Step 1.1: Ler o arquivo**

```bash
cat /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/ChatLeadForm.tsx | head -70
```

- [ ] **Step 1.2: Substituir o useEffect de scroll**

Localizar (linha ~60-63):
```typescript
  // Auto-scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
```

Substituir por:
```typescript
  // Scroll only within the chat container — never the window
  useEffect(() => {
    const chat = chatRef.current
    if (!chat) return
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" })
  }, [messages])
```

- [ ] **Step 1.3: Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 1.4: Remover `bottomRef` (não é mais necessário)**

Localizar e remover:
```typescript
const bottomRef = useRef<HTMLDivElement>(null)
```
E no JSX, remover:
```tsx
<div ref={bottomRef} />
```

- [ ] **Step 1.5: TypeScript check**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 1.6: Commit**

```bash
git add src/components/ChatLeadForm.tsx
git commit -m "fix(chat): scroll within container only — remove window scrollIntoView"
```

---

## Task 2: Fix do Streaming Visível

**Files:**
- Modify: `src/components/ChatLeadForm.tsx` (yield ao browser)
- Modify: `src/app/api/chat-lead/route.ts` (header anti-buffer)

### Parte A: Header anti-buffer na API

- [ ] **Step 2.1: Ler o arquivo da API**

```bash
cat /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/app/api/chat-lead/route.ts | tail -20
```

- [ ] **Step 2.2: Adicionar X-Accel-Buffering ao response**

Localizar:
```typescript
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
```

Substituir por:
```typescript
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
```

### Parte B: Yield ao browser no loop de tokens

- [ ] **Step 2.3: Adicionar yield após cada setMessages no while loop**

No `ChatLeadForm.tsx`, localizar o bloco dentro do `for (const line of lines)`:

```typescript
            aiContent += parsed.choices[0]?.delta?.content ?? ""
            setMessages((prev) => {
              const next = [...prev]
              next[next.length - 1] = { role: "assistant", content: aiContent }
              return next
            })
```

Substituir por:
```typescript
            const token = parsed.choices[0]?.delta?.content ?? ""
            if (token) {
              aiContent += token
              setMessages((prev) => {
                const next = [...prev]
                next[next.length - 1] = { role: "assistant", content: aiContent }
                return next
              })
              // Yield to browser render cycle between tokens
              await new Promise<void>((r) => setTimeout(r, 0))
            }
```

> **Nota:** O `await` dentro do `for` loop está dentro de uma `async function`, então é válido.

- [ ] **Step 2.4: TypeScript check**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 2.5: Commit**

```bash
git add src/components/ChatLeadForm.tsx src/app/api/chat-lead/route.ts
git commit -m "fix(chat): streaming visible — yield to browser + X-Accel-Buffering header"
```

---

## Task 3: System Prompt SDR + Protocolo SUGGEST

**Files:**
- Modify: `src/app/api/chat-lead/route.ts` (SYSTEM_PROMPT)

- [ ] **Step 3.1: Substituir o SYSTEM_PROMPT inteiro**

Localizar a constante `const SYSTEM_PROMPT = \`` até o fechamento `` ` `` e substituir por:

```typescript
const SYSTEM_PROMPT = `Você é Aria, SDR sênior da Welux — consultoria brasileira de implementação de IA para operações empresariais. Sua missão: conduzir um diagnóstico conversacional genuíno para entender se a Welux pode gerar valor real para o prospect.

A conversa tem 4 fases. Avance naturalmente, sem revelar a estrutura.

━ FASE 1 — CONEXÃO (2 mensagens)
Colete nome. Pergunte o que a empresa faz e qual o papel do prospect. Use o nome dele nas mensagens seguintes.

━ FASE 2 — DESCOBERTA DE DOR (3-4 mensagens)
Perguntas abertas: "Qual é o maior ponto de atrito na sua operação hoje?"
Aprofunde: "Isso acontece com que frequência?" / "O que isso impacta concretamente?"
Se a resposta for vaga ("processos lentos"), peça exemplo: "Pode me dar um exemplo do dia a dia?"
Não avance para fase 3 sem entender a dor real.

━ FASE 3 — QUALIFICAÇÃO (2-3 mensagens)
Tamanho do time e faturamento — posicione como interesse genuíno, não triagem.
Experiência anterior com IA — use para calibrar o discurso.

━ FASE 4 — FECHAMENTO E CONTATO (2 mensagens)
Crie expectativa concreta: "Com o que você me contou, consigo ver pelo menos 2-3 pontos onde IA eliminaria isso direto."
Colete WhatsApp: "Para marcar uma conversa rápida com nosso time de diagnóstico, qual o melhor WhatsApp pra te chamar?"

REGRAS ABSOLUTAS:
- Uma pergunta por mensagem, nunca mais
- Máximo 3 linhas por resposta
- Português do Brasil, informal mas profissional
- Sem bullet points, sem traço longo, sem markdown
- Nunca use "garantir" — use "mapear", "identificar", "visualizar"
- Reaja à resposta anterior antes de avançar
- Sem textos genéricos ("Entendo perfeitamente", "Que bom")

PROTOCOLO DE SUGESTÕES:
Após perguntas com respostas previsíveis, adicione na ÚLTIMA linha (sem texto depois):
[SUGGEST: "opção1","opção2","opção3"]
- Máximo 3 opções, máximo 4 palavras cada
- Use APENAS quando as opções cobrem bem o espectro de respostas
- NÃO use para nome, WhatsApp, ou respostas livres sobre dor/contexto

Exemplos de quando usar SUGGEST:
- Pergunta sobre cargo → [SUGGEST: "Sou fundador","Sou gestor","Sou analista"]
- Pergunta sobre tamanho → [SUGGEST: "Menos de 10","10 a 50","Mais de 50"]
- Pergunta sobre IA anterior → [SUGGEST: "Nunca tentei","Tentei e não funcionou","Já uso"]
- Pergunta sobre faturamento → [SUGGEST: "Até 50k/mês","50k a 500k/mês","Acima de 500k/mês"]

DADOS A CAPTURAR (via conversa, não interrogatório):
nome, cargo, empresa, tamanho (1-10|10-50|50-200|200+), faturamento (ate-50k|50k-150k|150k-500k|500k+), ia_antes (nunca|falhou|escalar), gargalo (texto rico), gargalo_tags (array), whatsapp

CONCLUSÃO: quando tiver nome + whatsapp + demais dados (inferidos se necessário), responda APENAS com esta linha:
LEAD_COMPLETE {"cargo":"Fundador / CEO","empresa":"Empresa X","tamanho":"10-50","faturamento":"150k-500k","ia_antes":"falhou","gargalo":"descrição detalhada","gargalo_tags":["Atendimento","Vendas"],"nome":"João","whatsapp":"5561996138222"}

Regras do JSON:
- cargo: "Fundador / CEO" | "Gestor / Diretor" | "Analista / Operacional" | "Outro"
- tamanho: "1-10" | "10-50" | "50-200" | "200+"
- faturamento: "ate-50k" | "50k-150k" | "150k-500k" | "500k+"
- ia_antes: "nunca" | "falhou" | "escalar"
- gargalo_tags: subset de ["Atendimento","Processos repetitivos","Dados / BI","Vendas","Financeiro","RH"]
- whatsapp: somente dígitos com DDI 55, sem formatação`
```

- [ ] **Step 3.2: TypeScript check**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3.3: Commit**

```bash
git add src/app/api/chat-lead/route.ts
git commit -m "feat(chat): SDR system prompt — rapport, SPIN discovery, qualification, SUGGEST protocol"
```

---

## Task 4: Quick-Reply Buttons no Frontend

**Files:**
- Modify: `src/components/ChatLeadForm.tsx`

### Contexto

O AI appenda `[SUGGEST: "opção1","opção2"]` ao final das mensagens. O cliente deve:
1. Parsear o marcador e separar texto visível das sugestões
2. Renderizar botões de sugestão abaixo da última mensagem AI (não abaixo do input)
3. Clicar num botão → seta input + auto-submit (zero atrito)
4. Esconder botões enquanto streaming ou após user responder

### Implementação

- [ ] **Step 4.1: Adicionar função `parseMessage` ao topo do arquivo (antes do componente)**

Logo após as constantes `LEAD_MARKER` e `OPENING_MESSAGE`, adicionar:

```typescript
const SUGGEST_RE = /\[SUGGEST:\s*([^\]]+)\]\s*$/

function parseMessage(content: string): { text: string; suggestions: string[] } {
  const match = content.match(SUGGEST_RE)
  if (!match) return { text: content.trim(), suggestions: [] }

  const suggestions = match[1]
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""))
    .filter(Boolean)

  const text = content.replace(SUGGEST_RE, "").trim()
  return { text, suggestions }
}
```

- [ ] **Step 4.2: Atualizar o bloco de renderização de cada mensagem**

No JSX dentro do `AnimatePresence`, o bloco que renderiza `msg.content` precisa usar `parseMessage`. Localizar o trecho que renderiza conteúdo da mensagem:

```tsx
                  <div
                    className={[
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "assistant"
                        ? "rounded-bl-sm bg-white/5 border border-white/8 text-body"
                        : "rounded-br-sm bg-primary text-background font-medium",
                    ].join(" ")}
                  >
                    {msg.content}
                    {/* Blinking cursor while streaming */}
                    {isStreamingThis && (
                      <span className="inline-block w-[2px] h-[14px] bg-secondary/70 ml-[2px] align-middle animate-pulse" />
                    )}
                  </div>
```

Substituir por:

```tsx
                  {(() => {
                    const { text, suggestions } = parseMessage(msg.content)
                    const showSuggestions =
                      suggestions.length > 0 &&
                      !isStreaming &&
                      msg.role === "assistant" &&
                      i === messages.length - 1

                    return (
                      <div className="flex flex-col gap-2 max-w-[78%]">
                        <div
                          className={[
                            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                            msg.role === "assistant"
                              ? "rounded-bl-sm bg-white/5 border border-white/8 text-body"
                              : "rounded-br-sm bg-primary text-background font-medium",
                          ].join(" ")}
                        >
                          {text}
                          {isStreamingThis && (
                            <span className="inline-block w-[2px] h-[14px] bg-secondary/70 ml-[2px] align-middle animate-pulse" />
                          )}
                        </div>

                        {showSuggestions && (
                          <div className="flex flex-wrap gap-1.5 pl-1">
                            {suggestions.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => {
                                  setInput(s)
                                  // auto-submit after state update settles
                                  setTimeout(() => {
                                    const fakeSubmit = async () => {
                                      const text = s.trim()
                                      if (!text) return
                                      const userMsg: Message = { role: "user", content: text }
                                      const history = [...messages, userMsg]
                                      setMessages(history)
                                      setInput("")
                                      setIsStreaming(true)

                                      abortRef.current?.abort()
                                      const ctrl = new AbortController()
                                      abortRef.current = ctrl

                                      try {
                                        const res = await fetch("/api/chat-lead", {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ messages: history }),
                                          signal: ctrl.signal,
                                        })

                                        if (!res.ok || !res.body) throw new Error("stream_failed")

                                        const reader = res.body.getReader()
                                        const decoder = new TextDecoder()
                                        let aiContent = ""

                                        setMessages((prev) => [...prev, { role: "assistant", content: "" }])

                                        while (true) {
                                          const { done, value } = await reader.read()
                                          if (done) break

                                          const lines = decoder.decode(value, { stream: true }).split("\n")
                                          for (const line of lines) {
                                            if (!line.startsWith("data: ")) continue
                                            const data = line.slice(6).trim()
                                            if (data === "[DONE]") continue
                                            try {
                                              const parsed = JSON.parse(data) as {
                                                choices: [{ delta: { content?: string } }]
                                              }
                                              const token = parsed.choices[0]?.delta?.content ?? ""
                                              if (token) {
                                                aiContent += token
                                                setMessages((prev) => {
                                                  const next = [...prev]
                                                  next[next.length - 1] = { role: "assistant", content: aiContent }
                                                  return next
                                                })
                                                await new Promise<void>((r) => setTimeout(r, 0))
                                              }
                                            } catch {}
                                          }
                                        }

                                        if (aiContent.includes(LEAD_MARKER)) {
                                          const idx = aiContent.indexOf(LEAD_MARKER)
                                          const jsonStr = aiContent.slice(idx + LEAD_MARKER.length).trim()
                                          setMessages((prev) => {
                                            const next = [...prev]
                                            next[next.length - 1] = {
                                              role: "assistant",
                                              content: "Perfeito! Já tenho tudo que preciso. Deixa eu chamar o time pra você.",
                                            }
                                            return next
                                          })
                                          await new Promise((r) => setTimeout(r, 1200))
                                          setScreen("loading")
                                          try {
                                            const leadData = JSON.parse(jsonStr) as Record<string, unknown>
                                            const scoreRes = await fetch("/api/lead", {
                                              method: "POST",
                                              headers: { "Content-Type": "application/json" },
                                              body: JSON.stringify(leadData),
                                            })
                                            const { routing } = (await scoreRes.json()) as { routing: Routing }
                                            setScreen(routing)
                                          } catch {
                                            setScreen("warm")
                                          }
                                        }
                                      } catch (err) {
                                        if (err instanceof Error && err.name === "AbortError") return
                                        setMessages((prev) => [
                                          ...prev.slice(0, -1),
                                          { role: "assistant", content: "Desculpa, tive um problema aqui. Pode tentar de novo?" },
                                        ])
                                      } finally {
                                        setIsStreaming(false)
                                      }
                                    }
                                    fakeSubmit()
                                  }, 10)
                                }}
                                className="rounded-full border border-white/15 bg-white/4 px-3 py-1 text-xs text-secondary hover:border-white/30 hover:text-heading hover:bg-white/8 transition-all duration-150"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })()}
```

> **Nota sobre DRY:** O código de submit duplicado nos botões é intencional para este plano — ele permite que a task 4 seja implementada e testada de forma isolada. Após aprovação, a lógica de submit pode ser extraída para uma função `doSubmit(text: string)` em um refactor separado.

- [ ] **Step 4.3: TypeScript check**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 4.4: Verificar no browser**

```bash
# Dev server deve estar rodando em http://localhost:3000
# Abrir seção #form e verificar:
# - Primeira mensagem da Aria aparece
# - SEM [SUGGEST: ...] no texto visível
# - Botões de sugestão aparecem abaixo da mensagem
# - Clicar num botão envia a resposta + inicia streaming
# - Streaming mostra tokens sendo renderizados
# - Scroll fica dentro do container do chat
```

- [ ] **Step 4.5: Commit final**

```bash
git add src/components/ChatLeadForm.tsx
git commit -m "feat(chat): quick-reply suggestion buttons — zero-friction response chips from AI"
```

---

---

## Task 5: Inline Contact Card no Handoff

**Files:**
- Create: `src/components/quiz/ContactCard.tsx`
- Modify: `src/components/ChatLeadForm.tsx` (detectar `[CONTACT_FORM]`, renderizar ContactCard)
- Modify: `src/app/api/chat-lead/route.ts` (adicionar `[CONTACT_FORM]` ao system prompt na fase 4)

### Contexto

Quando a Aria quer coletar WhatsApp, inclui `[CONTACT_FORM]` no final da mensagem. O cliente detecta isso e, em vez de uma text bubble normal, renderiza um `ContactCard` — uma bolha com um mini-formulário embutido (nome + WhatsApp). Ao submeter, o componente:
1. Envia uma mensagem de usuário formatada: `"Meu nome é João, WhatsApp: 61996138222"`
2. O AI detecta os dados completos e emite `LEAD_COMPLETE`
3. A tela de resultado é exibida

**Visual esperado:**
```
┌─ W ──────────────────────────────────┐
│ Agora me passa seus dados pra gente  │
│ marcar uma conversa.                 │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  Seu nome                   │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │  WhatsApp com DDD            │    │
│  └──────────────────────────────┘    │
│  [ Enviar →                    ]     │
└──────────────────────────────────────┘
```

### Parte A: Criar ContactCard component

- [ ] **Step 5.1: Criar `src/components/quiz/ContactCard.tsx`**

```typescript
// src/components/quiz/ContactCard.tsx
"use client"

import { useState } from "react"

interface ContactCardProps {
  onSubmit: (nome: string, whatsapp: string) => void
  disabled?: boolean
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function ContactCard({ onSubmit, disabled = false }: ContactCardProps) {
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const canSubmit =
    nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 11

  function handleSubmit() {
    if (!canSubmit || disabled) return
    const rawPhone = whatsapp.replace(/\D/g, "")
    const normalized = rawPhone.startsWith("55") ? rawPhone : `55${rawPhone}`
    onSubmit(nome.trim(), normalized)
  }

  return (
    <div className="flex flex-col gap-3 pt-1">
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={disabled}
        autoComplete="name"
        aria-label="Seu nome"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-heading placeholder:text-secondary/50 focus:outline-none focus:border-white/25 transition-colors disabled:opacity-50"
      />
      <input
        type="tel"
        placeholder="WhatsApp com DDD"
        value={whatsapp}
        onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
        disabled={disabled}
        autoComplete="tel"
        inputMode="numeric"
        aria-label="WhatsApp com DDD"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-heading placeholder:text-secondary/50 focus:outline-none focus:border-white/25 transition-colors disabled:opacity-50"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || disabled}
        className="w-full rounded-lg bg-primary text-background text-sm font-medium py-2 transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </div>
  )
}
```

- [ ] **Step 5.2: TypeScript check**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit
```

Esperado: sem erros.

### Parte B: Adicionar `[CONTACT_FORM]` ao system prompt (Task 3 deve estar feita)

- [ ] **Step 5.3: Adicionar protocolo CONTACT_FORM ao system prompt**

No `src/app/api/chat-lead/route.ts`, dentro do `SYSTEM_PROMPT`, localizar a seção `━ FASE 4`:

```
━ FASE 4 — FECHAMENTO E CONTATO (2 mensagens)
Crie expectativa concreta: "Com o que você me contou, consigo ver pelo menos 2-3 pontos onde IA eliminaria isso direto."
Colete WhatsApp: "Para marcar uma conversa rápida com nosso time de diagnóstico, qual o melhor WhatsApp pra te chamar?"
```

Substituir por:

```
━ FASE 4 — FECHAMENTO E CONTATO (2 mensagens)
Crie expectativa concreta: "Com o que você me contou, consigo ver pelo menos 2-3 pontos onde IA eliminaria isso direto."
Para coletar o contato, diga algo como "Deixa eu pegar seus dados pra gente agendar uma conversa rápida." e adicione ao FINAL da mensagem (sem texto depois):
[CONTACT_FORM]
```

Também adicionar ao trecho `PROTOCOLO DE SUGESTÕES` uma nota:

```
NÃO use [SUGGEST: ...] na mesma mensagem que [CONTACT_FORM].
```

- [ ] **Step 5.4: TypeScript check**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

### Parte C: Detectar e renderizar ContactCard no ChatLeadForm

- [ ] **Step 5.5: Adicionar import e constante no topo de `ChatLeadForm.tsx`**

Adicionar import:
```typescript
import ContactCard from "@/components/quiz/ContactCard"
```

Adicionar constante após `LEAD_MARKER`:
```typescript
const CONTACT_FORM_MARKER = "[CONTACT_FORM]"
```

- [ ] **Step 5.6: Adicionar flag `contactFormSubmitted` ao estado do componente**

Após as linhas de `useState` existentes, adicionar:
```typescript
const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
```

- [ ] **Step 5.7: Adicionar `handleContactSubmit` function**

Logo após a função `handleSubmit`, adicionar:

```typescript
  async function handleContactSubmit(nome: string, whatsapp: string) {
    setContactFormSubmitted(true)
    const userMsg: Message = {
      role: "user",
      content: `Meu nome é ${nome}, WhatsApp: ${whatsapp}`,
    }
    const history = [...messages, userMsg]
    setMessages(history)
    setIsStreaming(true)

    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
      })

      if (!res.ok || !res.body) throw new Error("stream_failed")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let aiContent = ""

      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const lines = decoder.decode(value, { stream: true }).split("\n")
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6).trim()
          if (data === "[DONE]") continue
          try {
            const parsed = JSON.parse(data) as {
              choices: [{ delta: { content?: string } }]
            }
            const token = parsed.choices[0]?.delta?.content ?? ""
            if (token) {
              aiContent += token
              setMessages((prev) => {
                const next = [...prev]
                next[next.length - 1] = { role: "assistant", content: aiContent }
                return next
              })
              await new Promise<void>((r) => setTimeout(r, 0))
            }
          } catch {}
        }
      }

      if (aiContent.includes(LEAD_MARKER)) {
        const idx = aiContent.indexOf(LEAD_MARKER)
        const jsonStr = aiContent.slice(idx + LEAD_MARKER.length).trim()
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = {
            role: "assistant",
            content: "Perfeito! Já tenho tudo que preciso. Deixa eu chamar o time pra você.",
          }
          return next
        })
        await new Promise((r) => setTimeout(r, 1200))
        setScreen("loading")
        try {
          const leadData = JSON.parse(jsonStr) as Record<string, unknown>
          const scoreRes = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leadData),
          })
          const { routing } = (await scoreRes.json()) as { routing: Routing }
          setScreen(routing)
        } catch {
          setScreen("warm")
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Desculpa, tive um problema aqui. Pode tentar de novo?" },
      ])
    } finally {
      setIsStreaming(false)
    }
  }
```

- [ ] **Step 5.8: Atualizar `parseMessage` para tratar `[CONTACT_FORM]`**

Substituir a função `parseMessage` existente por:

```typescript
const SUGGEST_RE = /\[SUGGEST:\s*([^\]]+)\]\s*$/
const CONTACT_FORM_RE = /\[CONTACT_FORM\]\s*$/

function parseMessage(content: string): {
  text: string
  suggestions: string[]
  showContactForm: boolean
} {
  // Check contact form first
  if (CONTACT_FORM_RE.test(content)) {
    return {
      text: content.replace(CONTACT_FORM_RE, "").trim(),
      suggestions: [],
      showContactForm: true,
    }
  }

  // Check suggestions
  const match = content.match(SUGGEST_RE)
  if (!match) return { text: content.trim(), suggestions: [], showContactForm: false }

  const suggestions = match[1]
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""))
    .filter(Boolean)

  return {
    text: content.replace(SUGGEST_RE, "").trim(),
    suggestions,
    showContactForm: false,
  }
}
```

- [ ] **Step 5.9: Atualizar JSX para renderizar ContactCard quando `showContactForm` for true**

No bloco de renderização de mensagens, substituir o trecho que usa `parseMessage` (Task 4) pelo seguinte (inclui também a ContactCard):

```tsx
                {(() => {
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
                    <div className="flex flex-col gap-2 max-w-[78%]">
                      <div
                        className={[
                          "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          msg.role === "assistant"
                            ? "rounded-bl-sm bg-white/5 border border-white/8 text-body"
                            : "rounded-br-sm bg-primary text-background font-medium",
                        ].join(" ")}
                      >
                        {text}
                        {isStreamingThis && (
                          <span className="inline-block w-[2px] h-[14px] bg-secondary/70 ml-[2px] align-middle animate-pulse" />
                        )}
                        {showCard && (
                          <div className="mt-3 pt-3 border-t border-white/8">
                            <ContactCard
                              onSubmit={handleContactSubmit}
                              disabled={contactFormSubmitted}
                            />
                          </div>
                        )}
                      </div>

                      {showSuggestions && (
                        <div className="flex flex-wrap gap-1.5 pl-1">
                          {suggestions.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                // Use handleSubmit with forced input
                                setInput(s)
                                setTimeout(() => {
                                  const el = document.querySelector<HTMLTextAreaElement>(
                                    "[data-chat-input]",
                                  )
                                  if (el) {
                                    el.value = s
                                    el.dispatchEvent(new Event("input", { bubbles: true }))
                                  }
                                }, 0)
                              }}
                              className="rounded-full border border-white/15 bg-white/4 px-3 py-1 text-xs text-secondary hover:border-white/30 hover:text-heading hover:bg-white/8 transition-all duration-150"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })()}
```

> **Nota sobre suggestion click:** Os botões de sugestão agora apenas setam `input` e disparam um evento sintético para que o `ChatInputTextArea` capture a mudança. O `handleSubmit` detecta o input via o estado do componente. Isso simplifica muito o código vs. a abordagem `fakeSubmit` do Task 4.

- [ ] **Step 5.10: Atualizar `ChatInputTextArea` para adicionar `data-chat-input`**

No JSX da `ChatInputTextArea`:
```tsx
          <ChatInputTextArea
            placeholder="Digite sua resposta..."
            className="text-heading placeholder:text-secondary/60 bg-transparent"
          />
```

Substituir por:
```tsx
          <ChatInputTextArea
            placeholder="Digite sua resposta..."
            data-chat-input
            className="text-heading placeholder:text-secondary/60 bg-transparent"
          />
```

- [ ] **Step 5.11: TypeScript check completo**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 5.12: Commit**

```bash
git add src/components/ChatLeadForm.tsx src/components/quiz/ContactCard.tsx src/app/api/chat-lead/route.ts
git commit -m "feat(chat): inline contact card on handoff — zero-friction name+whatsapp collection"
```

---

## Checklist de Cobertura

| Problema | Task | Status |
|---|---|---|
| Scroll sai do chat | Task 1 — scrollTo no chatRef | ✓ |
| Streaming invisível | Task 2 — yield + X-Accel-Buffering | ✓ |
| System prompt fraco comercialmente | Task 3 — SDR completo + SUGGEST protocol | ✓ |
| Atrito de digitação | Task 4 — quick-reply buttons | ✓ |
| Handoff de contato com formulário inline | Task 5 — ContactCard + CONTACT_FORM marker | ✓ |

## Checklist de Type Consistency

- `parseMessage` retorna `{ text, suggestions, showContactForm }` — Task 5.8 define, Task 5.9 consome ✓
- `ContactCard` props: `{ onSubmit: (nome, whatsapp) => void; disabled?: boolean }` — Task 5.1 define, Task 5.9 consome ✓
- `handleContactSubmit(nome: string, whatsapp: string)` — Task 5.7 define, Task 5.9 passa como prop ✓
- `contactFormSubmitted` state: boolean — Task 5.6 declara, Task 5.9 usa como `disabled` ✓
- `CONTACT_FORM_MARKER` constante — Task 5.5 declara (usada no SYSTEM_PROMPT, não no código TS) ✓
- `SUGGEST_RE` e `CONTACT_FORM_RE` — Task 5.8 define ambos em `parseMessage` ✓

## Placeholder Scan

Nenhum TBD, TODO ou placeholder. Código completo em cada step.

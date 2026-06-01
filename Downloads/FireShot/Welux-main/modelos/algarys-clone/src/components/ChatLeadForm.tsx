"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input"
import ResultScreen from "@/components/quiz/ResultScreen"
import type { Routing } from "@/lib/scoring"

// ── Types ──────────────────────────────────────────────

interface Message {
  role: "user" | "assistant"
  content: string
}

const LEAD_MARKER = "LEAD_COMPLETE"

const OPENING_MESSAGE: Message = {
  role: "assistant",
  content: "Oi! Sou a Aria da Welux. Antes da gente conversar, me conta — qual é o seu nome?",
}

// ── Sub-components ─────────────────────────────────────

function WeluxAvatar() {
  return (
    <div className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 bg-white/8 flex items-center justify-center">
      <span className="text-[10px] font-semibold text-primary tracking-wide">W</span>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-secondary/60 block"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

// ── Main component ─────────────────────────────────────

export default function ChatLeadForm() {
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [screen, setScreen] = useState<null | "loading" | Routing>(null)
  const abortRef = useRef<AbortController | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Scroll only within the chat container — never the window
  useEffect(() => {
    const chat = chatRef.current
    if (!chat) return
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" })
  }, [messages])

  async function handleSubmit() {
    const text = input.trim()
    if (!text || isStreaming) return

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

      // Placeholder for streaming message
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
            aiContent += parsed.choices[0]?.delta?.content ?? ""
            setMessages((prev) => {
              const next = [...prev]
              next[next.length - 1] = { role: "assistant", content: aiContent }
              return next
            })
          } catch {}
        }
      }

      // Detect lead completion
      if (aiContent.includes(LEAD_MARKER)) {
        const idx = aiContent.indexOf(LEAD_MARKER)
        const jsonStr = aiContent.slice(idx + LEAD_MARKER.length).trim()

        // Remove the LEAD_COMPLETE line from chat — hide from user
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = {
            role: "assistant",
            content: "Perfeito! Já tenho tudo que preciso. Deixa eu chamar o time pra você.",
          }
          return next
        })

        // Short pause then transition
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
        {
          role: "assistant",
          content: "Desculpa, tive um problema aqui. Pode tentar de novo?",
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  // ── Result screen ──────────────────────────────────

  if (screen) {
    return (
      <section id="form" className="scroll-mt-25 flex items-center justify-center py-16 px-6">
        <ResultScreen screen={screen} />
      </section>
    )
  }

  // ── Chat UI ────────────────────────────────────────

  return (
    <section
      id="form"
      className="scroll-mt-25 relative flex flex-col items-center py-12 md:py-16 md:px-[100px]"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          className="w-[220%] md:w-[900px] h-[400px] md:h-[260px] opacity-35"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 100%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 55%, transparent 76%)",
            transform: "rotate(-15deg)",
          }}
        />
      </div>

      <div className="section-container relative z-10 w-full max-w-2xl px-4 md:px-0">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-2.5">
            <WeluxAvatar />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-heading leading-none">Aria · Welux</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] text-secondary">Online agora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div
          ref={chatRef}
          className="flex flex-col gap-3 mb-4 overflow-y-auto pr-1"
          style={{ maxHeight: "50vh" }}
          aria-live="polite"
          aria-label="Conversa com Aria"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1
              const isStreamingThis = isStreaming && isLast && msg.role === "assistant"

              // Show typing indicator while streaming but content is empty
              if (isStreamingThis && !msg.content) {
                return (
                  <motion.div
                    key={`typing-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <WeluxAvatar />
                    <div className="rounded-2xl rounded-bl-sm bg-white/5 border border-white/8 px-3 py-2">
                      <TypingDots />
                    </div>
                  </motion.div>
                )
              }

              if (!msg.content) return null

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && <WeluxAvatar />}

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
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Chat input */}
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          loading={isStreaming}
          onStop={() => abortRef.current?.abort()}
          className="border-white/10 bg-white/4"
        >
          <ChatInputTextArea
            placeholder="Digite sua resposta..."
            className="text-heading placeholder:text-secondary/60 bg-transparent"
          />
          <ChatInputSubmit />
        </ChatInput>

        <p className="text-[11px] text-secondary/50 text-center mt-2.5">
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>
    </section>
  )
}

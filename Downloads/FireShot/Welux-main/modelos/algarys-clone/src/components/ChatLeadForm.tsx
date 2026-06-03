"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input"
import ResultScreen from "@/components/quiz/ResultScreen"
import ContactCard from "@/components/quiz/ContactCard"
import ChatHeading from "@/components/chat/ChatHeading"
import ThinkingBubble from "@/components/chat/ThinkingBubble"
import type { Routing } from "@/lib/scoring"

// ── Types ──────────────────────────────────────────────

interface Message {
  role: "user" | "assistant"
  content: string
}

const LEAD_MARKER = "LEAD_COMPLETE"

const OPENING_MESSAGE: Message = {
  role: "assistant",
  content: "Oi! Sou a Aria, IA da Welux. Diagnóstico gratuito em 3 perguntas rápidas — sem pitch, resultado na hora.\n\nQual é o maior obstáculo da sua empresa com IA hoje? [SUGGEST: \"Testei IAs que não entregaram\",\"Não sei por onde começar\",\"Minha equipe não adota as ferramentas\",\"Gasto muito sem retorno\"]",
}

const SUGGEST_RE = /\[SUGGEST:\s*([^\]]+)\]\s*$/
const CONTACT_FORM_RE = /\[CONTACT_FORM\]\s*$/

function parseMessage(content: string): {
  text: string
  suggestions: string[]
  showContactForm: boolean
} {
  if (CONTACT_FORM_RE.test(content)) {
    return { text: content.replace(CONTACT_FORM_RE, "").trim(), suggestions: [], showContactForm: true }
  }
  const match = content.match(SUGGEST_RE)
  if (!match) return { text: content.trim(), suggestions: [], showContactForm: false }
  const suggestions = match[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean)
  return { text: content.replace(SUGGEST_RE, "").trim(), suggestions, showContactForm: false }
}

// ── Main component ─────────────────────────────────────

export default function ChatLeadForm({ inHero = false }: { inHero?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [screen, setScreen] = useState<null | "loading" | Routing>(null)
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [headingVisible, setHeadingVisible] = useState(true)
  const abortRef = useRef<AbortController | null>(null)
  const contactSubmittedRef = useRef(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const expandedRef = useRef(false)

  useEffect(() => {
    const chat = chatRef.current
    if (!chat) return
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" })
  }, [messages])

  function expandOnFirstMessage() {
    if (!expandedRef.current) {
      expandedRef.current = true
      setHeadingVisible(false)
      setIsExpanded(true)
    }
  }

  async function doSubmit(history: Message[]) {
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
        let chunkHadTokens = false
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6).trim()
          if (data === "[DONE]") continue
          try {
            const parsed = JSON.parse(data) as { choices: [{ delta: { content?: string } }] }
            const token = parsed.choices[0]?.delta?.content ?? ""
            if (token) { aiContent += token; chunkHadTokens = true }
          } catch {}
        }
        if (chunkHadTokens) {
          setMessages((prev) => {
            const next = [...prev]
            next[next.length - 1] = { role: "assistant", content: aiContent }
            return next
          })
          await new Promise<void>((r) => setTimeout(r, 0))
        }
      }

      if (aiContent.includes(LEAD_MARKER)) {
        const idx = aiContent.indexOf(LEAD_MARKER)
        const jsonStr = aiContent.slice(idx + LEAD_MARKER.length).trim()
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: "assistant", content: "Perfeito! Já tenho tudo que preciso. Deixa eu chamar o time pra você." }
          return next
        })
        await new Promise((r) => setTimeout(r, 1200))
        setScreen("loading")
        try {
          const leadData = JSON.parse(jsonStr) as Record<string, unknown>
          const scoreRes = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(leadData) })
          const { routing } = (await scoreRes.json()) as { routing: Routing }
          setScreen(routing)
        } catch { setScreen("warm") }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setMessages((prev) => prev[prev.length - 1]?.content === "" ? prev.slice(0, -1) : prev)
        return
      }
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: "Desculpa, tive um problema aqui. Pode tentar de novo?" }])
    } finally {
      setIsStreaming(false)
    }
  }

  async function handleSubmit() {
    const text = input.trim()
    if (!text || isStreaming) return
    expandOnFirstMessage()
    const userMsg: Message = { role: "user", content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput("")
    await doSubmit(history)
  }

  async function handleContactSubmit(nome: string, whatsapp: string) {
    if (contactSubmittedRef.current) return
    contactSubmittedRef.current = true
    setContactFormSubmitted(true)
    const userMsg: Message = { role: "user", content: `Meu nome é ${nome}, WhatsApp: ${whatsapp}` }
    const history = [...messages, userMsg]
    setMessages(history)
    await doSubmit(history)
  }

  // ── Shared styles ──────────────────────────────────────────────────────────

  const sectionBg = {
    background: "#050505",
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  }

  const Glow = () => (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
    />
  )

  // ── Result screen ──────────────────────────────────────────────────────────

  if (screen) {
    const resultInner = (
      <div className="flex-1 flex items-center justify-center relative z-10 px-6">
        <ResultScreen screen={screen} />
      </div>
    )
    if (inHero) {
      return (
        <div className="fixed inset-0 z-[60] flex flex-col" style={sectionBg}>
          <Glow />
          {resultInner}
        </div>
      )
    }
    return (
      <section id="form" className="relative flex flex-col min-h-dvh" style={sectionBg}>
        <Glow />
        {resultInner}
      </section>
    )
  }

  // ── Card internals (shared across all layouts) ─────────────────────────────

  const cardInner = (
    <>
      <AnimatePresence>
        {headingVisible && <ChatHeading key="heading" />}
      </AnimatePresence>
      <div
        ref={chatRef}
        className={`relative z-10 flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 md:gap-4 px-5 md:px-6 pb-[34px] md:pb-[34px] ${isExpanded && inHero ? "pt-14" : "pt-4 md:pt-5"}`}
        aria-live="polite"
        aria-label="Conversa com Aria"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1
            const isStreamingThis = isStreaming && isLast && msg.role === "assistant"

            if (isStreamingThis && !msg.content) {
              return (
                <motion.div key={`thinking-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <ThinkingBubble />
                </motion.div>
              )
            }
            if (!msg.content) return null

            const { text, suggestions, showContactForm } = parseMessage(msg.content)
            const showSuggestions = suggestions.length > 0 && !isStreaming && msg.role === "assistant" && i === messages.length - 1
            const showCard = showContactForm && msg.role === "assistant" && i === messages.length - 1 && !isStreaming

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "assistant" ? (
                  <div className="border-l-2 border-white pl-5 pr-4 py-4 bg-white/[0.025] rounded-r-lg text-[14px] leading-[1.65] text-white/[0.72] max-w-[90%]">
                    {text}
                    {isStreamingThis && <span className="inline-block w-[2px] h-[15px] bg-white/60 ml-[3px] align-middle animate-pulse" />}
                    {showCard && (
                      <div className="mt-4 pt-4 border-t border-white/[0.08]">
                        <ContactCard onSubmit={handleContactSubmit} disabled={contactFormSubmitted} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white text-black px-5 py-[13px] rounded-xl rounded-br-sm text-[14px] font-semibold max-w-[80%]">
                    {text}
                  </div>
                )}
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
      <div className="relative z-10 flex flex-col gap-[5px] px-5 md:px-6 pt-3 pb-5 md:pb-5 border-t border-white/[0.04] flex-shrink-0">
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
      </div>
    </>
  )

  // ── Chat UI: inHero fullscreen (mobile after first message) ────────────────

  if (inHero && isExpanded) {
    return (
      <section className="fixed inset-0 z-[50] flex flex-col" style={sectionBg}>
        <Glow />
        <button
          type="button"
          aria-label="Fechar chat"
          onClick={() => setIsExpanded(false)}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/40 hover:text-white hover:border-white/40 transition-all font-mono text-[20px] rounded-sm"
        >
          ×
        </button>
        {cardInner}
      </section>
    )
  }

  // ── Chat UI: inHero card ───────────────────────────────────────────────────

  if (inHero) {
    return (
      <div
        className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]"
        style={{
          background: "#050505",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {cardInner}
      </div>
    )
  }

  // ── Chat UI: standalone section ────────────────────────────────────────────

  return (
    <section
      id="form"
      className={isExpanded ? "fixed inset-0 z-[50] flex flex-col" : "relative flex flex-col scroll-mt-25"}
      style={sectionBg}
    >
      <div className={isExpanded
        ? "flex flex-col flex-1 min-h-0 relative z-10"
        : "flex items-center justify-center px-4 md:px-8 py-10 md:py-14 relative z-10"
      }>
        <div className={isExpanded
          ? "flex flex-col flex-1 min-h-0 w-full"
          : "w-full max-w-[680px] flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.01] h-[min(500px,66vh)] overflow-hidden"
        }>
          {cardInner}
        </div>
      </div>
    </section>
  )
}

import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"
import { localScore, groqScore, getRouting, formatWaMessage, type FormData, type Routing } from "@/lib/scoring"

async function sendWhatsapp(phone: string, message: string): Promise<void> {
  const url = process.env.EVOLUTION_API_URL
  const key = process.env.EVOLUTION_API_KEY
  const instance = process.env.EVOLUTION_INSTANCE
  if (!url || !key || !instance) return

  const number = phone.replace(/\D/g, "")
  const normalized = number.startsWith("55") ? number : `55${number}`

  // Número BR válido: 55 + DDD (2 dígitos) + número (8 ou 9 dígitos) = 12 ou 13 dígitos
  if (!/^55\d{10,11}$/.test(normalized)) {
    console.warn("[WHATSAPP] Número inválido descartado:", normalized.slice(0, 6) + "***")
    return
  }

  await fetch(`${url}/message/sendText/${instance}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ number: normalized, text: message }),
  }).catch((err: unknown) => {
    // Log seguro: apenas mensagem de erro, sem URL/credenciais
    const msg = err instanceof Error ? err.message : "evolution_error"
    console.error("[EVOLUTION_ERROR]", msg)
  })
}

export async function POST(req: NextRequest) {
  // Rate limiting: 5 req/min por IP — protege envio de WhatsApp via Evolution
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    "unknown"
  const { allowed, retryAfter } = checkRateLimit(ip, { max: 5, windowMs: 60_000 })
  if (!allowed) {
    const res = NextResponse.json(
      { error: "Too Many Requests" },
      { status: 429 }
    )
    res.headers.set("Retry-After", String(retryAfter))
    return res
  }

  let lead: FormData
  try {
    lead = (await req.json()) as FormData
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  let local: number, ai: number
  try {
    ;[local, ai] = await Promise.all([
      Promise.resolve(localScore(lead)),
      groqScore(lead),
    ])
  } catch {
    local = localScore(lead)
    ai = 1
  }

  const total = local + ai
  const routing = getRouting(total) as Routing
  const message = formatWaMessage(lead, routing, total)

  const sdr = process.env.SDR_WHATSAPP_NUMBER
  const nurturing = process.env.NURTURING_WHATSAPP_NUMBER

  if (routing !== "cold" && sdr) {
    await sendWhatsapp(sdr, message)
  } else if (routing === "cold" && nurturing) {
    await sendWhatsapp(nurturing, message)
  }

  const leadPhone = (lead.whatsapp as string | undefined)?.replace(/\D/g, "")
  if (leadPhone && leadPhone.length >= 10) {
    const normalized = leadPhone.startsWith("55") ? leadPhone : `55${leadPhone}`
    const welcomeMessage = `Oi, ${lead.nome || "tudo bem"}! Aqui é a Welux.\n\nRecebi seu diagnóstico e já comuniquei o time.\n\nVamos te chamar em até 5 minutos para uma conversa rápida.\n\nAria · Welux AI`
    await sendWhatsapp(normalized, welcomeMessage)
  }

  console.log("[LEAD]", { routing, score: total })

  return NextResponse.json({ routing, score: total })
}

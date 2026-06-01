import { NextRequest, NextResponse } from "next/server"
import { localScore, groqScore, getRouting, formatWaMessage, type FormData, type Routing } from "@/lib/scoring"

async function sendWhatsapp(phone: string, message: string): Promise<void> {
  const url = process.env.EVOLUTION_API_URL
  const key = process.env.EVOLUTION_API_KEY
  const instance = process.env.EVOLUTION_INSTANCE
  if (!url || !key || !instance) return

  const number = phone.replace(/\D/g, "")
  const normalized = number.startsWith("55") ? number : `55${number}`

  await fetch(`${url}/message/sendText/${instance}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ number: normalized, text: message }),
  }).catch((err) => console.error("[EVOLUTION_ERROR]", err))
}

export async function POST(req: NextRequest) {
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

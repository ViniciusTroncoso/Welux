import { NextRequest, NextResponse } from "next/server"
import type { Routing } from "@/lib/scoring"
import { checkRateLimit } from "@/lib/rate-limit"
import { IntakeSchema, type IntakeData } from "@/lib/schemas"

// ── Scoring ───────────────────────────────────────────────────────────────────

function localScore(d: IntakeData): number {
  let score = 0

  // Decisor + escala (cruzado)
  if (d.cargoRole === "hot_founder")    score += 3
  else if (d.cargoRole === "warm_founder")   score += 2
  else if (d.cargoRole === "warm_director")  score += 1
  // cold_operator = 0

  // Maturidade de dados
  if (d.maturidade === "crm")       score += 3
  else if (d.maturidade === "planilhas") score += 1
  // manual = 0

  // Orçamento
  if (d.orcamento === "above15k")  score += 4
  else if (d.orcamento === "5k-15k")    score += 2
  else if (d.orcamento === "mvp")       score += 1
  // none = 0

  return score
}

function getRouting(d: IntakeData, score: number): Routing {
  // Hard disqualifiers
  if (d.orcamento === "none")           return "cold"
  if (d.cargoRole === "cold_operator")  return "cold"

  if (score >= 8) return "hot"
  if (score >= 4) return "warm"
  return "cold"
}

function buildWaMessage(d: IntakeData, routing: Routing, score: number): string {
  const badge = routing === "hot" ? "🔥 HOT" : routing === "warm" ? "⚡ WARM" : "❄️ COLD"
  const dorLabel: Record<string, string> = {
    vendas: "Vendas e Conversão", custo: "Custo Operacional",
    retencao: "Retenção / CS",    dados: "Dados e Gestão",
  }
  const cargoLabel: Record<string, string> = {
    hot_founder: "Fundador/C-Level 10+", warm_founder: "Fundador/C-Level 1-9",
    warm_director: "Diretor/Gerente",    cold_operator: "Operacional",
  }
  const maturidadeLabel: Record<string, string> = {
    crm: "CRM/ERP maduro", planilhas: "Planilhas/ágil", manual: "Tudo na cabeça",
  }
  const orcamentoLabel: Record<string, string> = {
    above15k: "R$ 15k-30k+", "5k-15k": "R$ 5k-15k", mvp: "até R$ 5k", none: "Sem orçamento",
  }

  return [
    `${badge} — Score: ${score}/10`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${d.nome}`,
    `📧 ${d.email}`,
    `📱 ${d.whatsapp}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Cargo: ${cargoLabel[d.cargoRole] ?? d.cargoRole}`,
    `Gargalo: ${dorLabel[d.dor] ?? d.dor}`,
    `Maturidade: ${maturidadeLabel[d.maturidade] ?? d.maturidade}`,
    `Orçamento: ${orcamentoLabel[d.orcamento] ?? d.orcamento}`,
  ].join("\n")
}

async function sendWhatsapp(phone: string, text: string): Promise<void> {
  const url = process.env.EVOLUTION_API_URL
  const key = process.env.EVOLUTION_API_KEY
  const instance = process.env.EVOLUTION_INSTANCE
  if (!url || !key || !instance) return

  const n = phone.replace(/\D/g, "")
  const num = n.startsWith("55") ? n : `55${n}`

  if (!/^55\d{10,11}$/.test(num)) {
    console.warn("[WHATSAPP] Número inválido descartado:", num.slice(0, 6) + "***")
    return
  }

  await fetch(`${url}/message/sendText/${instance}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ number: num, text }),
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : "evolution_error"
    console.error("[EVOLUTION_ERROR]", msg)
  })
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting: 5 req/min por IP — protege envio de WhatsApp via Evolution
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",").at(0)?.trim() ??
    "unknown"
  const { allowed, retryAfter } = checkRateLimit(ip, { max: 5, windowMs: 60_000 })
  if (!allowed) {
    const res = NextResponse.json({ error: "Too Many Requests" }, { status: 429 })
    res.headers.set("Retry-After", String(retryAfter))
    return res
  }

  let d: IntakeData
  try {
    const body = await req.json()
    const result = IntakeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "validation_error", details: result.error.flatten() },
        { status: 400 }
      )
    }
    d = result.data
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const score   = localScore(d)
  const routing = getRouting(d, score)
  const message = buildWaMessage(d, routing, score)

  const sdr       = process.env.SDR_WHATSAPP_NUMBER
  const nurturing = process.env.NURTURING_WHATSAPP_NUMBER

  if (routing !== "cold" && sdr)           await sendWhatsapp(sdr, message)
  else if (routing === "cold" && nurturing) await sendWhatsapp(nurturing, message)

  const whatsappNum = d.whatsapp.replace(/\D/g, "")
  if (whatsappNum.length >= 10 && routing !== "cold") {
    const welcome = routing === "hot"
      ? `Oi, ${d.nome.split(" ")[0]}! Aqui é a Welux.\n\nSeu perfil tem alto fit com nossa infraestrutura de IA. Nossa equipe já recebeu seu raio-x.\n\nEm instantes você receberá o link para agendar uma call técnica de 30 minutos com nossos engenheiros. Sem pressão, sem jargões.\n\nAria · Welux AI`
      : `Oi, ${d.nome.split(" ")[0]}! Aqui é a Welux.\n\nSeu nível de maturidade é promissor. Nossa equipe acabou de receber seu raio-x e um especialista entrará em contato em breve para validar algumas informações.\n\nAria · Welux AI`
    await sendWhatsapp(whatsappNum, welcome)
  }

  console.log("[INTAKE]", { nome: d.nome, routing, score })

  const calendly = routing === "hot" ? (process.env.NEXT_PUBLIC_CALENDLY_URL ?? null) : null

  return NextResponse.json({ routing, score, calendly })
}

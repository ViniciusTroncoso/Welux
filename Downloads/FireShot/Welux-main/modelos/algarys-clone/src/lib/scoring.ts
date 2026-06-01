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
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
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

    clearTimeout(timeout)

    if (!res.ok) return 1
    const data = await res.json()

    if (!data.choices?.[0]?.message?.content) return 1
    const parsed = JSON.parse(data.choices[0].message.content) as { score: unknown }
    const raw = typeof parsed.score === "number" ? parsed.score : 1
    return Math.min(3, Math.max(0, raw))
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

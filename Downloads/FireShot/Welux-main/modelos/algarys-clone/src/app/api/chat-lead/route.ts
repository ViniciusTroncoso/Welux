import { NextRequest } from "next/server"

const SYSTEM_PROMPT = `Você é Aria, assistente de diagnóstico da Welux — empresa brasileira especializada em implementação de IA para operações empresariais.

Seu papel: conduzir uma conversa natural, empática e inteligente para entender se podemos ajudar o prospect.

DADOS A COLETAR (um por mensagem, nesta ordem):
1. nome — primeiro nome do usuário
2. cargo — Fundador / CEO | Gestor / Diretor | Analista / Operacional | Outro (inferir da resposta)
3. empresa — nome da empresa
4. tamanho — 1-10 | 10-50 | 50-200 | 200+ (inferir do contexto se necessário)
5. faturamento — ate-50k | 50k-150k | 150k-500k | 500k+ (inferir do contexto)
6. ia_antes — nunca | falhou | escalar (inferir da resposta natural)
7. gargalo — dor operacional específica; se for vago, peça um exemplo concreto
8. whatsapp — com DDD, para o time entrar em contato

REGRAS ABSOLUTAS:
- Português do Brasil, informal mas profissional
- Uma pergunta por mensagem, nunca mais de uma
- Máximo 2-3 linhas por resposta
- Reaja sempre à resposta anterior antes de perguntar o próximo dado
- Sem bullet points, sem traço longo, sem markdown
- Normalize faturamento e tamanho para os valores exatos das opções

CONCLUSÃO: quando tiver todos os 8 dados coletados, responda APENAS com esta linha (nenhum texto antes ou depois):
LEAD_COMPLETE {"cargo":"Fundador / CEO","empresa":"Nome Empresa","tamanho":"10-50","faturamento":"150k-500k","ia_antes":"falhou","gargalo":"descrição detalhada do gargalo","gargalo_tags":["Atendimento","Vendas"],"nome":"João","whatsapp":"61996138222"}

Regras do JSON:
- cargo: um dos quatro valores exatos
- tamanho: um dos quatro intervalos exatos
- faturamento: um dos quatro valores exatos
- ia_antes: nunca | falhou | escalar
- gargalo_tags: subconjunto de ["Atendimento","Processos repetitivos","Dados / BI","Vendas","Financeiro","RH"]
- whatsapp: apenas dígitos, sem formatação`

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[]
  try {
    const body = await req.json() as { messages: ChatMessage[] }
    messages = body.messages
  } catch {
    return new Response("invalid_json", { status: 400 })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return new Response("GROQ_API_KEY not configured", { status: 500 })
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 400,
      temperature: 0.72,
    }),
  })

  if (!groqRes.ok || !groqRes.body) {
    return new Response("Groq API error", { status: 502 })
  }

  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}

import { NextRequest, NextResponse } from "next/server"
import { localScore, groqScore, getRouting, formatWaMessage, type FormData } from "@/lib/scoring"

export async function POST(req: NextRequest) {
  let lead: FormData
  try {
    lead = (await req.json()) as FormData
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const [local, ai] = await Promise.all([
    Promise.resolve(localScore(lead)),
    groqScore(lead),
  ])

  const total = local + ai
  const routing = getRouting(total)

  const message = formatWaMessage(lead, routing, total)
  console.log("[LEAD]", { routing, score: total, message })

  return NextResponse.json({ routing, score: total })
}

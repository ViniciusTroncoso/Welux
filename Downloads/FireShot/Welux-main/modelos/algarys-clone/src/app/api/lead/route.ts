import { NextRequest, NextResponse } from "next/server"
import { localScore, groqScore, getRouting, formatWaMessage, type FormData } from "@/lib/scoring"

export async function POST(req: NextRequest) {
  const lead = (await req.json()) as FormData

  const [local, ai] = await Promise.all([
    Promise.resolve(localScore(lead)),
    groqScore(lead),
  ])

  const total = local + ai
  const routing = getRouting(total)

  // Phase 2: Evolution API integration
  const message = formatWaMessage(lead, routing, total)
  console.log("[LEAD]", { routing, score: total, message })

  return NextResponse.json({ routing, score: total })
}

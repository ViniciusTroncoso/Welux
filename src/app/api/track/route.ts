import { NextRequest, NextResponse } from "next/server";

// Records A/B events (exposure | conversion) per variant into Supabase.
// Server-side only: uses the service_role key (never exposed to the client).
export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 200 });
  }

  let body: { variant?: string; event?: string; meta?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const variant = body.variant === "a" || body.variant === "b" ? body.variant : null;
  const event =
    body.event === "exposure" || body.event === "conversion" ? body.event : null;
  if (!variant || !event) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const res = await fetch(`${url}/rest/v1/ab_events`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      variant,
      event,
      meta: body.meta ?? null,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, error: text }, { status: 200 });
  }
  return NextResponse.json({ ok: true });
}

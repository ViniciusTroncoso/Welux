import { NextRequest, NextResponse } from "next/server";

// Stores a lead (contact form submission) into Supabase via the service_role key.
export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 200 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const str = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim().slice(0, 2000) : null;

  const variant = body.variant === "a" || body.variant === "b" ? body.variant : null;
  const row = {
    variant,
    nome: str(body.nome),
    email: str(body.email),
    telefone: str(body.telefone),
    empresa: str(body.empresa),
    mensagem: str(body.mensagem ?? body.gargalo),
    origem: str(body.origem) ?? "form",
    meta: body.meta ?? body,
  };

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: await res.text() }, { status: 200 });
  }
  return NextResponse.json({ ok: true });
}

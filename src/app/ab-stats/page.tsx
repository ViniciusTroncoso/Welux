export const dynamic = "force-dynamic";

type Row = {
  variant: string;
  exposures: number;
  conversions: number;
  conversion_rate_pct: number | null;
};

const LABELS: Record<string, string> = {
  a: "A — Site atual (algarys)",
  b: "B — Clone novo",
};

async function getStats(): Promise<Row[] | { error: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { error: "Supabase não configurado (env vars ausentes)." };
  const res = await fetch(`${url}/rest/v1/ab_stats?select=*`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) return { error: `Erro ${res.status}: ${await res.text()}` };
  return (await res.json()) as Row[];
}

export default async function AbStatsPage() {
  const data = await getStats();

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-medium mb-2">Teste A/B — Conversão por variante</h1>
        <p className="text-gray-600 mb-8">
          Conversão = envio do formulário de contato (lead). Atualiza a cada carregamento.
        </p>

        {"error" in data ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {data.error}
          </div>
        ) : data.length === 0 ? (
          <p className="text-gray-500">Ainda sem eventos registrados.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-3 pr-4">Variante</th>
                <th className="py-3 px-4 text-right">Exposições</th>
                <th className="py-3 px-4 text-right">Conversões</th>
                <th className="py-3 pl-4 text-right">Taxa</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.variant} className="border-b border-gray-200">
                  <td className="py-3 pr-4 font-medium">{LABELS[r.variant] ?? r.variant}</td>
                  <td className="py-3 px-4 text-right tabular-nums">{r.exposures}</td>
                  <td className="py-3 px-4 text-right tabular-nums">{r.conversions}</td>
                  <td className="py-3 pl-4 text-right tabular-nums font-semibold">
                    {r.conversion_rate_pct == null ? "—" : `${r.conversion_rate_pct}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

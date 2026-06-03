import { z } from "zod"

export const IntakeSchema = z.object({
  cargoRole:  z.enum(["hot_founder", "warm_founder", "warm_director", "cold_operator"]),
  dor:        z.enum(["vendas", "custo", "retencao", "dados"]),
  maturidade: z.enum(["crm", "planilhas", "manual"]),
  orcamento:  z.enum(["above15k", "5k-15k", "mvp", "none"]),
  nome:       z.string().min(2).max(100).trim(),
  email:      z.string().email().max(200),
  whatsapp:   z.string().min(8).max(20),
})

export type IntakeData = z.infer<typeof IntakeSchema>

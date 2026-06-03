# Welux

**Software house especializada exclusivamente em IA aplicada a negócios.**
Diagnóstico antes, engenharia por trás, resultado medido depois.

- Site: [`welux.com.br`](https://welux.com.br)
- Instagram: [@welux.com.br](https://www.instagram.com/welux.com.br/)
- Sede: Brasília (DF)

---

## O que a Welux faz

Construímos **sistemas robustos** e soluções de **IA sob medida**, integradas à operação do cliente,
com **ROI calculado antes de começar**. Dois serviços, por nível de maturidade:

1. **Diagnóstico IA — 30 dias** — para quem quer saber onde a IA gera resultado antes de investir.
   Diagnóstico profundo + retorno calculado com dados reais + protótipo funcionando.
2. **Desenvolvimento Personalizado de IA** — para quem já decidiu implementar e precisa de
   engenharia real: construção sob medida do que foi provado que funciona, medido em produção.

**Método (4 etapas):** Diagnóstico → Priorização → Construção → Medição.

---

## Repositório

```
Welux/
├── modelos/algarys-clone/   # Site welux.com.br — Next.js 16, React 19, Tailwind v4, Framer Motion, Spline
│   ├── src/lib/content.ts    #   copy do site (fonte da verdade do posicionamento)
│   ├── src/components/        #   Hero, Services, Method, About, Stats, Objections, Differentials...
│   └── src/app/api/           #   chat-lead (SDR com IA) + lead
└── hypergestor-sdr/         # Experimentos de agente SDR
```

### Rodar o site

```bash
cd modelos/algarys-clone
npm install
npm run dev
```

---

> **Histórico:** a Welux nasceu como agência de webdesign para médicos e pivotou para software house
> de IA. Os artefatos daquela fase (docs, landings e proposta médica) foram removidos do repositório
> para evitar confusão. O contexto completo da empresa é mantido no Obsidian (pasta `welux/`).

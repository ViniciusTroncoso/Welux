# Landing Page — `welux.com.br`

HTML estático com a copy TMBCO completa, pronto pro sócio implementar no Webflow.

---

## Arquitetura

**Arquitetura A — Serviço** (formulário de aplicação / high-ticket), 11 seções:

| # | Seção | TMBCO | Objetivo |
|---|-------|-------|----------|
| 1 | Top Bar | Transformação | Filtrar curiosos (R$ 400+/consulta) |
| 2 | Hero | Transformação | Promessa principal + VSL + CTA |
| 3 | Captura | Transformação + Oferta | Formulário de diagnóstico (aplicação) |
| 4 | Identificação de Desejos | Motivação | "Se você chegou aqui é porque procura..." |
| 5 | PAS (Problema) | Motivação | Lógica condicional Se/Então |
| 6 | Autoridade Rápida | Conforto | Track record + 2 mini-cases |
| 7 | Sintomas do Caos | Motivação | 4 dores do dia-a-dia do médico |
| 8 | Solução + Diferenciais | Benefícios | Método Welux + 3 "Sem..." |
| 9 | O Método (3 passos) | Benefícios | Diagnóstico → Construção → Lançamento |
| 10 | Bio do Fundador | Conforto | Autoridade pessoal (Vini) |
| 11 | Depoimentos + CTA final | Conforto + Oferta | 3 depoimentos + último CTA |

---

## Como abrir

```bash
# direto no navegador
open index.html

# ou servidor local (recomendado pra testes)
python3 -m http.server 8000
# abre http://localhost:8000
```

---

## Stack do HTML

- **Tailwind via CDN** — substituir por build CSS em produção
- **Google Fonts:** Playfair Display (display) + Inter (body)
- **Paleta Welux:**
  - `#0B132B` Midnight (fundo principal)
  - `#1E2536` Graphite (cards)
  - `#D4AF37` Champagne Gold (CTAs, destaques)
  - `#A82828` Carmesim (top bar / filtro)
  - `#F5F1EA` Off-white (texto)

---

## O que ainda precisa ser preenchido

Procure por `[PREENCHER]` no arquivo. Pontos críticos:

- [ ] **Seção 6 — Autoridade:** anos de experiência, número de operações, 2 mini-cases reais
- [ ] **Seção 10 — Bio:** texto da bio do Vini (terceira pessoa, ~2 parágrafos) e foto
- [ ] **Seção 11 — Depoimentos:** 3 depoimentos (ou substituir por outro tipo de prova social se não houver)
- [ ] **VSL (Hero):** placeholder pro vídeo de vendas (gravar quando o roteiro estiver pronto)
- [ ] **Preço:** decidir se mostra preço público ou só após diagnóstico

---

## Como portar pro Webflow

1. Recriar a estrutura seção por seção no Webflow (CMS não é necessário)
2. Importar as fontes (Playfair Display + Inter) no projeto Webflow
3. Configurar as cores como **swatches globais** com os HEX da paleta acima
4. O formulário da Seção 3 deve integrar com:
   - Email pra `contato@welux.com.br`
   - (Opcional) Webhook pra CRM / Notion / Sheets
5. Conectar domínio `welux.com.br` (ver `docs/SETUP-HOSTINGER.md`)
6. Ativar SSL automático no Webflow
7. Adicionar Google Analytics 4 + Meta Pixel antes de publicar

---

## Notas de copy

A copy segue o **framework TMBCO** (Transformação → Motivação → Benefícios → Conforto → Oferta) e o tom **Copynho** (direto, sem floreio).

Princípios respeitados:
- **Hero não explica demais** — faz desejar
- **Motivação traduz a dor com precisão** (não reclama dela)
- **Benefícios respondem "E daí?"** (cada "Sem X" remove uma objeção real)
- **Conforto de compra** com cases, autoridade e bio
- **Oferta como conclusão lógica** — não como pedido

> Se mudar o posicionamento (`docs/POSICIONAMENTO.md`), **regerar essa landing**.

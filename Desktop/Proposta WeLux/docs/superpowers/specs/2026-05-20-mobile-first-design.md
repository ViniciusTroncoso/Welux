# Mobile-First — Proposta WeLux
**Data:** 2026-05-20  
**Contexto:** prospect abre via WhatsApp no celular ao final da reunião de vendas  
**Conversão:** agendar call de contrato

---

## 1. Arquitetura (não mudar)

Motor de slides existente: 13 `.sc` sobrepostos em `#overlay`, transições GSAP, starfield Three.js, `overflow: hidden` no body. O trabalho mobile é **aditivo** — CSS dentro dos slides + extensão do engine JS. Nenhuma peça existente é substituída.

---

## 2. O que muda

### 2.1 CSS — `@media (max-width: 768px)`

| Seletor | Desktop | Mobile |
|---|---|---|
| `.sc` / `.sc.center` padding | `100px 120px` / `80px` | `24px 24px 80px` |
| `.sc.split` | `grid 1fr 1fr` | `flex-column; overflow-y: auto` |
| `.steps-grid` | `repeat(3, 1fr)` | `1fr` |
| `.deliv-grid` | `1fr 1fr` | `1fr` |
| `.method-row` | `44px 220px 1fr` | `32px 1fr` |
| `.metric-grid` | `repeat(3, 1fr)` | `1fr` |
| `.comp-wrap` | tabela horizontal | 2 cards verticais (§2.4) |
| `.editor` + `.edit-btn` | visível | `display: none` |
| `.dots` | lateral direito | `display: none` |
| `.nbtn` touch target | — | `48px` |

### 2.2 Swipe gesture

`touchstart` captura X inicial. `touchend` calcula delta — threshold `50px`. Reutiliza `goTo()` e `warpBurst()` sem alteração. Listeners `{ passive: true }`.

### 2.3 Split: 13 → 17 slides no mobile

Os 4 slides `.sc.split` viram pares independentes. No `DOMContentLoaded`, se `innerWidth < 768`, o engine clona cada metade em um novo `.sc`, reconstrói `slides[]` e duplica o camera state do pai para o filho B. `TOTAL` passa de 13 para 17.

| Original | Slide A | Slide B |
|---|---|---|
| `s02` Welux | Posicionamento + headline | Prova social + equipe |
| `s06` Dor III+IV | Protocolo invisível online | Paciente perdido por falta de confiança |
| `s10` Case | Dr. Rafael — situação inicial | Métricas (23 · 11 · R$38k) + quote |
| `s11` Garantias | 4 pontos de proteção | Cronograma S1→S8 |

**Sequência mobile:**
```
01 Capa
02 Welux A — posicionamento
03 Welux B — prova social
04 Diagnóstico Intro
05 Dor I — pesquisa online primeiro
06 Dor II — antes/depois sem narrativa
07 Dor III — protocolo invisível
08 Dor IV — paciente perdido
09 Entregáveis — 9 itens, coluna única
10 Método Welux™ — 7 passos
11 Comparativo — 2 cards
12 Case A — situação inicial
13 Case B — métricas em placar + quote
14 Garantias
15 Cronograma
16 Investimento
17 Fechamento — "A decisão é agora."
```

### 2.4 Comparativo → 2 cards verticais

A `comp-table` é ilegível em 390px. JS renderiza dois cards no breakpoint mobile sem alterar o HTML existente:

```
┌─────────────────┐   ┌─────────────────┐
│  SEM WELUX      │   │  WELUX ★        │
│  Template       │   │  Exclusivo      │
│  Não / Não      │   │  Pré-qualif.    │
│  Baixa conv.    │   │  Alta conv.     │
└─────────────────┘   └─────────────────┘
         (empilhados verticalmente)
```

### 2.5 Sticky CTA

`#mobile-cta` fixo no rodapé — `height: 56px`, `backdrop-filter: blur`, `display: none` no desktop. Link WhatsApp direto (número via novo campo `e-whatsapp` no editor).

Estado padrão: fundo escuro, texto branco sutil.  
Slides 16–17: inverte para fundo `#F2F2F2`, texto `#050505` — gatilho visual de fechamento, sem copy adicional.

### 2.6 Three.js — mobile

Partículas: `N = 120` (vs 220 no desktop). Cálculo de conexões plexus (O(n²)) desativado — mantém starfield, elimina o loop mais pesado. `devicePixelRatio` já está limitado a 1.8.

---

## 3. Lógica de persuasão mobile

A copy não muda. O mobile **amplifica** porque isola cada momento:

- **04→08** — 5 slides de dor consecutivos, cada um ocupa a tela inteira. Sem escape visual. Identificação cumulativa antes de qualquer solução aparecer.
- **Slide 11** — Comparativo chega após 10 slides de stack de dor. O contraste "Sem / Com" tem impacto máximo nesse timing.
- **Slides 12→13** — Prova social logo após o contraste. Sequência: problema → diferença → evidência.
- **Slide 16** — Preço aparece tarde, após prova completa de valor. O número não assusta — confirma.
- **Slide 17 + CTA invertido** — Urgência sem agressividade. A mudança de cor no botão é o único gatilho necessário.

---

## 4. Fora de escopo

PWA / offline, reveal stagger dentro dos slides, analytics por slide.

---

## 5. Critérios de sucesso

- Legível em iPhone SE (375px) e iPhone 15 Pro (393px)
- Swipe sem conflito com scroll vertical nos slides 09 e 10
- CTA sticky visível em todos os 17 slides, estado invertido em 16–17
- Three.js abaixo de 16ms/frame em mid-range Android
- Editor invisível no mobile

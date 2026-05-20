# Mobile-First — Proposta WeLux
**Data:** 2026-05-20  
**Contexto de uso:** prospect abre link via WhatsApp no celular ao final de uma reunião de vendas  
**Objetivo de conversão:** agendar uma call de contrato

---

## 1. Arquitetura existente (não mudar)

A proposta é um **motor de slides** — não uma página de scroll:
- 13 `.sc` com `position: absolute; inset: 0`, empilhados no `#overlay`
- `html, body { overflow: hidden }` — sem scroll vertical
- Transições via GSAP (fade + y offset), starfield Three.js com camera states por slide
- Navegação: dots laterais, botões `‹ ›`, teclado (ArrowLeft/Right/Space)

Nenhuma dessas peças é substituída. O trabalho mobile é **aditivo**: CSS fixes dentro dos slides + extensão do engine JS para mobile.

---

## 2. O que muda

### 2.1 CSS — breakpoint único `@media (max-width: 768px)`

| Seletor | Desktop | Mobile |
|---|---|---|
| `.sc` padding | `100px 120px` | `24px 24px 80px` (80px embaixo reserva o CTA sticky) |
| `.sc.center` padding | `80px` | `24px 24px 80px` |
| `.sc.split` | `grid 1fr 1fr` | `flex-direction: column; overflow-y: auto` |
| `.steps-grid` | `repeat(3, 1fr)` | `1fr` |
| `.deliv-grid` | `1fr 1fr` | `1fr` |
| `.method-row` | `44px 220px 1fr` | `32px 1fr` (remove coluna do meio, nome vira bloco) |
| `.metric-grid` | `repeat(3, 1fr)` | `1fr` (métricas empilhadas, números grandes) |
| `.comp-wrap` | tabela horizontal | 2 cards verticais (ver §2.3) |
| `.editor` + `.edit-btn` | visível | `display: none` |
| `.dots` | `right: 28px` lateral | `display: none` |
| `.nav` | centrado no rodapé | mantido, `nbtn` com touch target `48px` |

### 2.2 JS — Swipe gesture

```js
// Adicionar após o engine de slides existente
if (window.innerWidth < 768) {
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 50) return;
    delta < 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });
}
```

Reutiliza `goTo()`, `warpBurst()` e GSAP sem alteração.

### 2.3 JS — Split de slides no mobile

Os 4 slides `.sc.split` têm conteúdo demais para empilhar em 390px. No mobile, cada metade vira um slide independente, dobrando a intensidade de foco por tela.

**Slides afetados e divisão:**

| ID original | Slide A (mobile) | Slide B (mobile) |
|---|---|---|
| `s02` Welux | "Quem faz" + headline | Stats + descrição + equipe |
| `s06` Dor III+IV | Dor III — protocolo invisível | Dor IV — paciente perdido por falta de confiança |
| `s10` Case | Dr. Rafael — contexto + situação | Métricas (23 · 11 · R$38k) + quote |
| `s11` Garantias | "O risco é nosso" — 4 garantias | Cronograma S1→S8 |

**Sequência resultante no mobile (17 slides):**
```
01 Capa
02 Welux A — headline de posicionamento
03 Welux B — prova social + equipe
04 Diagnóstico Intro — "Seu site está sabotando sua experiência de luxo?"
05 Dor I — paciente pesquisa online primeiro
06 Dor II — antes/depois sem narrativa
07 Dor III — protocolo invisível online
08 Dor IV — paciente perdido por falta de confiança
09 Entregáveis — 9 itens em coluna única
10 Método Welux™ — 7 passos em lista
11 Comparativo — 2 cards (Sem Welux / Com Welux)
12 Case A — Dr. Rafael, situação inicial
13 Case B — métricas em placar + quote
14 Garantias — 4 pontos de proteção
15 Cronograma — S1 a S8
16 Investimento — preço centralizado
17 Fechamento — "A decisão é agora."
```

**Implementação:** no `DOMContentLoaded`, se `innerWidth < 768`, clonar os filhos dos splits em novos `.sc` e reconstruir o array `slides[]` e os STATES da câmera (duplicando o state do slide pai para o filho B). Atualizar `TOTAL = 17`.

### 2.4 Tabela comparativa → 2 cards

No mobile a `comp-table` é ilegível. Substituída por dois blocos verticais dentro do mesmo slide:

```
┌─────────────────┐
│  SEM WELUX      │
│  Template       │
│  Não            │
│  Não            │
│  ...            │
└─────────────────┘
┌─────────────────┐
│  WELUX ★        │
│  Exclusivo      │
│  Pré-qualif.    │
│  Dashboard      │
│  ...            │
└─────────────────┘
```

Renderizado via JS no breakpoint mobile — não altera o HTML da tabela existente.

### 2.5 Sticky CTA

```css
#mobile-cta {
  display: none;
}
@media (max-width: 768px) {
  #mobile-cta {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 56px;
    background: rgba(5,5,5,0.92);
    border-top: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(16px);
    align-items: center;
    justify-content: center;
    z-index: 50;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    transition: background .22s, color .22s;
  }
}
```

Nos slides 16 (Investimento) e 17 (Fechamento), via JS, muda para `background: #F2F2F2; color: #050505` — sinaliza o momento de fechar sem texto adicional.

Link: WhatsApp direto, número configurável via campo no editor (novo campo `e-whatsapp`).

### 2.6 Three.js — otimização mobile

```js
const isMobile = window.innerWidth < 768;
const N = isMobile ? 120 : 220; // reduz partículas
// No loop tick(), desativa cálculo de conexões no mobile:
if (!isMobile) {
  // bloco de cálculo de segmentos (plexus)
}
```

Mantém o starfield (atmosfera premium) sem o cálculo O(n²) de conexões entre partículas.

---

## 3. Copy — princípios mobile

A copy não muda. A estrutura mobile amplifica o efeito porque:

- Cada dor de luxo ocupa **100% da tela** — sem competição visual
- A progressão 04→05→06→07→08 cria loop de identificação crescente antes de qualquer solução
- Slide 11 (Comparativo) chega após 10 slides de dor — o contraste "Sem Welux / Com Welux" tem impacto máximo
- Slides 12→13 (Case) chegam como prova social após o contraste — sequência clínica de persuasão
- Slide 16 (Investimento) é revelado tarde, após completo stack de valor — preço depois da prova
- Slide 17 (Fechamento) + mudança de cor do CTA sticky criam o gatilho de urgência final

---

## 4. Fora de escopo

- Versão PWA / instalável
- Animações de entrada por item dentro dos slides (reveal stagger)
- Modo offline
- Analytics de engajamento por slide

---

## 5. Critérios de sucesso

- Todas as 17 telas legíveis em iPhone SE (375px) e iPhone 15 (390px)
- Swipe funcional sem interferir com scroll vertical dentro de slides com conteúdo longo (s09, s10)
- CTA sticky sempre visível, muda de estado nos slides 16 e 17
- Performance: Three.js abaixo de 16ms/frame em mobile mid-range
- Editor completamente oculto no mobile

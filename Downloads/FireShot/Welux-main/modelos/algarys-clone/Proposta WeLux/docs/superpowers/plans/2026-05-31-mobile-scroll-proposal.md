# Mobile Scroll Proposal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a proposta em experiência scroll vertical snap (padrão redes sociais) no mobile, mantendo o comportamento atual de slides com GSAP no desktop.

**Architecture:** Media query `max-width: 768px` ativa modo mobile. O container de slides vira um scroll vertical com `scroll-snap-type: y mandatory`. Cada slide usa `height: 100svh` (safe viewport height — respeita barra do browser mobile). Three.js continua rodando com N reduzido. Todos os grid layouts de 2 colunas viram stack vertical via `@media`. Nenhuma lógica JS mobile-específica — o browser faz o snap nativamente.

**Tech Stack:** CSS `scroll-snap`, `100svh`, `@media`, Three.js (já existente), GSAP (já existente)

---

## Diagnóstico dos Slides por Layout

| Slide | Desktop | Mobile | Risco |
|---|---|---|---|
| S01 | center | center | baixo |
| S02 | grid 2 colunas | stack vertical | médio |
| S03 | center + SVG | center + SVG menor | baixo |
| S04 | center hero | center hero | baixo |
| S05 | grid 2 colunas | stack vertical | médio |
| S06 | grid 2 cards | stack com scroll interno | alto (overflow) |
| S07 | grid 3×3 | grid 1 coluna | médio |
| S08 | flowchart horizontal | stack vertical | alto |
| S09 | tabela 4 colunas | tabela simplificada | alto |
| S10 | grid 2 colunas | stack: métricas → texto | médio |
| S11 | grid 2 colunas | stack vertical | médio |
| S12 | center | center stack | médio |
| S13 | left | left | baixo |

---

## Arquivo a modificar

- **Modify:** `Proposta WeLux/index.html` — adicionar bloco `@media (max-width: 768px)` no `<style>` e atualizar estrutura do `#overlay` para scroll no mobile.

---

## Task 1 — Container de scroll mobile

**Files:**
- Modify: `Proposta WeLux/index.html` — `<style>` e `#overlay`

- [ ] **Step 1: Adicionar CSS de scroll snap no container**

No `<style>`, adicionar após o bloco `/* ── OVERLAY / SLIDES ─── */`:

```css
@media (max-width: 768px) {
  #overlay {
    position: fixed;
    inset: 0;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
    pointer-events: auto;
  }
  .sc {
    position: relative;
    min-height: 100svh;
    height: auto;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow: visible;
  }
  .sc::before {
    position: fixed;
  }
}
```

- [ ] **Step 2: Verificar no browser mobile**

Abrir `index.html` no Chrome DevTools → mobile 390×844 (iPhone 14).
Esperado: slides empilhados verticalmente, scroll snap entre eles, sem flash/bugos de opacity.

- [ ] **Step 3: Desabilitar goTo() no mobile para evitar conflito**

No script, envolver a lógica de goTo no teclado e nav buttons:

```js
// No event listener de keydown:
window.addEventListener('keydown', e => {
  if (window.innerWidth <= 768) return; // mobile usa scroll nativo
  if (document.activeElement.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(cur + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(cur - 1); }
});
```

E na nav (prev/next buttons), adicionar guard:

```js
document.getElementById('prev').onclick = () => {
  if (window.innerWidth > 768) goTo(cur - 1);
};
document.getElementById('next').onclick = () => {
  if (window.innerWidth > 768) goTo(cur + 1);
};
```

- [ ] **Step 4: Esconder chrome de navegação no mobile**

```css
@media (max-width: 768px) {
  .dots { display: none; }
  .nav  { display: none; }
  #prog { display: none; }
}
```

- [ ] **Step 5: Verificar scroll entre todos os 13 slides**

Esperado: scroll vertical fluido, cada slide ocupa a tela, snap funciona.

---

## Task 2 — Slides de 2 colunas → stack vertical

**Files:**
- Modify: `Proposta WeLux/index.html` — bloco `@media (max-width: 768px)`

- [ ] **Step 1: S02 — stats + texto**

```css
@media (max-width: 768px) {
  #s02 {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 80px 28px 60px;
    align-items: start;
  }
  .stat-val { font-size: clamp(40px, 12vw, 64px); }
  .stat-row  { padding: 14px 0; }
  .s02-text p { font-size: 15px; }
}
```

- [ ] **Step 2: S05 — antes × depois**

```css
@media (max-width: 768px) {
  #s05 {
    grid-template-columns: 1fr;
    min-height: 200svh; /* dois painéis = dois ecrãs */
  }
  .contrast-col { padding: 60px 28px; min-height: 100svh; }
}
```

> Nota: S05 ocupa 200svh no mobile — dois snap targets empilhados. Isso está correto: o cliente vê ANTES em um snap e DEPOIS no próximo. Não é um bug.

- [ ] **Step 3: S06 — dois pain cards**

```css
@media (max-width: 768px) {
  #s06 {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 0;
    min-height: 200svh;
  }
  .pain-card {
    padding: 60px 28px;
    min-height: 100svh;
    scroll-snap-align: start;
  }
  .pain-q { font-size: clamp(18px, 5vw, 26px); }
  .pain-a  { font-size: 15px; }
}
```

- [ ] **Step 4: S10 — case metrics + texto**

```css
@media (max-width: 768px) {
  #s10 {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 60px 28px;
  }
  .cm-val { font-size: clamp(44px, 12vw, 72px); }
  .case-right h2 { font-size: clamp(28px, 8vw, 44px); }
}
```

- [ ] **Step 5: S11 — garantias + cronograma**

```css
@media (max-width: 768px) {
  #s11 {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 28px;
  }
  .guar-t  { font-size: 15px; }
  .tl-name { font-size: 16px; }
  .tl-desc { font-size: 13px; }
}
```

- [ ] **Step 6: Verificar S02, S05, S06, S10, S11 no mobile**

Esperado: todos em coluna única, sem overflow horizontal, texto legível.

---

## Task 3 — Slides com layout especial no mobile

**Files:**
- Modify: `Proposta WeLux/index.html` — bloco `@media (max-width: 768px)`

- [ ] **Step 1: S07 — grid 3×3 → 1 coluna**

```css
@media (max-width: 768px) {
  #s07 {
    padding: 60px 28px;
    min-height: auto;
    height: auto;
  }
  .deliv-grid {
    grid-template-columns: 1fr;
  }
  .deliv-cell { padding: 18px 16px; }
  .deliv-title { font-size: 15px; }
  .deliv-out   { font-size: 14px; }
  #s07 {
    /* override: este slide vai além de 100svh no mobile — tudo bem, o conteúdo não é cortado */
    overflow-y: visible;
  }
}
```

- [ ] **Step 2: S08 — flowchart horizontal → stack vertical**

```css
@media (max-width: 768px) {
  #s08 { padding: 60px 28px; }
  .flowchart {
    flex-direction: column;
    gap: 2px;
  }
  .flow-arrow { display: none; }
  .flow-step-inner {
    border: 1px solid rgba(255,255,255,.10) !important;
    margin-right: 0;
    padding: 20px 16px;
  }
  .flow-step-name { font-size: 17px; }
  .flow-step-desc { font-size: 14px; }
  /* Separador entre fases: seta para baixo em CSS */
  .flow-step:not(:last-of-type)::after {
    content: "↓";
    display: block;
    text-align: center;
    color: rgba(255,255,255,.2);
    font-size: 18px;
    padding: 8px 0;
  }
}
```

- [ ] **Step 3: S09 — tabela simplificada no mobile**

A tabela de 4 colunas não cabe em 390px. Solução: mostrar apenas a coluna Welux com labels.

Adicionar no HTML, dentro de `#s09`, um elemento alternativo mobile-only:

```html
<!-- MOBILE ONLY - inserir após </table> dentro de #s09 -->
<div class="comp-mobile">
  <div class="cm-row"><span class="cm-key">Diagnóstico real</span><span class="cm-val-w">✓ 30 dias</span></div>
  <div class="cm-row"><span class="cm-key">ROI calculado antes</span><span class="cm-val-w">✓ com seus dados</span></div>
  <div class="cm-row"><span class="cm-key">Engenheiros especializados</span><span class="cm-val-w">✓ time dedicado</span></div>
  <div class="cm-row"><span class="cm-key">Integração real</span><span class="cm-val-w">✓ completa</span></div>
  <div class="cm-row"><span class="cm-key">Acompanhamento pós-entrega</span><span class="cm-val-w">✓ em produção</span></div>
  <div class="cm-row"><span class="cm-key">Resultado garantido</span><span class="cm-val-w">✓ calculado antes</span></div>
</div>
```

CSS para o novo elemento + esconder a tabela no mobile:

```css
.comp-mobile { display: none; }

@media (max-width: 768px) {
  .comp-table { display: none; }
  .comp-mobile {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 28px;
    width: 100%;
  }
  .cm-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,.06);
    gap: 16px;
  }
  .cm-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(255,255,255,.45);
    flex: 1;
  }
  .cm-val-w {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    white-space: nowrap;
  }
  #s09 { padding: 60px 28px; }
  #s09 .comp-head h2 { font-size: clamp(22px, 6vw, 36px); }
}
```

- [ ] **Step 4: S12 — ROI equation + cards**

```css
@media (max-width: 768px) {
  #s12 { padding: 60px 28px; }
  #s12 h2 { font-size: clamp(20px, 5.5vw, 32px); }
  .roi-equation {
    gap: 10px;
    margin: 24px auto;
  }
  .roi-box { min-width: 80px; padding: 12px 10px; }
  .roi-box .roi-val { font-size: clamp(16px, 5vw, 28px); }
  .roi-op { font-size: 20px; }
  .invest-cards {
    flex-direction: column;
    gap: 16px;
  }
  .inv-price { font-size: clamp(28px, 9vw, 48px); }
}
```

- [ ] **Step 5: S03 — ciclo SVG menor**

```css
@media (max-width: 768px) {
  #s03 { padding: 60px 28px; }
  .cycle-wrap { width: 280px; height: 280px; }
  .cycle-node { width: 80px; }
  .cycle-node-t   { font-size: 12px; }
  .cycle-node-sub { font-size: 10px; }
  .cycle-center-val { font-size: 14px; max-width: 100px; }
  #s03 .cycle-break { font-size: 15px; margin-top: 28px; }
}
```

- [ ] **Step 6: S13 — fechamento**

```css
@media (max-width: 768px) {
  #s13 { padding: 60px 28px 80px; }
  #s13 h2 { font-size: clamp(36px, 10vw, 72px); }
  .step-body { font-size: 15px; }
  .btn-cta { padding: 14px 32px; font-size: 11px; }
}
```

- [ ] **Step 7: Padding global de slides no mobile**

```css
@media (max-width: 768px) {
  #s01 { padding: 60px 28px; }
  #s04 { padding: 60px 28px; }
  .dor-anchor { font-size: clamp(24px, 8vw, 48px); }
  .dor-num { font-size: clamp(60px, 18vw, 140px); }
}
```

- [ ] **Step 8: Three.js — reduzir partículas no mobile**

No script, antes de `for(let i=0;i<N;i++)iS(i)`, substituir a constante:

```js
// Antes:
const N=220,spread=200,zNear=-30,zFar=-450;

// Depois:
const isMobile = window.innerWidth <= 768;
const N = isMobile ? 80 : 220;
const spread = 200, zNear = -30, zFar = -450;
```

Esperado: no mobile o canvas consome menos GPU, sem travar.

- [ ] **Step 9: Scroll indicator visual no mobile**

Adicionar indicador de scroll (pulsing arrow) no primeiro slide — desaparece após primeiro scroll.

No HTML, dentro de `#s01` (após `.dest`):

```html
<div class="scroll-hint" id="scrollHint">
  <span>scroll</span>
  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
    <path d="M8 4 L8 16 M4 12 L8 16 L12 12" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
```

CSS:

```css
.scroll-hint {
  display: none;
}
@media (max-width: 768px) {
  .scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: rgba(255,255,255,.3);
    animation: bobDown 2s ease-in-out infinite;
  }
}
@keyframes bobDown {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}
```

JS — esconder após primeiro scroll:

```js
const overlay = document.getElementById('overlay');
const hint = document.getElementById('scrollHint');
if (hint) {
  overlay.addEventListener('scroll', () => {
    if (overlay.scrollTop > 20) {
      hint.style.opacity = '0';
      hint.style.transition = 'opacity .4s';
    }
  }, { passive: true });
}
```

---

## Task 4 — Verificação final

- [ ] **Step 1: Testar todos os 13 slides no mobile 390×844**

Abrir `index.html` no Chrome DevTools → iPhone 14 (390×844).
Checklist:
- [ ] Scroll snap funciona entre todos os slides
- [ ] Nenhum slide tem overflow horizontal
- [ ] S05 e S06 fazem snap duplo (correto — são 2 telas cada)
- [ ] Tabela de comparativo está substituída pela versão mobile
- [ ] Flowchart S08 está em coluna vertical
- [ ] S07 grid está em 1 coluna
- [ ] Todas as fontes legíveis (mínimo 14px visível)
- [ ] Three.js não trava (60fps)
- [ ] Scroll hint aparece no S01 e some após scroll

- [ ] **Step 2: Testar landscape mobile (844×390)**

Esperado: slides ainda snapam, sem conteúdo cortado.

- [ ] **Step 3: Testar no desktop (1440px)**

Esperado: comportamento desktop intacto — slides com opacity transition, GSAP, botões prev/next funcionando, nenhum estilo mobile vazando.

- [ ] **Step 4: Testar no Safari iOS (se disponível)**

`scroll-snap-type` + `100svh` são suportados desde iOS 15.4. Verificar que a barra de endereço do Safari não corta o primeiro/último slide.

---

## Notas de implementação

**Por que `100svh` e não `100vh`?**
`100vh` no mobile Safari é o viewport com a barra de endereço *oculta* — ao carregar, a barra está visível e o conteúdo é cortado. `100svh` (Small Viewport Height) é o viewport com a barra *visível* — conteúdo nunca é cortado. Suportado em todos os browsers modernos (2022+).

**Por que CSS snap e não JS swipe detection?**
JS swipe é frágil: conflita com scroll nativo, latência, falsos positivos. CSS `scroll-snap-type: y mandatory` é nativo, suavizado pelo browser, respeita inércia do toque, e funciona sem nenhum JS.

**S05 e S06 com 200svh:**
Cada "card" dessas seções vale um snap ponto. O usuário vê ANTES → scroll → DEPOIS em S05. Isso é intencional — não é overflow, é narrativa.

**Three.js no mobile:**
O canvas fica no background com `position: fixed; inset: 0`. No mobile scroll, ele permanece fixo enquanto os slides scrollam por cima. O efeito é que o starfield fica como wallpaper — visualmente correto.

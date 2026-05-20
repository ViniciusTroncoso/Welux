# Mobile-First — Proposta WeLux — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adaptar o motor de slides da proposta WeLux para mobile — swipe, layout fixes, split de 4 slides duplos em 17 slides únicos, CTA sticky de WhatsApp e otimização Three.js.

**Architecture:** Single file (`index.html`) — CSS media query única `(max-width: 768px)` + extensão do engine JS existente (GSAP + Three.js). Tudo aditivo, nada substituído. DOM split ocorre no load antes da inicialização do engine, garantindo que `querySelectorAll('.sc')` já retorne 17 slides.

**Tech Stack:** HTML/CSS/JS puro, GSAP 3.12.2, Three.js r128. Sem dependências novas. Verificação manual via Chrome DevTools › Device Toolbar › iPhone 15 (390×844).

---

## Task 1: isMobile flag + CSS mobile breakpoint

**Files:**
- Modify: `index.html` — dentro do `<style>` block (antes de `</style>`, ~linha 315)
- Modify: `index.html` — primeira linha do `<script>` block (~linha 611)

- [ ] **Step 1: Abrir Chrome DevTools, emular iPhone 15 (390px), observar o estado atual**

  Abrir `index.html` no Chrome. DevTools → Toggle Device Toolbar → iPhone 15.
  Confirmar que vê: padding enorme, grids espremidos, editor visível no lado direito, dots no canto. Esse é o estado quebrado que vamos corrigir.

- [ ] **Step 2: Adicionar `isMobile` como primeira linha do script**

  Encontrar a linha `const canvas = document.getElementById('canvas');` (~linha 611 do script) e inserir ANTES dela:

  ```js
  const isMobile = window.innerWidth < 768;
  ```

- [ ] **Step 3: Adicionar bloco CSS mobile ao final do `<style>`**

  Encontrar `</style>` e inserir ANTES:

  ```css
  /* ── MOBILE ─────────────────────────────── */
  @media (max-width: 768px) {

    /* Ocultar editor e dots */
    .editor, .edit-btn { display: none !important; }
    .dots { display: none; }

    /* Padding base — 80px embaixo reserva o CTA sticky */
    .sc         { padding: 24px 24px 80px; }
    .sc.center  { padding: 24px 24px 80px; align-items: center; }
    .sc.left    { padding: 24px 24px 80px; }
    .sc.split   {
      display: flex; flex-direction: column;
      padding: 24px 24px 80px; gap: 32px;
      overflow-y: auto;
    }

    /* Logo */
    .logo { top: 16px; left: 20px; }

    /* Nav — sobe para não sobrepor CTA sticky */
    .nav { bottom: 68px; }
    .nbtn { width: 48px; height: 48px; font-size: 18px; }

    /* Grids → coluna única */
    .steps-grid { grid-template-columns: 1fr; gap: 24px; }
    .deliv-grid { grid-template-columns: 1fr; gap: 0; }
    .metric-grid { grid-template-columns: 1fr; gap: 12px; }

    /* Method list — remove coluna fixa de 220px */
    .method-row {
      display: flex; flex-direction: column; gap: 4px; padding: 14px 0;
    }
    .method-n { font-size: 9px; padding-top: 0; }

    /* Type scaling mobile */
    .t-hero  { font-size: clamp(40px, 11vw, 64px); }
    .t-big   { font-size: clamp(28px, 9vw, 52px); }
    .t-price { font-size: clamp(64px, 20vw, 100px); }
    .diag-q  { font-size: clamp(24px, 7vw, 44px); }

    /* Ocultar tabela comparativa — JS renderiza cards */
    .comp-wrap { display: none; }

    /* Cards comparativos mobile */
    .mob-comp { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; width: 100%; }
    .mob-comp-card {
      padding: 18px 16px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .mob-comp-com { border-color: rgba(255,255,255,0.28); }
    .mob-comp-head {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase;
      margin-bottom: 14px;
    }
    .mob-comp-sem .mob-comp-head { color: rgba(255,255,255,0.40); }
    .mob-comp-com .mob-comp-head { color: #F2F2F2; }
    .mob-comp-row {
      display: flex; justify-content: space-between; align-items: baseline;
      padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .mob-comp-row:last-child { border-bottom: none; }
    .mob-comp-lbl {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(255,255,255,0.45);
    }
    .mob-comp-val {
      font-size: 13px; font-weight: 500;
      color: rgba(248,248,245,0.96); text-align: right; max-width: 55%;
    }

    /* CTA sticky — estado padrão */
    #mobile-cta {
      display: flex;
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 56px; z-index: 50;
      align-items: center; justify-content: center;
      background: rgba(5,5,5,0.92);
      border-top: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: rgba(255,255,255,0.70);
      text-decoration: none;
      transition: background .3s, color .3s, border-color .3s;
    }
    /* CTA sticky — estado de fechamento (slides 16-17) */
    #mobile-cta.cta-close {
      background: #F2F2F2;
      color: #050505;
      border-top-color: transparent;
    }
  }
  ```

- [ ] **Step 4: Verificar no DevTools**

  Recarregar `index.html` com DevTools em iPhone 15.
  Confirmar: editor sumiu, dots sumiram, padding lateral é `~24px`, nav subiu, fontes menores. Ainda sem swipe nem split.

- [ ] **Step 5: Commit**

  ```bash
  cd "/Users/leonardosantos/Desktop/Proposta WeLux"
  git add index.html
  git commit -m "feat(mobile): CSS breakpoint base — layout fixes, editor oculto"
  ```

---

## Task 2: Three.js mobile optimization

**Files:**
- Modify: `index.html` — início do bloco Three.js no script (~logo após `const isMobile`)

- [ ] **Step 1: Substituir `const N = 220;` pela versão condicional**

  Encontrar a linha:
  ```js
  const N = 220;
  ```
  Substituir por:
  ```js
  const N = isMobile ? 120 : 220;
  ```

- [ ] **Step 2: Desativar cálculo plexus no mobile**

  Encontrar dentro da função `tick()` o bloco que começa com:
  ```js
  segCount = 0;
  for(let i=0; i<N && segCount<MAX_SEGS; i++){
  ```
  Envolver o bloco inteiro (até `lineBuf.needsUpdate = true;`) em:
  ```js
  if (!isMobile) {
    segCount = 0;
    for(let i=0; i<N && segCount<MAX_SEGS; i++){
      for(let j=i+1; j<N && segCount<MAX_SEGS; j++){
        const dx=starPos[i*3]-starPos[j*3];
        const dy=starPos[i*3+1]-starPos[j*3+1];
        const dz=starPos[i*3+2]-starPos[j*3+2];
        if(dx*dx+dy*dy+dz*dz < CONN_DIST2){
          const b=segCount*6;
          linePosArr[b]  =starPos[i*3];   linePosArr[b+1]=starPos[i*3+1]; linePosArr[b+2]=starPos[i*3+2];
          linePosArr[b+3]=starPos[j*3];   linePosArr[b+4]=starPos[j*3+1]; linePosArr[b+5]=starPos[j*3+2];
          segCount++;
        }
      }
    }
    lineGeo.setDrawRange(0, segCount*2);
    lineBuf.needsUpdate = true;
  }
  ```

- [ ] **Step 3: Verificar no DevTools**

  Abrir DevTools → Performance → gravar 3s com iPhone 15 emulado.
  Frame rate deve estar próximo de 60fps. O starfield continua visível, linhas de conexão desaparecem no mobile.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat(mobile): Three.js — 120 partículas, plexus desativado"
  ```

---

## Task 3: Sticky CTA HTML

**Files:**
- Modify: `index.html` — HTML do body, após `</nav>` e antes de `<div id="overlay">`

- [ ] **Step 1: Adicionar elemento #mobile-cta**

  Encontrar:
  ```html
  </nav>

  <div id="overlay">
  ```
  Inserir entre eles:
  ```html
  <a id="mobile-cta" href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20a%20call%20de%20contrato." target="_blank">
    Agendar call de contrato →
  </a>
  ```

  > **Nota:** substituir `5511999999999` pelo número real do WhatsApp da Welux antes do deploy final.

- [ ] **Step 2: Confirmar que o CTA está visível no mobile e oculto no desktop**

  DevTools iPhone 15: CTA fixo no rodapé, texto "AGENDAR CALL DE CONTRATO →".
  DevTools Desktop (1440px): CTA invisível (`display: none` vem do CSS padrão + override no media query).

  > O `display: none` padrão vem do CSS que está fora do media query. Verificar que o elemento não aparece no desktop. Se aparecer, adicionar fora do media query: `#mobile-cta { display: none; }`.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat(mobile): sticky CTA WhatsApp"
  ```

---

## Task 4: Swipe gesture

**Files:**
- Modify: `index.html` — final do bloco `<script>`, após os event listeners existentes (~linha 869)

- [ ] **Step 1: Observar que não há resposta a touch no mobile atual**

  DevTools iPhone 15 → clicar em "Toggle Device Toolbar" → tentar arrastar o dedo na proposta. Nada acontece.

- [ ] **Step 2: Adicionar listeners de swipe após os event listeners existentes**

  Encontrar o final do script (antes de `</script>`) e adicionar:

  ```js
  /* ═══ SWIPE MOBILE ══════════════════════════ */
  if (isMobile) {
    let _tx = 0;
    document.addEventListener('touchstart', e => {
      _tx = e.changedTouches[0].clientX;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - _tx;
      if (Math.abs(delta) < 50) return;
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
    }, { passive: true });
  }
  ```

- [ ] **Step 3: Verificar swipe no DevTools**

  DevTools iPhone 15 → arrastar da direita para esquerda → deve avançar slide com warpBurst.
  Arrastar da esquerda para direita → deve voltar slide.
  Threshold 50px: swipes curtos (< 50px) não disparam.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat(mobile): swipe touchstart/touchend com threshold 50px"
  ```

---

## Task 5: Split dos slides duplos (13 → 17)

**Files:**
- Modify: `index.html` — HTML: adicionar `id="tot"` no ninfo (~linha 344)
- Modify: `index.html` — Script: adicionar MOBILE_STATES, splitSlidesForMobile(), atualizar TOTAL e STATES

- [ ] **Step 1: Atualizar o contador no HTML para ser dinâmico**

  Encontrar:
  ```html
  <div class="ninfo"><b id="cur">01</b> / 13</div>
  ```
  Substituir por:
  ```html
  <div class="ninfo"><b id="cur">01</b> / <span id="tot">13</span></div>
  ```

- [ ] **Step 2: Adicionar MOBILE_STATES antes do array STATES existente**

  Encontrar a linha:
  ```js
  /* ═══ CAMERA STATES — 13 slides ════════════ */
  ```
  Inserir ANTES dessa linha:

  ```js
  /* ═══ CAMERA STATES MOBILE — 17 slides ═════ */
  const MOBILE_STATES = [
    /* 01 capa */         { cx:0,    cy:0,    cz:0,  lx:0,    ly:0,    lz:-10 },
    /* 02 welux A */      { cx:1.5,  cy:.8,   cz:0,  lx:.5,   ly:.3,   lz:-10 },
    /* 03 welux B */      { cx:-.8,  cy:-.4,  cz:0,  lx:-.3,  ly:-.2,  lz:-10 },
    /* 04 diag intro */   { cx:-1,   cy:1.2,  cz:0,  lx:-.4,  ly:.5,   lz:-10 },
    /* 05 dor I */        { cx:-2,   cy:-.8,  cz:0,  lx:-.8,  ly:-.3,  lz:-10 },
    /* 06 dor II */       { cx:2,    cy:-1.5, cz:0,  lx:.7,   ly:-.5,  lz:-10 },
    /* 07 dor III */      { cx:1,    cy:2,    cz:0,  lx:.3,   ly:.7,   lz:-10 },
    /* 08 dor IV */       { cx:-1.2, cy:1.5,  cz:0,  lx:-.4,  ly:.5,   lz:-10 },
    /* 09 entregáveis */  { cx:-.8,  cy:-.5,  cz:0,  lx:-.3,  ly:-.2,  lz:-10 },
    /* 10 método */       { cx:0,    cy:-1,   cz:0,  lx:0,    ly:-.4,  lz:-10 },
    /* 11 comparativo */  { cx:1.2,  cy:.6,   cz:0,  lx:.4,   ly:.2,   lz:-10 },
    /* 12 case A */       { cx:-1.5, cy:1,    cz:0,  lx:-.5,  ly:.3,   lz:-10 },
    /* 13 case B */       { cx:.8,   cy:-.6,  cz:0,  lx:.3,   ly:-.2,  lz:-10 },
    /* 14 garantias */    { cx:.5,   cy:-.8,  cz:0,  lx:.2,   ly:-.3,  lz:-10 },
    /* 15 cronograma */   { cx:-.4,  cy:.6,   cz:0,  lx:-.2,  ly:.2,   lz:-10 },
    /* 16 investimento */ { cx:0,    cy:0,    cz:0,  lx:0,    ly:0,    lz:-10 },
    /* 17 fechamento */   { cx:-.5,  cy:.5,   cz:0,  lx:-.2,  ly:.2,   lz:-10 },
  ];
  ```

- [ ] **Step 3: Adicionar função splitSlidesForMobile antes do engine**

  Encontrar a linha:
  ```js
  /* ═══ SLIDE ENGINE ══════════════════════════ */
  ```
  Inserir ANTES dessa linha:

  ```js
  /* ═══ MOBILE SPLIT ══════════════════════════ */
  function splitSlidesForMobile() {
    ['s02', 's06', 's10', 's11'].forEach(id => {
      const slide = document.getElementById(id);
      if (!slide) return;
      const kids = [...slide.children];
      if (kids.length < 2) return;

      // Slide A: remove classe split, mantém só o primeiro filho
      slide.classList.remove('split');
      slide.classList.add('left');
      slide.removeChild(kids[1]);

      // Slide B: novo sc.left com o segundo filho
      const slideB = document.createElement('div');
      slideB.className = 'sc left';
      slideB.id = id + 'b';
      slideB.appendChild(kids[1]);
      slide.after(slideB);
    });
  }

  if (isMobile) splitSlidesForMobile();
  ```

- [ ] **Step 4: Atualizar TOTAL e STATES para serem condicionais**

  Encontrar:
  ```js
  const TOTAL   = 13;
  ```
  Substituir por:
  ```js
  const TOTAL   = isMobile ? 17 : 13;
  const STATES  = isMobile ? MOBILE_STATES : [
    /* 01 capa */         { cx:0,    cy:0,    cz:0, lx:0,    ly:0,    lz:-10 },
    /* 02 welux */        { cx:1.5,  cy:.8,   cz:0, lx:.5,   ly:.3,   lz:-10 },
    /* 03 diag intro */   { cx:-1,   cy:1.2,  cz:0, lx:-.4,  ly:.5,   lz:-10 },
    /* 04 dor I */        { cx:-2,   cy:-.8,  cz:0, lx:-.8,  ly:-.3,  lz:-10 },
    /* 05 dor II */       { cx:2,    cy:-1.5, cz:0, lx:.7,   ly:-.5,  lz:-10 },
    /* 06 dor III+IV */   { cx:1,    cy:2,    cz:0, lx:.3,   ly:.7,   lz:-10 },
    /* 07 entregáveis */  { cx:-.8,  cy:-.5,  cz:0, lx:-.3,  ly:-.2,  lz:-10 },
    /* 08 método */       { cx:0,    cy:-1,   cz:0, lx:0,    ly:-.4,  lz:-10 },
    /* 09 comparativo */  { cx:1.2,  cy:.6,   cz:0, lx:.4,   ly:.2,   lz:-10 },
    /* 10 case */         { cx:-1.5, cy:1,    cz:0, lx:-.5,  ly:.3,   lz:-10 },
    /* 11 garantias */    { cx:.5,   cy:-.8,  cz:0, lx:.2,   ly:-.3,  lz:-10 },
    /* 12 investimento */ { cx:0,    cy:0,    cz:0, lx:0,    ly:0,    lz:-10 },
    /* 13 fechamento */   { cx:-.5,  cy:.5,   cz:0, lx:-.2,  ly:.2,   lz:-10 },
  ];
  ```

  > **Atenção:** o array STATES original estava definido em duas peças separadas: a `const STATES = [...]` e o `const TOTAL = 13`. Esta etapa consolida ambos. Deletar a `const STATES = [...]` original logo abaixo.

- [ ] **Step 5: Remover a declaração STATES original**

  Após o passo anterior, o arquivo terá STATES definido duas vezes. Encontrar e deletar o bloco antigo:
  ```js
  const STATES = [
    /* 01 capa */         { cx:0,    cy:0,    cz:0, lx:0,    ly:0,    lz:-10 },
    ...
    /* 13 fechamento */   { cx:-.5,  cy:.5,   cz:0, lx:-.2,  ly:.2,   lz:-10 },
  ];
  ```
  (O novo STATES definido no passo anterior já inclui o original como fallback do ternário.)

- [ ] **Step 6: Atualizar o label de total no DOM**

  Encontrar a linha dentro do engine que começa com:
  ```js
  slides[0].style.opacity='1';
  ```
  Inserir ANTES dela:
  ```js
  document.getElementById('tot').textContent = String(TOTAL);
  ```

- [ ] **Step 7: Verificar no DevTools**

  DevTools iPhone 15:
  - Counter mostra `01 / 17`
  - Slide 02 (Welux) mostra só o headline de posicionamento — sem a coluna de stats
  - Deslizar para o próximo slide mostra o conteúdo de stats do Welux
  - Slides 07 e 08 mostram Dor III e Dor IV separados

  DevTools Desktop (1440px):
  - Counter mostra `01 / 13`
  - Slides duplos aparecem normalmente em grid 2 colunas

- [ ] **Step 8: Commit**

  ```bash
  git add index.html
  git commit -m "feat(mobile): split 13→17 slides, MOBILE_STATES, counter dinâmico"
  ```

---

## Task 6: Comparativo → 2 cards mobile

**Files:**
- Modify: `index.html` — final do script, antes do bloco de swipe

- [ ] **Step 1: Verificar o estado atual no mobile**

  DevTools iPhone 15, navegar até slide 11 (Comparativo).
  A tabela está oculta pelo CSS (`.comp-wrap { display: none }`). O slide aparece vazio exceto pelo headline. Esse é o estado esperado antes do fix.

- [ ] **Step 2: Adicionar renderCompCards() antes do bloco de swipe**

  Encontrar o comentário `/* ═══ SWIPE MOBILE ══════════════════════════ */` e inserir ANTES:

  ```js
  /* ═══ COMPARATIVO CARDS MOBILE ═════════════ */
  function renderCompCards() {
    if (!isMobile) return;
    const s09 = document.getElementById('s09');
    if (!s09) return;

    const rows = [...s09.querySelectorAll('.comp-table tbody tr')];
    const semData = [];
    const comData = [];

    rows.forEach(row => {
      const cells = [...row.querySelectorAll('td')];
      if (cells.length < 4) return;
      const label = cells[0].textContent.trim();
      semData.push({ label, val: cells[1].textContent.trim() });
      comData.push({ label, val: cells[3].textContent.trim() });
    });

    const rowHTML = (items) => items.map(r =>
      `<div class="mob-comp-row">
        <span class="mob-comp-lbl">${r.label}</span>
        <span class="mob-comp-val">${r.val}</span>
      </div>`
    ).join('');

    const cards = document.createElement('div');
    cards.className = 'mob-comp';
    cards.innerHTML = `
      <div class="mob-comp-card mob-comp-sem">
        <div class="mob-comp-head">Outras agências</div>
        ${rowHTML(semData)}
      </div>
      <div class="mob-comp-card mob-comp-com">
        <div class="mob-comp-head">WELUX High Ticket ★</div>
        ${rowHTML(comData)}
      </div>`;

    s09.appendChild(cards);
  }

  renderCompCards();
  ```

- [ ] **Step 3: Verificar no DevTools**

  DevTools iPhone 15, navegar até slide 11 (Comparativo).
  Dois cards verticais: "Outras agências" (escuro, texto fraco) e "WELUX High Ticket ★" (borda branca, texto pleno).
  Cada card lista os 6 atributos com label à esquerda e valor à direita.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat(mobile): comparativo → 2 cards verticais"
  ```

---

## Task 7: CTA state management + deploy final

**Files:**
- Modify: `index.html` — função `goTo()` no engine (~linha 811)

- [ ] **Step 1: Adicionar state change do CTA dentro de goTo()**

  Encontrar o final da função `goTo()`. A última linha antes do `}` de fechamento é:
  ```js
  [...dotsEl.querySelectorAll('.dot')].forEach((d,i)=>d.classList.toggle('act',i===to));
  ```
  Inserir APÓS essa linha (ainda dentro do `goTo`):
  ```js
  if (isMobile) {
    const cta = document.getElementById('mobile-cta');
    if (cta) cta.classList.toggle('cta-close', to >= TOTAL - 2);
  }
  ```

  > `to >= TOTAL - 2` cobre os 2 últimos slides (Investimento e Fechamento) em qualquer contagem (desktop: índices 11-12, mobile: índices 15-16).

- [ ] **Step 2: Verificar state change no DevTools**

  DevTools iPhone 15:
  - Slides 1–15: CTA com fundo escuro, texto branco sutil
  - Slide 16 (Investimento): CTA inverte → fundo `#F2F2F2`, texto `#050505`
  - Slide 17 (Fechamento): CTA mantém invertido
  - Voltar para slide 15: CTA volta ao estado escuro

- [ ] **Step 3: Verificar fluxo completo mobile do início ao fim**

  DevTools iPhone 15, percorrer todos os 17 slides via swipe:
  - [ ] Slide 01: headline legível, sem overflow
  - [ ] Slides 02–03: Welux dividido em 2 momentos
  - [ ] Slide 04: "Seu site está sabotando..." sem recorte
  - [ ] Slides 05–08: 4 dores individuais, full screen
  - [ ] Slide 09: Entregáveis em coluna única
  - [ ] Slide 10: 7 passos em lista, sem coluna fixa de 220px
  - [ ] Slide 11: 2 cards comparativos visíveis
  - [ ] Slides 12–13: Case dividido (contexto / métricas)
  - [ ] Slides 14–15: Garantias e Cronograma separados
  - [ ] Slide 16: Preço centralizado, CTA inverte
  - [ ] Slide 17: "A decisão é agora.", CTA invertido
  - [ ] CTA sticky: toque abre WhatsApp

- [ ] **Step 4: Substituir número placeholder do WhatsApp**

  No elemento `#mobile-cta`, substituir `5511999999999` pelo número real da Welux.

- [ ] **Step 5: Commit final**

  ```bash
  git add index.html
  git commit -m "feat(mobile): CTA state management slides 16-17 + WhatsApp número real"
  ```

- [ ] **Step 6: Deploy para Vercel**

  ```bash
  cd "/Users/leonardosantos/Desktop/Proposta WeLux"
  vercel deploy --yes
  ```

  Copiar a URL de preview e abrir no iPhone físico (não só DevTools) para validação final.
  Confirmar: swipe, starfield, CTA sticky, 17 slides.

---

## Self-Review — Spec Coverage

| Requisito do spec | Task que implementa |
|---|---|
| CSS `@media (max-width: 768px)` — todas as regras de layout | Task 1 |
| Editor + edit-btn ocultos | Task 1 (CSS) |
| Dots ocultos | Task 1 (CSS) |
| Padding `.sc` `24px 24px 80px` | Task 1 (CSS) |
| Grids → 1fr | Task 1 (CSS) |
| `.method-row` sem coluna 220px | Task 1 (CSS) |
| `.comp-wrap` oculto mobile | Task 1 (CSS) |
| Three.js N=120 mobile | Task 2 |
| Plexus desativado mobile | Task 2 |
| Sticky CTA fixed bottom | Task 3 |
| Swipe touchstart/touchend | Task 4 |
| splitSlidesForMobile() — 13→17 | Task 5 |
| MOBILE_STATES 17 entradas | Task 5 |
| Counter dinâmico `/ 17` | Task 5 |
| Comparativo → 2 cards | Task 6 |
| CTA inverte slides 16-17 | Task 7 |
| Deploy Vercel | Task 7 |

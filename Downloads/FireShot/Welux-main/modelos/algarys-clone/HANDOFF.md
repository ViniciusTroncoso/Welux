# Handoff — Welux Landing Page (algarys-clone)

**Data:** 2026-06-03  
**Branch:** main  
**Dev server:** `npm run dev` → http://localhost:3000  
**Working dir:** `/Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone`

---

## O que é o projeto

Landing page da Welux — empresa de IA para negócios. Stack: Next.js 16, React 18, Tailwind v4, TypeScript, Framer Motion. Chat SDR integrado com IA (Aria) que qualifica leads.

---

## O que foi feito nesta sessão

### 1. Hero background — EmanatingChars (canvas)

**Trocado:** `RainingLetters` (600 spans React + RAF em state) → `EmanatingChars` (canvas puro, zero useState).

**Conceito:** Sol pulsante na base da hero, caracteres (latim + grego + símbolos) emanam do centro radialmente para fora, desaceleram e somem.

**Arquivo:** `src/components/ui/emanating-chars.tsx`

Parâmetros relevantes para tunar:
- `cy = H * 0.82` — posição vertical do sol (82% da altura do canvas)
- `glowR = Math.min(W * 0.38, 320)` — raio do glow
- `pulse = 0.65 + 0.35 * Math.sin(ts / 1800)` — respiração ~11s
- `120` partículas, `speed = 0.3 + random * 1.1` por frame
- `z-[1]` no canvas — fica acima do overlay escuro (`z-auto`) mas abaixo do conteúdo (`z-10`)

**Backup:** `src/components/ui/raining-letters.tsx` intacto — reversão = 1 linha no Hero.tsx.

### 2. Hero — spacing mobile

**`src/components/Hero.tsx`** atual:
```
md:min-h-[62vh] min-h-[80vh]
pt-[120px] md:pt-0
pb-[300px] md:pb-[180px]
gap-6 (section-container)
```

- `min-h-[80vh]` mobile garante gap entre texto e chat card
- `pt-[120px]` mobile dá respiro abaixo do nav
- `pb-[300px]` mobile empurra texto alto o suficiente para o card não sobrepor

### 3. Chat card — ajustes

**`src/components/ChatLeadForm.tsx`**

| Item | Antes | Depois |
|------|-------|--------|
| Altura mobile | `min(500px,58vh)` | `min(520px,60vh)` |
| Altura desktop | `min(560px,56vh)` | `min(600px,58vh)` |
| onClick no card | `setIsExpanded(true)` | removido (trigger prematuro) |
| Texto mensagens | `text-[17px]` | `text-[14px]` |
| ChatStatusBar | presente | removido |
| Subtext heading | "3 minutos · sem pitch…" | removido |
| Footer hint | "Shift + Enter · Nova Linha" | removido |
| ChatHeading padding top | `pt-7` | `pt-7` (mantido) |
| ChatHeading padding bottom | `pb-4` | `pb-[46px]` (gap heading→mensagens) |
| Messages container pb | `py-4` | `pt-4 pb-[34px]` |

**Modo imersivo (fullscreen):** `expandOnFirstMessage()` agora chama `setIsExpanded(true)` para TODOS os devices. Trigger correto = enviar mensagem ou clicar chip de sugestão (não click genérico no card).

### 4. Fullscreen layout

Branch `inHero && isExpanded` renderiza `{cardInner}` diretamente na `<section fixed inset-0>` sem wrappers intermediários. Botão × em `absolute top-4 right-4 z-20`.

---

## Bug em aberto — FULLSCREEN VAZIO

**Sintoma:** Ao expandir o chat (clicar chip de sugestão), o fullscreen abre mas a área de mensagens aparece preta/vazia. Apenas o botão × e o input ficam visíveis.

**Status:** Não resolvido. Várias tentativas feitas:
1. Removidos wrappers `div.flex-1.min-h-0` intermediários ✗
2. Mudanças de z-index ✗
3. Reestruturação do layout ✗

**Hipóteses restantes para investigar:**
- `cardInner` é um JSX Fragment `<>...</>` — filhos viram flex items diretos da section. `AnimatePresence` + exit animation do `ChatHeading` pode estar colapsando o layout.
- Possível fix: remover `AnimatePresence`/`ChatHeading` do `cardInner` quando `isExpanded=true` — heading já não é relevante no fullscreen.
- Possível fix alternativo: extrair messages+input em variável separada e usar diretamente no fullscreen sem `cardInner`.
- `chatRef.current.scrollTo()` pode estar disparando num elemento ainda não montado → adicionar guard.

**Para debugar:** Abrir DevTools no mobile (Chrome remote debugging) e inspecionar o elemento `.flex-1.overflow-y-auto` para ver altura real e se messages estão no DOM.

---

## Pendente — FinalCta animation

O usuário quer substituir o efeito atual da seção `FinalCta` (rings/ondas radiais via CSS em `globals.css`) por um efeito de **onda que sobe de baixo para cima** — como um pulso que emana da base e vai subindo.

**Arquivo:** `src/components/FinalCta.tsx`

Efeito atual: `CtaRings` com CSS keyframes `expandRings` (mask radial que cresce). Background: textura webp repetida + rings animados.

Efeito pedido: pulso vertical que sobe (onda subindo de baixo), não expansão radial.

Abordagem sugerida: canvas ou CSS `translateY` keyframe sobre linhas/chars.

---

## Arquivos-chave modificados nesta sessão

| Arquivo | O que mudou |
|---------|-------------|
| `src/components/ui/emanating-chars.tsx` | CRIADO — canvas effect |
| `src/components/ui/raining-letters.tsx` | Preservado (backup) |
| `src/components/Hero.tsx` | Swap RainingLetters→EmanatingChars, min-h/pt/pb mobile |
| `src/components/ChatLeadForm.tsx` | Altura card, imersão, texto, remoções UI |
| `src/components/chat/ChatHeading.tsx` | Removido subtext, pt-7→pt-7 pb-4→pb-[46px] |
| `src/app/globals.css` | Inalterado nesta sessão |
| `src/app/page.tsx` | Spacer `pt-[270px] md:pt-[300px]` — inalterado |

---

## Ferramentas instaladas nesta sessão

- **uipro-cli** (global): `npm install -g uipro-cli`
- **ui-ux-pro-max skill**: instalado em `~/.claude/skills/ui-ux-pro-max/` — skill de design com 67 estilos, 161 palettes, 57 font pairings

---

## Contexto do usuário

- Ed (Leonardo Santos), Hypergestor, São Paulo
- Vibe coding — direciona IA, não escreve código manual
- Todas respostas em português (BR)
- CAVEMAN MODE ativo (respostas comprimidas)
- Padrão de qualidade: staging antes de produção, testes antes de merge

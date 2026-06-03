# Spec: Hero — EmanatingChars (substitui RainingLetters)

**Data:** 2026-06-02  
**Status:** Aprovado

---

## Objetivo

Substituir o efeito `RainingLetters` (600 spans React com RAF atualizando state) por um componente canvas `EmanatingChars` onde:

- Um glow circular branco pulsante fica atrás do chat card (base da hero)
- Caracteres nascem na **borda do anel** desse glow e derivam radialmente pra fora
- O texto da hero fica limpo — os caracteres nunca cruzam a zona central

---

## Decisões de design

| Parâmetro | Valor |
|-----------|-------|
| Emanação | Borda do anel elíptico (estilo D) |
| Glow cor | Branco puro |
| Glow comportamento | Respiração lenta — `Math.sin(ts / 1800)`, amplitude 0.35 |
| Charset | Igual ao atual: latim + dígitos + símbolos + grego |
| Partículas | ~55 instâncias |
| Performance | Canvas puro — zero React state update |

---

## Arquitetura

### Novo componente

**Arquivo:** `src/components/ui/emanating-chars.tsx`

Canvas `"use client"` com `absolute inset-0 pointer-events-none`. Usa um único `useEffect` com `requestAnimationFrame`. Zero useState.

**Geometria do anel:**
- Centro X: `W / 2`
- Centro Y: `H` (base do canvas = base da hero = onde o chat card fica)
- Ring radius X: `Math.min(W * 0.44, 420)` — escala com a largura
- Ring radius Y: `ringRX * 0.48` — perspectiva elíptica

**Partícula:**
```
spawn: ponto aleatório na borda do anel + jitter ±14px
velocidade: radialmente pra fora (vx = cos(a)*speed, vy = sin(a)*speed*0.3) + componente vertical pequeno
life: 0→maxLife, fade in nos primeiros 15%, fade out nos últimos 25%
reset: quando life > maxLife ou sair do canvas
```

**Glow:**
```
radialGradient centrado em (cx, H) com raio = ringRX * 1.3
pulse = 0.65 + 0.35 * Math.sin(ts / 1800)
stop 0: rgba(255,255,255, 0.22 * pulse)
stop 0.4: rgba(255,255,255, 0.07 * pulse)
stop 1: transparent
```

**Anel visual sutil:**
```
ctx.ellipse(cx, H, ringRX, ringRY, 0, 0, Math.PI*2)
strokeStyle: rgba(255,255,255,0.04)
```

### Integração em Hero.tsx

- Remover `import RainingLetters` e `<RainingLetters />`
- Adicionar `import EmanatingChars from "@/components/ui/emanating-chars"`
- Inserir `<EmanatingChars />` no mesmo slot (primeiro filho da section)
- Coexiste com SVG glows existentes (`1.svg`, `2.svg`, `3.svg`) — camadas independentes

### Backup

Antes de qualquer edição, fazer commit do estado atual com mensagem `backup: pre-emanating-chars hero effect`. O arquivo `raining-letters.tsx` **não é deletado** — apenas o import/uso em `Hero.tsx` é trocado. Reversão = 1 linha no Hero.

---

## Checklist de implementação

- [ ] Commit de backup
- [ ] Criar `src/components/ui/emanating-chars.tsx`
- [ ] Atualizar `Hero.tsx` (trocar import + componente)
- [ ] Verificar no browser: glow visível, caracteres saem do anel, texto da hero legível
- [ ] Verificar mobile: anel escala com viewport
- [ ] Verificar `prefers-reduced-motion`: parar RAF ou reduzir opacity

---

## Fora de escopo

- Mudanças nas seções fora da hero
- Ajustes de cores do palette geral
- Remover os SVG glows existentes

# Spec: Hero + Chat Polish — Canvas, Spacing, Height, Imersão

**Data:** 2026-06-02  
**Status:** Aprovado

---

## Problemas e soluções

### 1. Canvas EmanatingChars invisível

**Causa:** Canvas é 1º filho da `<section>`, overlay `rgba(5,5,5,0.78)` é 2º — em DOM order sem z-index explícito, overlay cobre canvas. Partículas renderizam mas ficam soterradas.

**Fix:** `z-[1]` na className do canvas em `src/components/ui/emanating-chars.tsx`.  
Canvas (z:1) fica acima do overlay (z:auto) mas abaixo do conteúdo (z:10). 1 linha.

---

### 2. Mobile cramped — falta de respiro

**Causa:** `min-h-[62vh]` em mobile (≈524px / 844px screen) com card `translate-y-1/2` posiciona card top a ≈274px — quase colando no bloco de texto. Sem `pt`, texto cola no nav.

**Fix em `src/components/Hero.tsx`:**
- `min-h-[62vh]` → `min-h-[80vh] md:min-h-[62vh]`
- Adicionar `pt-[60px] md:pt-0` à section
- `pb-[100px]` → `pb-[130px]` (desktop mantém `md:pb-[140px]`)

Resultado mobile 844px: texto bottom ≈410px, card top ≈430px — gap ~20px limpo. 60px de respiro no topo.

**Fix em `src/app/page.tsx`:** spacer inalterado (`pt-[270px] md:pt-[300px]`).

---

### 3. Chat card — altura insuficiente

**Fix em `src/components/ChatLeadForm.tsx`:**
- Mobile: `h-[min(500px,58vh)]` → `h-[min(520px,60vh)]`
- Desktop: `md:h-[min(560px,56vh)]` → `md:h-[min(600px,58vh)]`

---

### 4. Modo imersivo — trigger errado

**Causa:** `expandOnFirstMessage()` só esconde heading (não expande mais). Card tem `onClick` que dispara cedo demais (qualquer clique = fullscreen).

**Fix em `src/components/ChatLeadForm.tsx`:**
1. Restaurar `setIsExpanded(true)` em `expandOnFirstMessage()` para **todos os devices**
2. Remover `onClick={() => setIsExpanded(true)}` e `cursor-pointer` do card div (`inHero` branch)
3. Triggers corretos já existem: `handleSubmit` (enviar) e chips de sugestão — ambos chamam `expandOnFirstMessage()`

---

## Arquivos modificados

| Arquivo | Mudanças |
|---------|----------|
| `src/components/ui/emanating-chars.tsx` | Adicionar `z-[1]` na className do canvas |
| `src/components/Hero.tsx` | `min-h`, `pt`, `pb` |
| `src/components/ChatLeadForm.tsx` | Altura card, `expandOnFirstMessage`, remover `onClick` do card |
| `src/app/page.tsx` | Nenhuma |

---

## Fora de escopo

- Redesign do Nav
- Mudanças em outras sections
- Animação de transição para o modo imersivo

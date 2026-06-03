# Hero + Chat Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir 4 problemas na hero: canvas invisível, mobile cramped, chat muito baixo, modo imersivo com trigger errado.

**Architecture:** Edições cirúrgicas em 2 arquivos (`emanating-chars.tsx`, `Hero.tsx`, `ChatLeadForm.tsx`). Sem novos componentes. Sem mudanças em `page.tsx`.

**Tech Stack:** Next.js 16, React 18, Tailwind v4, TypeScript, Framer Motion

---

## File Map

| Ação | Arquivo | O que muda |
|------|---------|------------|
| Modify | `src/components/ui/emanating-chars.tsx` | `z-[1]` no canvas |
| Modify | `src/components/Hero.tsx` | `min-h`, `pt`, `pb` mobile |
| Modify | `src/components/ChatLeadForm.tsx` | altura card, remover `onClick`/`cursor-pointer`, restaurar `expandOnFirstMessage` |

---

### Task 1: Canvas visível — adicionar `z-[1]`

**Files:**
- Modify: `src/components/ui/emanating-chars.tsx` (última linha antes do `}`)

- [ ] **Ler o arquivo para confirmar o estado atual**

```bash
grep -n "className" /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/ui/emanating-chars.tsx | tail -5
```

Expected: linha com `"absolute inset-0 pointer-events-none w-full h-full"` sem `z-[1]`.

- [ ] **Aplicar a mudança**

No return do componente, trocar:

```tsx
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
    />
```

por:

```tsx
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-[1]"
    />
```

- [ ] **Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -10
```

Expected: sem output (sem erros).

- [ ] **Commit**

```bash
git add src/components/ui/emanating-chars.tsx
git commit -m "fix(hero): canvas z-[1] — renders above dark overlay, particles visible"
```

---

### Task 2: Hero mobile — respiro no topo e gap texto/chat

**Files:**
- Modify: `src/components/Hero.tsx` (linha da className da `<section>`)

- [ ] **Ler o arquivo**

```bash
grep -n "className" /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/Hero.tsx | head -3
```

Expected: linha com `md:min-h-[62vh] min-h-[62vh]` e `pb-[100px] md:pb-[140px]` sem `pt`.

- [ ] **Aplicar a mudança**

Trocar a className da `<section>`:

```tsx
      className="md:min-h-[62vh] min-h-[62vh] flex items-center justify-center relative overflow-visible border-b border-accent section-px pb-[100px] md:pb-[140px]"
```

por:

```tsx
      className="md:min-h-[62vh] min-h-[80vh] flex items-center justify-center relative overflow-visible border-b border-accent section-px pt-[60px] md:pt-0 pb-[130px] md:pb-[140px]"
```

Mudanças:
- `min-h-[62vh]` → `min-h-[80vh]` (mobile mais alto → gap entre texto e card)
- `pt-[60px] md:pt-0` adicionado (respiro do nav no topo, só mobile)
- `pb-[100px]` → `pb-[130px]` (empurra texto mais alto, abre gap visual)
- `md:min-h-[62vh]` e `md:pb-[140px]` inalterados

- [ ] **Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -10
```

Expected: sem output.

- [ ] **Commit**

```bash
git add src/components/Hero.tsx
git commit -m "fix(hero): mobile breathing room — min-h 80vh, pt-60 top, pb-130"
```

---

### Task 3: Chat card — altura + remover onClick agressivo

**Files:**
- Modify: `src/components/ChatLeadForm.tsx` (branch `if (inHero)` — card div)

- [ ] **Localizar a linha do card div**

```bash
grep -n "cursor-pointer\|h-\[min(500" /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/ChatLeadForm.tsx
```

Expected: linha com `h-[min(500px,58vh)] md:h-[min(560px,56vh)]` e `cursor-pointer`.

- [ ] **Aplicar a mudança**

Trocar o bloco do card `inHero`:

```tsx
  if (inHero) {
    return (
      <div
        onClick={() => setIsExpanded(true)}
        className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(500px,58vh)] md:h-[min(560px,56vh)] cursor-pointer"
        style={{
          background: "#050505",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {cardInner}
      </div>
    )
  }
```

por:

```tsx
  if (inHero) {
    return (
      <div
        className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden h-[min(520px,60vh)] md:h-[min(600px,58vh)]"
        style={{
          background: "#050505",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {cardInner}
      </div>
    )
  }
```

Mudanças:
- Removido `onClick={() => setIsExpanded(true)}`
- Removido `cursor-pointer`
- `h-[min(500px,58vh)]` → `h-[min(520px,60vh)]`
- `md:h-[min(560px,56vh)]` → `md:h-[min(600px,58vh)]`

- [ ] **Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -10
```

Expected: sem output.

- [ ] **Commit**

```bash
git add src/components/ChatLeadForm.tsx
git commit -m "fix(chat): taller card, remove premature fullscreen onClick"
```

---

### Task 4: Modo imersivo — trigger correto na primeira interação

**Files:**
- Modify: `src/components/ChatLeadForm.tsx` (função `expandOnFirstMessage`)

- [ ] **Localizar a função**

```bash
grep -n "expandOnFirstMessage\|setIsExpanded\|expandedRef" /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone/src/components/ChatLeadForm.tsx | head -10
```

Expected: `expandOnFirstMessage` com apenas `setHeadingVisible(false)` — sem `setIsExpanded`.

- [ ] **Aplicar a mudança**

Trocar:

```tsx
  function expandOnFirstMessage() {
    if (!expandedRef.current) {
      expandedRef.current = true
      setHeadingVisible(false)
    }
  }
```

por:

```tsx
  function expandOnFirstMessage() {
    if (!expandedRef.current) {
      expandedRef.current = true
      setHeadingVisible(false)
      setIsExpanded(true)
    }
  }
```

`setIsExpanded(true)` agora dispara para **todos os devices** quando o usuário envia a primeira mensagem ou clica num chip de sugestão. Os dois call sites já existem:
- `handleSubmit` chama `expandOnFirstMessage()`
- Chips de sugestão chamam `expandOnFirstMessage()` no `onClick`

- [ ] **Verificar TypeScript**

```bash
cd /Users/leonardosantos/Downloads/FireShot/Welux-main/modelos/algarys-clone && npx tsc --noEmit 2>&1 | head -10
```

Expected: sem output.

- [ ] **Commit**

```bash
git add src/components/ChatLeadForm.tsx
git commit -m "fix(chat): restore immersive expand on first real interaction (all devices)"
```

---

### Task 5: Verificação visual

**Files:** nenhuma edição.

- [ ] **Confirmar dev server rodando**

```bash
lsof -i :3000 | head -3
```

Se não estiver rodando: `npm run dev` no diretório do projeto.

- [ ] **Checklist desktop**
  - [ ] Partículas do EmanatingChars visíveis na hero
  - [ ] Glow branco sutil na base (não blob)
  - [ ] Texto da hero legível e não sobreposto por partículas
  - [ ] Chat card mais alto
  - [ ] Clicar no card NÃO expande (comportamento neutro)
  - [ ] Clicar num chip de sugestão → fullscreen imersivo
  - [ ] Botão × fecha o fullscreen

- [ ] **Checklist mobile (DevTools 390px)**
  - [ ] Respiro no topo da hero (60px abaixo do nav)
  - [ ] Gap visível entre texto e borda superior do chat card
  - [ ] Partículas visíveis
  - [ ] Clicar num chip → fullscreen imersivo
  - [ ] Botão × fecha

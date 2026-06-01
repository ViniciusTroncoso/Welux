# ChatLeadForm — Redesign High-Tech (SpaceX / Mission Control)

## Decisões de Design Aprovadas

| Eixo | Decisão |
|---|---|
| Estética | SpaceX / Mission Control — grid sutil, monospace, contrastes brancos |
| Cor de acento | Branco puro (#fff) — sem cor extra, só contraste |
| Layout desktop | Full-screen (100dvh) quando usuário chega em #form |
| Layout mobile | Expande para fullscreen (position:fixed) ao enviar a primeira mensagem |
| Tipografia | body 16-17px, AI bubble 17px, heading clamp(28px, 4.5vw, 52px) |
| Animação IA | Spinner terminal Braille + barra de progresso (não são dots genéricos) |
| Handoff | Contact Card embutido na bolha do AI (nome + WhatsApp) |
| Pós-submit | Lead recebe mensagem WhatsApp imediata via Evolution API |

---

## Arquitetura de Componentes

```
ChatLeadForm.tsx          ← componente raiz, gerencia estados + expansão mobile
  ├── ChatStatusBar       ← "WELUX.AI / ARIA" + "● LIVE SESSION"
  ├── ChatHeading         ← título + subtítulo, desaparece no mobile expandido
  ├── ChatMessages        ← scrollable, renderiza AI + User + Thinking + Chips + ContactCard
  │   ├── AiBubble        ← border-left:#fff + padding + text 17px
  │   ├── UserBubble      ← bg:#fff text:#000 rounded
  │   ├── ThinkingBubble  ← spinner terminal + progress bar
  │   ├── ChipRow         ← quick-replies estilo monospace
  │   └── ContactCard     ← form embutido na bolha AI
  ├── ChatInput           ← input + enviar, desabilitado durante streaming
  └── ResultScreen        ← tela pós-submit com status WA enviado
```

---

## Detalhes Visuais

### Grid de fundo
```css
background-image:
  linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
background-size: 32px 32px;
/* Mobile: 20px 20px */
```

### Glow de topo
```css
::before {
  background: radial-gradient(ellipse 80% 60% at 50% 0%,
    rgba(255,255,255,0.05) 0%, transparent 60%);
}
```

### Status bar
```
WELUX.AI / ARIA — DIAGNÓSTICO OPERACIONAL          ● LIVE SESSION
font-family: monospace | font-size: 10px | letter-spacing: 3px | color: rgba(255,255,255,0.25)
```

### Heading
```css
h1: font-size: clamp(28px, 4.5vw, 52px); font-weight: 300; letter-spacing: -1.5px;
subtitle: font-family: monospace; font-size: 10px; letter-spacing: 2.5px; opacity: 0.2;
```

### AI Bubble
```css
border-left: 2px solid #fff;
border-radius: 0 8px 8px 0;
background: rgba(255,255,255,0.025);
padding: 16px 20px;
font-size: 17px;
line-height: 1.65;
color: rgba(255,255,255,0.72);
/* Mobile: padding 12px 16px; font-size 16px */
```

### User Bubble
```css
background: #fff; color: #000;
border-radius: 8px 8px 0 8px;
padding: 14px 20px;
font-size: 17px; font-weight: 600;
max-width: 62%;
/* Mobile: padding 11px 16px; max-width 75% */
```

### Thinking Bubble (animação high-tech)
```tsx
<div className="thinking-bubble">
  <div className="thinking-label">
    <span className="spinner">{brailleFrame}</span>  {/* animated via useEffect */}
    <span>ARIA PROCESSANDO</span>
  </div>
  <div className="progress-track">
    <div className="progress-fill" />  {/* CSS animation: 0%→100%→fade, 2.4s infinite */}
  </div>
</div>
```
Spinner: frames `['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']` a 80ms cada.
Progress bar: `height: 1px`, branca, animação CSS `@keyframes` 0%→85% em 2.4s loop.

### Quick-reply chips
```css
border: 1px solid rgba(255,255,255,0.14);
border-radius: 2px;
padding: 8px 16px;
font-family: monospace; font-size: 12-13px;
color: rgba(255,255,255,0.45);
/* Hover / selected: border-color #fff, color #fff, bg rgba(255,255,255,0.06) */
```

### Input bar
```
[ ›  |  Responda ou selecione acima          |  ⏎ ]
border: 1px solid rgba(255,255,255,0.09);
background: rgba(255,255,255,0.02);
border-radius: 3px; padding: 12-13px 16-18px;
footer: monospace 9-10px "SHIFT + ENTER · NOVA LINHA"
```

### Contact Card (dentro da AI bubble)
```css
/* Mesma estética da AI bubble, inputs escuros, botão branco */
.cinput: bg rgba(255,255,255,0.04); border rgba(255,255,255,0.1); padding 12px 14px;
.cbtn: bg #fff; color #000; font-weight 700; text-transform uppercase;
       padding 13px; border-radius 3px; width 100%;
```

---

## Comportamento Mobile — Expansão Fullscreen

**Estado inicial:** seção com `min-height: 80dvh`, heading visível, chat aparece.

**Trigger:** usuário envia a primeira mensagem (digita + enter, ou clica chip).

**Animação:** Framer Motion `layout` + `AnimatePresence`:
```tsx
// State
const [isExpanded, setIsExpanded] = useState(false)

// Trigger on first user message
function handleFirstMessage() {
  if (!isExpanded && messages.filter(m => m.role === 'user').length === 0) {
    setIsExpanded(true)
  }
}

// JSX
<motion.section
  layout
  style={{
    position: isExpanded ? 'fixed' : 'relative',
    inset: isExpanded ? 0 : 'auto',
    zIndex: isExpanded ? 50 : 'auto',
    height: isExpanded ? '100dvh' : undefined,
  }}
  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
>
```

Ao expandir: heading faz `opacity: 0` + `height: 0` com `AnimatePresence`.

**Desktop:** seção já é `min-height: 100dvh`, nenhuma expansão necessária.

---

## Animações Framer Motion

| Elemento | Animação |
|---|---|
| Nova mensagem AI | `initial: {opacity:0, y:8}` → `animate: {opacity:1, y:0}` duration 0.2s |
| Nova mensagem user | Mesma |
| ThinkingBubble | Fade in, substituída pela AI bubble com crossfade |
| Chips | `staggerChildren: 0.05` — aparecem em cascata |
| Expansão mobile | `layout` + position:fixed, duration 0.4s |
| Heading desaparecendo | `exit: {opacity:0, height:0, marginBottom:0}` duration 0.3s |
| Result screen | `initial:{opacity:0, y:16}` → `animate:{opacity:1, y:0}` duration 0.45s |

---

## Fluxo pós-submit — Lead recebe WhatsApp

**Sequência após ContactCard enviado:**

1. `handleContactSubmit` → `doSubmit(history)` → AI responde com `LEAD_COMPLETE`
2. Frontend chama `POST /api/lead` com dados extraídos
3. `/api/lead` executa:
   - `localScore + groqScore` → `routing`
   - `sendWhatsapp(SDR_NUMBER, message)` → time interno notificado
   - **NOVO:** `sendWhatsapp(lead.whatsapp, welcomeMessage)` → lead notificado
4. Frontend exibe ResultScreen com nota "Mensagem enviada no WhatsApp"

**Mensagem de boas-vindas ao lead (Evolution API):**
```
Oi, {nome}! Aqui é a Welux.

Recebi seu diagnóstico e já comuniquei o time.

Vamos te chamar em até 5 minutos para uma conversa rápida.

— Aria · Welux AI
```

**Env var necessária:** `WELUX_WHATSAPP_NUMBER` (número do qual a Welux envia — o instance da Evolution).

---

## Result Screen

```
  ┌─────────────────────┐
  │                     │
  │   [ ✓ ]             │
  │                     │
  │  Contato recebido.  │
  │                     │
  │  Nossa equipe entra │
  │  em contato em até  │
  │  5 minutos.         │
  │                     │
  │  ┌─────────────┐    │
  │  │ WA ENVIADO  │    │
  │  │ "Oi, X!..." │    │
  │  └─────────────┘    │
  │                     │
  │  ● TEAM NOTIFIED    │
  └─────────────────────┘
```

---

## Responsividade

| Breakpoint | Ajustes |
|---|---|
| Mobile (<768px) | padding lateral 20px, heading 28px, grid 20px, expansão fullscreen no first message |
| Tablet (768-1024px) | padding 32px, heading 40px, grid 28px, sem expansão |
| Desktop (>1024px) | padding 48px, heading clamp max 52px, grid 32px, min-height 100dvh estático |

---

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---|---|
| `src/components/ChatLeadForm.tsx` | Reescrever completamente — novo design system |
| `src/components/chat/ChatStatusBar.tsx` | Criar — status bar isolado |
| `src/components/chat/ChatHeading.tsx` | Criar — heading com AnimatePresence |
| `src/components/chat/ThinkingBubble.tsx` | Criar — spinner terminal + progress |
| `src/app/api/lead/route.ts` | Modificar — adicionar sendWhatsapp ao lead |

> **Nota:** `ContactCard.tsx` e `ResultScreen.tsx` já existem em `src/components/quiz/`. Reusar sem alterações estruturais — apenas ajuste de estilo via className props.

---

## O que NÃO muda

- `src/app/api/chat-lead/route.ts` — system prompt SDR já otimizado
- `src/lib/scoring.ts` — scoring matrix OK
- Lógica de `doSubmit` / `handleContactSubmit` — funcional, só muda apresentação
- `src/components/quiz/ContactCard.tsx` — reusar
- `src/components/quiz/ResultScreen.tsx` — reusar com novo wrapper visual

---

## Mockups de Referência

Salvos em `.superpowers/brainstorm/` (não comitar):
- `final-design.html` — desktop completo, 4 estados
- `mobile-design.html` — phone frame 375px, 4 estados

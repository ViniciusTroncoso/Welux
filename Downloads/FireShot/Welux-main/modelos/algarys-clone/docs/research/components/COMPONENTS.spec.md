# Component Specs — Algarys clone

All components reuse the **exact Tailwind class strings** extracted verbatim from the live
site's DOM (`outerHTML`) plus the site's own compiled CSS tokens (re-declared in `globals.css`).
QA was done by computed-style diff against the live site (screenshots were unavailable — the
browser-MCP screenshot endpoint timed out on the heavy page this session).

| Component | File | Source `#id` | Interaction | QA verdict |
|-----------|------|--------------|-------------|------------|
| Nav + MobileMenu | `Nav.tsx` | nav | client; mobile drawer toggle | nav h=90px, backdrop-blur(35px), gradient bg ✓; drawer slides 100%→0 ✓ |
| Hero | `Hero.tsx` | `#home` | static; ring waves + glow + slide-in-blur | h1 60px/#f2f2f2/-1.2px ✓; btn glow shadow ✓ |
| LogosMarquee | `LogosMarquee.tsx` | `#logos` | time; 34 logos ×2, `logos-marquee` 40s | marquee anim ✓ |
| LeadForm | `LeadForm.tsx` | `#form` | client; photo carousel 4s + form | form max-w 640px ✓; input #0a0a0a/42px/r-8 ✓ |
| Stats | `Stats.tsx` | `#prova-social` | static; fade-up stagger | num 51.536px/700/-1.03px ✓ |
| Services | `Services.tsx` | `#servicos` | static; 2 autoplay mix-blend videos | 2 videos ✓; h3 15px/700 ✓ |
| Method | `Method.tsx` | `#metodologia` | **click accordion** (desktop) / stacked (mobile) | active flex→1, others 120px, img opacity 1 ✓ |
| Objections | `Objections.tsx` | `#objecoes` | static; blueprint corner-square borders | tag 9.556px/2px/#01ffce ✓; corner #0a0a0a/#807f7f ✓ |
| About | `About.tsx` | `#quem-somos` | client; desktop overlapping photos / mobile carousel | desktop↔mobile variants toggle at md ✓ |
| Differentials | `Differentials.tsx` | `#diferenciais` | static; fade-up stagger | h3 40px/400/lh44 ✓; Figma-export icon insets preserved |
| FinalCta | `FinalCta.tsx` | `#cta-final` | static; CTA ring waves | corner squares + ring animation ✓ |
| Footer | `Footer.tsx` | `#footer` | static | wordmark clamp(80,30vw,440)/stroke 1px ✓; min-h 500px ✓ |
| FloatingOrb | `icons.tsx` | floating div | static decorative | fixed bottom-12 right-12, hidden<md ✓ |

## Design tokens (globals.css @theme + utilities)
- bg page `#050505`, surface/background `#0a0a0a`, border `#1a1a1a`
- accent `#70ffe3`, accent-hover `#5ce6cc`, glow `#01ffce`
- text: primary/heading `#f2f2f2`, body `#8f8f88` (w300), muted `#b9b9b9`, placeholder `#807f7f`
- font: Inter Display (self-hosted, 300/400/500/600/700), `--tracking-tight: -0.02em`

## Known notes
- Section y-positions match the live site within viewport-height rounding (~7px global offset
  from the hero's `min-h-screen` resolving to a 7px-shorter viewport in the clone tab).
- Two custom utilities used with `md:` prefix (`md:min-h-125`, `md:max-w-form`) needed explicit
  responsive declarations — Tailwind v4 `@layer utilities` does not auto-generate variants.
- `backdrop-blur-35` applied inline on the nav (same v4 limitation for `backdrop-filter`).

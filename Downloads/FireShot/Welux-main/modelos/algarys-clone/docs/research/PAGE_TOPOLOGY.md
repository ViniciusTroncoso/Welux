# Algarys — Page Topology

Single-page React/Vite SPA (Tailwind CSS). Root wrapper: `div.relative.w-full.overflow-x-hidden`.
Page background `#050505`. Section content max-width `1312px` via `.section-container`.
Horizontal padding via `.section-px` (24px mobile / 100px desktop).

## Sections (top → bottom)

| # | id | Component | Interaction model | Notes |
|---|----|-----------|-------------------|-------|
| 1 | (nav) | `Nav` | fixed overlay, mobile menu toggle | h-90px, fixed top, gradient bg + backdrop-blur-35, border-b white/10 |
| 2 | (drawer) | `MobileMenu` | click toggle | md:hidden overlay + right drawer (w-4/5 max 320px) |
| 3 | `home` | `Hero` | static (CSS animations) | min-h-screen, texture-ring waves + glow svgs + slide-in-blur text |
| 4 | `logos` | `LogosMarquee` | time-driven (infinite marquee) | 34 logos ×2, translateX -50%, mask-fade-x edges |
| 5 | `form` | `LeadForm` | photo carousel auto-rotate + form | left photo carousel (3 imgs, dots), right form w/ selects |
| 6 | `prova-social` | `Stats` | static (fade-up stagger) | 5 stats, vertical dividers on desktop |
| 7 | `servicos` | `Services` | static, 2 autoplay videos | ALG 0.1 / ALG 0.2 cards, mix-blend-screen videos |
| 8 | `metodologia` | `Method` | **click-driven** horizontal accordion (desktop); stacked cards (mobile) | 4 steps, active grows flex:1, others flex:0 0 120px |
| 9 | `objecoes` | `Objections` | static | blueprint-bordered boxes w/ corner squares, 3 objection cards |
| 10 | `quem-somos` | `About` | static (desktop) / photo carousel (mobile) | overlapping photos + text desktop; single carousel mobile |
| 11 | `diferenciais` | `Differentials` | static (fade-up stagger) | 5 cards, icon + h3 + p |
| 12 | `cta-final` | `FinalCta` | static (CSS ring animation) | bordered box w/ corner squares + ring waves + button |
| 13 | `footer` | `Footer` | static | giant outlined "algarys" wordmark + copyright + socials |
| 14 | (floating) | `FloatingOrb` | static decorative | fixed bottom-12 right-12, hidden on mobile, pointer-events-none |

## Page-level layout
- All sections are normal flow (no scroll-snap, no smooth-scroll library).
- `html { scroll-behavior: smooth }` for anchor nav.
- Nav is `fixed` and overlays; hero has top padding via min-h-screen centering.
- Anchor targets use `scroll-mt-25` (6.25rem) to offset under fixed nav.

## Nav links → anchors
Home `#home` · Parceiros `#logos` · Formulário `#form` · Contato `#footer`

# SpeedMVPs — Behaviors

> NOTE: Browser MCP was unavailable, so behaviors are inferred from the compiled CSS
> (keyframes, animate-* utilities, transition-* classes) and class names in the SSR HTML,
> not from a live interaction sweep. To be re-verified live once browser MCP is back.

## Global keyframes (ported to globals.css)
- `fade-up`: opacity 0→1, translateY 20px→0 (.6s ease-out forwards) — `.animate-fade-up`
- `fade-in`: opacity 0→1 (.6s) — `.animate-fade-in`
- `scale-in`: opacity 0→1, scale .95→1 (.5s) — `.animate-scale-in`
- `float`: translateY 0→-10px→0 (3s ease-in-out infinite) — `.animate-float`
- `pulse-soft`: opacity 1→.7→1 (2s) — `.animate-pulse-soft`
- `scroll-logos`: translateX 0→-33.333% (40s linear infinite) — `.animate-scroll-logos` (display:flex; width:fit-content)
- `scroll-differentiators`: translateX 0→-50% (50s linear infinite) — `.animate-scroll-differentiators`
- `wave`: translateX -100%→100%
- `accordion-down/up`: height 0↔var(--radix-accordion-content-height) — Radix accordion (FAQ)
- Staggered reveals: `.animate-delay-100/200/300/400` (opacity:0 + delay)

## Per-section behavior
- **Header (#0):** `transition-all duration-300`, starts `bg-transparent`. On scroll past threshold → likely solid white/blur + shadow (JS scroll listener toggling classes). Re-verify exact scrolled styles live.
- **Hero (#1):** entrance reveals via animate-fade-up / delays. Decorative animated bg (overflow-hidden).
- **Logo strips (#2, #7):** infinite horizontal marquees (`animate-scroll-logos`). Track duplicated to loop seamlessly (translateX -33.333% ⇒ content tripled).
- **Differentiators (#5):** tall section `h-[calc(100vh+140vw)]` ⇒ sticky inner + horizontal auto-scroll of cards (`animate-scroll-differentiators`, translateX -50% ⇒ content doubled).
- **FAQ (#6):** Radix accordion expand/collapse (accordion-down/up).
- **Cards (services/portfolio/related):** hover transitions (transition + likely transly/shadow). Re-verify hover deltas live.

## Responsive
- Tailwind breakpoints: sm 640, md 768, lg 1024, xl 1280.
- Sections use `px-4 sm:px-6 lg:px-8`, grids collapse to single column on mobile (per `grid-cols` + `sm:`/`md:`/`lg:` prefixes in each section's classes).

# Algarys — Behaviors Bible

> NOTE: Browser-MCP screenshots timed out this session (heavy page). Extraction is based on
> verbatim DOM `outerHTML` + the site's own compiled CSS (`assets/index-BELNZy-T.css`) +
> `getComputedStyle`. The clone reuses the site's exact Tailwind class strings, so fidelity is high.

## Global
- **Font:** Inter Display (self-hosted woff2, weights 300/400/500/600/700). Set on `<body>`.
- **No smooth-scroll library** (no Lenis/Locomotive). Native `scroll-behavior: smooth` on `html`.
- **Nav** is `fixed` with a constant gradient background `linear-gradient(rgba(0,0,0,0.86), rgba(18,18,18,0.72))` + `backdrop-blur(35px)` + `border-b border-white/10`. It does NOT change on scroll (already glassy from load).

## Animations (CSS-only, defined in globals.css)
- `slide-in-blur` — hero text rises 24px + de-blurs over 1.5s `cubic-bezier(.22,1,.36,1)`, delays .05/.25/.45s.
- `expandRings` / `expandRingsCta` — 6s infinite radial mask waves (hero + CTA), 3 staggered waves (0/2/4s).
- `logos-marquee` — infinite `translateX(0 → -50%)`, list duplicated ×2 for seamless loop (~40s linear).
- `animate-fade-up` — `fade-up .52s cubic-bezier(.22,1,.36,1) both`, used with inline `animation-delay` stagger (0/80/160/240/320ms) on stats, method mobile cards, objections, differentials.
- Hero glow SVGs (`glow/1,2,3.svg`) pinned bottom, `filter: blur(10px/20px/0)`.

## Interactions

### Nav mobile menu (click)
- Hamburger (`Menu` lucide) toggles → `X` (rotate/opacity cross-fade, duration-200).
- Opens: full-screen `bg-black/60 backdrop-blur-sm` overlay (fade) + right `aside` drawer
  (`w-4/5 max-w-[320px]`, `bg-[#111]`) sliding in. Links + `btn-nav-mobile` CTA inside.

### Form photo carousel (time-driven, desktop only)
- 3 stacked `<img>` (`felipe`, `pedro`, `imagem_form`), cross-fade via `opacity` `transition-opacity duration-700`.
- Default active = image 3 (`imagem_form`). Auto-advances; dot indicators bottom-center
  (active dot is `w-6` pill `bg-white`, inactive `bg-white/50` dots). Clicking a dot selects.

### Method accordion (CLICK-DRIVEN, desktop ≥768px)
- INTERACTION MODEL: click-to-expand horizontal accordion. NOT scroll-driven.
- 4 `<button>` panels in a flex row. Active: `flex: 1 1 0%`. Inactive: `flex: 0 0 120px`.
- Transition: `flex-grow 600ms ease-out, flex-basis 500ms ease-out, flex-shrink 500ms ease-out`.
- Each panel h-535px, bg image (step webp) `object-cover` + dark gradient overlay
  `linear-gradient(185deg, rgba(5,5,5,0) 6%, #050505 79%)`.
- Inactive panel: shows big number (179px gradient text) centered + vertical rotated label (-90deg) + image hidden (`opacity-0`).
- Active panel: image `opacity-100`, bottom-aligned title (31px) + description (16px), number/label `opacity-0`.
- `transition-opacity duration-300` cross-fades these layers; content has `delay-200`.
- Mobile (<768px): static stacked cards (`md:hidden`), each w/ faint big number watermark.

### About / Quem-somos (responsive split)
- Desktop (`hidden md:flex`): two overlapping rotated/mirrored photos (foto_1, foto_2) on left card
  (`bg-surface/90 backdrop-blur-20 rounded-b-[28px] border`), text on right.
- Mobile (`md:hidden`): single photo carousel (foto_1/foto_2 cross-fade) + pill dot indicators + text below.

### Hover states
- `.btn-pulse` / `.btn-primary` (accent buttons): box-shadow ring grows on hover
  (`0 0 0 7px #01ffce1f` added), `:active` brightness .9. Transition `box-shadow .35s`.
- `.btn-nav` (white): `filter: brightness(.92)` on hover.
- Footer links: `text-muted → text-white` (`transition-colors`).
- Footer social icons (size 26.6px): `text-muted → text-white`.
- CTA button also `hover:bg-accent-hover` (#5ce6cc).

## Responsive breakpoint = 768px (`md:`)
- Nav: links + CTA hidden < md, hamburger shown.
- Hero: text left-aligned + smaller (text-3xl) on mobile, centered text-6xl on desktop.
- Stats: column with bottom borders on mobile → horizontal row w/ vertical dividers on desktop.
- Services: stacked → 2-col with center divider.
- Method: stacked static cards → horizontal click accordion.
- Objections: stacked cards → blueprint grid (top banner, 2-col row, full-width row).
- About: mobile carousel variant ↔ desktop overlapping-photos variant (two separate DOM blocks).
- Differentials: column gap-75 → wrapped row (3-per-row, w-360, gap-x-113/gap-y-80).

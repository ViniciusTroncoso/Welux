# SpeedMVPs — AI MVP Development Page Topology

URL: https://speedmvps.com/services/ai-mvp-development
Stack: Next.js (App Router) + Tailwind CSS v3 (compiled). Fonts: General Sans (local woff), Inter (Google), Poppins.
Extraction method: static (SSR HTML + compiled CSS) — browser MCP was unavailable.

## Sections (top → bottom)

| # | Component | Working name | BG | Notes / interaction |
|---|-----------|--------------|----|---------------------|
| 0 | `SiteHeader` | Nav | transparent → (scroll) | `absolute top-0 z-50 transition-all duration-300 bg-transparent`. Likely turns solid/blurred on scroll. Logo + nav links + CTA. |
| 1 | `Hero` | Hero | black | `min-h-screen flex items-center text-white`. H1 "AI-Powered MVP Development", subtitle, CTAs, badges. overflow-hidden (decorative bg). |
| 2 | `LogoMarquee` (intro) | Trust bar | white | `py-12 sm:py-16`. Small "trusted by" logo strip (no heading). |
| 3 | `Transform` / Benefits | Transform Your Vision | white | `py-16 sm:py-20`. H2 "Transform Your Vision into AI-Powered Reality". |
| 4 | `Services` | Our AI MVP Development Services | #FAFAFA | `py-20`. Service cards grid. |
| 5 | `WhyChoose` / Differentiators | Why Choose SpeedMVPs | white | `relative sm:h-[calc(100vh+140vw)]` — TALL scroll-driven section, sticky + horizontal auto-scroll (`animate-scroll-differentiators`). |
| 6 | `FAQ` | AI MVP Development FAQ | white | `py-20`. Radix accordion (`accordion-down/up` keyframes present). |
| 7 | `ClientsMarquee` | Trusted by Global Companies | white | `py-12..20 overflow-hidden`. Infinite logo marquee (`animate-scroll-logos`). |
| 8 | `Portfolio` | Portfolio: AI Products | gray-50 | `py-24 font-general-sans`. Product cards w/ images. |
| 9 | `RelatedContent` | Explore Related Content | gray-50 | `py-12 sm:py-16`. Link cards. |
| 10 | `FinalCTA` | Ready to Build Your MVP? | black | `pt-20 pb-20 relative overflow-hidden`. CTA. |
| 11 | `SiteFooter` | Footer | white | Columns (Company, ...), social icons, flags (US/India). |

## Layout
- Single vertical scroll, no smooth-scroll library detected in CSS (no `.lenis`).
- Header is `absolute` (overlays hero), z-50.
- Section 5 is the only complex scroll-driven block (sticky horizontal scroll of differentiator cards).

## Assets
- 12 client logos (`public/clients/*`), 12 product images (`public/products/*`), 3 differentiator images (`public/Differentiators/*`), flags, social icons (`public/social/*`), logo-32.png / logo.png.

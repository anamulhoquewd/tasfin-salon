# TASFIN Salon — Design System

A complete brand and UI design system for **TASFIN**, a premium beauty salon based in Dhaka, Bangladesh.

The brand wordmark comes directly from the user's repo (`anamulhoquewd/TASFIN/frontend/public/`) — a tall serif "TASFIN" set in a Didone-style display face. The rest of the system is built around it: warm cream and blush surfaces, champagne-gold accents, editorial typography, and generous whitespace.

The system covers a customer-facing **marketing website** (home, services, portfolio, about/contact) and an **admin panel** (dashboard, calendar/bookings, content editors, media library, reel settings).

## Sources

| Source | Path / Link | Status |
|---|---|---|
| Brand wordmark | `anamulhoquewd/TASFIN/frontend/public/tasfin-logo-text-*.png` | Imported and cropped — see `assets/logo/` |
| Brief | Inline brief in chat | Source-of-truth for IA, features, and tone |

> Note: the parent TASFIN repo is a fashion/e-commerce site, not a salon. Only the **wordmark** was reused. The salon IA, palette, and components are designed from the brief.

## Font substitution flag

> ⚠️ **Substitution:** No bespoke font files were provided. The system uses **Playfair Display**, **Cormorant Garamond**, and **Inter** from Google Fonts as nearest matches for an editorial-feminine premium-salon aesthetic. If the production brand has different fonts, replace the `@import` in `colors_and_type.css` and the `--font-display` / `--font-serif` / `--font-sans` tokens.

## Stack target

- **Frontend (site):** Next.js + React, Tailwind-friendly tokens
- **Backend (admin):** Node.js
- **Imagery:** Real salon/portfolio photography — placeholder slots are marked

## Index

| File | What's in it |
|---|---|
| `README.md` | This file — brand context, content rules, visual foundations, iconography |
| `colors_and_type.css` | All brand tokens: colors, type scale, spacing, radii, shadows, motion |
| `SKILL.md` | Skill manifest so this system can be loaded as an Agent Skill |
| `assets/logo/` | TASFIN wordmark (black / white / on-white, full + cropped variants) |
| `assets/icons/` | WhatsApp brand mark, divider motif |
| `preview/` | Design-system reference cards (type, color, spacing, components) — render in the Design System tab |
| `ui_kits/website/` | Marketing site UI kit — Hero, Services, Portfolio, Testimonials, Contact, Footer |
| `ui_kits/admin/` | Admin panel UI kit — Sidebar, Dashboard, **Calendar/Bookings**, content editors, Media library, Reel settings |

## Content fundamentals

**Voice:** Warm, confident, quietly luxurious. Speaks to the client as "you," refers to the salon as "we" or "TASFIN." Never aggressive, never markety. Mostly English with light Bangla integration on the homepage and contact details (phone numbers in both, address in English with the area in Bangla beside it where natural).

**Casing:** Sentence case for body and most UI. **Title Case** is reserved for primary section headers and service names. ALL CAPS is used sparingly — only for very small eyebrow labels with a wide letterspacing (e.g. `OUR SERVICES`, `EST. 2024`).

**Tone examples:**

> Bridal artistry, considered skincare, and the kind of haircut you actually wanted.

> Slow, careful, and always on time. Walk in tired, walk out yourself.

> Book on WhatsApp — we usually reply within an hour.

**Pronouns:** "You" (the client), "we"/"our team" (the salon). Avoid "us" in CTAs ("Book your appointment," not "Book with us").

**Numbers & prices:** Bangladeshi Taka with the `৳` symbol, no decimals: `৳ 2,500`, `৳ 8,500 – 15,000`. Duration in plain text: `45 min`, `1 hr 30 min`. Phone numbers spaced: `+880 1711 234 567`.

**Emoji:** Never in headings or body. Acceptable in WhatsApp button labels (single character) and admin toast messages. Default is to omit.

**Microcopy patterns:**

- Buttons: imperative, two words max — "Book now," "WhatsApp us," "View services"
- Empty states (admin): one-liner + the action — "No testimonials yet. Add your first."
- Confirmations: present tense, no exclamation — "Saved." "Service updated."
- Errors: human, no codes — "We couldn't save that. Try again, or refresh."

## Visual foundations

**Color.** A warm palette built around three surfaces — `cream` (#FAF6F1), `blush` (#F5E6E0), `champagne` (#E8D5B7) — and a single signature accent, `gold` (#B89668). Text sits on cream as deep `espresso` (#2B1F1A) for headings and `taupe` (#6B5D54) for body. Never use pure black or pure white. The palette is intentionally low-saturation; saturation arrives only through photography.

**Type.** Three families:
- `Playfair Display` — display, hero numerals, the wordmark. Set tight and large.
- `Cormorant Garamond` — sub-display, pull quotes, italic accents. Italic is used deliberately, not decoratively.
- `Inter` — UI, body, navigation, admin. 14–16px body, 1.6 line-height.

Headings are tracked tight (-0.02em). Body is tracked normal. Eyebrows (uppercase labels) are tracked +0.16em. Hierarchy comes from size and weight contrast, not color.

**Spacing.** 4px base unit. Layouts use a generous rhythm — section padding is `120px` desktop / `64px` mobile. Cards have `24–32px` interior padding. The system is happy with empty space; never fill it for the sake of filling.

**Backgrounds.** Full-bleed photography for the hero and section dividers — always treated with a slight warm tone-shift so they sit on the cream palette. No gradients except a single subtle protection gradient on full-bleed text overlays (cream→transparent, bottom-up). No patterns, no textures, no noise.

**Animation.** Quiet and short. `200ms ease-out` for most state changes. `400ms cubic-bezier(0.22, 1, 0.36, 1)` for entrance reveals (image fade-up on scroll). Never bounces, never elastic. Hero reel auto-plays muted, looping a configurable 1–3 times then pausing on the final frame — no replay loop after that.

**Hover.** Buttons darken by ~6% lightness. Links pick up a `1px` underline. Image cards lift `2px` and scale photo `1.02` over 300ms. Icons gain a slight color shift to gold.

**Press.** `0.98` scale, `100ms`. No color flash.

**Borders.** `1px solid rgba(43, 31, 26, 0.08)` for hairline dividers. `1px solid champagne` for emphasized inputs. Never thicker than 1px on the website. Admin uses a slightly stronger `rgba(43, 31, 26, 0.12)` for table rules.

**Shadows.** Three steps:
- `xs` — `0 1px 2px rgba(43, 31, 26, 0.04)` — inputs
- `md` — `0 4px 16px rgba(43, 31, 26, 0.06)` — cards on hover, dropdowns
- `lg` — `0 12px 32px rgba(43, 31, 26, 0.08)` — modals, lightbox
Shadows are warm (espresso-tinted), never neutral grey. No inset shadows.

**Corner radii.** `4px` for inputs and small chips. `8px` for cards. `12px` for the hero CTA and prominent buttons. `999px` (pill) for filter chips and the WhatsApp floating button. Images are usually `8px` rounded; the hero image is `0` (full-bleed).

**Cards.** Cream surface, `1px` champagne hairline, `8px` radius, `24px` padding. No shadow at rest; `md` shadow on hover. Service cards have a small icon top-left, name + price in the title row, duration + description below.

**Layout.** 12-col grid, `1280px` max content width, `24px` gutters. Section titles are aligned left with a small uppercase eyebrow above them. The site is mobile-first; on mobile, sections stack with `64px` vertical rhythm and content is `20px` from the edge.

**Imagery.** Warm-toned, soft natural light, never cold or clinical. Skin tones rendered honestly (no over-smoothing). Bridal shots dominate the hero rotation. Black-and-white is reserved for the testimonial portraits.

**Transparency & blur.** Used only on the floating WhatsApp button (`backdrop-filter: blur(12px)`, `rgba(255,255,255,0.85)` on cream) and on sticky nav when scrolled past hero. Otherwise, surfaces are opaque.

## Iconography

Icons are **Lucide** (lucide.dev) — thin 1.5px strokes, rounded line caps. Their geometric simplicity reads well against the editorial type. Loaded from CDN.

> ⚠️ **Substitution flag:** the source repo had no icon library specified. Lucide is a chosen default that fits the editorial-feminine aesthetic; swap if the production app uses a different set.

**Usage rules:**
- 20px icons in nav and inline with text
- 24px icons in service cards and admin sidebar
- 32px icons in feature blocks
- Stroke color matches text color (espresso or taupe), never gold unless on a hover state
- Icons are decorative, never load-bearing — every icon paired with a label

**No emoji** in product UI. The single exception is WhatsApp button labels where the WhatsApp brand mark (custom SVG, in `assets/icons/`) is used.

**Logo / wordmark:** A tall Didone-style serif "TASFIN" wordmark sourced directly from the user's repo. Always set in espresso on cream/light surfaces and cream on dark surfaces — never gold. PNG (transparent) lives in `assets/logo/` in three variants: `tasfin-wordmark-black.png` (cropped), `tasfin-wordmark-white.png` (cropped), and `tasfin-wordmark-on-white.png` (square, with whitespace).

**Decorative motif:** A single thin horizontal rule with a centered diamond (`◇` rendered as SVG) is used as a section divider — sparingly, never more than once per page.

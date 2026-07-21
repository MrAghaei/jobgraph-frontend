---
name: Jobgraph
description: Sharp, tool-first job search — one place to find roles and read the market.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  accent: "oklch(0.97 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  card: "oklch(1 0 0)"
  sidebar: "oklch(0.985 0 0)"
typography:
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  pill: "1.625rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "0 0.75rem"
    height: "2.25rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "0 0.75rem"
    height: "2.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "0 0.75rem"
    height: "2.25rem"
---

# Design System: Jobgraph

## Overview

**Creative North Star: "The Market Terminal"**

Jobgraph is a tool for people who are tired of tab-hopping across job boards. The interface should feel like a sharp command surface — closer to Arc or Raycast than Indeed — where search, listings, and market analytics sit in one coherent workspace. Visual noise is the enemy: every pixel should reduce time-to-decision, not decorate the journey.

The system is built on shadcn/base-ui primitives with an achromatic OKLCH token layer (`app/globals.css`). Surfaces stay flat and legible; depth comes from borders, subtle surface shifts, and focus rings — not drop shadows or gradient heroics. Data (counts, salaries, trends) gets monospace treatment; everything else stays in a single sans family at a tight rem scale.

This system explicitly rejects generic SaaS landing clichés, job-board clutter, corporate enterprise grayness, and playful startup mascots — per PRODUCT.md anti-references.

**Key Characteristics:**

- Restrained achromatic palette with semantic color reserved for state (destructive, focus, charts)
- Single sans (Inter) for UI; Geist Mono for figures and code
- Pill-shaped controls with tactile active press (`translate-y-px`)
- Border-and-ring elevation, not shadow stacks
- 150–250ms state transitions; no page-load choreography
- Dark mode via `.dark` class with inverted neutrals
- RTL-first layout support for Iranian users (mirrored navigation, spacing, and text alignment)

## Colors

A neutral, tool-first palette: pure white backgrounds, near-black ink, and gray steps for structure. Brand accent color is not yet committed in code — primary actions currently use achromatic dark fill. When a brand hue lands, it replaces `{colors.primary}` only; surfaces stay pure white.

### Primary

- **Ink Action** (oklch(0.205 0 0)): Primary buttons, key CTAs, link text. Near-black, not blue — reads as confident utility, not hyperlink default.
- **On-Ink** (oklch(0.985 0 0)): Text and icons on primary fills. Always light on saturated or dark fills.

### Neutral

- **Pure White** (oklch(1 0 0)): Page background, cards, popovers. Exactly chroma 0 — no hidden cream warmth.
- **Near Ink** (oklch(0.145 0 0)): Body text, headings. ≥7:1 against Pure White.
- **Soft Surface** (oklch(0.97 0 0)): Secondary buttons, muted panels, hover fills.
- **Whisper Text** (oklch(0.556 0 0)): Secondary labels, placeholders, metadata. Must stay ≥4.5:1 on white — bump toward ink if contrast slips.
- **Hairline** (oklch(0.922 0 0)): Borders, dividers, input strokes.
- **Focus Ring** (oklch(0.708 0 0)): Focus-visible rings at 30% opacity.

### Tertiary

- **Signal Red** (oklch(0.577 0.245 27.325)): Destructive actions and validation errors only. Never decorative.

### Named Rules

**The Pure Surface Rule.** Backgrounds are oklch(1 0 0) in light mode — not warm-tinted near-white. Warmth and identity live in accent and typography choices, not the page canvas.

**The One Accent Rule.** Primary is achromatic today. When brand color arrives, it replaces primary fill only and stays ≤10% of any screen. Rarity is the point.

## Typography

**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace)

**Character:** One sans carries the entire UI — no display/body pairing. Inter at medium weights feels precise and familiar (Linear, Stripe dashboard territory). Mono is reserved for salaries, counts, IDs, and chart axes. For Persian/Arabic copy, ensure the loaded font subsets include the required glyphs.

### Hierarchy

- **Headline** (600, 1.875rem / 30px, 1.25): Page titles, empty-state headers. Fixed rem, not fluid clamp.
- **Title** (600, 1.125rem / 18px, 1.4): Section headers, card titles, dialog titles.
- **Body** (400, 0.875rem / 14px, 1.5): Default UI copy, list items, form labels. Cap prose blocks at 65–75ch.
- **Label** (500, 0.75rem / 12px): Badges, table headers, filter chips.
- **Mono** (400, 0.8125rem / 13px, 1.5): Numeric data, market stats, job IDs, code snippets.

### Named Rules

**The Fixed Scale Rule.** Product UI uses fixed rem sizes, not clamp(). Sidebar and panel contexts shrink content — fluid headings look broken at narrow widths.

**The Mono-for-Numbers Rule.** Any figure that influences a decision (salary range, applicant count, trend delta) renders in Geist Mono. Prose stays Inter.

## Elevation

Flat by default. This system does not use box-shadow stacks for cards or panels. Depth is conveyed through:

1. **Surface shift** — `secondary` / `muted` backgrounds one step above `background`
2. **Hairline borders** — `border` token at 1px
3. **Focus rings** — `ring-3 ring-ring/30` on interactive elements

Dark mode uses semi-transparent white borders (`oklch(1 0 0 / 10%)`) instead of light gray hairlines.

### Named Rules

**The Flat-By-Default Rule.** Surfaces rest flat. Elevation appears only as a response to state — hover fill, focus ring, active press — never as ambient decoration.

**The No-Glass Rule.** Backdrop blur and glassmorphism are prohibited unless a specific overlay (modal scrim) requires it — and even then, prefer a solid scrim at 60–80% opacity.

## Components

Tool-like, consistent, state-complete. Every interactive element ships default, hover, focus-visible, active, disabled, and error treatments.

### Buttons

- **Shape:** Pill (rounded-4xl / 1.625rem radius)
- **Primary:** Ink Action fill, On-Ink text, h-9 (36px), px-3, text-sm medium. Hover: primary/80. Active: translate-y-px press.
- **Outline:** Background fill, Hairline border. Hover: muted fill.
- **Secondary:** Soft Surface fill. Hover: 5% foreground mix.
- **Ghost:** Transparent. Hover: muted fill.
- **Destructive:** Signal Red at 10% background, full red text. Never solid red fill for non-destructive actions.
- **Focus:** border-ring + ring-3 ring-ring/30 on all variants.

### Cards / Containers

- **Corner Style:** lg radius (0.625rem / 10px) when not using full-bleed panels
- **Background:** card token (Pure White) or secondary for inset panels
- **Shadow Strategy:** None at rest. Border only.
- **Internal Padding:** md–lg (1–1.5rem) depending on density

### Inputs / Fields

- **Style:** Hairline border, background fill, lg radius
- **Focus:** ring treatment matching buttons
- **Error:** destructive border + ring at 20% opacity

### Navigation

- **Style:** Sidebar token (oklch(0.985 0 0)) for app shell; top bar with Hairline bottom border for marketing
- **Typography:** Title weight for section labels, Body for items
- **Active state:** muted background fill or primary text — never both heavy fill and heavy border

### Data / Analytics

- **Chart palette:** chart-1 through chart-5 (achromatic steps in light mode)
- **Tables:** Dense rows, Label size headers, Mono for numeric columns
- **Stat blocks:** Mono figure + Label descriptor — no hero-metric gradient templates

## Do's and Don'ts

### Do:

- **Do** use Inter for all UI text and Geist Mono for numeric data.
- **Do** keep backgrounds pure white (oklch(1 0 0)) in light mode.
- **Do** use pill buttons with active press feedback for primary actions.
- **Do** show market stats and job counts as live data, not marketing copy.
- **Do** respect reduced motion — crossfade or instant state changes under `prefers-reduced-motion: reduce`.
- **Do** maintain ≥4.5:1 contrast on body text and ≥3:1 on large text.

### Don't:

- **Don't** use generic SaaS landing-page clichés: cream backgrounds, gradient heroes, "AI-powered" eyebrows on every section.
- **Don't** reproduce classic job board clutter: dense ads, noisy filters, endless list fatigue.
- **Don't** drift into corporate enterprise UI: gray tables, stock photos, synergy energy.
- **Don't** use overly playful startup aesthetics: mascots, bouncy motion, cartoon illustrations.
- **Don't** use side-stripe borders (border-left > 1px as colored accent on cards or list items).
- **Don't** use gradient text (`background-clip: text`).
- **Don't** default to glassmorphism or shadow stacks for cards.
- **Don't** use the hero-metric template (big number, small label, gradient accent).
- **Don't** put tiny uppercase tracked eyebrows above every section.

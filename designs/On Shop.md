# On Shop — Style Reference
> Monochrome high-performance stadium

**Theme:** light

On Shop embodies a stark, high-performance aesthetic: a monochrome canvas where bold black typography and clean product photography take center stage. Interaction is delivered with confident, compact components, relying on border treatments and solid fills rather than shadows for visual hierarchy. The design communicates authority through precise spacing and a focused absence of unnecessary visual noise.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pitch Black | `#000000` | `--color-pitch-black` | Primary text, button backgrounds, interactive borders, iconic elements, surface accents |
| Cloud White | `#ffffff` | `--color-cloud-white` | Page backgrounds, card surfaces, ghost button text and borders, secondary text in dark contexts |
| Slate Gray | `#4d4d4d` | `--color-slate-gray` | Secondary body text and subtle borders |
| Fog Input | `#666666` | `--color-fog-input` | Input text color and subtle background tint on form elements |
| Swiper Accent | `#007aff` | `--color-swiper-accent` | Accent for UI components like carousels where interaction demands a distinct active state |

## Tokens — Typography

### On — Primary typeface for all headings, body text, buttons, and general UI elements. Its strong presence supports the brand&#x27;s authoritative tone. · `--font-on`
- **Substitute:** system-ui
- **Weights:** 400, 500, 700
- **Sizes:** 13px, 14px, 15px, 16px, 19px, 20px, 24px, 31px, 39px, 50px, 63px
- **Line height:** 1.00, 1.10, 1.20, 1.25, 1.30, 1.38, 1.40, 1.50
- **Letter spacing:** -0.0200em at large sizes, -0.0100em at medium, 0.0130em for smaller body text
- **Role:** Primary typeface for all headings, body text, buttons, and general UI elements. Its strong presence supports the brand&#x27;s authoritative tone.

### On Semi Mono — Used for compact navigational elements and specialized annotations, providing a technical, precise feel due to its monospace nature and increased letter spacing. · `--font-on-semi-mono`
- **Substitute:** monospace
- **Weights:** 500, 700
- **Sizes:** 8px, 12px
- **Line height:** 1.00, 1.50
- **Letter spacing:** 0.0600em
- **Role:** Used for compact navigational elements and specialized annotations, providing a technical, precise feel due to its monospace nature and increased letter spacing.

### On Mono — Complementary monospace font for buttons, secondary navigation, and body text where a more technical or distinct tone is desired, often in compressed formats. · `--font-on-mono`
- **Substitute:** monospace
- **Weights:** 400, 500
- **Sizes:** 14px, 15px
- **Line height:** 1.00
- **Letter spacing:** 0.0600em
- **Role:** Complementary monospace font for buttons, secondary navigation, and body text where a more technical or distinct tone is desired, often in compressed formats.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 13px | 1.4 | — | `--text-caption` |
| body | 16px | 1.5 | 0.013px | `--text-body` |
| subheading | 19px | 1.3 | — | `--text-subheading` |
| heading-sm | 24px | 1.25 | — | `--text-heading-sm` |
| heading | 39px | 1.2 | -0.01px | `--text-heading` |
| display | 63px | 1 | -0.02px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 40px |
| default | 3px |
| circular | 50% |

### Layout

- **Section gap:** 48px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Primary Filled Button
**Role:** Solid interactive element

Black background (#000000) with Cloud White (#ffffff) text, 40px border-radius, and 24px horizontal padding. Compact vertical padding is implicitly defined by font line-height. Used for primary calls to action.

### Ghost Button
**Role:** Secondary/tertiary interactive element (large)

Transparent background, Cloud White (#ffffff) text, Cloud White (#ffffff) border, with 50% border-radius. No explicit padding, text defines interaction area. Used for navigation or subtle actions within dark contexts.

### Text Link Button
**Role:** Minimal interactive element

Transparent background, Pitch Black (#000000) text, no border or explicit padding. Used for simple text-based actions or navigation within body content.

### Icon Button (Ghost)
**Role:** Interactive element (small)

Transparent background with Cloud White (#ffffff) text/icon color and border, 50% border-radius. Zero explicit padding. Used for small, contextual actions like &#x27;Play Video&#x27; in hero sections.

### Product Card (Borderless)
**Role:** Content display

Transparent background with no border-radius or box-shadow. Content within adheres to the system&#x27;s spacing and typography. Images are often full-bleed to the card&#x27;s edge.

### Input Field
**Role:** User input element

Subtle alpha-tinted background (rgba(0,0,0,0.05)), Fog Input (#666666) text color, no border-radius. 16px bottom padding, 4px right padding, 16px left padding.

## Do&#x27;s and Don&#x27;ts

### Do
- Use Pitch Black (#000000) for all primary body text, headings, and key icons.
- Apply Cloud White (#ffffff) as the dominant background for all main page content sections.
- Implement 24px of horizontal padding within primary filled buttons for a confident, compact feel.
- Utilize &#x27;On&#x27; font family with specific letter-spacing for large headlines (e.g., -0.0200em for 63px type) to achieve a precise, condensed look.
- Maintain a clear hierarchy using solid fills and borders for component states, avoiding complex shadows.
- Employ 40px border-radius for all primary button shapes to ensure a soft, approachable pill-like form amidst the stark typography.
- Structure layouts using a 48px vertical gap between main sections to provide generous breathing room without excess.

### Don&#x27;t
- Do not introduce additional saturated colors; maintain the monochrome palette with minimal functional accents.
- Avoid decorative gradients or complex overlays; keep surfaces clean and flat.
- Do not use subtle variations of gray for primary backgrounds or text that compete with Pitch Black and Cloud White.
- Avoid system default links; ensure all interactive text uses explicit Pitch Black (#000000) or Cloud White (#ffffff) styling.
- Do not use drop shadows for elevation; rely on color contrast, borders, and spacing.
- Avoid pixel-perfect spacing and alignment that doesn&#x27;t adhere to the 4px base unit or defined spacing tokens.
- Do not use generic font sizes; adhere to the defined type scale to maintain typographic rhythm.

## Elevation

This design system intentionally avoids shadows. Visual hierarchy and element differentiation are achieved exclusively through strong color contrast (Pitch Black on Cloud White), clear borders, and defined spacing. The absence of shadows contributes to a flat, modern, and performance-oriented aesthetic.

## Imagery

This site prominently features high-quality, product-focused photography and lifestyle shots of athletes. Images are often full-bleed within sections or contained in simple, unrounded frames. Photography is generally high-key with crisp focus on the product or subject, sometimes against a clean, minimal background (white or solid color). Product shots are direct and showcase utility. Icons are minimal, outlined, monochromatic, and used functionally.

## Layout

The page primarily uses a full-bleed layout for hero sections, often with centered, large-scale typography overlaying a background image. Subsequent content sections alternate between full-width imagery and a contained, centered content area. Content arrangement frequently features juxtaposed text blocks and visuals. The overall density feels spacious due to generous section gaps (48px) and ample padding around elements. The navigation is a concise top bar that remains visible, prioritizing minimalism.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #ffffff
border: #000000
accent: #007aff
primary action: #000000 (filled action)

Example Component Prompts:
1. Create a hero section with a dark background: Headline &#x27;THE ROGER Collection&#x27; in On font, 63px, weight 700, Cloud White (#ffffff), letter-spacing -0.02em. Below it, a Primary Filled Button with text &#x27;Shop men&#x27;s&#x27;, Pitch Black (#000000) background, Cloud White (#ffffff) text, 40px radius, 24px horizontal padding.
2. Design a product feature block: Heading &#x27;THE ROGER Pro 3&#x27; in On font, 39px, weight 700, Pitch Black (#000000), letter-spacing -0.01em. Followed by body text in On font, 16px, weight 400, Slate Gray (#4d4d4d). Below, two Primary Filled Buttons, &#x27;Shop men&#x27;s&#x27; and &#x27;Shop women&#x27;s&#x27;, using Pitch Black (#000000) background, Cloud White (#ffffff) text, 40px radius, 24px horizontal padding.
3. Create an input field: Background rgba(0,0,0,0.05), border-radius 0px, text color Fog Input (#666666), with 16px left and bottom padding.

## Similar Brands

- **Apple** — Monochrome palette, stark typography on product photography, emphasis on product showcase over decorative UI.
- **Nike** — High-performance brand aesthetic, bold black typography, focus on athletic imagery, and minimalist component design.
- **B&O** — Premium feel through monochrome colorways, precise typography, and a deliberate absence of visual clutter.
- **Acne Studios** — Uses a stark, almost brutalist, monochrome aesthetic with strong typographic statements and minimal UI elements.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-pitch-black: #000000;
  --color-cloud-white: #ffffff;
  --color-slate-gray: #4d4d4d;
  --color-fog-input: #666666;
  --color-swiper-accent: #007aff;

  /* Typography — Font Families */
  --font-on: &#x27;On&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-on-semi-mono: &#x27;On Semi Mono&#x27;, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-on-mono: &#x27;On Mono&#x27;, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.4;
  --text-body: 16px;
  --leading-body: 1.5;
  --tracking-body: 0.013px;
  --text-subheading: 19px;
  --leading-subheading: 1.3;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1.25;
  --text-heading: 39px;
  --leading-heading: 1.2;
  --tracking-heading: -0.01px;
  --text-display: 63px;
  --leading-display: 1;
  --tracking-display: -0.02px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;

  /* Layout */
  --section-gap: 48px;
  --card-padding: 24px;
  --element-gap: 24px;

  /* Border Radius */
  --radius-sm: 3px;
  --radius-3xl: 40px;

  /* Named Radii */
  --radius-buttons: 40px;
  --radius-default: 3px;
  --radius-circular: 50%;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-pitch-black: #000000;
  --color-cloud-white: #ffffff;
  --color-slate-gray: #4d4d4d;
  --color-fog-input: #666666;
  --color-swiper-accent: #007aff;

  /* Typography */
  --font-on: &#x27;On&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-on-semi-mono: &#x27;On Semi Mono&#x27;, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-on-mono: &#x27;On Mono&#x27;, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.4;
  --text-body: 16px;
  --leading-body: 1.5;
  --tracking-body: 0.013px;
  --text-subheading: 19px;
  --leading-subheading: 1.3;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1.25;
  --text-heading: 39px;
  --leading-heading: 1.2;
  --tracking-heading: -0.01px;
  --text-display: 63px;
  --leading-display: 1;
  --tracking-display: -0.02px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;

  /* Border Radius */
  --radius-sm: 3px;
  --radius-3xl: 40px;
}
```

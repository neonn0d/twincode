# Buildinamsterdam — Style Reference
> High-contrast geometric minimalism, accented by a single rich gold. It feels like a meticulously crafted architectural drawing, where every line and plane holds intentional weight.

**Theme:** mixed

This design system is a study in stark binary opposition: pure black meets true white. The strong contrast, devoid of grays, creates an assertive and dramatic stage. Typography is the primary vehicle for visual interest, with a tight letter-spacing and varied weights creating a dynamic yet refined presentation. The single pop of &#x27;Ancient Gold&#x27; is a subtle, almost luxurious, counterpoint to the monochromatic foundation, hinting at a hidden richness beneath the surface.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Midnight Ink | `#000000` | `--color-midnight-ink` | Primary text, headline text, button borders, background for navigation blocks on the dark side of the split layout. |
| Arctic White | `#ffffff` | `--color-arctic-white` | Page backgrounds, primary container backgrounds, text on dark backgrounds. |
| Canvas Off-White | `#f2efe6` | `--color-canvas-off-white` | Used for navigation backgrounds and subtle section differentiation, a softer alternative to pure white. |
| Ancient Gold | `#c38133` | `--color-ancient-gold` | Subtle decorative element found in abstract shapes; signifies a valuable, hidden detail. |
| Deep Indigo | `#3c4cc7` | `--color-deep-indigo` | Background for specific navigation items on hover or active states, provides a vibrant interactive cue. |

## Tokens — Typography

### NeueHaasGrotesk-Roman — Body copy, button labels, and general UI text. Its precise, legible forms support the overall clean aesthetic. · `--font-neuehaasgrotesk-roman`
- **Substitute:** Helvetica Neue
- **Weights:** 400
- **Sizes:** 11px, 16px
- **Line height:** 1.20
- **Letter spacing:** normal
- **OpenType features:** `"kern"`
- **Role:** Body copy, button labels, and general UI text. Its precise, legible forms support the overall clean aesthetic.

### NHaasGroteskTXPro — Used for navigation links and secondary body text, providing a slightly heavier visual presence than the Roman weight without being bold, for hierarchy while maintaining lightness. · `--font-nhaasgrotesktxpro`
- **Substitute:** Helvetica Neue
- **Weights:** 500
- **Sizes:** 10px, 11px, 12px, 16px
- **Line height:** 1.20
- **Letter spacing:** normal
- **OpenType features:** `"kern"`
- **Role:** Used for navigation links and secondary body text, providing a slightly heavier visual presence than the Roman weight without being bold, for hierarchy while maintaining lightness.

### NHaasGroteskDSPro — Primary display headlines. The normal weight at such a large size, combined with highly compressed letter-spacing, creates a monumental yet airy presence, commanding attention through scale rather than heaviness. · `--font-nhaasgroteskdspro`
- **Substitute:** Helvetica Neue
- **Weights:** 400
- **Sizes:** 86px
- **Line height:** 0.85
- **Letter spacing:** -3.44
- **OpenType features:** `"kern"`
- **Role:** Primary display headlines. The normal weight at such a large size, combined with highly compressed letter-spacing, creates a monumental yet airy presence, commanding attention through scale rather than heaviness.

### RecklessNeue-Book — Used for subheadings and descriptive text where a more expressive, serif touch is desired. The unique stylistic sets (ss04, ss06, etc.) add an unexpected, crafted detail amidst the geometric sans-serifs. · `--font-recklessneue-book`
- **Substitute:** Playfair Display
- **Weights:** 400
- **Sizes:** 24px
- **Line height:** 1.20
- **Letter spacing:** -0.24
- **OpenType features:** `"ss04", "ss06", "ss07", "ss10", "ss14"`
- **Role:** Used for subheadings and descriptive text where a more expressive, serif touch is desired. The unique stylistic sets (ss04, ss06, etc.) add an unexpected, crafted detail amidst the geometric sans-serifs.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 10px | 1.2 | — | `--text-caption` |
| body | 16px | 1.2 | — | `--text-body` |
| subheading | 24px | 1.2 | -0.24px | `--text-subheading` |
| display | 86px | 0.85 | -3.44px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 36 | 36px | `--spacing-36` |
| 60 | 60px | `--spacing-60` |
| 64 | 64px | `--spacing-64` |
| 124 | 124px | `--spacing-124` |

### Border Radius

| Element | Value |
|---------|-------|
| nav | 4px |
| buttons | 0px |

### Layout

- **Element gap:** 12px

## Components

### Outlined CTA Button
**Role:** Primary call to action

Minimalist button with no background, black text, and a thin black border. Padding values are not explicitly defined as a block but individual CSS properties are applied, implying custom sizing: 9px top, 11px bottom, 14px left/right. Has 0px border-radius, maintaining a sharp, precise edge.

### Navigation Link
**Role:** Top-level navigation

Text in NHaasGroteskTXPro, weight 500, size 16px. Background #f2efe6 for `nav` elements, with a `Deep Indigo` background #3c4cc7 on hover for interactive elements.

## Do&#x27;s and Don&#x27;ts

### Do
- Prioritize stark black (#000000) and arctic white (#ffffff) for backgrounds and main text, leveraging extreme contrast.
- Use NHaasGroteskDSPro (weight 400, 86px, -0.04em letter-spacing) for all primary display headlines to maintain a monumental yet light appearance.
- Apply 0px border-radius to all buttons and interactive elements, favoring sharp, geometric forms.
- Reserve RecklessNeue-Book with its specific stylistic sets for moments requiring elevated, expressive typography, such as subheadings.
- Introduce Ancient Gold (#c38133) only as a subtle, low-frequency accent, for decorative elements rather than functional ones.
- Ensure letter-spacing is applied precisely as defined for each typographic role, especially the compressed display headings.

### Don&#x27;t
- Do not introduce any shades of gray as background or text colors; maintain the pure black and white dichotomy.
- Avoid rounded corners on any primary UI elements unless explicitly specified for a specific component (e.g., custom form elements not seen here).
- Do not use Ancient Gold (#c38133) for text or primary interactive elements; its role is purely decorative.
- Do not use generic sans-serif fonts; strict adherence to NeueHaasGrotesk and RecklessNeue is crucial for the brand identity.
- Do not vary line heights from the specified 1.20 for body and 0.85 for display heading, to preserve the tight typographic rhythm.
- Avoid adding box-shadows or significant elevation effects; depth derives primarily from color contrast and typography.

## Imagery

The site uses minimal imagery, primarily relying on abstract, solid-color shapes (like the &#x27;Ancient Gold&#x27; circle) to introduce decorative elements. The overall aesthetic is image-light, focusing heavily on typography and layout. When imagery is present, it appears to be either abstract or a focused product shot, often integrated without complex masking, maintaining a contained and precise treatment.

## Layout

The page employs a strong split-screen vertical layout, dividing the viewport into contrasting black and white sections. The hero section specifically features a prominent two-column split, with strong vertical alignment. The main content area also uses a max-width container for text. Section rhythm is created through direct color transitions (black to white, or off-white to white) rather than explicit dividers or consistent padding. Content is often stacked centrally or arranged in direct text-left/image-right configurations within implied column grids. Navigation is a sticky top bar with interactive elements.

## Agent Prompt Guide

Quick Color Reference:
- Text: #000000
- Background: #ffffff
- CTA text: #000000
- CTA border: #000000
- Accent (decorative): #c38133

Example Component Prompts:
1. Create a hero section with a vertical split layout: left side black background, right side white background. On the white side, add a headline &#x27;WE BUILD BRANDS & DIGITAL FLAGSHIP STORES&#x27; using NHaasGroteskDSPro, weight 400, size 86px, #000000, line-height 0.85, letter-spacing -3.44px. Below, add subtext &#x27;We shape the future of commerce by delivering cohesive & captivating omnichannel experiences that connect to convert.&#x27; using RecklessNeue-Book, weight 400, size 24px, #000000, line-height 1.20, letter-spacing -0.24px. Include two &#x27;Outlined CTA Button&#x27; components below the subtext, with text &#x27;OUR WORK&#x27; and &#x27;CONTACT US&#x27; respectively.
2. Design an &#x27;Outlined CTA Button&#x27;: background-color transparent, color #000000, border-color #000000, border-width 1px, border-radius 0px, padding-top 9px, padding-bottom 11px, padding-left 14px, padding-right 14px, font-family NeueHaasGrotesk-Roman, weight 400, size 16px, line-height 1.20.
3. Create a header navigation bar: background-color #f2efe6. Include a logo to the left. On the right, include navigation links using NHaasGroteskTXPro, weight 500, size 16px, #000000, line-height 1.20, border-radius 4px for interactive elements.

## Similar Brands

- **AIGA** — Features a strong black and white palette with bold, impactful typography and minimal imagery.
- **Basic agency** — Utilizes a clean, high-contrast aesthetic with a heavy reliance on typography as a design element and prominent use of black and white.
- **Locomotive** — Employs an editorial, art-direction heavy approach with strong type hierarchy and often a limited, high-impact color palette.
- **Cuberto** — Known for bold, modern typography, generous use of whitespace (or black space), and minimalist UI components.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-midnight-ink: #000000;
  --color-arctic-white: #ffffff;
  --color-canvas-off-white: #f2efe6;
  --color-ancient-gold: #c38133;
  --color-deep-indigo: #3c4cc7;

  /* Typography — Font Families */
  --font-neuehaasgrotesk-roman: &#x27;NeueHaasGrotesk-Roman&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-nhaasgrotesktxpro: &#x27;NHaasGroteskTXPro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-nhaasgroteskdspro: &#x27;NHaasGroteskDSPro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-recklessneue-book: &#x27;RecklessNeue-Book&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 10px;
  --leading-caption: 1.2;
  --text-body: 16px;
  --leading-body: 1.2;
  --text-subheading: 24px;
  --leading-subheading: 1.2;
  --tracking-subheading: -0.24px;
  --text-display: 86px;
  --leading-display: 0.85;
  --tracking-display: -3.44px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-36: 36px;
  --spacing-60: 60px;
  --spacing-64: 64px;
  --spacing-124: 124px;

  /* Layout */
  --element-gap: 12px;

  /* Border Radius */
  --radius-md: 4px;

  /* Named Radii */
  --radius-nav: 4px;
  --radius-buttons: 0px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-midnight-ink: #000000;
  --color-arctic-white: #ffffff;
  --color-canvas-off-white: #f2efe6;
  --color-ancient-gold: #c38133;
  --color-deep-indigo: #3c4cc7;

  /* Typography */
  --font-neuehaasgrotesk-roman: &#x27;NeueHaasGrotesk-Roman&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-nhaasgrotesktxpro: &#x27;NHaasGroteskTXPro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-nhaasgroteskdspro: &#x27;NHaasGroteskDSPro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-recklessneue-book: &#x27;RecklessNeue-Book&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 10px;
  --leading-caption: 1.2;
  --text-body: 16px;
  --leading-body: 1.2;
  --text-subheading: 24px;
  --leading-subheading: 1.2;
  --tracking-subheading: -0.24px;
  --text-display: 86px;
  --leading-display: 0.85;
  --tracking-display: -3.44px;

  /* Spacing */
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-36: 36px;
  --spacing-60: 60px;
  --spacing-64: 64px;
  --spacing-124: 124px;

  /* Border Radius */
  --radius-md: 4px;
}
```

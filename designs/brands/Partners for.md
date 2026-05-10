# Partners for — Style Reference
> Monochrome Grid Authority: a high-contrast, text-driven system conveying precision and gravitas through sharp lines and ample white space.

**Theme:** light

Sofinnova Partners operates on a stark, high-contrast monochrome aesthetic where bold black elements punctuate an expansive white canvas. Typography is the primary visual driver, with large, confident headings and precise letter-spacing establishing a sense of authority and clarity. Minimal use of color ensures that interactive elements stand out instantly. Layouts are clean and highly structured, relying on generous spacing to create visual hierarchy rather than shadows or complex component treatments.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas White | `#ffffff` | `--color-canvas-white` | Page backgrounds, navigation backgrounds, default surface color, inverse text for dark elements |
| Midnight Ink | `#000000` | `--color-midnight-ink` | Primary text, headings, outlines, filled button backgrounds, active navigation states, cookie banner background — the defining and dominant color |

## Tokens — Typography

### SuisseIntl — The sole typeface for all text elements. Its confident, modern sans-serif structure underpins the system&#x27;s clarity. Varied letter-spacing introduces subtle rhythm for display and utility text. · `--font-suisseintl`
- **Substitute:** Inter
- **Weights:** 400, 600, 700
- **Sizes:** 10px, 11px, 13px, 14px, 20px, 59px, 188px
- **Line height:** 1.00, 1.10, 1.20, 1.40, 1.45, 1.55
- **Letter spacing:** -0.0400em, -0.0200em
- **Role:** The sole typeface for all text elements. Its confident, modern sans-serif structure underpins the system&#x27;s clarity. Varied letter-spacing introduces subtle rhythm for display and utility text.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 10px | 1.45 | — | `--text-caption` |
| subheading | 20px | 1.4 | — | `--text-subheading` |
| heading | 59px | 1.1 | -0.472px | `--text-heading` |
| display | 188px | 1 | -1.504px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 6px

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 10 | 10px | `--spacing-10` |
| 11 | 11px | `--spacing-11` |
| 14 | 14px | `--spacing-14` |
| 15 | 15px | `--spacing-15` |
| 18 | 18px | `--spacing-18` |
| 25 | 25px | `--spacing-25` |
| 29 | 29px | `--spacing-29` |
| 30 | 30px | `--spacing-30` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 59 | 59px | `--spacing-59` |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 34.6354px |
| circularElements | 49.4792px |

### Layout

- **Section gap:** 59px
- **Card padding:** 18px
- **Element gap:** 18px

## Components

### Filled Action Button
**Role:** Primary calls to action and submission buttons.

Filled with Midnight Ink (#000000) with Canvas White (#ffffff) text, utilizing generous horizontal padding (18px) and a highly rounded border-radius of 34.6354px. Font is SuisseIntl at varying sizes and weights depending on context.

### Text Link Button
**Role:** Navigation items and secondary actions.

Ghost button with no background or border, using Midnight Ink (#000000) for text. Padding and radius are 0px, presenting as pure text links. Font is SuisseIntl.

### Cookie Consent Panel
**Role:** Persistent banner for user consent.

Solid Midnight Ink (#000000) background with Canvas White (#ffffff) text. Features two highly rounded buttons: &#x27;Accept&#x27; (Canvas White fill, Midnight Ink text) and &#x27;Decline&#x27; (Midnight Ink fill, Canvas White text).

### Floating Action Icon
**Role:** Search or utility icons in the header.

A square icon container with a 49.4792px border-radius making it circular, featuring a 1px solid Midnight Ink (#000000) border and a Canvas White (#ffffff) background. The icon itself is Midnight Ink.

## Do&#x27;s and Don&#x27;ts

### Do
- Prioritize SuisseIntl typography as the primary driver of visual hierarchy and expression, using weights 400, 600, or 700.
- Use Midnight Ink (#000000) for all semantic text and primary interactive elements, contrasting it directly against Canvas White (#ffffff) backgrounds.
- Apply a border-radius of 34.6354px to all primary buttons and 49.4792px for circular icon buttons, defining the soft, yet precise corner treatment.
- Maintain generous spacing, using &#x27;elementGap&#x27; (18px) for internal component spacing and &#x27;sectionGap&#x27; (59px) for vertical separation between major content blocks.
- Design elements with a focus on high contrast, utilizing the #000000 and #ffffff palette for all UI components.
- Employ precise letter-spacing like -0.0400em or -0.0200em for display and specific body text to enhance legibility and visual tightness.

### Don&#x27;t
- Do not introduce new colors; restrict the palette strictly to Canvas White (#ffffff) and Midnight Ink (#000000) for all UI elements.
- Avoid using shadows or excessive elevation; rely on bold typography and high contrast for visual weight and hierarchy.
- Do not use generic border-radius values; always apply 34.6354px for rectangular buttons and 49.4792px for circular elements.
- Do not use highly saturated or chromatic colors for interactive states or accents; maintain the monochrome identity.
- Do not vary line-height arbitrarily; adhere to the specified line-heights (1.00, 1.10, 1.20, 1.40, 1.45, 1.55) from the typography scale.

## Imagery

The site primarily uses abstract, subtle graphic patterns (like the dashed-line field in the hero) for decorative purposes rather than overt imagery. When present, imagery is minimal and functional, focusing on UI elements or simple icons. The overall density is text-dominant, with generous white space; visual elements serve to break up content or provide concise functional indicators.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #ffffff
border: #000000
accent: no distinct accent color
primary action: #000000 (filled action)

Example Component Prompts:
1. Create a primary navigation bar: Canvas White (#ffffff) background. Left-aligned &#x27;Sofinnova partners&#x27; (SuisseIntl, weight 600, 20px, #000000). Right-aligned &#x27;Submit a project&#x27; button: Midnight Ink (#000000) background, Canvas White (#ffffff) text, 34.6354px border-radius, 17.8125px padding vertically and horizontally. Next to it, a circular search icon button: Canvas White (#ffffff) background, 1px Midnight Ink (#000000) border, 49.4792px border-radius, Midnight Ink (#000000) icon.
2. Design a cookie consent banner: Fixed at the bottom, full-width Midnight Ink (#000000) background. Body text in Canvas White (#ffffff) (SuisseIntl, weight 400, 14px, line-height 1.4). &#x27;Accept&#x27; button: Canvas White (#ffffff) background, Midnight Ink (#000000) text, 34.6354px border-radius, 13.8542px vertical padding, 29.6875px horizontal padding. &#x27;Decline&#x27; button: Midnight Ink (#000000) background, Canvas White (#ffffff) text, 34.6354px border-radius, 13.8542px vertical padding, 29.6875px horizontal padding.
3. Implement a page heading: &#x27;About&#x27; (SuisseIntl, weight 700, 188px, #000000, line-height 1.0, letter-spacing -1.504px). Situated on a Canvas White (#ffffff) background, with a vertical spacing of &#x27;sectionGap&#x27; (59px) above and below.

## Similar Brands

- **Stripe** — Stark monochrome palette with strong typographic emphasis and a preference for clean, ghost-style components.
- **Linear** — High-contrast UI, precise typography with functional letter-spacing, and minimal use of color to highlight active states.
- **Figma** — Dominant white canvas with dark text, precise typographic scale, and compact functional UI elements.
- **Revolut** — Focus on high-contrast, black and white aesthetic with strategic use of large, bold typography.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-midnight-ink: #000000;

  /* Typography — Font Families */
  --font-suisseintl: &#x27;SuisseIntl&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 10px;
  --leading-caption: 1.45;
  --text-subheading: 20px;
  --leading-subheading: 1.4;
  --text-heading: 59px;
  --leading-heading: 1.1;
  --tracking-heading: -0.472px;
  --text-display: 188px;
  --leading-display: 1;
  --tracking-display: -1.504px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 6px;
  --spacing-10: 10px;
  --spacing-11: 11px;
  --spacing-14: 14px;
  --spacing-15: 15px;
  --spacing-18: 18px;
  --spacing-25: 25px;
  --spacing-29: 29px;
  --spacing-30: 30px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-59: 59px;

  /* Layout */
  --section-gap: 59px;
  --card-padding: 18px;
  --element-gap: 18px;

  /* Border Radius */
  --radius-3xl: 34.6354px;
  --radius-full: 49.4792px;

  /* Named Radii */
  --radius-buttons: 34.6354px;
  --radius-circularelements: 49.4792px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-midnight-ink: #000000;

  /* Typography */
  --font-suisseintl: &#x27;SuisseIntl&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 10px;
  --leading-caption: 1.45;
  --text-subheading: 20px;
  --leading-subheading: 1.4;
  --text-heading: 59px;
  --leading-heading: 1.1;
  --tracking-heading: -0.472px;
  --text-display: 188px;
  --leading-display: 1;
  --tracking-display: -1.504px;

  /* Spacing */
  --spacing-10: 10px;
  --spacing-11: 11px;
  --spacing-14: 14px;
  --spacing-15: 15px;
  --spacing-18: 18px;
  --spacing-25: 25px;
  --spacing-29: 29px;
  --spacing-30: 30px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-59: 59px;

  /* Border Radius */
  --radius-3xl: 34.6354px;
  --radius-full: 49.4792px;
}
```

# True Staging — Style Reference
> Architectural blueprint on aged parchment

**Theme:** dark

True Staging establishes a serious yet refined industrial aesthetic, using a deep gray canvas punctuated by an antiqued peachy-orange accent. Typography pairs a classic serif for large expressive headlines with a clean sans-serif for functional text, setting up a contrast between permanence and precision. Components emphasize subtle outlining and generous border radii, lending a soft, approachable feel despite the muted palette. The overall impression is one of understated luxury and meticulous craftsmanship.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Blueprint Canvas | `#111111` | `--color-blueprint-canvas` | Page background, primary dark text, subtle borders — grounds the design in a deep, almost charcoal base |
| Parchment White | `#f5efeb` | `--color-parchment-white` | Primary light text, ghost button borders, accents within a darker canvas — suggests a tactile, natural paper texture |
| Amber Peach | `#f1b497` | `--color-amber-peach` | Orange outline accent for tags, dividers, and focused UI edges. Do not promote it to the primary CTA color |

## Tokens — Typography

### Roslindale — Expressive display headings — its delicate weight and generous size at 158px create an authoritative, almost monumental statement of luxury. · `--font-roslindale`
- **Substitute:** Playfair Display
- **Weights:** 300
- **Sizes:** 158px
- **Line height:** 1.00
- **Letter spacing:** -0.0200em
- **Role:** Expressive display headings — its delicate weight and generous size at 158px create an authoritative, almost monumental statement of luxury.

### Alliance — Functional text including body, navigation, and button labels — its versatility across weights and compact letter spacing ensures clear information delivery. · `--font-alliance`
- **Substitute:** Inter
- **Weights:** 400, 500, 600
- **Sizes:** 9px, 12px, 14px, 28px
- **Line height:** 1.00, 1.15, 1.20, 1.30, 1.50, 1.71
- **Letter spacing:** -0.0200em, 0.0200em, 0.0230em, 0.0600em, 0.1000em
- **Role:** Functional text including body, navigation, and button labels — its versatility across weights and compact letter spacing ensures clear information delivery.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body | 14px | 1.2 | 0.02px | `--text-body` |
| subheading | 28px | 1.3 | -0.02px | `--text-subheading` |
| display | 158px | 1 | -0.02px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 11 | 11px | `--spacing-11` |
| 14 | 14px | `--spacing-14` |
| 20 | 20px | `--spacing-20` |
| 21 | 21px | `--spacing-21` |
| 28 | 28px | `--spacing-28` |
| 35 | 35px | `--spacing-35` |
| 42 | 42px | `--spacing-42` |
| 53 | 53px | `--spacing-53` |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 80px |
| otherElements | 80px |
| navigationItems | 80px |

### Layout

- **Section gap:** 53px
- **Card padding:** 21px
- **Element gap:** 8px

## Components

### Hero Headline
**Role:** Primary page title

Uses Roslindale at 158px, weight 300, with a letter-spacing of -0.0200em, in Parchment White (#f5efeb). Placed centrally, defining the page&#x27;s grand statement.

### Ghost Navigation Item
**Role:** Secondary navigation and non-primary actions

Text in Alliance, Parchment White (#f5efeb), 9px, weight 400. Has a 1px border in Parchment White (#f5efeb) with an 80px border-radius, creating a pill shape. Padding is 7.7px vertical and 21px horizontal. Transparent background.

### Primary Action Button
**Role:** Call to action button for &#x27;Our Work&#x27;

Filled with Amber Peach (#f1b497) background. Text is Alliance, Parchment White (#f5efeb), 9px, weight 400. Features an 80px border-radius. Padding is 7.7px vertical and 21px horizontal. Appears as a pill-shaped element.

### Body Text
**Role:** Standard informative text

Uses Alliance, Blueprint Canvas (#111111) or Parchment White (#f5efeb) depending on section background, at 14px, weight 400. Tight letter spacing for efficient reading.

### Footer Detail Text
**Role:** Copyright and minor informational text

Alliance, 9px, weight 400, in Parchment White (#f5efeb).

## Do&#x27;s and Don&#x27;ts

### Do
- Always use Blueprint Canvas (#111111) for page backgrounds and primary dark text.
- Apply Parchment White (#f5efeb) for primary light text on dark backgrounds and for ghost button borders.
- Reserve Amber Peach (#f1b497) for key accents, selected navigation highlights, and the primary &#x27;Our Work&#x27; button fill.
- Employ Roslindale (sub: Playfair Display) for large, expressive headlines (158px, weight 300, ls -0.0200em) to convey gravitas.
- Utilize Alliance (sub: Inter) for all functional text, varying weights (400, 500, 600) and sizes (9px, 12px, 14px) as needed for hierarchy.
- Implement an 80px border-radius for all interactive elements like buttons and navigation items to maintain a consistent soft, pill-like shape.
- Maintain a compact spacing density, with an element gap of 8px and section vertical spacing of 53px.

### Don&#x27;t
- Do not introduce bright, vibrant colors; maintain the muted, earthy palette of Blueprint Canvas, Parchment White, and Amber Peach.
- Avoid sharp, angular corners; consistently apply the 80px border-radius for all applicable UI elements.
- Do not use generic system fonts for display headings; Roslindale&#x27;s unique character is central to the brand&#x27;s sophisticated feel.
- Avoid excessive use of elevation or heavy shadows; the system relies on subtle borders and color shifts for separation.
- Do not deviate from the defined letter-spacing values for Alliance; precise tracking is essential for its compact appearance.
- Do not use Parchment White (#f5efeb) on amber backgrounds due to insufficient contrast (1.6:1 ratio).
- Avoid making any element overtly &#x27;loud&#x27;; the design emphasizes understated luxury through subtle contrasts and refined details.

## Imagery

The site uses subtle, abstract blueprint-style graphics overlaid on a textured dark background for atmospheric effect. These graphics are largely monochromatic, serving as an underlying visual motif rather than direct content. All imagery is decorative, establishing a mood of construction and precision, without featuring photography or product showcases. The density is image-light, with UI and typography dominating the visual space.

## Layout

The page employs a full-bleed layout, particularly for the hero section, which features a large, centered headline over an architectural graphic background. Content is centrally aligned within this wide canvas, using large, negative space. The header features right-aligned navigation items, subtly outlined. Subsequent content sections appear to follow a consistent vertical rhythm, though specific sectioning is less explicit than a banded approach; instead, it relies on visual weight and typography.

## Agent Prompt Guide

Quick Color Reference: 
text: #f5efeb
background: #111111
border: #f5efeb
accent: #f1b497
primary action: no distinct CTA color

Example Component Prompts:
No distinct primary action color was observed; use the extracted neutral button treatments instead of inventing a filled CTA color.


Generate two columns of text in a section with a Blueprint Canvas background: Left column with subheading &#x27;Set builders for live events & luxury retail experiences.&#x27; in Alliance 28px weight 400, #f5efeb. Right column with body text &#x27;YOUR DESIGNS: MADE REALITY...&#x27; in Alliance 14px weight 400, #f5efeb, with a margin-bottom of 14px after initial line.

## Similar Brands

- **Fendi** — Monochromatic palette, large serif typography, and a focus on subtle textures create a similar luxury brand experience with understated elegance.
- **Bottega Veneta** — Understated branding, high-contrast typography, and a tactile, natural color palette evoke a comparable sense of refined craftsmanship.
- **Linear** — Uses a dark, technical background with strong geometric elements and precise, functional typography, albeit in a more modern context. The focus on precision and subtle interactions is similar.
- **Acme Co.** — Another fictional example that might use a single, muted accent color against a largely grayscale UI, employing elegant serif fonts for impact.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-blueprint-canvas: #111111;
  --color-parchment-white: #f5efeb;
  --color-amber-peach: #f1b497;

  /* Typography — Font Families */
  --font-roslindale: &#x27;Roslindale&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-alliance: &#x27;Alliance&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 14px;
  --leading-body: 1.2;
  --tracking-body: 0.02px;
  --text-subheading: 28px;
  --leading-subheading: 1.3;
  --tracking-subheading: -0.02px;
  --text-display: 158px;
  --leading-display: 1;
  --tracking-display: -0.02px;

  /* Typography — Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-8: 8px;
  --spacing-11: 11px;
  --spacing-14: 14px;
  --spacing-20: 20px;
  --spacing-21: 21px;
  --spacing-28: 28px;
  --spacing-35: 35px;
  --spacing-42: 42px;
  --spacing-53: 53px;

  /* Layout */
  --section-gap: 53px;
  --card-padding: 21px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-full: 80px;

  /* Named Radii */
  --radius-buttons: 80px;
  --radius-otherelements: 80px;
  --radius-navigationitems: 80px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-blueprint-canvas: #111111;
  --color-parchment-white: #f5efeb;
  --color-amber-peach: #f1b497;

  /* Typography */
  --font-roslindale: &#x27;Roslindale&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-alliance: &#x27;Alliance&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 14px;
  --leading-body: 1.2;
  --tracking-body: 0.02px;
  --text-subheading: 28px;
  --leading-subheading: 1.3;
  --tracking-subheading: -0.02px;
  --text-display: 158px;
  --leading-display: 1;
  --tracking-display: -0.02px;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-11: 11px;
  --spacing-14: 14px;
  --spacing-20: 20px;
  --spacing-21: 21px;
  --spacing-28: 28px;
  --spacing-35: 35px;
  --spacing-42: 42px;
  --spacing-53: 53px;

  /* Border Radius */
  --radius-full: 80px;
}
```

# Rubenwyttenbach — Style Reference
> Gallery canvas, framed silence

**Theme:** dark

Rubenwyttenbach expresses a minimalist, high-contrast aesthetic where imagery reigns supreme. The design relies on expansive black canvases and crisp white typography, creating a gallery-like experience. Text is sparse, acting as precise labels or subtle navigation, while large initial letters hint at an editorial, artistic sensibility. Elements are subtly framed or bordered, emphasizing clean lines and negative space.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Black | `#0a0a0a` | `--color-canvas-black` | Page background, primary text, subtle borders around clickable areas like links and image containers, creating framed content zones on the dark canvas |
| Paper White | `#ffffff` | `--color-paper-white` | Hairline borders, dividers, input outlines, and card edges on light surfaces. Do not promote it to the primary CTA color |
| Text Black | `#000000` | `--color-text-black` | Decorative dots, icon fills, secondary text, borders on light backgrounds. Used for high-contrast details rather than large surface areas |

## Tokens — Typography

### Kern-Regular — All textual content, from large, impactful display headings (like &#x27;R&#x27; or &#x27;W&#x27;) to body text and navigation. Its consistent single weight emphasizes clarity and directness, letting size and spacing dictate hierarchy. · `--font-kern-regular`
- **Substitute:** Arial
- **Weights:** 400
- **Sizes:** 16px, 19px, 98px, 173px
- **Line height:** 0.90, 0.92, 1.00, 1.15, 1.20
- **Letter spacing:** -0.050em at 173px, -0.040em at 98px, -0.020em at 19px, -0.017em at 16px
- **Role:** All textual content, from large, impactful display headings (like &#x27;R&#x27; or &#x27;W&#x27;) to body text and navigation. Its consistent single weight emphasizes clarity and directness, letting size and spacing dictate hierarchy.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 16px | 1 | — | `--text-caption` |
| body-sm | 19px | 1 | — | `--text-body-sm` |
| body | 98px | 1 | — | `--text-body` |
| body-lg | 173px | 1 | — | `--text-body-lg` |

## Tokens — Spacing & Shapes

**Base unit:** 6px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 6 | 6px | `--spacing-6` |
| 9 | 9px | `--spacing-9` |
| 11 | 11px | `--spacing-11` |
| 22 | 22px | `--spacing-22` |
| 46 | 46px | `--spacing-46` |
| 118 | 118px | `--spacing-118` |
| 173 | 173px | `--spacing-173` |
| 236 | 236px | `--spacing-236` |

### Border Radius

| Element | Value |
|---------|-------|
| default | 2px |
| circularElements | 50px |

### Layout

- **Section gap:** 118px
- **Card padding:** 11px
- **Element gap:** 6px

## Components

### Framed Image Area
**Role:** Visual content container with hover effect

Images are presented on a `Canvas Black` background. When hovered, a `Paper White` border of 1px appears around the image, creating a subtle highlight. Uses 11px padding on all sides, but this can extend to 173px padding bottom in some cases for a taller effect.

### Navigation Link
**Role:** Main navigation and content links

Text in Kern-Regular, `Paper White` color, 16px size. On hover, a `Canvas Black` border of 1px appears, creating an outlined ghost button effect around the text. Often accompanied by small `Text Black` dots.

### Descriptive Text Label
**Role:** Auxiliary and contextual text

Kern-Regular, 16px, `Paper White` color. Used for headings, sub-descriptions, and journal entries. Employs horizontal padding of 4px on the right creating an uneven visual rhythm.

### Large Initial Letter Display
**Role:** Decorative and navigational large-scale typography

Extra-large (173px, 98px) `Paper White` characters in Kern-Regular, `Canvas Black` 1px border. Feature tight letter-spacing to maintain a block-like appearance, like &#x27;-0.050em&#x27; for the largest size. These act as distinct, almost abstract visual anchors.

### Circular Focus Dot
**Role:** Visual indicator for active states or markers

A small circular element with a 50px border-radius, `Text Black` fill, often used as a minimalist pointer or separator. Diameter appears to be around 6px to 10px.

## Do&#x27;s and Don&#x27;ts

### Do
- Use Canvas Black (#0a0a0a) for most page backgrounds and Text Black (#000000) only for small accent details like dots and icons.
- Set typography in Kern-Regular (or Arial as substitute) at weight 400 for all text, varying size and letter-spacing to establish hierarchy.
- Apply `Paper White` (#ffffff) for all main textual content to ensure strong contrast against the dark `Canvas Black` backgrounds.
- Employ a 1px border using `Canvas Black` or `Paper White` to create framing around interactive elements, images, or text on hover/active states.
- Establish horizontal rhythm using 118px `marginLeft` and `marginRight` for content blocks, providing significant negative space.
- Leverage large initial characters (98px or 173px) with negative letter-spacing for editorial or section headings, making them prominent visual elements.
- Maintain a compact element spacing of 6px for immediate proximity between related items, contrasting with larger section gaps.

### Don&#x27;t
- Avoid using multiple font weights or families; the system relies on a single consistent font at one weight.
- Do not introduce highly chromatic colors; the palette is strictly achromatic, with black, white, and near-black dominating.
- Refrain from using strong shadows or gradients; the design aesthetic is flat, emphasizing clean lines and stark contrasts.
- Do not fill buttons with solid colors; interactive elements should primarily use outlined or ghost styles, often with 1px borders.
- Avoid decorative imagery that competes with primary content; graphics should be minimal icon-like objects (e.g., dots) or photography presented without heavy manipulation.
- Do not break the visual rhythm with inconsistent component padding; adhere to 11px general padding, sometimes extended at the bottom to 173px for specific elements.
- Do not use generic border-radii; adhere to the specific 2px for general elements and 50px for perfectly circular small elements.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas Background | `#0a0a0a` | The primary, expansive background color for the entire site, providing a dark, gallery-like foundation. |
| 1 | Framed Content Area | `#ffffff` | Used sparingly as a background for sections or elements that require high visual prominence or contrast, often bordered by &#x27;Canvas Black&#x27;. |

## Imagery

This design system primarily uses photography presented with minimal framing. Images lack rounded corners or complex masking; they are presented as raw edges against the `Canvas Black` background. The treatment is focused on showcasing the photography itself, with a tendency towards tight crops or interior shots, rather than lifestyle imagery or abstract graphics. Icons are minimal, represented by small `Text Black` dots.

## Layout

The page adheres to a full-bleed model, not confined by a `pageMaxWidth`. The hero section features large, artful initial letters (`R`, `W`) acting as both branding and navigation. Content is arranged with significant vertical `sectionGap` (118px) creating breathing room. A common pattern involves alternating blocks of content and imagery, with a strong vertical rhythm established by explicit spacing choices. Navigation is minimal, likely a top-bar or overlay, with sparse text links. Content sections appear to float on the dark canvas, sometimes subtly framed by borders when interactive.

## Agent Prompt Guide

Quick Color Reference:
text: #ffffff
background: #0a0a0a
border: #0a0a0a
accent: none observed
primary action: no distinct CTA color

Example Component Prompts:
Create a framed image card with a 1px `Canvas Black` border and 11px padding, displaying a photograph. The border appears on hover.
Create a navigation link: &#x27;Index&#x27; with `Paper White` text, 16px Kern-Regular, and a 1px transparent border, which becomes `Canvas Black` on hover, along with a small `Text Black` dot indicator.
Create a section heading: &#x27;E d i t o r i a l&#x27; using Kern-Regular, 19px, `Paper White` text, with a `Canvas Black` 1px border. The heading has a 4px `paddingRight`.

## Similar Brands

- **A.P.C.** — Monochromatic, minimalist aesthetic with high contrast, heavy use of negative space, and focus on product imagery.
- **The Row** — Understated luxury, clean typography, large-scale imagery, and a limited, neutral color palette.
- **Studio Faculty** — Editorial style, stark black and white; photography-driven with subtle UI elements complementing the visuals.
- **Acne Studios** — Minimalist design, strong emphasis on typography, very little color, and raw presentation of content.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-black: #0a0a0a;
  --color-paper-white: #ffffff;
  --color-text-black: #000000;

  /* Typography — Font Families */
  --font-kern-regular: &#x27;Kern-Regular&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 16px;
  --leading-caption: 1;
  --text-body-sm: 19px;
  --leading-body-sm: 1;
  --text-body: 98px;
  --leading-body: 1;
  --text-body-lg: 173px;
  --leading-body-lg: 1;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 6px;
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-9: 9px;
  --spacing-11: 11px;
  --spacing-22: 22px;
  --spacing-46: 46px;
  --spacing-118: 118px;
  --spacing-173: 173px;
  --spacing-236: 236px;

  /* Layout */
  --section-gap: 118px;
  --card-padding: 11px;
  --element-gap: 6px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-full: 50px;

  /* Named Radii */
  --radius-default: 2px;
  --radius-circularelements: 50px;

  /* Surfaces */
  --surface-canvas-background: #0a0a0a;
  --surface-framed-content-area: #ffffff;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-black: #0a0a0a;
  --color-paper-white: #ffffff;
  --color-text-black: #000000;

  /* Typography */
  --font-kern-regular: &#x27;Kern-Regular&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 16px;
  --leading-caption: 1;
  --text-body-sm: 19px;
  --leading-body-sm: 1;
  --text-body: 98px;
  --leading-body: 1;
  --text-body-lg: 173px;
  --leading-body-lg: 1;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-9: 9px;
  --spacing-11: 11px;
  --spacing-22: 22px;
  --spacing-46: 46px;
  --spacing-118: 118px;
  --spacing-173: 173px;
  --spacing-236: 236px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-full: 50px;
}
```

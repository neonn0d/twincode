# Fable — Style Reference
> Warm Scandi elegance

**Theme:** light

Fable crafts a comforting, refined aesthetic for pet products. It blends warm, inviting neutrals with a singular, muted blue accent that signals interactivity without harshness. Typography is precise and legible, complementing detailed product imagery and subtle illustrative elements. The system emphasizes soft surfaces and rounded edges, creating a gentle, approachable feel for a premium brand.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Midnight Ink | `#030e28` | `--color-midnight-ink` | Primary text, prominent headings, critical icon details, dark borders — establishes authority and contrast |
| Sky Dust | `#b0c7fa` | `--color-sky-dust` | Primary action backgrounds, interactive elements, subtle accent washes — a soft, inviting blue that feels approachable |
| Mist Bloom | `#dbddff` | `--color-mist-bloom` | Subtle background accents, decorative elements, hero section backgrounds — a very light, cool-tinted neutral |
| Spring Bud | `#c9fd5b` | `--color-spring-bud` | Green action color for filled buttons, selected navigation states, and focused conversion moments |
| Ocean Glimmer | `#2563ed` | `--color-ocean-glimmer` | Interactive link text, secondary link borders, subtle visual highlights — a vivid, functional blue |
| Canvas | `#faf8f5` | `--color-canvas` | Page background, foundational light surface |
| White Linen | `#ffffff` | `--color-white-linen` | Base surface for cards, input fields, prominent UI elements, subtle borders |
| Cloud Gray | `#f7f7f7` | `--color-cloud-gray` | Secondary surface for card backgrounds and subtle section separators |
| Deep Graphite | `#232323` | `--color-deep-graphite` | Strong secondary text, bold borders, accent details |
| Pitch Black | `#000000` | `--color-pitch-black` | Heading text, primary icons, outline borders, strong contrast elements |
| Light Grille | `#eeeeee` | `--color-light-grille` | Hairline separators and subtle borders |
| Shadow Fog | `#7c7f85` | `--color-shadow-fog` | Muted body text, secondary text, placeholder text, border accents |
| Stone Slate | `#dbdddf` | `--color-stone-slate` | Badge borders, subtle dividers |
| Cool Ash | `#515357` | `--color-cool-ash` | Detailed body text, secondary informational text, supporting link states |
| Quartz Dust | `#b7b7b9` | `--color-quartz-dust` | Input field borders, lightest gray for background tints |

## Tokens — Typography

### Moderat — UI elements, body copy, captions, buttons, and detailed content. Its consistent tracking ensures clarity across various compact applications. · `--font-moderat`
- **Substitute:** system-ui, sans-serif
- **Weights:** 300, 400, 500, 700
- **Sizes:** 9px, 10px, 11px, 12px, 13px, 14px, 15px, 16px, 18px
- **Line height:** 1.00, 1.25, 1.29, 1.33, 1.38, 1.50, 1.54, 1.60, 1.63, 2.14
- **Letter spacing:** 0.010em (9px), 0.011em (10px), 0.012em (11-12px), 0.013em (13-14px), 0.015em (15-16px), 0.018em (18px)
- **Role:** UI elements, body copy, captions, buttons, and detailed content. Its consistent tracking ensures clarity across various compact applications.

### Gelica — Headlines and prominent display text. Its distinct character and tighter letter-spacing at larger sizes give it a sophisticated, editorial presence. · `--font-gelica`
- **Substitute:** Georgia, serif
- **Weights:** 300, 400, 500
- **Sizes:** 18px, 22px, 24px, 28px, 32px, 40px, 60px
- **Line height:** 1.00, 1.25, 1.50
- **Letter spacing:** -0.010em (60px), 0.004em (40px), 0.005em (32px), 0.006em (28px), 0.007em (24px), 0.009em (18-22px)
- **OpenType features:** `"liga" 0, "salt"`
- **Role:** Headlines and prominent display text. Its distinct character and tighter letter-spacing at larger sizes give it a sophisticated, editorial presence.

### Font Awesome 5 Pro — Font Awesome 5 Pro — detected in extracted data but not described by AI · `--font-font-awesome-5-pro`
- **Weights:** 300
- **Sizes:** 18px
- **Line height:** 1
- **Role:** Font Awesome 5 Pro — detected in extracted data but not described by AI

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body | 14px | 1.5 | 0.18px | `--text-body` |
| subheading | 18px | 1.5 | 0.16px | `--text-subheading` |
| heading | 28px | 1.25 | 0.17px | `--text-heading` |
| display | 60px | 1 | -0.6px | `--text-display` |

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
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 100 | 100px | `--spacing-100` |
| 112 | 112px | `--spacing-112` |

### Border Radius

| Element | Value |
|---------|-------|
| pills | 9999px |
| buttons | 4px |
| default | 2px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| sm | `rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgba(0, 0, 0, 0.06) ...` | `--shadow-sm` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 16px

## Components

### Primary Filled Button
**Role:** Key calls to action

Background: Sky Dust (#b0c7fa), Text: Midnight Ink (#030e28), Border Radius: 4px, Padding: 10px vertical, 15px horizontal. Uses Moderat font.

### Ghost Button
**Role:** Secondary actions, navigation links

Background: transparent, Text: Midnight Ink (#030e28), Border: 1px solid Midnight Ink (#030e28), Border Radius: 4px, Padding: variable. Uses Moderat font.

### Pill Button
**Role:** Tertiary filters or tags

Background: transparent or Sky Dust (#b0c7fa) on hover, Text: Midnight Ink (#030e28), Border Radius: 9999px (full capsule), Padding: variable. Uses Moderat font.

### Product Card
**Role:** Displaying individual products

Background: Cloud Gray (#f7f7f7), Border Radius: 2px, No box shadow, Padding: 16px. Imagery fills the top portion, text below.

### Minimal Card
**Role:** Content grouping without strong visual emphasis

Background: transparent, Border Radius: 2px, No box shadow, Padding: 16px. Often used for testimonial blocks or simple image containers.

### Input Field
**Role:** User data entry

Background: White Linen (#ffffff), Border: 1px solid Quartz Dust (#b7b7b9), Border Radius: 0px, Padding: 0px vertical, 12px horizontal. Text: Midnight Ink (#030e28).

### Best Seller Badge
**Role:** Highlighting popular products

Background: Spring Bud (#c9fd5b), Text: Deep Graphite (#232323), Border Radius: 0px, Padding: small, inline with content. Uses Moderat font.

## Do&#x27;s and Don&#x27;ts

### Do
- Use Midnight Ink (#030e28) for all primary text and critical UI outlines to maintain brand identity.
- Apply Sky Dust (#b0c7fa) for primary call-to-action button backgrounds, ensuring a consistent interactive feel.
- Maintain a default border radius of 2px for cards and containers, and 4px for interactive buttons.
- Utilize Moderat for all UI elements and body text, with precise letter-spacing as per type scale for optimal legibility.
- Employ Gelica for headlines and display text, prioritizing its distinct character and larger sizes for impactful messaging.
- Structure layouts using a 1200px max-width content container, centered on the page for visual stability.
- Ensure section gaps are consistently 64px to create comfortable breathing room between content blocks.

### Don&#x27;t
- Avoid using multiple chromatic colors for primary actions; reserve Sky Dust (#b0c7fa) for this role.
- Do not introduce sharp corners or excessively large radii; adhere to the established 2px and 4px radii.
- Refrain from heavy shadows or strong elevation; opt for minimal, subtle elevation when necessary.
- Do not deviate from the defined letter-spacing values for Moderat and Gelica fonts; precise tracking is critical.
- Avoid using purely black (#000000) for body text; reserve it for headings and high-contrast icons.
- Do not use gradients unless explicitly defined; the system relies on solid colors for clear, understated design.
- Avoid dense, text-heavy sections without image support; integrate product visuals or illustrations frequently.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Canvas | `#faf8f5` | Dominant page background, providing a warm, subtle foundation. |
| 2 | White Linen | `#ffffff` | Default surface for interactive components, input fields, and foreground elements. |
| 3 | Cloud Gray | `#f7f7f7` | Background for product cards and subtly distinguished content blocks. |

## Elevation

- **Button/Card:** `rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgba(0, 0, 0, 0.06) 0px 0px 2px 0px, rgba(0, 0, 0, 0.04) 0px 0px 1px 0px`

## Imagery

The visual language blends detailed product photography with light, whimsical line-art illustrations. Product shots are typically tight crops, often presented on pure white or light gray backgrounds, emphasizing the object itself. Lifestyle photography, when present, maintains a clean, natural light aesthetic. Illustrations are sparse, organic, monochrome line drawings — often depicting interactions between owners and pets, serving as decorative and explanatory content, adding a touch of playful warmth. Icons are outlined, simple, and functional, primarily monochrome or using accent colors. The overall density is balanced, allowing imagery to break up text-heavy sections and add visual interest.

## Layout

The site employs a primarily contained layout, utilizing a central &#x27;pageMaxWidth&#x27; of 1200px. Sections often alternate between full-width background bands (like the green testimonial section) and content constrained within the max-width. The hero section frequently combines a large, dynamic hero image (often full-bleed or near full-bleed) with a prominent headline and primary call-to-action. Content arrangement features a strong vertical rhythm with consistent section gaps of 64px. Product listings use a responsive grid, typically 3 columns. Navigation is a sticky top bar with clear links and utility icons.

## Agent Prompt Guide

**Quick Color Reference:**
text: #030e28
background: #faf8f5
border: #dbdddf
accent: #b0c7fa
primary action: #b0c7fa (filled action)

**Example Component Prompts:**
1. Create a Primary Action Button: #b0c7fa background, #000000 text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.
2. Design a `Product Card` for &#x27;The Puffin™ Game&#x27; with an image, title, and a &#x27;Best Seller Badge&#x27;.
3. Implement a `Ghost Button` for &#x27;See Details&#x27; next to product information.
4. Produce an `Input Field` for an email address, labeled &#x27;Your Email&#x27;.
5. Generate a section header using Gelica font, weight 400, size 40px, letter-spacing 0.16px, color #000000, with body text below it using Moderat font, weight 400, size 14px, letter-spacing 0.18px, color #030e28.

## Similar Brands

- **Our Place** — Shares a warm, inviting neutral palette with a singular accent color and focus on high-quality product photography.
- **Brooklinen** — Similar approach to soft, comfortable branding through subdued color palettes and sophisticated typography for home goods.
- **Allbirds** — Utilizes a clean, product-focused aesthetic with muted natural tones and a clear, approachable UI.
- **Native Deodorant** — Employs a light, airy design with rounded elements and a natural color scheme to convey a premium, gentle product.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-midnight-ink: #030e28;
  --color-sky-dust: #b0c7fa;
  --color-mist-bloom: #dbddff;
  --color-spring-bud: #c9fd5b;
  --color-ocean-glimmer: #2563ed;
  --color-canvas: #faf8f5;
  --color-white-linen: #ffffff;
  --color-cloud-gray: #f7f7f7;
  --color-deep-graphite: #232323;
  --color-pitch-black: #000000;
  --color-light-grille: #eeeeee;
  --color-shadow-fog: #7c7f85;
  --color-stone-slate: #dbdddf;
  --color-cool-ash: #515357;
  --color-quartz-dust: #b7b7b9;

  /* Typography — Font Families */
  --font-moderat: &#x27;Moderat&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-gelica: &#x27;Gelica&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-font-awesome-5-pro: &#x27;Font Awesome 5 Pro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: 0.18px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: 0.16px;
  --text-heading: 28px;
  --leading-heading: 1.25;
  --tracking-heading: 0.17px;
  --text-display: 60px;
  --leading-display: 1;
  --tracking-display: -0.6px;

  /* Typography — Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-100: 100px;
  --spacing-112: 112px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 64px;
  --card-padding: 16px;
  --element-gap: 16px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-md: 5px;
  --radius-full: 9999px;

  /* Named Radii */
  --radius-pills: 9999px;
  --radius-buttons: 4px;
  --radius-default: 2px;

  /* Shadows */
  --shadow-sm: rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgba(0, 0, 0, 0.06) 0px 0px 2px 0px, rgba(0, 0, 0, 0.04) 0px 0px 1px 0px;

  /* Surfaces */
  --surface-canvas: #faf8f5;
  --surface-white-linen: #ffffff;
  --surface-cloud-gray: #f7f7f7;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-midnight-ink: #030e28;
  --color-sky-dust: #b0c7fa;
  --color-mist-bloom: #dbddff;
  --color-spring-bud: #c9fd5b;
  --color-ocean-glimmer: #2563ed;
  --color-canvas: #faf8f5;
  --color-white-linen: #ffffff;
  --color-cloud-gray: #f7f7f7;
  --color-deep-graphite: #232323;
  --color-pitch-black: #000000;
  --color-light-grille: #eeeeee;
  --color-shadow-fog: #7c7f85;
  --color-stone-slate: #dbdddf;
  --color-cool-ash: #515357;
  --color-quartz-dust: #b7b7b9;

  /* Typography */
  --font-moderat: &#x27;Moderat&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-gelica: &#x27;Gelica&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-font-awesome-5-pro: &#x27;Font Awesome 5 Pro&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: 0.18px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: 0.16px;
  --text-heading: 28px;
  --leading-heading: 1.25;
  --tracking-heading: 0.17px;
  --text-display: 60px;
  --leading-display: 1;
  --tracking-display: -0.6px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-100: 100px;
  --spacing-112: 112px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-md: 5px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgba(0, 0, 0, 0.06) 0px 0px 2px 0px, rgba(0, 0, 0, 0.04) 0px 0px 1px 0px;
}
```

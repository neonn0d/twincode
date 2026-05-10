# PORTO ROCHA — Style Reference
> Editorial Grid on Canvas White

**Theme:** light

PORTO ROCHA&#x27;s visual system evokes a meticulous, editorial aesthetic, balancing dense information display with distinct graphic elements. Typography drives hierarchy, utilizing a subtle letter-spacing for large text and monochromatic backgrounds that let content and occasional vibrant imagery take center stage. Components are understated, opting for soft corners and ghosted forms, providing a sophisticated framework without visual clutter. The overall impression is one of grounded, professional clarity with precise, almost architectural spacing.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas White | `#ffffff` | `--color-canvas-white` | Primary page background, clear base for content |
| Midnight Ink | `#000000` | `--color-midnight-ink` | Dark borders and separators for elevated surfaces and inverted UI. Do not promote it to the primary CTA color |
| Storm Gray | `#808080` | `--color-storm-gray` | Muted secondary text, subtle borders for inactive elements |
| Card Wash | `#0000000A` | `--color-card-wash` | Subtle background for UI elements like unselected cards or ghost buttons. Represents rgba(0,0,0,.04) or --color-gray10 |
| Accent Blue | `#007aff` | `--color-accent-blue` | Decorative highlights, specific card backgrounds, isolated functional elements |

## Tokens — Typography

### sf-pro-text — Body text, button labels, navigation items, descriptive content. Its standard weight ensures legibility and a consistent textual foundation across the interface. · `--font-sf-pro-text`
- **Substitute:** system-ui, sans-serif
- **Weights:** 400
- **Sizes:** 14px
- **Line height:** 1.25
- **Letter spacing:** normal
- **Role:** Body text, button labels, navigation items, descriptive content. Its standard weight ensures legibility and a consistent textual foundation across the interface.

### sf-pro-display — Headlines and prominent text elements. The slight positive letter-spacing adds a considered, editorial feel, providing gravitas without being overly bold. · `--font-sf-pro-display`
- **Substitute:** system-ui, sans-serif
- **Weights:** 400
- **Sizes:** 23px
- **Line height:** 1.17
- **Letter spacing:** 0.0200em
- **Role:** Headlines and prominent text elements. The slight positive letter-spacing adds a considered, editorial feel, providing gravitas without being overly bold.

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 10 | 10px | `--spacing-10` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |

### Border Radius

| Element | Value |
|---------|-------|
| default | 8px |
| prominent | 38px |

### Layout

- **Section gap:** 40px
- **Card padding:** 0px
- **Element gap:** 8px

## Components

### Ghost Button
**Role:** Interactive element

Minimalist rectangular button with transparent background, &#x27;Midnight Ink&#x27; text, and a thin &#x27;Midnight Ink&#x27; border. Radius is 8px. Text is sf-pro-text at 14px, weight 400. Padding: 16px horizontal, 16px vertical.

### Pill Button
**Role:** Interactive element

Ghost button with rounded &#x27;prominent&#x27; radius (38px), &#x27;Midnight Ink&#x27; text, and a thin &#x27;Midnight Ink&#x27; border. Text is sf-pro-text at 14px, weight 400. Padding: 16px horizontal, 0px vertical.

### Feature Card (Ghost)
**Role:** Content display

Transparent rectangular card with 8px radius, no shadow or border. Used for displaying individual content blocks within a grid. Padding: 0px.

### Project Preview Card
**Role:** Interactive content preview

Card with subtle &#x27;Card Wash&#x27; background and 8px radius. Text is &#x27;Midnight Ink&#x27; for headings and &#x27;Storm Gray&#x27; for body/meta. No border or shadow. Padding: 0px.

### Navigation Item
**Role:** Navigation element

Textual navigation link using &#x27;sf-pro-text&#x27; at 14px, weight 400, in &#x27;Midnight Ink&#x27;. Borders are often implied through layout rather than explicit box styling.

## Do&#x27;s and Don&#x27;ts

### Do
- Use &#x27;Canvas White&#x27; (#ffffff) as the default background for all page sections and primary content areas.
- Apply &#x27;Midnight Ink&#x27; (#000000) for all primary text, main headings, and significant borders to maintain sharp contrast.
- Employ sf-pro-text, weight 400, with a size of 14px and lineHeight 1.25 for all body copy and standard interface labels.
- Utilize sf-pro-display, weight 400, with a size of 23px, lineHeight 1.17, and letter-spacing `0.0200em` for prominent headlines.
- Implement an 8px radius (&#x27;default&#x27;) for all cards, buttons, and navigation elements.
- Separate content blocks with a consistent 20px marginTop between cards to ensure comfortable density.
- Utilize &#x27;Storm Gray&#x27; (#808080) for secondary details, helper text, and subtle visual distinctions.

### Don&#x27;t
- Avoid using multiple chromatic colors; &#x27;Accent Blue&#x27; (#007aff) is reserved for very specific, isolated highlights.
- Do not introduce heavy shadows or thick borders; design relies on subtle elevation and clean separation.
- Do not deviate from the specified font families; custom typefaces are integral to the brand&#x27;s editorial feel.
- Avoid arbitrary padding values; adhere to the 8px base unit and specified component paddings (e.g., 16px horizontal for buttons).
- Do not use dark backgrounds for primary content sections; the system is designed around a light theme.
- Avoid making text small or condensed; the type system prioritizes readability with moderate sizes and generous line heights.

## Imagery

The visual language is characterized by realistic, often textural or architectural photography and product-focused imagery. Photography varies between full-bleed, vibrant, editorial-style shots with strong compositions (like the &#x27;Program 2025&#x27; image) and monochromatic, structured images of buildings or objects. Imagery is used decoratively to set atmosphere and explanatory content, often contained within cards or grid elements. There is a strong absence of illustrations; the focus is on tangible, real-world art and design. Icons are minimal, appearing as solid fills (e.g., brand logos) rather than outlined.

## Layout

The page model is a two-column structure with a fixed-width left navigation/sidebar and a flexible, scrolling main content area. The hero section within the main content is often full-width relative to its container, featuring prominent imagery or editorial layouts. Section rhythm is consistent, primarily using a vertical flow with a comfortable amount of space between content blocks. Content is arranged in flexible card grids and editorial-style image-and-text pairings, often with images dictating flow. The primary navigation is a static sidebar, while content navigation includes scrollable horizontal carousels and vertical lists of cards.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #ffffff
border: #000000
accent: #007aff
primary action: no distinct CTA color

Example Component Prompts:
1. Create a primary headline: text &#x27;Midnight Ink&#x27; (#000000), sf-pro-display, weight 400, 23px, lineHeight 1.17, letterSpacing 0.0200em.
2. Create a &#x27;Ghost Button&#x27; with the label &#x27;Learn More&#x27;: transparent background, &#x27;Midnight Ink&#x27; (#000000) text, &#x27;Midnight Ink&#x27; (#000000) border, 8px radius. Text is sf-pro-text, weight 400, 14px, lineHeight 1.25. Padding: 16px horizontal, 16px vertical.
3. Create a &#x27;Pill Button&#x27; with the label &#x27;All Projects&#x27;: transparent background, &#x27;Midnight Ink&#x27; (#000000) text, &#x27;Midnight Ink&#x27; (#000000) border, 38px radius. Text is sf-pro-text, weight 400, 14px, lineHeight 1.25. Padding: 16px horizontal, 0px vertical.
4. Generate a &#x27;Project Preview Card&#x27;: &#x27;Card Wash&#x27; (#0000000A) background, 8px radius, no border. Headline text &#x27;Midnight Ink&#x27; (#000000) using sf-pro-display, weight 400, 23px, lineHeight 1.17, letterSpacing 0.0200em. Subtext &#x27;Storm Gray&#x27; (#808080) using sf-pro-text, weight 400, 14px, lineHeight 1.25. No internal padding; content fills card directly. It should have a 20px marginTop if not the first card in a series.

## Similar Brands

- **AIGA** — Strong editorial design with a focus on typography and clear content hierarchy on a white background.
- **Pentagram** — Designer portfolio site with strong black/white/gray palette, minimalist component styling, and a clean display of work.
- **Grilli Type** — Type foundry website demonstrating a precise, clean aesthetic, heavy use of white space, and subtle interactions.
- **Fieldwork** — Visual identity and design studio showcasing work in grids, with a calm color palette and prominent photography.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-midnight-ink: #000000;
  --color-storm-gray: #808080;
  --color-card-wash: #0000000A;
  --color-accent-blue: #007aff;

  /* Typography — Font Families */
  --font-sf-pro-text: &#x27;sf-pro-text&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-pro-display: &#x27;sf-pro-display&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-sm: 14px;
  --leading-sm: 1.25;
  --text-xl: 23px;
  --leading-xl: 1.17;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;

  /* Layout */
  --section-gap: 40px;
  --card-padding: 0px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-lg: 8px;
  --radius-3xl: 38px;

  /* Named Radii */
  --radius-default: 8px;
  --radius-prominent: 38px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-midnight-ink: #000000;
  --color-storm-gray: #808080;
  --color-card-wash: #0000000A;
  --color-accent-blue: #007aff;

  /* Typography */
  --font-sf-pro-text: &#x27;sf-pro-text&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-pro-display: &#x27;sf-pro-display&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-sm: 14px;
  --leading-sm: 1.25;
  --text-xl: 23px;
  --leading-xl: 1.17;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;

  /* Border Radius */
  --radius-lg: 8px;
  --radius-3xl: 38px;
}
```

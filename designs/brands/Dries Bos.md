# Dries Bos — Style Reference
> Wireframe on parchment

**Theme:** light

Dries Bos presents a &#x27;digital architect&#x27; aesthetic, combining a minimalist, achromatic canvas with precise, almost wireframe-like detailing. The system maintains a low-contrast, muted palette, focusing on structure through fine lines and ample negative space. Typography is compact and precise, anchoring content within a strict grid, while interactive elements are subtly delineated, relying on hover states to reveal activity rather than bold colors or heavy fills. The overall impression is one of meticulous order and understated functionality.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Parchment | `#e8e7e3` | `--color-canvas-parchment` | Primary page and card backgrounds, providing a soft, desaturated base |
| Ink Jot | `#050200` | `--color-ink-jot` | Neutral form states, badge text, and quiet UI feedback where color should stay understated. Do not promote it to the primary CTA color |
| Ash Outline | `#747472` | `--color-ash-outline` | Muted text, secondary borders, and icon strokes. Used for ghost button borders and placeholder text, offering reduced visual weight |
| Pure Black | `#000000` | `--color-pure-black` | Decorative icon fills, high-contrast text on specific elements, offering maximum visual impact for small details |

## Tokens — Typography

### Sohne Buch — All primary body text, links, and button labels. Its clean, sans-serif form maintains readability and directness within the structured layout. This custom font&#x27;s subtle character aids in brand recognition; &#x27;Inter&#x27; or &#x27;Public Sans&#x27; could serve as substitutes for similar neutrality. · `--font-sohne-buch`
- **Substitute:** Inter, Public Sans
- **Weights:** 400
- **Sizes:** 20px
- **Line height:** 1.45
- **Role:** All primary body text, links, and button labels. Its clean, sans-serif form maintains readability and directness within the structured layout. This custom font&#x27;s subtle character aids in brand recognition; &#x27;Inter&#x27; or &#x27;Public Sans&#x27; could serve as substitutes for similar neutrality.

### myFont — Used for table headers and specific input fields, characterized by its strict single-line height, contributing to the system&#x27;s rigid, tabular feel. A monospace font like &#x27;JetBrains Mono&#x27; or &#x27;IBM Plex Mono&#x27; could provide a similar aesthetic. · `--font-myfont`
- **Substitute:** JetBrains Mono, IBM Plex Mono
- **Weights:** 400
- **Sizes:** 20px
- **Line height:** 1.00
- **Role:** Used for table headers and specific input fields, characterized by its strict single-line height, contributing to the system&#x27;s rigid, tabular feel. A monospace font like &#x27;JetBrains Mono&#x27; or &#x27;IBM Plex Mono&#x27; could provide a similar aesthetic.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body | 20px | 1.45 | — | `--text-body` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 6 | 6px | `--spacing-6` |
| 9 | 9px | `--spacing-9` |
| 10 | 10px | `--spacing-10` |
| 13 | 13px | `--spacing-13` |
| 15 | 15px | `--spacing-15` |
| 20 | 20px | `--spacing-20` |
| 25 | 25px | `--spacing-25` |
| 40 | 40px | `--spacing-40` |
| 79 | 79px | `--spacing-79` |

### Border Radius

| Element | Value |
|---------|-------|
| tags | 1000px |
| cards | 0px |
| buttons | 0px |

### Layout

- **Page max-width:** 1150px
- **Section gap:** 79px
- **Card padding:** 25px
- **Element gap:** 10px

## Components

### Naked Table Row Button
**Role:** Interactive row element within lists and tables, serving as a primary navigation trigger.

Transparent background, &#x27;Ink Jot&#x27; text, &#x27;Ink Jot&#x27; top border. Padding 25px horizontal and vertical. No border radius. Hover state makes the top border &#x27;Ash Outline&#x27;.

### Outlined Category Tag
**Role:** Small, informational tags for categorization or status.

Transparent background, &#x27;Ink Jot&#x27; text, &#x27;Ink Jot&#x27; border. Padding 15px horizontal, 10px vertical. No border radius. This style appears on table headers.

### Subtle Pill Tag
**Role:** Discrete labels for content details, like &#x27;startup&#x27; or &#x27;mobile&#x27;.

Canvas Parchment background, &#x27;Ink Jot&#x27; text. Padding 15px horizontal, 9px bottom, 10px top. 1000px (fully rounded) border radius. Primarily seen on individual content badges.

### Underlined Input Field
**Role:** Text input areas with a subtle bottom border.

Transparent background, &#x27;Ink Jot&#x27; text, &#x27;Ink Jot&#x27; bottom border 2px thick. No padding. Only the bottom border indicates an input area.

## Do&#x27;s and Don&#x27;ts

### Do
- Prioritize &#x27;Canvas Parchment&#x27; (#e8e7e3) for all significant background surfaces to maintain a consistent light theme.
- Use &#x27;Ink Jot&#x27; (#050200) for all primary text, borders, and interactive element outlines.
- Apply a 0px border-radius consistently to all card-like containers, buttons, and input fields to maintain a sharp, angular aesthetic.
- Employ a strict 25px padding horizontally and vertically for most interactive block elements like table rows and list items.
- Maintain a spacious rhythm with section gaps of 79px to delineate major content blocks.
- Use &#x27;Ash Outline&#x27; (#747472) for secondary text, placeholder elements, and subtle icon strokes where a slightly less dominant presence is desired.
- Leverage the &#x27;myFont&#x27; for tabular headings or specific data points where precise, compact text is required, otherwise default to &#x27;Sohne Buch&#x27;.

### Don&#x27;t
- Avoid using bold or highly chromatic accent colors; the system relies on a strictly achromatic palette.
- Do not use explicit box-shadows or heavy elevation; surfaces should appear flat and delineated by borders.
- Do not introduce rounded corners on primary UI elements such as buttons, cards, or inputs, as this contradicts the system&#x27;s sharp geometry.
- Do not deviate from the defined primary typography; avoid using system fonts or other sans-serifs that might break the visual consistency of &#x27;Sohne Buch&#x27;.
- Refrain from complex background gradients or imagery; the design relies on solid, monochromatic surfaces.
- Do not vary line-height significantly for &#x27;Sohne Buch&#x27; text; maintain 1.45 to ensure a consistent reading rhythm.
- Do not use letter-spacing other than normal, as it could disrupt the precise textual alignment established by the custom fonts.

## Imagery

The site employs a primarily icon-based visual language, alongside abstract line art for decorative elements. Icons are either &#x27;Ink Jot&#x27; (#050200) or &#x27;Pure Black&#x27;, typically filled or outlined with a fine stroke, often acting as functional pointers or status indicators (e.g., arrows, external link icons, search icon). Abstract graphics, like the illustrative window frame, are minimal, line-based, and monochromatic, serving as subtle atmospheric cues rather than prominent content. There is a strong absence of photography, colorful illustrations, or product screenshots, underscoring the site&#x27;s focus on pure UI and information.

## Layout

The page adheres to a maximal width of 1150px, with content centered. The hero section features a unique, abstract window-frame graphic in &#x27;Ink Jot&#x27; line art, with primary information presented as a compact text block. Below the hero, content is structured as a series of vertically stacked, full-width sections. Information is often presented in a list or table-like format, using thin &#x27;Ink Jot&#x27; horizontal dividers that create a clear, rigid grid. The visual rhythm is largely consistent, with the &#x27;sectionGap&#x27; of 79px providing generous, uniform spacing between logical content groups.

## Agent Prompt Guide

Quick Color Reference:
text: #050200
background: #e8e7e3
border: #050200
accent: no distinct accent color
primary action: no distinct CTA color

Example Component Prompts:
1. Create a table header row: &#x27;Canvas Parchment&#x27; background, &#x27;myFont&#x27; 20px text in &#x27;Ink Jot&#x27;, 0px radius. Use 25px horizontal padding and 10px top/9px bottom padding for the cells. Thin 1px &#x27;Ink Jot&#x27; bottom border.
2. Design a primary navigational link: &#x27;Sohne Buch&#x27; 20px text in &#x27;Ink Jot&#x27;. No background, 0px radius. On hover, apply an &#x27;Ash Outline&#x27; (#747472) bottom border (underlined state).
3. Generate an input field with a label &#x27;Your Name&#x27;: Label in &#x27;Sohne Buch&#x27; 20px &#x27;Ink Jot&#x27; text. Input field should have a transparent background, &#x27;Ink Jot&#x27; text, and a 2px &#x27;Ink Jot&#x27; bottom border, no explicit padding, 0px radius.

## Similar Brands

- **Linear** — Utilizes a highly structured, flat UI with sharp edges, a meticulous grid, and a dark-on-light (or light-on-dark) achromatic palette with minimal color accents.
- **Stripe** — Employs clean, functional typography, a spacious layout, and a focus on precise geometric elements rather than decorative flair, particularly in its business tools UI.
- **Read.cv** — Minimalist design often featuring a stark, monochromatic interface, clean lines, and a heavy reliance on typography and ample negative space to convey information hierarchy.
- **Cultured Code (Things app)** — Desktop applications with a focus on structured lists, clear divisions, and a restrained, functional aesthetic that prioritizes content and usability over visual flourish.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-parchment: #e8e7e3;
  --color-ink-jot: #050200;
  --color-ash-outline: #747472;
  --color-pure-black: #000000;

  /* Typography — Font Families */
  --font-sohne-buch: &#x27;Sohne Buch&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-myfont: &#x27;myFont&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 20px;
  --leading-body: 1.45;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-6: 6px;
  --spacing-9: 9px;
  --spacing-10: 10px;
  --spacing-13: 13px;
  --spacing-15: 15px;
  --spacing-20: 20px;
  --spacing-25: 25px;
  --spacing-40: 40px;
  --spacing-79: 79px;

  /* Layout */
  --page-max-width: 1150px;
  --section-gap: 79px;
  --card-padding: 25px;
  --element-gap: 10px;

  /* Border Radius */
  --radius-full: 1000px;

  /* Named Radii */
  --radius-tags: 1000px;
  --radius-cards: 0px;
  --radius-buttons: 0px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-parchment: #e8e7e3;
  --color-ink-jot: #050200;
  --color-ash-outline: #747472;
  --color-pure-black: #000000;

  /* Typography */
  --font-sohne-buch: &#x27;Sohne Buch&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-myfont: &#x27;myFont&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-body: 20px;
  --leading-body: 1.45;

  /* Spacing */
  --spacing-6: 6px;
  --spacing-9: 9px;
  --spacing-10: 10px;
  --spacing-13: 13px;
  --spacing-15: 15px;
  --spacing-20: 20px;
  --spacing-25: 25px;
  --spacing-40: 40px;
  --spacing-79: 79px;

  /* Border Radius */
  --radius-full: 1000px;
}
```

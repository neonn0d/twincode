# Simon Rogers — Style Reference
> typographic art installation

**Theme:** light

Simon Rogers employs a minimalist, typographic-driven aesthetic, using a stark white canvas as a backdrop for highly expressive, diagonally-oriented text. The visual identity is built around a single vivid blue hue that establishes hierarchy and brand presence, contrasting sharply with the achromatic background. Typography takes center stage, with custom fonts and precise letter-spacing contributing to a distinctive, art-direction-focused feel. The system prioritizes visual impact and clarity through directness, eschewing complex componentry or superfluous ornamentation.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas White | `#ffffff` | `--color-canvas-white` | Page backgrounds, primary surface for content |
| Ink Black | `#000000` | `--color-ink-black` | Secondary text, subtle details, borders in some contexts |
| Designer Blue | `#3366ff` | `--color-designer-blue` | Primary brand color for headings, links, active states, and decorative borders. Its vividness provides the main visual accent against the neutral background |

## Tokens — Typography

### Wazlon — Primary display and content text, embodying the distinctive slanted, art-focused style. Its custom nature is central to the visual identity. · `--font-wazlon`
- **Substitute:** Georgia
- **Weights:** 400
- **Sizes:** 18px, 36px
- **Line height:** 1.30
- **Letter spacing:** -0.01em at 18px, -0.05em at 36px
- **OpenType features:** `&#x27;onum&#x27;, &#x27;pnum&#x27;`
- **Role:** Primary display and content text, embodying the distinctive slanted, art-focused style. Its custom nature is central to the visual identity.

### Caslon Ionic — An evocative secondary font for specific content blocks, offering a contrasting, perhaps more traditional textual texture. · `--font-caslon-ionic`
- **Substitute:** Playfair Display
- **Weights:** 400
- **Sizes:** 20px
- **Line height:** 1.35
- **Letter spacing:** -0.01em at 20px
- **Role:** An evocative secondary font for specific content blocks, offering a contrasting, perhaps more traditional textual texture.

## Tokens — Spacing & Shapes

**Density:** comfortable

### Border Radius

| Element | Value |
|---------|-------|
| default | 0px |

### Layout


## Components

### Headline Blue Text
**Role:** Primary section titles and key information

Uses &#x27;Wazlon&#x27; at 36px, weight 400, in &#x27;Designer Blue&#x27; (#3366ff), with precise letter-spacing to reinforce the brand&#x27;s visual signature.

### Link Blue Text
**Role:** Interactive elements and primary navigation items

Text rendered in &#x27;Designer Blue&#x27; (#3366ff), primarily using &#x27;Wazlon&#x27; at 18px weight 400, indicating clickable elements without needing traditional button fills.

### Body Text Black
**Role:** Standard descriptive text and functional content

Appears in &#x27;Ink Black&#x27; (#000000), using &#x27;Wazlon&#x27; at 18px weight 400 for general information.

### Subtle Contextual Text
**Role:** Secondary information, dates, or explanatory notes

Uses &#x27;Caslon Ionic&#x27; at 20px weight 400, in &#x27;Ink Black&#x27; (#000000), providing a stylistic contrast for less prominent content.

### List Item
**Role:** Structured lists of content, such as experience entries

Comprised of an unformatted text block, often with two lines, where the first is a &#x27;Link Blue Text&#x27; and the second is &#x27;Body Text Black&#x27;, both from the &#x27;Wazlon&#x27; family, defining a clear hierarchical pairing.

## Do&#x27;s and Don&#x27;ts

### Do
- Prioritize &#x27;Designer Blue&#x27; (#3366ff) for all headings, links, and any element requiring visual prominence.
- Maintain a stark white background using &#x27;Canvas White&#x27; (#ffffff) for all primary content areas.
- Utilize the custom font &#x27;Wazlon&#x27; for all major text elements, leveraging its unique diagonal presentation seen in the screenshots.
- Implement &#x27;Wazlon&#x27; at 36px, weight 400, with aggressive letter-spacing for main headings.
- Ensure &#x27;Caslon Ionic&#x27; is used for secondary, contextual information at 20px weight 400 to introduce typographic variation.
- Use &#x27;Ink Black&#x27; (#000000) sparingly for less prominent text elements or subtle borders, never as a primary brand color.
- Embrace the overall &#x27;comfortable&#x27; density by ensuring ample white space around typographic elements rather than compact layouts.

### Don&#x27;t
- Avoid using any colors other than &#x27;Designer Blue&#x27; or the neutrals (#ffffff, #000000) for UI elements.
- Do not use traditional button components; rely on &#x27;Link Blue Text&#x27; for interactive elements.
- Refrain from introducing decorative gradients, shadows, or rounded corners; the aesthetic is flat and sharp.
- Do not break character from the custom fonts &#x27;Wazlon&#x27; and &#x27;Caslon Ionic&#x27;; this site&#x27;s identity is deeply tied to its specific typography.
- Avoid generic imagery or illustrations; this site is text-dominant and graphically minimalist.
- Do not introduce complex grid systems or multi-column layouts; content should largely follow a linear, stacked progression modulated by text orientation.

## Imagery

The site is imagery-light, focusing almost exclusively on typography as its primary visual element. No photography, illustrations, or product screenshots are present. The &#x27;imagery&#x27; is the highly stylized, diagonally-oriented typography itself. If any icons were to be introduced, they would likely be minimalist, line-based, and in &#x27;Designer Blue&#x27; or &#x27;Ink Black&#x27;, serving purely functional roles rather than decorative ones. The visual density is extremely low, with text dominating the canvas.

## Layout

The page exhibits a full-bleed, vertically scrolled content model with highly dynamic, rotated text blocks. There is no traditional hero section; instead, the initial content presents key information in the brand&#x27;s unique typographic style. Section rhythm is dictated by the strategic placement and rotation of text, with no explicit visual dividers or alternating color bands. Content arrangement is primarily centered and stacked, but heavily influenced by the diagonal orientation, creating an asymmetric flow. No discernible fixed grid for cards or features is present; the layout is fluid and driven by the textual art direction. The density is very spacious, emphasizing negative space around content. Navigation, if present, is implicit through clickable text links rather than distinct navigation bars.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #ffffff
border: #3366ff (decorative)
accent: #3366ff
primary action: #3366ff (outlined action border)

Example Component Prompts:
Create a primary headline: &#x27;Wazlon&#x27; font, 36px, weight 400, &#x27;Designer Blue&#x27; (#3366ff) color, with negative letter spacing, rotated to 15 degrees.
Create a link: &#x27;Wazlon&#x27; font, 18px, weight 400, &#x27;Designer Blue&#x27; (#3366ff) color, no underline by default, with slight negative letter spacing.
Create a body text paragraph: &#x27;Wazlon&#x27; font, 18px, weight 400, &#x27;Ink Black&#x27; (#000000) color, with standard letter spacing and line height.
Create a contextual date tag: &#x27;Caslon Ionic&#x27; font, 20px, weight 400, &#x27;Ink Black&#x27; (#000000) color, with slight negative letter spacing, positioned near a link.
Create a decorative border: 1px solid stroke in &#x27;Designer Blue&#x27; (#3366ff) that acts as a subtle separator or framing element.

## Similar Brands

- **AIGA Eye on Design** — Shares a strong emphasis on experimental typography and a clear, minimal color palette as the primary design language.
- **Certain graphic design portfolios** — Focus on bespoke typefaces and unconventional layouts to convey a specific artistic identity, using very limited color palettes.
- **Some conceptual art websites** — Relies heavily on interaction with text and negative space to create visual interest rather than traditional imagery or componentry.
- **Actual Source** — Uses custom, distinctive typography and a generally spartan, visually impactful aesthetic with minimal UI elements.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-ink-black: #000000;
  --color-designer-blue: #3366ff;

  /* Typography — Font Families */
  --font-wazlon: &#x27;Wazlon&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-caslon-ionic: &#x27;Caslon Ionic&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-lg: 18px;
  --leading-lg: 1.3;
  --text-xl: 20px;
  --leading-xl: 1.35;
  --text-4xl: 36px;
  --leading-4xl: 1.3;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Layout */

  /* Named Radii */
  --radius-default: 0px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-ink-black: #000000;
  --color-designer-blue: #3366ff;

  /* Typography */
  --font-wazlon: &#x27;Wazlon&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-caslon-ionic: &#x27;Caslon Ionic&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-lg: 18px;
  --leading-lg: 1.3;
  --text-xl: 20px;
  --leading-xl: 1.35;
  --text-4xl: 36px;
  --leading-4xl: 1.3;
}
```

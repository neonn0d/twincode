# Leandro Farina — Style Reference
> Minimalist gallery canvas — imagery isolated by deep matte black and sharp, subtle typography.

**Theme:** dark

Leandro Farina&#x27;s visual system evokes a stark gallery aesthetic: pure black canvas, high-contrast typography, and unadorned image presentation. There&#x27;s a deliberate absence of color, borders, or any decorative elements, placing absolute focus on the photographic work. Typography remains understated and functional, providing context without drawing attention, while navigation is minimal and disappears when not needed. The overall impression is one of quiet contemplation, letting the art speak for itself.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Black | `#000000` | `--color-canvas-black` | Page backgrounds, card surfaces, primary text. This deep, absolute black serves as a dominant canvas, eliminating distractions |
| Muted Ash | `#999999` | `--color-muted-ash` | Secondary body text, subtle borders around some elements. A lighter gray for quieter information |
| Ghost Gray | `#bbbbbb` | `--color-ghost-gray` | Muted link text and ghost button borders, providing a faint presence against the black canvas |

## Tokens — Typography

### Sequel — Primary UI text for navigation, links, and project descriptions. Its custom nature and varying weights, particularly the lighter (100) weight, provide a refined, understated feel without being overly decorative. · `--font-sequel`
- **Substitute:** Helvetica Neue
- **Weights:** 100, 400
- **Sizes:** 13px, 16px, 17px, 27px
- **Line height:** 1.20, 1.54
- **Letter spacing:** normal
- **Role:** Primary UI text for navigation, links, and project descriptions. Its custom nature and varying weights, particularly the lighter (100) weight, provide a refined, understated feel without being overly decorative.

### Times — Small functional text, potentially for image captions or meta information where a classic, almost invisible presence is desired. · `--font-times`
- **Substitute:** serif
- **Weights:** 400
- **Sizes:** 16px
- **Line height:** 1.20
- **Letter spacing:** normal
- **Role:** Small functional text, potentially for image captions or meta information where a classic, almost invisible presence is desired.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 13px | 1.54 | — | `--text-caption` |
| body-sm | 16px | 1.54 | — | `--text-body-sm` |
| body | 17px | 1.54 | — | `--text-body` |
| body-lg | 27px | 1.3 | — | `--text-body-lg` |

## Tokens — Spacing & Shapes

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 10 | 10px | `--spacing-10` |
| 12 | 12px | `--spacing-12` |
| 15 | 15px | `--spacing-15` |
| 30 | 30px | `--spacing-30` |
| 45 | 45px | `--spacing-45` |
| 89 | 89px | `--spacing-89` |
| 90 | 90px | `--spacing-90` |
| 162 | 162px | `--spacing-162` |
| 164 | 164px | `--spacing-164` |
| 198 | 198px | `--spacing-198` |

### Border Radius

| Element | Value |
|---------|-------|
| none | 0px |

### Layout

- **Section gap:** 45px
- **Card padding:** 0px
- **Element gap:** 8px

## Components

### Ghost Navigation Button
**Role:** Primary navigation interaction, active link states.

Text-only buttons using Ghost Gray (#bbbbbb) for their color. No background, no explicit padding, no borders. Interacts by changing text color only. Example: &#x27;Menu&#x27; button.

### Project Card
**Role:** Image containers for portfolio items.

Completely borderless and shadow-free card. Background is Canvas Black (#000000). Contains an image and text description, all at 0px border radius, blending seamlessly with the page background.

### Muted Tag Badge
**Role:** Categorization for portfolio items.

Text-only badge using Ghost Gray (#bbbbbb), with no background, padding, or border, and 0px border radius. Used for tags like &#x27;#beauty&#x27; or &#x27;#selected&#x27;.

### Image Navigation Arrow
**Role:** Carousel navigation.

Invisible button container for next/previous arrows. Color #999999, no background or border, 0px radius. The arrow icon itself would be rendered in #999999.

## Do&#x27;s and Don&#x27;ts

### Do
- Always use Canvas Black (#000000) for page backgrounds and primary text to maintain a high-contrast, gallery-like feel.
- Present all images in their raw form, without borders, shadows, or applied corner radii; let the content define its edges.
- Employ Sequel font for all primary interface text, leveraging its thin weights (100) for a subtle, sophisticated presence.
- Utilize Ghost Gray (#bbbbbb) exclusively for inactive links and ghost controls, ensuring minimal visual hierarchy for non-primary actions.
- Keep all interactive elements, such as buttons and navigation links, as text-only or icon-only with no distinct backgrounds or borders unless explicitly for a hover/active state.
- Maintain generous spacing of 45px between major content sections to allow visual breathing room for portfolio pieces.
- Use 0px radius for all elements, including cards and buttons, to achieve a sharp, unyielding aesthetic.

### Don&#x27;t
- Avoid using any saturated colors; the system is strictly achromatic, with no exceptions for brand accents or semantic colors.
- Do not add any drop shadows or elevation effects; elements should exist on a single, flat plane against the Canvas Black.
- Refrain from using any background colors for buttons, badges, or cards; these components are defined by their content and text color alone.
- Do not introduce any decorative borders or outlines around images, cards, or sections; visual separation is achieved through negative space.
- Avoid bold or heavy font weights for headlines or primary text; prefer lighter weights like Sequel 100 or 400 for understated elegance.
- Do not use letter-spacing other than &#x27;normal&#x27; for any typography, preserving the intended rhythm of the font.
- Never apply rounded corners to any UI element; all corners should be sharp and rectilinear.

## Imagery

The site is image-heavy, dominated by highly stylized, professional photography from the artist&#x27;s portfolio. Images are treated as central content, displayed full-bleed within sections or as large, framed pieces. They are raw-edged, without rounding or overlays, and act as the primary visual interest. Icons (like navigation arrows) are minimal, outlined, and monochromatic, serving purely functional roles without decoration. The density is high in terms of image presence, making the site primarily a visual showcase.

## Layout

The page primarily follows a full-bleed layout for portfolio items, extending content to the edges, interspersed with max-width contained text. The header is a fixed top bar on larger screens, minimal, featuring the brand name and a &#x27;Menu&#x27; link. The hero pattern is a full-bleed image with overlaid, simple text. The main content area features large, often staggered or centered images, with project details appearing below. Vertical spacing between project blocks is consistent and generous, featuring a 45px section gap. There&#x27;s an implied grid for the project previews in the scrollable section, appearing as a two-column, slightly offset arrangement of image cards.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #000000
border: #999999
accent: no distinct accent color
primary action: no distinct CTA color

Example Component Prompts:
1. Create a top navigation bar: Canvas Black (#000000) background. &#x27;Leandro Farina&#x27; text in Sequel, weight 400, size 17px, color Canvas Black (#000000). Right-aligned &#x27;Menu&#x27; link in Sequel, weight 400, size 17px, color Ghost Gray (#bbbbbb).
2. Create a project description: Container on Canvas Black (#000000) background. Project title in Sequel, weight 400, size 27px, color Canvas Black (#000000). Tags separated by 8px element gap, using Muted Tag Badge style (#bbbbbb text, no background).
3. Create a horizontal navigation arrow: Uses Ghost Gray (#bbbbbb) color, embedded within an invisible container. Entire container has 0px padding and 0px border radius, blending with the Canvas Black (#000000) background.

## Similar Brands

- **A.P.C.** — Employs a stark, monochromatic palette with minimal UI chrome, focusing on product/content presentation.
- **Acne Studios** — Features large, unadorned photography against neutral backgrounds, with quiet typography.
- **The Row** — Utilizes a gallery-like presentation for visual content, with a strong emphasis on negative space and subtle type.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-black: #000000;
  --color-muted-ash: #999999;
  --color-ghost-gray: #bbbbbb;

  /* Typography — Font Families */
  --font-sequel: &#x27;Sequel&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-times: &#x27;Times&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.54;
  --text-body-sm: 16px;
  --leading-body-sm: 1.54;
  --text-body: 17px;
  --leading-body: 1.54;
  --text-body-lg: 27px;
  --leading-body-lg: 1.3;

  /* Typography — Weights */
  --font-weight-thin: 100;
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-15: 15px;
  --spacing-30: 30px;
  --spacing-45: 45px;
  --spacing-89: 89px;
  --spacing-90: 90px;
  --spacing-162: 162px;
  --spacing-164: 164px;
  --spacing-198: 198px;

  /* Layout */
  --section-gap: 45px;
  --card-padding: 0px;
  --element-gap: 8px;

  /* Named Radii */
  --radius-none: 0px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-black: #000000;
  --color-muted-ash: #999999;
  --color-ghost-gray: #bbbbbb;

  /* Typography */
  --font-sequel: &#x27;Sequel&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-times: &#x27;Times&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.54;
  --text-body-sm: 16px;
  --leading-body-sm: 1.54;
  --text-body: 17px;
  --leading-body: 1.54;
  --text-body-lg: 27px;
  --leading-body-lg: 1.3;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-15: 15px;
  --spacing-30: 30px;
  --spacing-45: 45px;
  --spacing-89: 89px;
  --spacing-90: 90px;
  --spacing-162: 162px;
  --spacing-164: 164px;
  --spacing-198: 198px;
}
```

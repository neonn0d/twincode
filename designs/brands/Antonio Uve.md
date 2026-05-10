# Antonio Uve — Style Reference
> sunny sketchpad, outlined whimsy

**Theme:** light

Antonio Uve presents a playful, high-contrast digital notebook aesthetic. A bold primary background color dominates the canvas, creating an immediate and memorable visual statement. Typography is kept minimal, relying on a single, distinctive font to carry the identity. Interaction elements are subtle, often featuring ghost-like outlines and large radii, maintaining a light and airy feel despite the strong background color.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Lemon Peel | `#f5f5e3` | `--color-lemon-peel` | Page background, hero canvas, footer background — a muted, almost pastel yellow that defines the brand&#x27;s primary visual space |
| Midnight Ink | `#000000` | `--color-midnight-ink` | Dark borders and separators for elevated surfaces and inverted UI. Do not promote it to the primary CTA color |
| Buttercup | `#f4d748` | `--color-buttercup` | Subtle background for specific sections or elements, offering a slightly richer yellow than the main canvas |

## Tokens — Typography

### Kostic — The sole typeface for all text elements including navigation, headings, body, and buttons. Its singular weight implies a consistent, unembellished tone across the interface, prioritizing clarity and directness over typographic hierarchy through weight. · `--font-kostic`
- **Substitute:** Arial
- **Weights:** 400
- **Sizes:** 9px, 26px, 123px
- **Line height:** 1.00
- **Role:** The sole typeface for all text elements including navigation, headings, body, and buttons. Its singular weight implies a consistent, unembellished tone across the interface, prioritizing clarity and directness over typographic hierarchy through weight.

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 14 | 14px | `--spacing-14` |
| 24 | 24px | `--spacing-24` |
| 55 | 55px | `--spacing-55` |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 428.571px |
| default | 17.1429px |

### Layout

- **Section gap:** 86px
- **Card padding:** 14px
- **Element gap:** 24px

## Components

### Ghost Navigation Link
**Role:** Navigation items in the header and footer

Text in Midnight Ink (#000000) set at 26px with a line height of 1.0. No background, serving as interactive text.

### Pill Ghost Button
**Role:** Interactive action buttons (e.g., &#x27;Email&#x27;, &#x27;Instagram&#x27;)

A ghost button with a full pill shape (428.571px radius). The text is Midnight Ink (#000000) and the button has a 1.5px solid Midnight Ink (#000000) border. Padding is 14px on all sides.

### Hero Headline
**Role:** Primary visual statement on the hero section

Large text at 123px, weight 400, in Midnight Ink (#000000), utilizing the Kostic typeface to immediately convey brand personality.

## Do&#x27;s and Don&#x27;ts

### Do
- Use Lemon Peel (#f5f5e3) as the default background for all page content, creating a consistent &#x27;sketchpad&#x27; feel.
- Apply Kostic typeface at weight 400 for all text elements to maintain typographic consistency.
- Ensure all interactive elements, particularly buttons, have a border-radius of 428.571px to achieve a distinct pill shape.
- Utilize Midnight Ink (#000000) for all text and UI outlines to provide maximum contrast against the background.
- Maintain a comfortable density with a standard element gap of 24px and section gaps of 86px for clear content separation.
- Employ a 1.5px solid border in Midnight Ink (#000000) for all outlined elements.
- Use a base line height of 1.0 across all text to keep a tight, compact typographic appearance.

### Don&#x27;t
- Avoid introducing gradients; the design system relies on flat, high-contrast colors.
- Do not use additional font weights or families; the Kostic font with its singular weight is the only approved typeface.
- Refrain from using shadows or elevation effects; the visual style emphasizes a flat, two-dimensional aesthetic.
- Do not add complex interactive states that involve significant color changes; interactions should be subtle and primarily outline-based.
- Avoid using any color other than Lemon Peel (#f5f5e3), Buttercup (#f4d748), or Midnight Ink (#000000) for UI elements.
- Do not break the established spacing rhythm; consistent use of 24px for elements and 86px for sections is crucial.
- Avoid adding new radii values; stick to 17.1429px for general elements and 428.571px for pill-shaped components.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Canvas | `#f5f5e3` | The primary background for the entire page, establishing the brand&#x27;s &#x27;sketchpad&#x27; foundation. |
| 2 | Section Background | `#f4d748` | Used for distinct content sections to create a subtle visual break while maintaining the yellow palette. |

## Imagery

The site primarily features vector-based illustrations and &#x27;silly animations&#x27; where color is vibrant and forms the core of the content rather than being a UI element. Icons are simple, outlined, and minimal, often incorporating the brand&#x27;s primary colors.

## Layout

The page uses a full-bleed layout, where the primary Lemon Peel background extends edge-to-edge. Content appears to be centered horizontally with significant vertical spacing between sections. The hero section features a prominent, centered headline. Navigation is a simple top bar with left (&#x27;Info&#x27;) and right (&#x27;Projects&#x27;) aligned links, all in a ghost-like text style. There is a focused content area with no complex grid structures apparent, emphasizing singular messages or sections. Elements are stacked vertically, creating a comfortable, unhurried rhythm.

## Agent Prompt Guide

Quick Color Reference:
text: #000000
background: #f5f5e3
border: #000000
accent: no distinct accent color
primary action: no distinct CTA color

Example Component Prompts:
1. Create a navigation header with two links: &#x27;Info&#x27; on the left and &#x27;Projects&#x27; on the right. Both links should use Kostic, weight 400, 26px, color #000000. The header background should be Lemon Peel (#f5f5e3).
2. Generate a hero section with the headline &#x27;Illustrations & silly animations&#x27;. The headline should use Kostic, weight 400, 123px, color #000000, centered on a Lemon Peel (#f5f5e3) background.
3. Design a contact button labeled &#x27;Email Email&#x27;. It should be a pill-shaped ghost button with a 428.571px border-radius, 1.5px solid #000000 border, 14px padding, and text in Kostic, weight 400, 26px, color #000000.

## Similar Brands

- **Mr. Doodle** — Heavy reliance on a single, distinctive visual artist&#x27;s style and a minimalist UI supporting the art.
- **Lisa Frank (modern interpretation)** — Bold, saturated primary color backgrounds combined with playful, graphic-heavy content devoid of complex UI.
- **Playful portfolio sites from graphic designers** — Use of high-contrast text on a single, vibrant background color and a distinctive, often custom, typeface.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-lemon-peel: #f5f5e3;
  --color-midnight-ink: #000000;
  --color-buttercup: #f4d748;

  /* Typography — Font Families */
  --font-kostic: &#x27;Kostic&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-2xl: 26px;
  --leading-2xl: 1;
  --text-5xl: 123px;
  --leading-5xl: 1;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-14: 14px;
  --spacing-24: 24px;
  --spacing-55: 55px;

  /* Layout */
  --section-gap: 86px;
  --card-padding: 14px;
  --element-gap: 24px;

  /* Border Radius */
  --radius-2xl: 17.1429px;
  --radius-full: 428.571px;

  /* Named Radii */
  --radius-buttons: 428.571px;
  --radius-default: 17.1429px;

  /* Surfaces */
  --surface-canvas: #f5f5e3;
  --surface-section-background: #f4d748;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-lemon-peel: #f5f5e3;
  --color-midnight-ink: #000000;
  --color-buttercup: #f4d748;

  /* Typography */
  --font-kostic: &#x27;Kostic&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-2xl: 26px;
  --leading-2xl: 1;
  --text-5xl: 123px;
  --leading-5xl: 1;

  /* Spacing */
  --spacing-14: 14px;
  --spacing-24: 24px;
  --spacing-55: 55px;

  /* Border Radius */
  --radius-2xl: 17.1429px;
  --radius-full: 428.571px;
}
```

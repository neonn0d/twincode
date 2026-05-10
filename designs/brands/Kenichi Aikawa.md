# Kenichi Aikawa — Style Reference
> Photographic gallery on crisp paper. A precise grid with generous negative space showcases imagery and text like exhibits in a minimalist art gallery.

**Theme:** light

The Kenichi Aikawa design system embodies a minimal, high-contrast aesthetic that privileges content. It balances the starkness of dark text on a pure white canvas with the understated elegance of custom typography. Spacing is generous, creating a spacious, uncluttered environment where photographic works are given ample room to breathe. Interactions are subtle, using faint borders and text changes rather than overt color or heavy components, focusing attention on the visual artistry.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Basalt Black | `#2d2926` | `--color-basalt-black` | Dark borders and separators for elevated surfaces and inverted UI. Do not promote it to the primary CTA color |
| Canvas White | `#ffffff` | `--color-canvas-white` | Dominant background for the entire application, providing a clean, bright stage for content and typography |
| Ash Gray | `#7c8780` | `--color-ash-gray` | Secondary text for less prominent information or subtle informational accents |
| Whisper Gray | `#c1c6c8` | `--color-whisper-gray` | Subtle border color for UI elements and dividers, allowing for visual separation without introducing harsh lines |
| Pale Silver | `#d0d3d4` | `--color-pale-silver` | Placeholder or preloader stroke color; a very light, almost imperceptible shade |

## Tokens — Typography

### PP Editorial New — Used for distinctive headings and prominent text elements. Its serif nature provides a classic, editorial feel, while tight letter-spacing at larger sizes maintains a composed, elegant presence. · `--font-pp-editorial-new`
- **Weights:** 400
- **Sizes:** 20px, 58px
- **Line height:** 1.00
- **Letter spacing:** -0.0500em at 58px, -0.0300em at 20px
- **OpenType features:** `"palt"`
- **Role:** Used for distinctive headings and prominent text elements. Its serif nature provides a classic, editorial feel, while tight letter-spacing at larger sizes maintains a composed, elegant presence.

### PP Neue Montreal — Primary sans-serif typeface for body text, navigation items, and functional labels. Its neutrality and legibility support a clean, modern aesthetic. · `--font-pp-neue-montreal`
- **Weights:** 400
- **Sizes:** 13px, 15px
- **Line height:** 1.00
- **Letter spacing:** normal
- **OpenType features:** `"palt"`
- **Role:** Primary sans-serif typeface for body text, navigation items, and functional labels. Its neutrality and legibility support a clean, modern aesthetic.

## Tokens — Spacing & Shapes

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 15 | 15px | `--spacing-15` |
| 50 | 50px | `--spacing-50` |

### Border Radius

| Element | Value |
|---------|-------|
| none | 0px |

### Layout

- **Section gap:** 75px
- **Card padding:** 25px
- **Element gap:** 15px

## Components

### Navigation Link
**Role:** Interactive text link within the header and navigation menus.

Appears as 15px PP Neue Montreal, weight 400, Basalt Black text on Canvas White. On hover, a 1px Basalt Black bottom border appears. Padding is 15px vertical, with 50px horizontal inherited from the parent container.

### Body Text Block
**Role:** Standard paragraph text and small informational labels.

Rendered in 13px PP Neue Montreal, weight 400, Basalt Black. Line height is 1, with normal letter spacing.

### Heading - Large
**Role:** Primary headline for sections, providing visual emphasis.

Displayed in 58px PP Editorial New, weight 400, Basalt Black. Letter spacing is -0.0500em, creating a sophisticated condensed look. Features &#x27;palt&#x27; setting for proportional alternative spacing.

### Heading - Medium
**Role:** Secondary headline for subsections or categorized content.

Uses 20px PP Editorial New, weight 400, Basalt Black. Letter spacing is -0.0300em, maintaining the tight, elegant feel of the larger headings. Features &#x27;palt&#x27; setting.

### Interactive Border
**Role:** Outline indicator for hover or focus states on navigation items and other interactive elements.

A 1px solid border in Basalt Black (#2d2926) appears on interaction. This keeps the visual feedback subtle and aligned with the high-contrast monochrome design.

## Do&#x27;s and Don&#x27;ts

### Do
- Always use Basalt Black (#2d2926) for primary text on Canvas White (#ffffff) backgrounds to maintain high contrast.
- Apply PP Editorial New, weight 400 for all headings to establish a distinct editorial tone, with `letter-spacing: -0.0500em` for 58px and `-0.0300em` for 20px text.
- Employ PP Neue Montreal, weight 400 for all body text, navigation links, and functional copy, ensuring legibility and a neutral aesthetic.
- Utilize 15px vertical padding for interactive text elements like navigation links to provide clear click targets and visual breathing room.
- Maintain generous spacing between content sections (e.g., sectionGap: 75px) to achieve a spacious and uncluttered page density.
- Implement 1px Basalt Black (#2d2926) borders as subtle accent or hover states, avoiding any filled button backgrounds or heavy visual indicators.

### Don&#x27;t
- Do not introduce strong accent colors; the palette should remain predominantly monochrome with subtle grays.
- Avoid using shadows or gradients; rely on contrast and spacing for visual hierarchy rather than elevation effects.
- Do not deviate from the specified letter-spacing for PP Editorial New; its tight tracking is a signature element of the typography.
- Do not use heavy, filled button styles; all interactive elements should be text-based or use subtle borders.
- Do not create dense blocks of text or tightly packed UI; prioritize spacious layouts and ample negative space.

## Imagery

This design system primarily utilizes photography as its visual language, given the photographer&#x27;s portfolio nature. The treatment of images, which are not explicitly provided in the token data but implied by the system&#x27;s aesthetic, would be full-bleed or large contained crops. Imagery is the hero, framed by abundant negative space. Product photography or lifestyle shots (depending on the project) would be the focus, with minimal overlays or complex masking, allowing the inherent qualities of the photograph to shine. Icons, if present, are minimal, likely outlined with a fine stroke, adhering to the monochrome palette. The density is image-heavy, with text serving to label and contextualize the visuals.

## Layout

The page model is a max-width contained layout in certain sections, but primarily presents imagery in a full-bleed or near full-bleed manner. The hero section often features large photographic content with centered, minimal text. Section rhythm is characterized by consistent vertical spacing (implied 75px sectionGap) and a seamless flow between content blocks, with no hard visual dividers like alternating colored bands. Content arrangement likely follows a grid system for portfolio items, where images are primary and text is secondary, providing labels or brief descriptions. The overall density is spacious, reflecting an exhibition-like presentation. Navigation is a compact top bar which seems to be sticky, allowing for persistent access while maintaining a clean aesthetic.

## Agent Prompt Guide

Quick Color Reference:
text: #2d2926
background: #ffffff
border: #c1c6c8
accent: no distinct accent color
primary action: no distinct CTA color

Example Component Prompts:
1. Create a Header Navigation item: &#x27;Works&#x27;. Text in 15px PP Neue Montreal, weight 400, Basalt Black (#2d2926). Hover state shows a 1px solid Basalt Black (#2d2926) bottom border. Left margin is 7px.
2. Create a Section Headline: &#x27;Featured Projects&#x27;. Text in 58px PP Editorial New, weight 400, Basalt Black (#2d2926), letter-spacing -0.0500em, with font-feature-settings &#x27;palt&#x27;.
3. Create a Body Paragraph: &#x27;This project explores urban landscapes through a monochromatic lens.&#x27; Text in 13px PP Neue Montreal, weight 400, Basalt Black (#2d2926), normal letter spacing.
4. Create a Secondary Text Label: &#x27;Updated 2023&#x27;. Text in 13px PP Neue Montreal, weight 400, Ash Gray (#7c878e), normal letter spacing.

## Similar Brands

- **AIGA Design Archives** — Monochromatic palette, emphasis on high-quality visuals, and refined typography.
- **The New York Times Online** — High contrast black-on-white text, elegant serif headlines, and strong focus on content.
- **Squarespace templates (certain portfolios)** — Spacious layouts, minimal UI, and a focus on presenting imagery without distraction.
- **Vogue Online (text-heavy content)** — Editorial serif typography for headlines, with clean sans-serif for body, creating a sophisticated journal-like feel.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-basalt-black: #2d2926;
  --color-canvas-white: #ffffff;
  --color-ash-gray: #7c8780;
  --color-whisper-gray: #c1c6c8;
  --color-pale-silver: #d0d3d4;

  /* Typography — Font Families */
  --font-pp-editorial-new: &#x27;PP Editorial New&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-pp-neue-montreal: &#x27;PP Neue Montreal&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-sm: 13px;
  --leading-sm: 1;
  --text-base: 15px;
  --leading-base: 1;
  --text-xl: 20px;
  --leading-xl: 1;
  --text-5xl: 58px;
  --leading-5xl: 1;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-15: 15px;
  --spacing-50: 50px;

  /* Layout */
  --section-gap: 75px;
  --card-padding: 25px;
  --element-gap: 15px;

  /* Named Radii */
  --radius-none: 0px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-basalt-black: #2d2926;
  --color-canvas-white: #ffffff;
  --color-ash-gray: #7c8780;
  --color-whisper-gray: #c1c6c8;
  --color-pale-silver: #d0d3d4;

  /* Typography */
  --font-pp-editorial-new: &#x27;PP Editorial New&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-pp-neue-montreal: &#x27;PP Neue Montreal&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-sm: 13px;
  --leading-sm: 1;
  --text-base: 15px;
  --leading-base: 1;
  --text-xl: 20px;
  --leading-xl: 1;
  --text-5xl: 58px;
  --leading-5xl: 1;

  /* Spacing */
  --spacing-15: 15px;
  --spacing-50: 50px;
}
```

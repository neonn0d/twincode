# Vizcom — Style Reference
> digital workbench, blueprint sketch

**Theme:** dark

Vizcom presents a dark, high-contrast digital workbench aesthetic, inspired by traditional drawing and industrial design. The layout features stark monochrome surfaces punctuated by a single vivid blue for primary actions and interactive elements. Thin borders and subtle elevation define components, prioritizing functionality and a focused user experience. Textures of paper, charcoal, and engineering blueprints provide an underlying tactile quality to the otherwise digital interface.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink Black | `#191919` | `--color-ink-black` | Primary background for pages and main content areas, creating a dramatic, deep canvas for design work |
| Canvas White | `#f8f4f1` | `--color-canvas-white` | Primary text color and default icon color, providing high contrast against dark backgrounds. Also used for outlined button borders |
| Blueprint Navy | `#1145a0` | `--color-blueprint-navy` | Subtle background for UI elements, hinting at a deep and technical digital environment |
| Input Blue | `#4c4cef` | `--color-input-blue` | Violet state accent for badges, validation surfaces, and short status labels. Do not promote it to the primary CTA color |
| Ideation Blue | `#4586da` | `--color-ideation-blue` | Primary accent for call-to-action buttons, active navigation items, and interactive highlights, guiding user flow |
| Paper Grey | `#e8e3dd` | `--color-paper-grey` | Secondary text color and backgrounds for some secondary UI elements, offering a softer alternative to Canvas White |
| Dots Black | `#242425` | `--color-dots-black` | Card backgrounds and secondary surface layers, providing depth above the main Ink Black canvas |
| Deep Space | `#131313` | `--color-deep-space` | Darkest background for subtle differentiation, often for deeper nested panels or modals |
| Slate Border | `#3c3c3e` | `--color-slate-border` | Fine borders for cards, inputs, and dividers, providing structure without harsh lines |
| Faded Grey | `#5c5b5a` | `--color-faded-grey` | Placeholder text and subtle secondary information, receding into the background |
| Dark Card | `#2f2f31` | `--color-dark-card` | Elevated card backgrounds and tag elements, slightly lighter than Dots Black to indicate hierarchy |
| Subtle Gray Border | `#8d8a88` | `--color-subtle-gray-border` | Used for inactive or ghost button borders, providing a soft-touch outline |
| Button Outline | `#b5b2b0` | `--color-button-outline` | Medium-contrast borders, control outlines, and structural separators. Do not promote it to the primary CTA color |
| Brick Red | `#c94b3c` | `--color-brick-red` | Accents within illustrations or specific feature highlights, evoking material properties |
| Prototype Purple | `#974069` | `--color-prototype-purple` | Illustrative details or secondary accent, adding visual interest |
| Lighter Lime | `#cdea9d` | `--color-lighter-lime` | Illustrative details or secondary accent, providing a touch of organic color |
| Work Olive | `#c2ba43` | `--color-work-olive` | Illustrative details or secondary accent, grounding the digital feel with earthy tones |
| Clay Orange | `#ee855a` | `--color-clay-orange` | Accent color for illustrative elements, suggesting warmth or creation |
| Dream Pink | `#cb83d1` | `--color-dream-pink` | Accent color for illustrative elements, contributing to a creative, dreamlike quality |

## Tokens — Typography

### Matter — Primary UI font for all text elements: headings, body copy, navigation, buttons, and form fields. Its varied weights and tightly-controlled letter-spacing support precise visual hierarchy. · `--font-matter`
- **Substitute:** Inter
- **Weights:** 400, 500
- **Sizes:** 12px, 14px, 16px, 18px, 20px, 24px, 56px, 88px, 265px
- **Line height:** 1.00, 1.10, 1.20, 1.30, 1.40, 1.43
- **Letter spacing:** -0.0200em at 56px, -0.0100em at 24px and below: A crisp, compact sans-serif that ensures clarity and efficiency even at large headline sizes, maintaining a technical yet approachable feel.
- **Role:** Primary UI font for all text elements: headings, body copy, navigation, buttons, and form fields. Its varied weights and tightly-controlled letter-spacing support precise visual hierarchy.

### Tomboy LP — Display font for large, brand-defining headlines and artistic text. Its unique character adds a handcrafted, industrial-sketch aesthetic that contrasts with the Matter typeface. · `--font-tomboy-lp`
- **Substitute:** Montserrat Alternates
- **Weights:** 700
- **Sizes:** 56px, 265px
- **Line height:** 1.10, 1.20
- **Letter spacing:** -0.0200em: A bold, impactful display font used exclusively for hero headlines and graphic elements, conveying a raw, sketched, and unrefined aesthetic.
- **Role:** Display font for large, brand-defining headlines and artistic text. Its unique character adds a handcrafted, industrial-sketch aesthetic that contrasts with the Matter typeface.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.3 | — | `--text-caption` |
| body-sm | 14px | 1.3 | — | `--text-body-sm` |
| body | 16px | 1.3 | — | `--text-body` |
| body-lg | 18px | 1.3 | — | `--text-body-lg` |
| heading-sm | 20px | 1.3 | — | `--text-heading-sm` |
| heading | 24px | 1.3 | — | `--text-heading` |
| heading-lg | 56px | 1.3 | — | `--text-heading-lg` |
| display-sm | 88px | 1.3 | — | `--text-display-sm` |
| display | 265px | 1.3 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 6 | 6px | `--spacing-6` |
| 8 | 8px | `--spacing-8` |
| 10 | 10px | `--spacing-10` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 18 | 18px | `--spacing-18` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 90 | 90px | `--spacing-90` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---------|-------|
| pill | 1440px |
| tags | 8px |
| cards | 12px |
| buttons | 8px |
| default | 8px |

### Layout

- **Section gap:** 90px
- **Card padding:** 12px
- **Element gap:** 8px

## Components

### Primary Action Button
**Role:** Call-to-action

Filled button with &#x27;Ideation Blue&#x27; background (#4586da), &#x27;Canvas White&#x27; text (#f8f4f1), 8px border-radius, and 12px 18px padding for prominence.

### Ghost Button
**Role:** Secondary action or navigation

Transparent background with &#x27;Canvas White&#x27; text (#f8f4f1) and &#x27;Canvas White&#x27; border (#f8f4f1), 0px border-radius and 0px padding. Often used in navigation or as a text link.

### Pill Button
**Role:** Tertiary action or filter

&#x27;Canvas White&#x27; background (#f8f4f1) with a &#x27;Button Outline&#x27; border (#b5b2b0), &#x27;Canvas White&#x27; text (#f8f4f1), and a large 1440px border-radius to create a pill shape. 0px padding.

### Standard Card
**Role:** Content container

&#x27;Dots Black&#x27; background (#242425) with 12px border-radius and no shadow. 0px padding, allowing inner content to define spacing.

### Padded Card
**Role:** Content container with integrated spacing

&#x27;Dots Black&#x27; background (#242425) with 16px border-radius and 16px padding inside. No shadow.

### Elevated Panel Card
**Role:** Prominent content container

&#x27;Dark Card&#x27; background (#2f2f31) with 8px border-radius and 8px padding. Used for smaller, more focused UI elements within a panel.

### Text Input (Dark Theme)
**Role:** User input field

&#x27;Paper Grey&#x27; background (#e8e3dd) with &#x27;Ink Black&#x27; text (#191919), 4px border-radius, and 4px 8px padding. Used for light-themed inputs within a predominantly dark UI.

### Status Badge
**Role:** Categorization or status indicator

&#x27;Dark Card&#x27; background (#2f2f31) with &#x27;Canvas White&#x27; text (#f8f4f1), 8px border-radius, and 6px 12px padding.

## Do&#x27;s and Don&#x27;ts

### Do
- Prioritize &#x27;Ink Black&#x27; (#191919) as the default background for most content and &#x27;Canvas White&#x27; (#f8f4f1) for primary text to maintain high contrast.
- Use &#x27;Ideation Blue&#x27; (#4586da) exclusively for primary call-to-action buttons and active interactive states, providing a clear visual cue for engagement.
- Apply &#x27;Matter&#x27; for all UI text, varying weights (400, 500) and sizes according to the type scale. Maintain tight letter spacing, especially at larger sizes.
- Reserve &#x27;Tomboy LP&#x27; (weight 700) for large, impactful section headlines to inject a raw, sketched aesthetic.
- Use &#x27;Dots Black&#x27; (#242425) or &#x27;Dark Card&#x27; (#2f2f31) for card backgrounds and secondary surfaces to create subtle layering against the main &#x27;Ink Black&#x27; background.
- Implement 8px border-radius as the default for most interactive elements (icons, buttons, inputs, badges), reserving 12px or 16px for larger cards and 1440px for pill-shaped elements.
- Define element spacing using multiples of 8px and 12px for `elementGap` and `cardPadding` respectively, with a `sectionGap` of 90px to ensure comfortable density.

### Don&#x27;t
- Do not introduce new chromatic colors outside of the defined accent palette; use the existing vivid blues for UI differentiation.
- Avoid generic large drop shadows; elevation should be subtle and primarily driven by background color changes rather than heavy shadows.
- Do not use &#x27;Tomboy LP&#x27; for body text, navigation, or any functional UI text; its expressive nature is intended for display purposes only.
- Avoid using bold or heavily saturated colors for secondary UI text or disabled states; use &#x27;Faded Grey&#x27; (#5c5b5a) or &#x27;Paper Grey&#x27; (#e8e3dd) for such cases.
- Do not use generic border-radii; adhere strictly to the 8px, 12px, 16px, or 1440px values provided for specific component types.
- Do not deviate from the established spacing hierarchy; maintain the `elementGap` of 8px and `sectionGap` of 90px for consistent visual rhythm.
- Avoid using multiple font families beyond &#x27;Matter&#x27; and &#x27;Tomboy LP&#x27;; maintain typographic consistency.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Deep Space | `#131313` | Base canvas for the deepest background layers and primary page container. |
| 1 | Ink Black | `#191919` | Primary background for main content areas, providing a dark, immersive foundation. |
| 2 | Dots Black | `#242425` | Background for standard cards and major content blocks, creating the first layer of subtle elevation. |
| 3 | Dark Card | `#2f2f31` | Background for elevated cards, badges, and focused panels, providing a slightly lighter surface for higher hierarchy. |

## Imagery

Imagery primarily features product design sketches and photorealistic 3D renders, emphasizing the core functionality of the AI tool. The treatment is a mix of hand-drawn, often wireframe-like sketches (like the hero car or jacket) and clean, focused 3D product shots (like the copper car). Photography, when present, shows a clean, studio-like environment (e.g., the workspace shot) with minimal lifestyle context, focusing on the tools and output. Icons are minimal, outlined, and monochromatic, with a fine stroke weight, often adopting the &#x27;Canvas White&#x27; or &#x27;Faded Grey&#x27; color. The density is moderate; imagery serves to illustrate and explain product features rather than purely decorate, with a balance between visual elements and descriptive text.

## Layout

The page follows a max-width contained model, ensuring content readability on larger screens, rather than full-bleed. The hero section is distinct: a full-bleed, dark background with a large, central &#x27;Tomboy LP&#x27; headline and illustrated elements, drawing immediate attention. Subsequent sections alternate between dark and light backgrounds for visual rhythm, employing a responsive two-column text+image pattern that often reverses direction. Feature grids are organized in compact, card-based layouts. Navigation is a sticky top bar with a left-aligned logo and right-aligned links and calls-to-action.

## Agent Prompt Guide

Quick Color Reference:
text: #f8f4f1
background: #191919
border: #e8e3dd
accent: #4586da
primary action: #4586da (filled action)

Example Component Prompts:
1. Create a Primary Action Button: #4586da background, #f8f4f1 text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.
2. Design a feature card: &#x27;Dots Black&#x27; background, 12px border-radius, 12px padding. Headline using Matter weight 500 at 24px, #f8f4f1. Body text using Matter weight 400 at 16px, #f8f4f1. Element gap 8px between elements.
3. Create a dark-themed text input: &#x27;Paper Grey&#x27; background, &#x27;Ink Black&#x27; text using Matter weight 400 at 16px, 4px border-radius. Placeholder text in &#x27;Faded Grey&#x27; (#5c5b5a). Padding 4px 8px inside.

## Similar Brands

- **Framer** — Clean, dark UI with a strong emphasis on typography and a single vibrant accent color for interaction.
- **Linear** — Monochromatic dark interface, highly functional, with minimal ornamentation and precise typography.
- **Supabase** — Utilizes a dark, development-oriented aesthetic with subtle background patterns and a controlled chromatic accent palette.
- **Midjourney** — Abstract and creative focus, often featuring AI-generated outputs, similar to Vizcom&#x27;s rendering capabilities, within a dark canvas.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-ink-black: #191919;
  --color-canvas-white: #f8f4f1;
  --color-blueprint-navy: #1145a0;
  --color-input-blue: #4c4cef;
  --color-ideation-blue: #4586da;
  --color-paper-grey: #e8e3dd;
  --color-dots-black: #242425;
  --color-deep-space: #131313;
  --color-slate-border: #3c3c3e;
  --color-faded-grey: #5c5b5a;
  --color-dark-card: #2f2f31;
  --color-subtle-gray-border: #8d8a88;
  --color-button-outline: #b5b2b0;
  --color-brick-red: #c94b3c;
  --color-prototype-purple: #974069;
  --color-lighter-lime: #cdea9d;
  --color-work-olive: #c2ba43;
  --color-clay-orange: #ee855a;
  --color-dream-pink: #cb83d1;

  /* Typography — Font Families */
  --font-matter: &#x27;Matter&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-tomboy-lp: &#x27;Tomboy LP&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 12px;
  --leading-caption: 1.3;
  --text-body-sm: 14px;
  --leading-body-sm: 1.3;
  --text-body: 16px;
  --leading-body: 1.3;
  --text-body-lg: 18px;
  --leading-body-lg: 1.3;
  --text-heading-sm: 20px;
  --leading-heading-sm: 1.3;
  --text-heading: 24px;
  --leading-heading: 1.3;
  --text-heading-lg: 56px;
  --leading-heading-lg: 1.3;
  --text-display-sm: 88px;
  --leading-display-sm: 1.3;
  --text-display: 265px;
  --leading-display: 1.3;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-18: 18px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-90: 90px;
  --spacing-160: 160px;

  /* Layout */
  --section-gap: 90px;
  --card-padding: 12px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 1440px;

  /* Named Radii */
  --radius-pill: 1440px;
  --radius-tags: 8px;
  --radius-cards: 12px;
  --radius-buttons: 8px;
  --radius-default: 8px;

  /* Surfaces */
  --surface-deep-space: #131313;
  --surface-ink-black: #191919;
  --surface-dots-black: #242425;
  --surface-dark-card: #2f2f31;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-ink-black: #191919;
  --color-canvas-white: #f8f4f1;
  --color-blueprint-navy: #1145a0;
  --color-input-blue: #4c4cef;
  --color-ideation-blue: #4586da;
  --color-paper-grey: #e8e3dd;
  --color-dots-black: #242425;
  --color-deep-space: #131313;
  --color-slate-border: #3c3c3e;
  --color-faded-grey: #5c5b5a;
  --color-dark-card: #2f2f31;
  --color-subtle-gray-border: #8d8a88;
  --color-button-outline: #b5b2b0;
  --color-brick-red: #c94b3c;
  --color-prototype-purple: #974069;
  --color-lighter-lime: #cdea9d;
  --color-work-olive: #c2ba43;
  --color-clay-orange: #ee855a;
  --color-dream-pink: #cb83d1;

  /* Typography */
  --font-matter: &#x27;Matter&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-tomboy-lp: &#x27;Tomboy LP&#x27;, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 12px;
  --leading-caption: 1.3;
  --text-body-sm: 14px;
  --leading-body-sm: 1.3;
  --text-body: 16px;
  --leading-body: 1.3;
  --text-body-lg: 18px;
  --leading-body-lg: 1.3;
  --text-heading-sm: 20px;
  --leading-heading-sm: 1.3;
  --text-heading: 24px;
  --leading-heading: 1.3;
  --text-heading-lg: 56px;
  --leading-heading-lg: 1.3;
  --text-display-sm: 88px;
  --leading-display-sm: 1.3;
  --text-display: 265px;
  --leading-display: 1.3;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-18: 18px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-90: 90px;
  --spacing-160: 160px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 1440px;
}
```

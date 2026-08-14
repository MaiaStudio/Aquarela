# Aquarela Design — Design System v1.0

> Static foundation for the Aquarela Design landing page.  
> This system is intentionally restrained: neutral surfaces, editorial typography, generous spacing, and two controlled brand accents — Olive Green and Royal Yellow.

---

## 1. Design Principles

### 1.1 Perception before decoration
Every visual decision must increase perceived quality, clarity, confidence, or memorability. Avoid decorative elements that do not support hierarchy or brand perception.

### 1.2 Editorial over “agency template”
The page should feel closer to a carefully art-directed editorial experience than to a conventional SaaS or marketing template.

Avoid:
- repeated card grids;
- icon-heavy feature sections;
- pill badges everywhere;
- excessive borders;
- gradients used as decoration;
- glassmorphism as a default treatment;
- generic “creative agency” visual clichés.

### 1.3 Space is part of the identity
Negative space must be treated as an active design element. Do not compress sections merely to fit more content above the fold.

### 1.4 Strong contrast, limited palette
The visual system should be mostly neutral. Olive Green and Royal Yellow are accents, not background colors to be applied everywhere.

### 1.5 Typography carries the experience
The page should remain visually strong even with all decorative imagery removed. Scale, line breaks, whitespace, alignment, and typographic rhythm are core parts of the art direction.

---

## 2. Brand Palette

### Core Neutrals

| Token | Hex | Usage |
|---|---:|---|
| `--color-ink` | `#171814` | Primary text, dark sections, controls |
| `--color-paper` | `#F4F1E8` | Main light background |
| `--color-surface` | `#EAE6DB` | Secondary light surface |
| `--color-surface-strong` | `#DAD5C8` | Dividers, selected areas, subtle emphasis |
| `--color-muted` | `#66685F` | Supporting body copy and metadata |
| `--color-white` | `#FFFFFF` | High-contrast text on dark/olive surfaces |

### Brand Accents

| Token | Hex | Usage |
|---|---:|---|
| `--color-olive` | `#596332` | Primary brand accent, selected states, strong branded surfaces |
| `--color-olive-dark` | `#414A24` | Hover/pressed states and darker contrast |
| `--color-olive-soft` | `#DDE1C7` | Very light accent surface |
| `--color-yellow` | `#F2C84B` | Secondary accent, emphasis, CTA moments |
| `--color-yellow-soft` | `#F8E7A6` | Highlight backgrounds and subtle accents |

### Semantic Colors

| Token | Hex | Usage |
|---|---:|---|
| `--color-success` | `#3F6B45` | Form success only |
| `--color-error` | `#A34535` | Form validation only |
| `--color-focus` | `#F2C84B` | Keyboard focus ring |

---

## 3. Approved Color Relationships

Prefer these combinations:

- `ink` on `paper`
- `ink` on `surface`
- `paper` or `white` on `olive`
- `ink` on `yellow`
- `paper` on `ink`
- `yellow` as a small accent on `ink`
- `olive` as a small accent on `paper`

Avoid:
- Yellow body text on light backgrounds
- Olive text over Royal Yellow for small text
- Large areas where Olive and Yellow compete at equal visual weight
- Multiple accent colors inside the same small component
- Gray-on-gray low-contrast typography

Royal Yellow should usually behave as **punctuation**. Olive Green should behave as the **primary brand anchor**.

---

## 4. Suggested CSS Variables

```css
:root {
  --color-ink: #171814;
  --color-paper: #f4f1e8;
  --color-surface: #eae6db;
  --color-surface-strong: #dad5c8;
  --color-muted: #66685f;
  --color-white: #ffffff;

  --color-olive: #596332;
  --color-olive-dark: #414a24;
  --color-olive-soft: #dde1c7;

  --color-yellow: #f2c84b;
  --color-yellow-soft: #f8e7a6;

  --color-success: #3f6b45;
  --color-error: #a34535;
  --color-focus: #f2c84b;
}
```

---

## 5. Typography

### 5.1 Logo typeface

**Sogea** is reserved exclusively for the Aquarela wordmark.

Rules:
- Do not use Sogea for headings.
- Do not use Sogea for body copy.
- Do not use Sogea for buttons.
- Do not artificially track or distort the logotype unless the supplied brand asset requires it.
- Load the local font from `/assets` using `next/font/local`.
- Prefer rendering the wordmark as live text if the supplied font reproduces the approved logo exactly.
- If an approved vector logo asset exists, use the vector instead of reconstructing it.

### 5.2 Interface typeface

Use **Geist Sans** as the default interface/display family if already available in the project. If it is not available, use a high-quality neutral sans-serif stack and do not block implementation on an external font download.

Recommended fallback:

```css
font-family:
  "Geist",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

### 5.3 Typographic character

The type system should feel:
- contemporary;
- precise;
- editorial;
- neutral enough to let the Aquarela logo remain distinctive;
- highly legible at large and small sizes.

Do not use more than:
- one display/interface family;
- one logo family.

---

## 6. Type Scale

Use fluid typography with `clamp()`.

### Display / Hero

```css
--type-display-xl: clamp(4.25rem, 9vw, 9.5rem);
--type-display-lg: clamp(3.4rem, 7vw, 7.5rem);
--type-display-md: clamp(2.7rem, 5.4vw, 5.75rem);
```

Suggested usage:
- Hero question: `display-lg`
- Major section statements: `display-md`
- Closing statement: `display-lg`

### Headings

```css
--type-h1: clamp(3rem, 5vw, 5.5rem);
--type-h2: clamp(2.25rem, 3.7vw, 4rem);
--type-h3: clamp(1.5rem, 2.2vw, 2.25rem);
```

### Body

```css
--type-body-lg: clamp(1.125rem, 1.4vw, 1.375rem);
--type-body: 1rem;
--type-body-sm: 0.875rem;
--type-label: 0.75rem;
```

### Line Height

```css
--leading-display: 0.92;
--leading-heading: 1.02;
--leading-body-lg: 1.45;
--leading-body: 1.55;
```

### Letter Spacing

```css
--tracking-display: -0.045em;
--tracking-heading: -0.03em;
--tracking-body: -0.01em;
--tracking-label: 0.08em;
```

Labels may use uppercase sparingly. Do not uppercase long sentences.

---

## 7. Typographic Hierarchy Rules

### Display copy
Use deliberate line breaks. Do not allow automatic wrapping to define major creative compositions on desktop.

### Body copy
Recommended maximum measure:

```css
max-width: 42rem;
```

For larger supporting statements:

```css
max-width: 54rem;
```

### Microcopy
Use subdued contrast but maintain accessibility. Never make important explanatory text visually disappear.

### Bold
Avoid heavy use of `font-weight: 700+`. Prefer scale, spacing, contrast, and composition over excessive boldness.

Recommended range:
- Body: `400`
- Supporting emphasis: `500`
- Headings: `500–600`

---

## 8. Layout Grid

### Global container

```css
--container-max: 1440px;
--container-wide: 1680px;
```

### Horizontal page gutter

```css
--gutter: clamp(1.25rem, 4vw, 4.5rem);
```

### Desktop grid
Use a **12-column grid**.

Recommended:
- column gap: `clamp(1rem, 1.5vw, 1.75rem)`
- content may intentionally break the main reading column when art direction requires it.

### Tablet
Use 8 columns.

### Mobile
Use 4 columns.

Do not design mobile as a scaled-down desktop composition. Preserve hierarchy and narrative, not exact geometry.

---

## 9. Section Spacing

Default vertical section rhythm:

```css
--section-space-sm: clamp(5rem, 9vw, 9rem);
--section-space-md: clamp(7rem, 12vw, 13rem);
--section-space-lg: clamp(9rem, 16vw, 18rem);
```

Usage guidance:
- Positioning: `section-space-lg`
- Process: `section-space-md`
- Form: `section-space-lg`
- Closing: at least `section-space-lg`
- Hero: `min-height: 100svh`

Never apply identical top and bottom spacing blindly to every section. Use rhythm intentionally.

---

## 10. Spacing Scale

Use a restrained 4px-based system:

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
--space-32: 8rem;
```

Avoid arbitrary values unless art direction clearly requires them.

---

## 11. Borders and Radius

The project should not look “card-based”.

### Borders

```css
--border-subtle: 1px solid color-mix(in srgb, var(--color-ink) 14%, transparent);
--border-dark-subtle: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
```

### Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-pill: 999px;
```

Usage:
- Use `radius-pill` only for compact controls when it genuinely improves the composition.
- Large content sections should generally not sit inside rounded rectangles.
- Screenshots/mockups may use `radius-md` or `radius-lg`.
- Avoid oversized “soft SaaS” radii.

---

## 12. Buttons

### Primary CTA

Default:
- background: `ink`
- text: `paper`
- clear border
- medium height
- restrained radius
- no exaggerated drop shadow

Alternative high-emphasis context:
- background: `yellow`
- text: `ink`

### Secondary CTA

- transparent background
- `ink` text
- subtle border or underline treatment

### Button sizing

```css
min-height: 48px;
padding-inline: 1.25rem;
```

### Labels

Recommended:
- 13–14px
- medium weight
- slight positive tracking
- no overly wide uppercase lettering

### Static-stage interaction

For the first implementation phase, only simple CSS hover/focus states are permitted.

Do not add:
- magnetic buttons;
- cursor-follow effects;
- animated text duplication;
- spring effects;
- scroll-linked CTA transformations.

Those belong to the motion phase.

---

## 13. Links

Links should remain visually clear without becoming conventionally “blue”.

Suggested treatments:
- underline with controlled offset;
- subtle bottom border;
- contrast shift.

Always provide visible keyboard focus.

---

## 14. Form Controls

The project form should feel editorial and premium, not like a generic dashboard form.

### Choice controls

Use semantic radio inputs with custom visual labels.

Default:
- transparent or paper background;
- subtle 1px border;
- generous horizontal spacing.

Selected:
- Olive Green background with Paper/White text, or
- Ink background with Paper text and a small Yellow accent.

Do not use multiple competing selected treatments.

### Text fields

Recommended:
- large field height;
- minimal chrome;
- label above field;
- visible border-bottom or restrained full border;
- no floating labels.

### Error states

Errors must be explicit in text, not communicated only by color.

---

## 15. Image and Case Study Treatment

Screenshots and project imagery should be treated as evidence, not decoration.

Rules:
- do not place every screenshot inside a floating mockup card;
- preserve enough scale for visitors to evaluate typography and UI;
- use browser chrome only when it helps comprehension;
- avoid fake perspective mockups that make the actual website hard to see;
- prefer crisp direct interface views.

The Redesign section should eventually become the main visual proof of the page.

---

## 16. Section-Level Visual Direction

### Header
Minimal, transparent over Hero, high legibility.

### Hero
Mostly neutral. Large type. One strong visual or compositional idea. No service cards.

### Authority
Neutral base with controlled moments of Olive/Yellow. Designed to support later scrollytelling.

### Redesign
Highest visual proof density. Give the project itself the majority of the viewport.

### Positioning
Quiet, typography-led, generous whitespace.

### Process
Structured and editorial. Rows, numbers, alignment, subtle dividers. No five-card grid.

### Form
Confident and spacious. One decision group at a time.

### Closing
Strong final statement. May use Ink or Olive as a full-bleed background with Paper text. Royal Yellow can punctuate the CTA.

---

## 17. Contrast Strategy

Use color changes to mark **narrative chapters**, not arbitrary section alternation.

Recommended sequence:

1. Hero — Paper / Ink
2. Authority — Paper / Ink with Olive accents
3. Redesign — Ink / Paper or project-driven background
4. Positioning — Paper / Ink
5. Process — Paper / Ink
6. Form — Surface or Olive-controlled composition
7. Closing — Ink or Olive full bleed

Do not alternate dark/light on every section.

---

## 18. Motion Readiness — Static Phase Rules

This design system is motion-ready, but the first implementation must remain primarily static.

Allowed in static phase:
- hover color changes;
- focus states;
- tiny CSS transitions for controls;
- responsive layout behavior.

Not allowed yet:
- GSAP timelines;
- ScrollTrigger;
- Lenis;
- pinned sections;
- parallax;
- scroll scrub;
- cursor tracking;
- text split animations;
- page-transition choreography;
- WebGL/Three.js effects.

The static composition must already feel premium before motion is added.

---

## 19. Responsive Breakpoints

Prefer content-driven breakpoints, but use these as practical anchors:

```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

### Desktop
12-column editorial composition.

### Tablet
Simplify offset compositions and reduce extreme type sizes.

### Mobile
4-column grid. Maintain large typography but protect readability and vertical rhythm.

Avoid:
- shrinking every element proportionally;
- forcing desktop line breaks on mobile;
- horizontal overflow for visual effect;
- tiny labels and controls.

---

## 20. Accessibility Requirements

Minimum requirements:
- semantic landmarks;
- correct heading hierarchy;
- keyboard-operable controls;
- visible focus ring;
- meaningful alt text;
- form labels associated with inputs;
- errors announced clearly;
- no essential information conveyed only by color;
- minimum target sizes suitable for touch.

The future motion layer must respect `prefers-reduced-motion`.

---

## 21. UI Quality Bar

Before any motion work begins, the static page must pass these checks:

### Typography
- Intentional line breaks
- No orphaned final words in major headlines
- Consistent tracking and weights
- Correct max-widths
- Sogea used only for the logo

### Layout
- Consistent grid
- No accidental misalignment
- No arbitrary container widths
- Mobile composition intentionally redesigned

### Color
- Neutral palette remains dominant
- Olive and Yellow are controlled
- No low-contrast copy
- Accent use is meaningful

### Components
- Buttons have consistent dimensions
- Form controls are coherent
- No duplicated one-off component styles
- No unnecessary cards

### Overall impression
The static page should already communicate:
- premium craft;
- creative direction;
- restraint;
- confidence;
- contemporary web design.

If the page only feels impressive once animation is enabled, the static design is not finished.

---

## 22. Anti-Patterns — Do Not Introduce

Do not use:
- generic gradient blobs;
- purple/blue startup gradients;
- glowing neon borders;
- glassmorphism everywhere;
- Bento grids merely because they are fashionable;
- testimonial cards without real testimonials;
- stock-photo team imagery;
- fake logos or fabricated client brands;
- decorative metrics;
- invented performance numbers;
- large icon libraries;
- unnecessary 3D;
- excessive pill UI;
- oversized rounded cards;
- repeated “eyebrow + title + paragraph + cards” section structure.

Aquarela should feel authored, not assembled.

---

## 23. Brand Summary

**Aquarela Design is not visually loud by default. It is precise by default.**

The identity comes from:
- expressive scale;
- spatial composition;
- Olive Green as the primary branded accent;
- Royal Yellow as a sharp moment of contrast;
- restrained neutral surfaces;
- the distinctive Sogea wordmark;
- immaculate typography;
- disciplined interaction design;
- later, deliberate motion.

The visual benchmark is not “more effects”.

The benchmark is **stronger perception**.

# Base Styles

Base styles establish the global CSS foundation that every page built inherits. They are defined in `src/base/` and **do produce CSS output** — unlike tokens and mixins, these files generate actual rules.

Base styles are intentionally minimal. They normalize browser inconsistencies and set sensible defaults using design tokens. Component-specific styles belong in CSS Modules, not here.

---

## File Structure

```
src/base/
├── _reset.scss     # CSS reset / normalize
├── _globals.scss   # Global defaults (body, links, focus)
└── _index.scss     # Forwards all partials
```

### `_index.scss`

```scss
// src/base/_index.scss
@forward "reset";
@forward "globals";
```

Consumed by `styles/main.scss` — the consumer-facing entry point. See [main-scss.md](main-scss.md).

---

## Reset — `_reset.scss`

A lightweight CSS reset that normalizes browser defaults without being as aggressive as a full reset (we don't zero out everything). Based on modern reset principles.

```scss
// src/base/_reset.scss

// ──────────────────────────────────────
// Box model: Use border-box everywhere
// ──────────────────────────────────────
*,
*::before,
*::after {
  box-sizing: border-box;
}

// ──────────────────────────────────────
// Remove default margins
// ──────────────────────────────────────
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
figure,
fieldset,
legend,
dl,
dd,
ol,
ul {
  margin: 0;
  padding: 0;
}

// ──────────────────────────────────────
// Lists: Remove default list styles
// ──────────────────────────────────────
ol,
ul {
  list-style: none;
}

// ──────────────────────────────────────
// Media: Responsive by default
// ──────────────────────────────────────
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

// ──────────────────────────────────────
// Forms: Inherit fonts
// ──────────────────────────────────────
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

// ──────────────────────────────────────
// Tables: Collapse borders
// ──────────────────────────────────────
table {
  border-collapse: collapse;
  border-spacing: 0;
}

// ──────────────────────────────────────
// Anchors: Remove default underline behavior
// ──────────────────────────────────────
a {
  text-decoration: none;
  color: inherit;
}

// ──────────────────────────────────────
// Remove animations for users who prefer reduced motion
// ──────────────────────────────────────
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Design decisions

| Choice                         | Rationale                                               |
| ------------------------------ | ------------------------------------------------------- |
| `border-box` everywhere        | Predictable sizing — padding doesn't expand the element |
| Zero margins on block elements | Components control their own spacing, not the browser   |
| Responsive media defaults      | Images never overflow their container                   |
| Form inputs inherit fonts      | Prevents inputs from defaulting to system monospace     |
| `prefers-reduced-motion`       | WCAG 2.1 AA accessibility requirement                   |

---

## Globals — `_globals.scss`

Global defaults that apply to the `html` and `body` elements, plus a few universal patterns.

```scss
// src/base/_globals.scss
@use "../tokens" as tokens;

// ──────────────────────────────────────
// Root defaults
// ──────────────────────────────────────
html {
  font-size: 100%; // Respects user browser settings (usually 16px)
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: tokens.$font-family-base;
  font-size: tokens.$font-size-base;
  font-weight: tokens.$font-weight-regular;
  line-height: tokens.$line-height-base;
  color: tokens.$color-neutral-900;
  background-color: tokens.$color-white;
}

// ──────────────────────────────────────
// Focus: Accessible focus indicator
// ──────────────────────────────────────
:focus-visible {
  outline: 2px solid tokens.$color-primary;
  outline-offset: 2px;
}

// ──────────────────────────────────────
// Selection highlight
// ──────────────────────────────────────
::selection {
  background-color: tokens.$color-primary;
  color: tokens.$color-white;
}

// ──────────────────────────────────────
// Smooth scrolling (respects reduced motion via reset)
// ──────────────────────────────────────
html {
  scroll-behavior: smooth;
}
```

### Design decisions

| Choice                    | Rationale                                                  |
| ------------------------- | ---------------------------------------------------------- |
| `font-size: 100%`         | Preserves user's browser font-size preference              |
| `antialiased` rendering   | Sharper text on macOS; standard on modern sites            |
| `:focus-visible` only     | Focus ring shows on keyboard nav, not on click (better UX) |
| Token-based body defaults | All values come from tokens — zero magic numbers           |

---

## What Belongs in Base vs. Components

| Base styles (`src/base/`)  | Component styles (`*.module.scss`)        |
| -------------------------- | ----------------------------------------- |
| Browser normalization      | Component-specific layout                 |
| Default body typography    | Variant styles (primary, secondary, etc.) |
| Global focus indicators    | Hover/active/disabled states              |
| Reduced motion media query | Internal spacing and sizing               |
| Selection highlight        | Responsive adjustments for that component |

**Rule of thumb:** If every page in the system needs it and it applies to native HTML elements, it's base. If it's specific to a React component, it's a CSS Module.

---

## Adding New Base Styles

1. Determine if the style truly belongs in base (see table above)
2. Add it to `_globals.scss` (or create a new partial if the scope is large enough)
3. If creating a new partial, add `@forward "filename"` to `_index.scss`
4. Ensure you consume values from `@use "../tokens"` — never hardcode colors, sizes, or spacing
5. Document the addition in this file

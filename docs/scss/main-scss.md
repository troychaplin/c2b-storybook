# main.scss — Consumer Entry Point

`src/styles/main.scss` is the single SCSS entry point that aggregates all base styles for consumers of the library. It is compiled into `dist/style.css` during the Vite build and exported via `@troychaplin/c2b-storybook/styles`.

---

## File Location

```
src/styles/
└── main.scss
```

---

## The File

```scss
// src/styles/main.scss
//
// Consumer-facing stylesheet that bundles:
//   1. Base reset (normalize browser defaults)
//   2. Global styles (body typography, focus, selection)
//
// Component styles are NOT included here — they are
// CSS Modules bundled with each component's JS output.
//
// Usage in a consumer project:
//   import '@troychaplin/c2b-storybook/styles';
//

// ──────────────────────────────────────
// Base: Reset + Globals
// ──────────────────────────────────────
@use "../base";
```

That's it. The file is intentionally minimal.

---

## What It Includes

| Layer   | Source          | What it does                                    |
| ------- | --------------- | ----------------------------------------------- |
| Reset   | `base/_reset`   | `border-box`, zero margins, responsive media    |
| Globals | `base/_globals` | Body font, focus ring, selection, smooth scroll |

---

## What It Does NOT Include

| Excluded          | Reason                                                       |
| ----------------- | ------------------------------------------------------------ |
| Token variables   | Tokens produce no CSS — they're only consumed via `@use`     |
| Mixin definitions | Mixins produce no CSS — they're only consumed via `@include` |
| Component styles  | Each component uses CSS Modules, bundled with its JS output  |

---

## Why So Minimal?

The library uses **CSS Modules** for component styles. This means:

1. Component CSS is automatically scoped (no class name collisions)
2. Component CSS is bundled with each component's JavaScript
3. Tree-shaking works — unused component CSS is not included

`main.scss` only provides the **global foundation** that every consuming page needs: the reset and body defaults. Everything else is component-scoped.

---

## How Consumers Import It

### Option 1: JavaScript import (recommended)

```tsx
// In the consumer's app entry point (e.g., App.tsx or _app.tsx)
import "@troychaplin/c2b-storybook/styles";
```

This works because `package.json` maps the export:

```json
{
  "exports": {
    "./styles": "./dist/style.css"
  }
}
```

### Option 2: CSS import

```css
/* In a consumer's global CSS file */
@import "@troychaplin/c2b-storybook/styles";
```

### Option 3: HTML link tag

If the consumer hosts the CSS file statically:

```html
<link
  rel="stylesheet"
  href="/path/to/node_modules/@troychaplin/c2b-storybook/dist/style.css"
/>
```

---

## Build Output

During `vite build`, Sass compiles `main.scss` into CSS:

```
src/styles/main.scss  →  dist/style.css
```

The compiled file contains:

- The full reset (~60 lines of CSS)
- Global body/focus/selection styles (~30 lines of CSS)
- No component styles (those are in the JS bundle via CSS Modules)

---

## Extending main.scss

If new global style layers are needed (e.g., utility classes, print styles), they would be added here:

```scss
// Future additions (example)
@use "../base";
@use "../utilities"; // Hypothetical utility layer
@use "../print"; // Hypothetical print styles
```

Each new layer should follow the same pattern:

1. Create a new directory under `src/` with an `_index.scss`
2. Add `@use` to `main.scss`
3. Document in the appropriate `docs/scss/` file

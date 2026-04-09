# Design Tokens

Design tokens are the foundational visual values of the design system. They are defined as SCSS variables and maps in `src/tokens/` and produce **no CSS output** — they are purely consumed by mixins, base styles, and component styles.

---

## File Structure

```
src/tokens/
├── _colors.scss        # Color palette
├── _spacing.scss       # Spacing scale
├── _typography.scss    # Font families, sizes, weights, line heights
├── _breakpoints.scss   # Responsive breakpoints
└── _index.scss         # Forwards all partials
```

### `_index.scss`

```scss
// src/tokens/_index.scss
@forward "colors";
@forward "spacing";
@forward "typography";
@forward "breakpoints";
```

This allows any file to access all tokens with a single `@use`:

```scss
@use "../../tokens" as tokens;
// Access: tokens.$color-primary, tokens.$spacing-md, etc.
```

---

## Colors — `_colors.scss`

The color palette is built around Carleton University's brand identity with a neutral scale for UI elements.

### Brand Colors

```scss
// Primary — Carleton Red
$color-primary: #bf112b;
$color-primary-dark: #8c0a20;
$color-primary-light: #e8455a;

// Secondary — Carleton Navy
$color-secondary: #0d3d6b;
$color-secondary-dark: #092a4a;
$color-secondary-light: #1a5a9e;
```

### Neutral Scale

Used for text, borders, backgrounds, and surfaces.

```scss
$color-neutral-50: #fafafa;
$color-neutral-100: #f5f5f5;
$color-neutral-200: #e0e0e0;
$color-neutral-300: #cccccc;
$color-neutral-400: #999999;
$color-neutral-500: #777777;
$color-neutral-600: #555555;
$color-neutral-700: #4a4a4a;
$color-neutral-800: #333333;
$color-neutral-900: #1a1a1a;
```

### Semantic Colors

Meaningful colors for feedback and state communication.

```scss
$color-success: #2e7d32;
$color-warning: #f9a825;
$color-error: #d32f2f;
$color-info: #1976d2;
```

### Static Colors

Always the same regardless of theme.

```scss
$color-white: #ffffff;
$color-black: #000000;
```

### Color Map

A map for programmatic access (useful in loops or dynamic style generation):

```scss
$colors: (
  "primary": $color-primary,
  "primary-dark": $color-primary-dark,
  "primary-light": $color-primary-light,
  "secondary": $color-secondary,
  "secondary-dark": $color-secondary-dark,
  "secondary-light": $color-secondary-light,
  "success": $color-success,
  "warning": $color-warning,
  "error": $color-error,
  "info": $color-info,
  "white": $color-white,
  "black": $color-black,
);
```

### Usage

```scss
@use "../../tokens" as tokens;

.alert-error {
  color: tokens.$color-white;
  background-color: tokens.$color-error;
}
```

---

## Spacing — `_spacing.scss`

A consistent spacing scale based on a 4px base unit. All values use `rem` for accessibility (respects user font-size preferences).

### Variables

```scss
$spacing-0: 0;
$spacing-xs: 0.25rem; //  4px
$spacing-sm: 0.5rem; //  8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px
$spacing-3xl: 4rem; // 64px
$spacing-4xl: 6rem; // 96px
```

### Spacing Map

```scss
$spacing: (
  "0": $spacing-0,
  "xs": $spacing-xs,
  "sm": $spacing-sm,
  "md": $spacing-md,
  "lg": $spacing-lg,
  "xl": $spacing-xl,
  "2xl": $spacing-2xl,
  "3xl": $spacing-3xl,
  "4xl": $spacing-4xl,
);
```

### Usage

```scss
@use "../../tokens" as tokens;

.card {
  padding: tokens.$spacing-md;
  margin-bottom: tokens.$spacing-lg;
}
```

---

## Typography — `_typography.scss`

Typography tokens define font families, a modular type scale, weights, and line heights.

### Font Families

```scss
$font-family-base: "Open Sans", sans-serif;
$font-family-heading: "Open Sans", sans-serif;
$font-family-mono: "Fira Code", "Consolas", monospace;
```

### Font Size Scale

Follows a modular scale. Pixel equivalents assume a 16px root.

```scss
$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 2rem; // 32px
$font-size-4xl: 2.5rem; // 40px
$font-size-5xl: 3rem; // 48px
```

### Font Size Map

```scss
$font-sizes: (
  "xs": $font-size-xs,
  "sm": $font-size-sm,
  "base": $font-size-base,
  "lg": $font-size-lg,
  "xl": $font-size-xl,
  "2xl": $font-size-2xl,
  "3xl": $font-size-3xl,
  "4xl": $font-size-4xl,
  "5xl": $font-size-5xl,
);
```

### Font Weights

```scss
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Line Heights

```scss
$line-height-tight: 1.2; // Headings
$line-height-snug: 1.375; // Subheadings, large text
$line-height-base: 1.5; // Body text (WCAG recommended)
$line-height-loose: 1.75; // Small text, captions
```

### Heading Scale Map

Maps heading levels to their token values for use in the typography mixin:

```scss
$heading-scale: (
  1: (
    size: $font-size-5xl,
    weight: $font-weight-bold,
    line-height: $line-height-tight,
  ),
  2: (
    size: $font-size-4xl,
    weight: $font-weight-bold,
    line-height: $line-height-tight,
  ),
  3: (
    size: $font-size-3xl,
    weight: $font-weight-semibold,
    line-height: $line-height-tight,
  ),
  4: (
    size: $font-size-2xl,
    weight: $font-weight-semibold,
    line-height: $line-height-snug,
  ),
  5: (
    size: $font-size-xl,
    weight: $font-weight-semibold,
    line-height: $line-height-snug,
  ),
  6: (
    size: $font-size-lg,
    weight: $font-weight-semibold,
    line-height: $line-height-base,
  ),
);
```

### Usage

```scss
@use "../../tokens" as tokens;

.body-text {
  font-family: tokens.$font-family-base;
  font-size: tokens.$font-size-base;
  line-height: tokens.$line-height-base;
}
```

---

## Breakpoints — `_breakpoints.scss`

Breakpoints define responsive design boundaries. They are consumed by the responsive mixin (see [mixins.md](mixins.md)).

### Variables

```scss
$breakpoint-sm: 640px; // Small (mobile landscape)
$breakpoint-md: 768px; // Medium (tablet)
$breakpoint-lg: 1024px; // Large (desktop)
$breakpoint-xl: 1280px; // Extra large (wide desktop)
$breakpoint-2xl: 1536px; // Ultra wide
```

### Breakpoint Map

```scss
$breakpoints: (
  "sm": $breakpoint-sm,
  "md": $breakpoint-md,
  "lg": $breakpoint-lg,
  "xl": $breakpoint-xl,
  "2xl": $breakpoint-2xl,
);
```

### Usage

Breakpoint values are not used directly in components — instead, use the `responsive` mixin:

```scss
@use "../../mixins" as mixins;

.container {
  padding: 1rem;
  @include mixins.responsive("lg") {
    padding: 2rem;
  }
}
```

---

## Adding New Tokens

1. Add the variable to the appropriate partial (e.g., `_colors.scss`)
2. If a map exists, add the value to the map as well
3. The `_index.scss` already forwards the file — no changes needed there
4. Document the new token in this file

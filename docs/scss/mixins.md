# Mixins

Mixins are reusable style functions that consume [design tokens](tokens.md) and encapsulate common patterns. They are defined in `src/mixins/` and produce **no CSS output** on their own — they only output CSS when `@include`d.

---

## File Structure

```
src/mixins/
├── _responsive.scss    # Media query mixins
├── _typography.scss    # Type style presets
└── _index.scss         # Forwards all partials
```

### `_index.scss`

```scss
// src/mixins/_index.scss
@forward "responsive";
@forward "typography";
```

Consumed in components with:

```scss
@use "../../mixins" as mixins;
```

---

## Responsive — `_responsive.scss`

Media query mixins that consume breakpoint tokens. These abstract away raw `@media` rules and ensure consistency.

### `responsive($breakpoint)`

Mobile-first `min-width` media query.

```scss
@use "../tokens" as tokens;

/// Mobile-first breakpoint mixin.
/// @param {String} $breakpoint - Key from $breakpoints map (sm, md, lg, xl, 2xl)
@mixin responsive($breakpoint) {
  $value: map-get(tokens.$breakpoints, $breakpoint);

  @if $value {
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @error "Unknown breakpoint: #{$breakpoint}. Expected one of: sm, md, lg, xl, 2xl";
  }
}
```

**Usage:**

```scss
@use "../../mixins" as mixins;

.sidebar {
  display: none;

  @include mixins.responsive("lg") {
    display: block;
    width: 280px;
  }
}
```

**Output:**

```css
.sidebar {
  display: none;
}
@media (min-width: 1024px) {
  .sidebar {
    display: block;
    width: 280px;
  }
}
```

### `responsive-down($breakpoint)`

Desktop-first `max-width` media query. Subtracts 0.02px to avoid overlap with the `min-width` query at the same breakpoint.

```scss
@mixin responsive-down($breakpoint) {
  $value: map-get(tokens.$breakpoints, $breakpoint);

  @if $value {
    @media (max-width: ($value - 0.02px)) {
      @content;
    }
  } @else {
    @error "Unknown breakpoint: #{$breakpoint}";
  }
}
```

**Usage:**

```scss
@use "../../mixins" as mixins;

.mobile-banner {
  display: block;

  @include mixins.responsive-down("md") {
    // Only visible below 768px
  }
}
```

### `responsive-between($min, $max)`

Targets a range between two breakpoints.

```scss
@mixin responsive-between($min, $max) {
  $min-value: map-get(tokens.$breakpoints, $min);
  $max-value: map-get(tokens.$breakpoints, $max);

  @if $min-value and $max-value {
    @media (min-width: $min-value) and (max-width: ($max-value - 0.02px)) {
      @content;
    }
  } @else {
    @error "Unknown breakpoint in range: #{$min} to #{$max}";
  }
}
```

**Usage:**

```scss
@include mixins.responsive-between("md", "lg") {
  // Tablet-only styles (768px to 1023px)
  .nav {
    flex-direction: column;
  }
}
```

---

## Typography — `_typography.scss`

Mixins that apply consistent type styles using typography tokens.

### `heading($level)`

Applies the full heading style for a given level (1–6) using the `$heading-scale` map from tokens.

```scss
@use "sass:map";
@use "../tokens" as tokens;

/// Apply heading styles by level.
/// @param {Number} $level - Heading level 1–6
@mixin heading($level) {
  $config: map.get(tokens.$heading-scale, $level);

  font-family: tokens.$font-family-heading;
  font-size: map.get($config, "size");
  font-weight: map.get($config, "weight");
  line-height: map.get($config, "line-height");
  margin: 0;
}
```

**Usage:**

```scss
@use "../../mixins" as mixins;

.page-title {
  @include mixins.heading(1);
  // Outputs: font-size: 3rem, font-weight: 700, line-height: 1.2
}

.section-title {
  @include mixins.heading(3);
  // Outputs: font-size: 2rem, font-weight: 600, line-height: 1.2
}
```

### `body-text($size: "base")`

Applies body text styles at a given size.

```scss
/// Apply body text styles.
/// @param {String} $size - Key from $font-sizes map (xs, sm, base, lg, xl)
@mixin body-text($size: "base") {
  font-family: tokens.$font-family-base;
  font-size: map.get(tokens.$font-sizes, $size);
  font-weight: tokens.$font-weight-regular;
  line-height: tokens.$line-height-base;
}
```

**Usage:**

```scss
@use "../../mixins" as mixins;

.description {
  @include mixins.body-text("lg");
  // Outputs: font-size: 1.125rem, line-height: 1.5
}
```

### `truncate()`

Single-line text truncation with ellipsis.

```scss
@mixin truncate() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### `line-clamp($lines)`

Multi-line text truncation.

```scss
/// Clamp text to N lines with ellipsis.
/// @param {Number} $lines - Number of visible lines
@mixin line-clamp($lines) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**Usage:**

```scss
.card-excerpt {
  @include mixins.line-clamp(3);
}
```

---

## Accessibility Mixins (Future)

Planned mixins for future development:

| Mixin               | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `visually-hidden()` | Hide visually but keep accessible to screen readers |
| `focus-ring()`      | Consistent, accessible focus indicator              |
| `forced-colors()`   | Styles for Windows High Contrast Mode               |

---

## Adding New Mixins

1. Create the mixin in the appropriate partial file, or create a new partial
2. If creating a new partial, add `@forward "filename"` to `_index.scss`
3. Ensure the mixin consumes tokens via `@use "../tokens"` (not hardcoded values)
4. Add a JSDoc-style `///` comment above the mixin with `@param` descriptions
5. Document the mixin in this file with usage examples

# SCSS Architecture

This document explains how the SCSS layer is organized, how files relate to each other, and how consumers receive styles.

---

## Overview

The SCSS architecture follows a layered approach where each layer has a single responsibility:

```
src/
├── tokens/       → Design tokens (variables & maps) — no CSS output
├── mixins/       → Reusable style logic — no CSS output
├── base/         → Global resets & defaults — produces CSS output
├── components/   → Component-scoped styles via CSS Modules
└── styles/
    └── main.scss → Aggregator entry point for consumers
```

### Key principle: Tokens and mixins produce no CSS

Token files (`_colors.scss`, `_spacing.scss`, etc.) and mixin files only define **variables**, **maps**, and **@mixin** rules. They never output CSS on their own. This means any file can `@use` them without risk of duplicating styles.

Only `base/` and `components/` produce actual CSS output.

---

## Layer Dependency Flow

```
┌─────────────┐
│   tokens/   │  ← Pure data: variables, maps
└──────┬──────┘
       │ @use
┌──────▼──────┐
│   mixins/   │  ← Reusable logic that reads tokens
└──────┬──────┘
       │ @use
┌──────▼──────┐     ┌───────────────────┐
│    base/    │     │   components/     │
│ (reset,     │     │ (Button.module,   │
│  globals)   │     │  Card.module)     │
└──────┬──────┘     └────────┬──────────┘
       │                     │
       │  Both consume tokens + mixins
       │                     │
┌──────▼─────────────────────▼──┐
│      styles/main.scss         │  ← Aggregates base for consumers
└───────────────────────────────┘
```

---

## How `@use` Works

This design system uses the modern Sass `@use` and `@forward` system (not the deprecated `@import`).

### `@forward` — Re-exporting from index files

Each layer has an `_index.scss` that forwards its partials:

```scss
// src/tokens/_index.scss
@forward "colors";
@forward "spacing";
@forward "typography";
@forward "breakpoints";
```

### `@use` — Consuming in other files

Components and mixins then consume tokens via namespaced access:

```scss
// src/components/Button/Button.module.scss
@use "../../tokens" as tokens;
@use "../../mixins" as mixins;

.button {
  font-family: tokens.$font-family-base;
  padding: tokens.$spacing-sm tokens.$spacing-md;
  @include mixins.responsive("md") {
    padding: tokens.$spacing-md tokens.$spacing-lg;
  }
}
```

---

## File Naming Conventions

| Pattern          | Meaning                                                      |
| ---------------- | ------------------------------------------------------------ |
| `_filename.scss` | Partial — not compiled on its own, only `@use`d/`@forward`ed |
| `_index.scss`    | Barrel file that `@forward`s all partials in a directory     |
| `*.module.scss`  | CSS Module — class names are locally scoped by Vite          |
| `main.scss`      | Entry point — the only non-partial, non-module SCSS file     |

---

## Detailed Documentation

| Topic                         | Document                         |
| ----------------------------- | -------------------------------- |
| Design tokens (all variables) | [tokens.md](tokens.md)           |
| Mixins (reusable style logic) | [mixins.md](mixins.md)           |
| Base styles (reset + globals) | [base.md](base.md)               |
| main.scss (consumer entry)    | [main-scss.md](main-scss.md)     |
| Component styles              | [../components/](../components/) |

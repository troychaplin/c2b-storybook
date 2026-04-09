# Design System & React Component Library

## Project Overview

A React component library and design system for Carleton University, built with Storybook.js for development, documentation, and visual testing. Published as a public npm package for consumption across university web properties.

**Package name:** `@troychaplin/c2b-storybook`

---

## Tech Stack Decisions

| Concern         | Choice                 | Rationale                                             |
| --------------- | ---------------------- | ----------------------------------------------------- |
| Language        | TypeScript 5.x         | Type safety, better DX, self-documenting props        |
| Build tool      | Vite 7 (library mode)  | Fast HMR, native ESM, optimized library builds        |
| React           | React 18.x             | Pinned to v18 for WordPress compatibility             |
| Styling         | Sass/SCSS              | Variables, mixins, nesting, mature ecosystem          |
| Design tokens   | SCSS variables & maps  | Centralized theme values compiled at build time       |
| Component dev   | Storybook 10           | Isolated dev, docs, visual testing, a11y addon        |
| Testing         | Vitest 4 + Storybook   | Browser-mode tests via Playwright + interaction tests |
| Linting         | ESLint 9 + Prettier    | Flat config, code quality + consistent formatting     |
| Package manager | pnpm                   | Fast installs, strict dependency resolution           |
| Node            | 22 LTS (22.12+)        | Required by Storybook 10                              |
| Registry        | Public npm (npmjs.com) | Accessible to all consumers                           |
| CI/CD           | GitHub Actions         | Lint, test, build, publish automation                 |
| Accessibility   | WCAG 2.1 AA target     | Inclusive design, storybook a11y addon                |

---

## Project Structure

```
c2b-storybook/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, build on PR
│       └── publish.yml             # Publish to npm on release
├── .storybook/
│   ├── main.ts                     # Storybook config (ESM required)
│   ├── preview.ts                  # Global decorators, parameters
│   ├── vitest.setup.ts             # Vitest addon setup (auto-generated)
│   └── theme.ts                    # Custom Storybook UI theme
├── docs/
│   ├── PLAN.md                     # This file
│   ├── tasks/
│   │   ├── README.md               # Sprint overview & total estimates
│   │   ├── sprint-01-project-setup.md
│   │   ├── sprint-02-scss-foundation.md
│   │   ├── sprint-03-storybook.md
│   │   ├── sprint-04-components.md
│   │   └── sprint-05-build-publish.md
│   ├── scss/
│   │   ├── README.md               # SCSS architecture overview
│   │   ├── tokens.md               # Token reference (colors, spacing, type, breakpoints)
│   │   ├── mixins.md               # Mixin reference with usage examples
│   │   ├── base.md                 # Reset + global base styles explained
│   │   └── main-scss.md            # Consumer entry point (main.scss)
│   └── components/
│       ├── README.md               # Component patterns & conventions
│       ├── button.md               # Button: props, styles, stories, tests
│       └── card.md                 # Card: props, styles, stories, tests
├── src/
│   ├── index.ts                    # Main entry — re-exports all components
│   ├── tokens/
│   │   ├── _colors.scss            # Color palette variables
│   │   ├── _spacing.scss           # Spacing scale
│   │   ├── _typography.scss        # Font families, sizes, weights
│   │   ├── _breakpoints.scss       # Responsive breakpoints
│   │   └── _index.scss             # Forwards all token partials
│   ├── mixins/
│   │   ├── _responsive.scss        # Media query mixins
│   │   ├── _typography.scss        # Type style mixins
│   │   └── _index.scss             # Forwards all mixins
│   ├── base/
│   │   ├── _reset.scss             # CSS reset / normalize
│   │   ├── _globals.scss           # Global base styles
│   │   └── _index.scss             # Forwards all base styles
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx            # <Button> component
│   │   │   ├── Button.module.scss    # Button styles
│   │   │   ├── Button.stories.tsx    # Storybook stories
│   │   │   ├── Button.test.tsx       # Unit tests
│   │   │   └── index.ts             # Barrel export for Button
│   │   └── Card/
│   │       ├── Card.tsx              # <Card> component
│   │       ├── Card.module.scss      # Card styles
│   │       ├── Card.stories.tsx      # Storybook stories
│   │       ├── Card.test.tsx         # Unit tests
│   │       └── index.ts             # Barrel export for Card
│   └── styles/
│       └── main.scss               # Aggregates tokens + base for consumers
├── eslint.config.mjs               # ESLint flat config (v9+)
├── .prettierrc                     # Prettier config
├── .nvmrc                          # Node version (22)
├── tsconfig.json                   # TypeScript config
├── tsconfig.build.json             # TS config for library build (excludes tests/stories)
├── vite.config.ts                  # Vite config (library mode)
├── vitest.config.ts                # Vitest config
├── package.json
└── pnpm-lock.yaml
```

---

## Dependencies to Install

### Core

| Package            | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `react` (18.x)     | Peer dependency — pinned to v18 for WordPress compat |
| `react-dom` (18.x) | Peer dependency — pinned to v18 for WordPress compat |
| `typescript` (5.x) | TypeScript compiler                                  |
| `sass`             | SCSS compilation                                     |

### Build & Dev

| Package                          | Purpose                             |
| -------------------------------- | ----------------------------------- |
| `vite` (7.x)                     | Build tool & dev server             |
| `@vitejs/plugin-react`           | React fast refresh + JSX transform  |
| `vite-plugin-dts`                | Generate `.d.ts` type declarations  |
| `vite-plugin-css-injected-by-js` | Optional: inject CSS into JS bundle |

### Storybook 10

> **Note:** Storybook 10 is ESM-only and requires `.storybook/main.ts` to be valid ESM.
> The `storybook init` CLI now uses feature flags: `--features docs test a11y`.

| Package                       | Purpose                                        |
| ----------------------------- | ---------------------------------------------- |
| `storybook` (10.x)            | Core CLI & framework (ESM-only)                |
| `@storybook/react-vite`       | React + Vite integration                       |
| `@storybook/addon-essentials` | Docs, controls, actions, viewport, backgrounds |
| `@storybook/addon-a11y`       | Accessibility audit panel + Vitest a11y tests  |
| `@storybook/addon-vitest`     | Component + interaction testing via Vitest     |
| `@storybook/test`             | Test utilities (`expect`, `fn`, `userEvent`)   |
| `@storybook/blocks`           | Doc blocks for MDX docs                        |

**Removed from Storybook 10:**

- `@storybook/addon-interactions` — replaced by `@storybook/addon-vitest`
- Interaction tests now run natively in Vitest via `@storybook/addon-vitest` plugin

### Testing

> **Note:** Storybook 10 recommends Vitest in **browser mode** (Playwright Chromium)
> instead of `jsdom`. The `@storybook/addon-vitest` plugin handles the setup.

| Package                       | Purpose                                   |
| ----------------------------- | ----------------------------------------- |
| `vitest` (4.x)                | Test runner (browser mode via Playwright) |
| `@playwright/test`            | Browser provider for Vitest browser mode  |
| `@testing-library/react`      | Component testing utilities               |
| `@testing-library/jest-dom`   | DOM assertion matchers                    |
| `@testing-library/user-event` | Simulated user interaction                |

### Linting & Formatting

> **Note:** ESLint 9+ uses flat config (`eslint.config.mjs`) instead of `.eslintrc.*`.

| Package                     | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `eslint` (9.x)              | Linter (flat config)                              |
| `@eslint/js`                | ESLint recommended rules                          |
| `typescript-eslint`         | TypeScript ESLint integration (flat config)       |
| `eslint-plugin-react`       | React-specific lint rules                         |
| `eslint-plugin-react-hooks` | Hooks lint rules                                  |
| `eslint-plugin-jsx-a11y`    | Accessibility lint rules                          |
| `eslint-plugin-storybook`   | Storybook best practices                          |
| `prettier`                  | Code formatter                                    |
| `eslint-config-prettier`    | Disables ESLint rules that conflict with Prettier |

---

## Design Tokens (SCSS)

Tokens will be defined as SCSS variables and maps in `src/tokens/`. These serve as the single source of truth for the design system's visual language.

### Color Palette

```scss
// src/tokens/_colors.scss
$color-primary: #bf112b; // Carleton red
$color-primary-dark: #8c0a20;
$color-secondary: #0d3d6b; // Carleton navy
$color-neutral-100: #f5f5f5;
$color-neutral-200: #e0e0e0;
$color-neutral-700: #4a4a4a;
$color-neutral-900: #1a1a1a;
$color-white: #ffffff;
$color-black: #000000;
// ... extend as needed
```

### Spacing Scale

```scss
// src/tokens/_spacing.scss
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px
$spacing-3xl: 4rem; // 64px
```

### Typography Scale

```scss
// src/tokens/_typography.scss
$font-family-base: "Open Sans", sans-serif;
$font-family-heading: "Open Sans", sans-serif;

$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 2rem; // 32px
$font-size-4xl: 2.5rem; // 40px
$font-size-5xl: 3rem; // 48px

$font-weight-regular: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.2;
$line-height-base: 1.5;
$line-height-loose: 1.75;
```

---

## Initial Component Scope — Button & Card

Starting with two foundational components to establish patterns, then expand.

### Components

| Component  | Props                                                                                                                                        | Element |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `<Button>` | `variant` (primary, secondary, outline), `size` (sm, md, lg), `disabled`, `onClick`, `children`, `className`, `type` (button, submit, reset) | button  |
| `<Card>`   | `title`, `children`, `className`, `as` (override wrapper tag)                                                                                | div     |

### Conventions

- Each component gets its own `.tsx`, `.module.scss`, `.stories.tsx`, and `.test.tsx`
- All components export named exports (no default exports)
- Props interfaces are exported alongside components
- Components use `forwardRef` for DOM ref forwarding
- SCSS modules import from shared token and mixin partials

---

## Vite Library Build

The library will be built in Vite's **library mode**, producing both ESM and CJS outputs with type declarations.

```ts
// vite.config.ts (simplified)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
```

### Package.json exports

```json
{
  "name": "@troychaplin/c2b-storybook",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## Storybook Configuration

Storybook 10 with the React-Vite builder. Key differences from v8:

- **ESM-only** — `.storybook/main.ts` must be valid ESM
- **Autodocs** — auto-generated docs from component props and JSDoc
- **a11y addon** — accessibility checks on every story, integrates with Vitest addon
- **Vitest addon** — replaces `addon-interactions`; runs component + interaction tests in real browser (Playwright Chromium)
- **Custom theme** — branded Storybook UI matching Carleton identity
- **Feature-based install** — `npm create storybook@latest --features docs test a11y`

---

## Testing Strategy

| Layer             | Tool                                             | What it covers                              |
| ----------------- | ------------------------------------------------ | ------------------------------------------- |
| Component tests   | Vitest 4 (browser mode) + Storybook addon-vitest | Rendering, play functions, in real Chromium |
| Unit tests        | Vitest + Testing Library                         | Props, rendering, conditional logic         |
| Accessibility     | addon-a11y + axe-core via Vitest                 | WCAG violations per story (CI + UI)         |
| Interaction tests | Storybook play functions                         | User flows validated in Vitest              |
| Visual regression | (Future) Chromatic or Percy                      | Screenshot diffing                          |

### Test execution

- **Browser mode (recommended):** Tests run in real Playwright Chromium via `@storybook/addon-vitest`
- **Storybook UI:** Run tests from testing widget in sidebar
- **CLI:** `vitest --project=storybook` for CI or local
- **Editor:** VSCode Vitest extension for inline test status

### Test file co-location

Tests live next to their components (`Component.test.tsx`) for easy discovery and maintenance.

---

## CI/CD Pipeline (GitHub Actions)

### `ci.yml` — Runs on every PR

1. Checkout + pnpm install (cached)
2. `pnpm lint` — ESLint + Prettier check
3. `pnpm typecheck` — `tsc --noEmit`
4. `pnpm test` — Vitest
5. `pnpm build` — Verify library builds cleanly
6. `pnpm build-storybook` — Verify Storybook builds

### `publish.yml` — Runs on GitHub Release

1. All CI checks pass
2. `pnpm build`
3. `npm publish --access public`

---

## Scripts (package.json)

```json
{
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "vite build",
    "build-storybook": "storybook build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:storybook": "vitest --project=storybook",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write 'src/**/*.{ts,tsx,scss}'",
    "format:check": "prettier --check 'src/**/*.{ts,tsx,scss}'",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Implementation Phases

### Phase 1 — Project Scaffolding

- [ ] Initialize pnpm project
- [ ] Install all dependencies
- [ ] Configure TypeScript, Vite, Vitest
- [ ] Configure ESLint + Prettier
- [ ] Initialize Storybook
- [ ] Set up SCSS tokens and base styles
- [ ] Create `.nvmrc`, `.gitignore`, editor configs

### Phase 2 — Starter Components (Button & Card)

- [ ] Implement `<Button>` component + stories + tests
- [ ] Implement `<Card>` component + stories + tests
- [ ] Verify Storybook autodocs generation
- [ ] Run a11y checks on all stories
- [ ] Verify Vitest addon runs interaction tests

### Phase 3 — Build & Publish Setup

- [ ] Configure Vite library build output
- [ ] Verify package exports (ESM, CJS, types, CSS)
- [ ] Test local consumption via `pnpm link`
- [ ] Set up GitHub Actions CI workflow
- [ ] Set up GitHub Actions publish workflow
- [ ] Publish initial version to npm

### Phase 4 — Expand (Future)

- [ ] Add more component categories (forms, layout, navigation)
- [ ] Add visual regression testing (Chromatic/Percy)
- [ ] Add changelog automation (changesets)
- [ ] Build documentation site from Storybook

---

## Install Commands (Quick Reference)

```bash
# Initialize project
pnpm init

# Core (React pinned to v18 for WordPress compat)
pnpm add -D react@18 react-dom@18 @types/react@18 @types/react-dom@18 typescript sass

# Vite
pnpm add -D vite @vitejs/plugin-react vite-plugin-dts

# Storybook 10 (use the CLI to bootstrap with features)
pnpm dlx storybook@latest init --builder vite --features docs test a11y

# The Storybook CLI will install most packages automatically, including:
#   storybook, @storybook/react-vite, @storybook/addon-essentials,
#   @storybook/addon-vitest, @storybook/addon-a11y, @storybook/test,
#   @storybook/blocks, vitest, @playwright/test

# Additional testing utilities
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Linting & formatting (ESLint 9 flat config)
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-storybook prettier eslint-config-prettier
```

> **Note:** Storybook 10 `init` installs most packages automatically including Vitest, Playwright, and the Vitest addon.
> React is pinned to v18 for WordPress compatibility. Storybook 10 requires Node 22.12+ and Vite 5+.

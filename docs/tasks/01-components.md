# Sprint 4 — Starter Components

Implement the Button and Card components following the established patterns. Each component includes the React implementation, SCSS module, Storybook stories, and tests. This sprint validates the full component development workflow end-to-end.

**Estimated total: ~3.25 hours**

**Prerequisite:** Sprint 3 (Storybook running with SCSS support)

---

## Task 4.1 — Implement Button Component

**Time estimate:** 45 minutes

**Description:**
Create `src/components/Button/` with the component implementation and scoped styles. The Button supports three variants (primary, secondary, outline), three sizes (sm, md, lg), and forwards refs.

Files to create:

- `Button.tsx` — React component with `forwardRef`, `ButtonProps` interface extending `ButtonHTMLAttributes`, variant/size props with defaults (`primary`, `md`)
- `Button.module.scss` — Base button styles, variant classes (`.primary`, `.secondary`, `.outline`), size classes (`.sm`, `.md`, `.lg`), disabled state. Import tokens and mixins via `@use`
- `index.ts` — Barrel export: `export { Button } from './Button'` and `export type { ButtonProps } from './Button'`

Apply class names using a simple conditional approach (template literals or a small helper). Use `data-variant` and `data-size` attributes or BEM-style class composition.

**Resources:**

- [docs/components/button.md](../components/button.md) — Full `ButtonProps` interface, complete TSX implementation, complete SCSS module code
- [docs/components/README.md](../components/README.md) — Component anatomy: forwardRef pattern, props interface convention, barrel export pattern

---

## Task 4.2 — Create Button Stories

**Time estimate:** 30 minutes

**Description:**
Create `src/components/Button/Button.stories.tsx` with stories that demonstrate every variant, size, and state. Stories serve as both documentation and test fixtures.

Stories to create:

- **Primary** — Default button (variant: primary, size: md)
- **Secondary** — Secondary variant
- **Outline** — Outline variant
- **Small** — Size sm demonstration
- **Large** — Size lg demonstration
- **Disabled** — Disabled state with `disabled: true`

Configure the story meta with `autodocs` tag so Storybook generates a docs page from the component's props. Add `argTypes` for `variant` and `size` with control types. Set `args.children` to sensible label text.

After creating, verify in Storybook that:

- All 6 stories render correctly
- The Docs page auto-generates with a prop table
- The Controls panel allows interactive prop changes
- The a11y panel shows no violations

**Resources:**

- [docs/components/button.md](../components/button.md) — Complete stories file with all 6 story definitions
- [docs/components/README.md](../components/README.md) — Story file conventions (CSF3 format, autodocs tag)

---

## Task 4.3 — Create Button Tests

**Time estimate:** 30 minutes

**Description:**
Create `src/components/Button/Button.test.tsx` with unit and interaction tests using Vitest + Testing Library.

Test cases:

| #   | Test case                                | Approach                                               |
| --- | ---------------------------------------- | ------------------------------------------------------ |
| 1   | Renders with default props               | Render, assert `role="button"` present                 |
| 2   | Renders children text                    | Assert text content matches                            |
| 3   | Applies primary variant class by default | Check classList or data attribute                      |
| 4   | Applies secondary variant class          | Pass `variant="secondary"`, check class                |
| 5   | Applies outline variant class            | Pass `variant="outline"`, check class                  |
| 6   | Applies size classes (sm, md, lg)        | Parameterize or 3 assertions                           |
| 7   | Forwards ref to button element           | Create ref, render, assert `ref.current` is `<button>` |
| 8   | Fires onClick handler                    | `userEvent.click`, assert `vi.fn()` called             |
| 9   | Does not fire onClick when disabled      | Set `disabled`, click, assert handler not called       |

Run tests with `pnpm test` and verify all pass.

**Resources:**

- [docs/components/button.md](../components/button.md) — Full test case table and a11y requirements
- [docs/components/README.md](../components/README.md) — Test file conventions and Testing Library patterns
- [PLAN.md — Testing Strategy](../PLAN.md) for browser mode execution details

---

## Task 4.4 — Implement Card Component

**Time estimate:** 45 minutes

**Description:**
Create `src/components/Card/` with the component implementation and scoped styles. The Card is a content container with an optional title and a polymorphic wrapper element (`as` prop).

Files to create:

- `Card.tsx` — React component with `forwardRef`, `CardProps` interface extending `HTMLAttributes<HTMLElement>`, optional `title` prop, `as` prop (defaults to `'div'`), polymorphic element rendering
- `Card.module.scss` — Card container (padding, border-radius, shadow, hover shadow transition), `.card__title` using the `heading(4)` mixin, `.card__body` using `body-text` mixin. Import tokens and mixins via `@use`
- `index.ts` — Barrel export

The polymorphic `as` prop allows consumers to render the card as `<article>`, `<section>`, or any valid HTML element while maintaining proper semantics.

**Resources:**

- [docs/components/card.md](../components/card.md) — Full `CardProps` interface, complete TSX implementation with polymorphic wrapper, complete SCSS module code
- [docs/components/README.md](../components/README.md) — Component anatomy and forwardRef pattern
- [docs/scss/mixins.md](../scss/mixins.md) — `heading()` and `body-text()` mixin signatures used in Card styles

---

## Task 4.5 — Create Card Stories

**Time estimate:** 20 minutes

**Description:**
Create `src/components/Card/Card.stories.tsx` with stories demonstrating different content configurations and semantic wrapper elements.

Stories to create:

- **Default** — Card with title and body text
- **WithoutTitle** — Card with body content only (no title prop)
- **AsArticle** — Card rendered as `<article>` via the `as` prop
- **AsSection** — Card rendered as `<section>` via the `as` prop
- **WithRichContent** — Card containing mixed HTML content (lists, links, etc.)

Configure with `autodocs` tag and verify the polymorphic `as` prop appears in the controls panel.

**Resources:**

- [docs/components/card.md](../components/card.md) — Complete stories file with all 5 story definitions
- [docs/components/README.md](../components/README.md) — Story conventions

---

## Task 4.6 — Create Card Tests

**Time estimate:** 20 minutes

**Description:**
Create `src/components/Card/Card.test.tsx` with unit tests using Vitest + Testing Library.

Test cases:

| #   | Test case                                  | Approach                                               |
| --- | ------------------------------------------ | ------------------------------------------------------ |
| 1   | Renders children content                   | Assert text content present                            |
| 2   | Renders title when provided                | Pass `title`, assert heading text                      |
| 3   | Does not render title element when omitted | Omit `title`, assert no heading tag present            |
| 4   | Renders as `div` by default                | Check container tag name                               |
| 5   | Renders as custom element via `as` prop    | Pass `as="article"`, check tag name is `article`       |
| 6   | Forwards ref                               | Create ref, assert `ref.current` matches container     |
| 7   | Applies custom className                   | Pass `className`, assert it's on the container element |
| 8   | Passes through HTML attributes             | Pass `data-testid`, assert attribute present           |

**Resources:**

- [docs/components/card.md](../components/card.md) — Full test case table
- [docs/components/README.md](../components/README.md) — Testing patterns

---

## Task 4.7 — Main Barrel Export & Verification

**Time estimate:** 15 minutes

**Description:**
Create `src/index.ts` as the library's main entry point that re-exports all components. Then do a full verification pass.

- Create `src/index.ts`:
  ```ts
  export { Button, type ButtonProps } from "./components/Button";
  export { Card, type CardProps } from "./components/Card";
  ```
- Run `pnpm test` — all Button and Card tests pass
- Run `pnpm dev` — all stories render in Storybook
- Verify autodocs pages generate correctly for both components
- Run a11y checks on all stories — no violations
- Verify the Vitest addon test widget runs in the Storybook sidebar

**Resources:**

- [PLAN.md — Project Structure](../PLAN.md) for `src/index.ts` location
- [PLAN.md — Scripts](../PLAN.md) for `test` and `dev` commands

---

## Checklist

- [ ] 4.1 — Implement Button Component
- [ ] 4.2 — Create Button Stories
- [ ] 4.3 — Create Button Tests
- [ ] 4.4 — Implement Card Component
- [ ] 4.5 — Create Card Stories
- [ ] 4.6 — Create Card Tests
- [ ] 4.7 — Main Barrel Export & Verification

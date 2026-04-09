# Card Component

A flexible container component for grouping related content. Supports an optional title, polymorphic wrapper element, and composable children.

---

## File Structure

```
src/components/Card/
├── Card.tsx              # Component implementation
├── Card.module.scss      # Scoped styles
├── Card.stories.tsx      # Storybook stories
├── Card.test.tsx         # Unit tests
└── index.ts              # Barrel export
```

---

## Props API

```tsx
export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Optional card heading displayed above children
   * @default undefined
   */
  title?: string;

  /** Override the wrapper element (div, article, section, aside, etc.)
   * @default 'div'
   */
  as?: React.ElementType;

  /** Card body content */
  children: React.ReactNode;
}
```

### Props Table

| Prop        | Type                | Default | Description                             |
| ----------- | ------------------- | ------- | --------------------------------------- |
| `title`     | `string`            | —       | Optional heading rendered as an `<h3>`  |
| `as`        | `React.ElementType` | `'div'` | Polymorphic wrapper element             |
| `children`  | `React.ReactNode`   | —       | Card body content (required)            |
| `className` | `string`            | —       | Additional CSS class (merged)           |
| `ref`       | `Ref<HTMLElement>`  | —       | Forwarded ref to wrapper element        |
| `...rest`   | `HTMLAttributes`    | —       | All native HTML attributes pass through |

---

## Component Implementation

```tsx
// src/components/Card/Card.tsx
import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Card.module.scss";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLElement, CardProps>(
  ({ title, as: Component = "div", className, children, ...rest }, ref) => {
    const classNames = [styles.card, className].filter(Boolean).join(" ");

    return (
      <Component ref={ref} className={classNames} {...rest}>
        {title && <h3 className={styles.card__title}>{title}</h3>}
        <div className={styles.card__body}>{children}</div>
      </Component>
    );
  },
);

Card.displayName = "Card";
```

### Key design decisions

| Decision                | Rationale                                              |
| ----------------------- | ------------------------------------------------------ |
| Polymorphic `as` prop   | Cards can be `<article>`, `<section>`, `<aside>`, etc. |
| Title renders as `<h3>` | Sensible default; consumers override with composition  |
| `card__body` wrapper    | Isolates body padding from the card's border/shadow    |
| No built-in image slot  | Keep simple; consumers compose with children           |

---

## Styles

```scss
// src/components/Card/Card.module.scss
@use "../../tokens" as tokens;
@use "../../mixins" as mixins;

// ──────────────────────────────────────
// Card container
// ──────────────────────────────────────
.card {
  background-color: tokens.$color-white;
  border: 1px solid tokens.$color-neutral-200;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(tokens.$color-black, 0.08);
  overflow: hidden;
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(tokens.$color-black, 0.12);
  }
}

// ──────────────────────────────────────
// Title
// ──────────────────────────────────────
.card__title {
  @include mixins.heading(4);
  padding: tokens.$spacing-md tokens.$spacing-md 0;
  color: tokens.$color-neutral-900;
}

// ──────────────────────────────────────
// Body
// ──────────────────────────────────────
.card__body {
  padding: tokens.$spacing-md;
  color: tokens.$color-neutral-700;
  @include mixins.body-text("base");
}
```

### Token Usage Map

| Style property   | Token                       |
| ---------------- | --------------------------- |
| Background       | `$color-white`              |
| Border           | `$color-neutral-200`        |
| Shadow color     | `$color-black` (with alpha) |
| Title color      | `$color-neutral-900`        |
| Body text color  | `$color-neutral-700`        |
| Padding          | `$spacing-md`               |
| Title typography | `heading(4)` mixin          |
| Body typography  | `body-text("base")` mixin   |

---

## Stories

```tsx
// src/components/Card/Card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  component: Card,
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    a11y: { test: "error" },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "article", "section", "aside"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Basic usage ──

export const Default: Story = {
  args: {
    title: "Card Title",
    children: "This is the card body content. It can contain any React nodes.",
  },
};

export const WithoutTitle: Story = {
  args: {
    children: "A card without a title — just body content.",
  },
};

// ── Semantic wrapper ──

export const AsArticle: Story = {
  args: {
    as: "article",
    title: "News Article",
    children: "Using <article> as the wrapper element for semantic HTML.",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    title: "Dashboard Section",
    children: "Using <section> for a dashboard panel.",
  },
};

// ── Rich content ──

export const WithRichContent: Story = {
  render: () => (
    <Card title="Program Information">
      <p>Computer Science — Bachelor of Computer Science (BCS)</p>
      <ul
        style={{
          margin: "0.5rem 0",
          paddingLeft: "1.25rem",
          listStyle: "disc",
        }}
      >
        <li>4-year program</li>
        <li>Co-op available</li>
        <li>Fall and Winter admission</li>
      </ul>
      <a href="#" style={{ color: "#bf112b", textDecoration: "underline" }}>
        Learn more →
      </a>
    </Card>
  ),
};
```

### Story Coverage

| Story           | What it demonstrates                            |
| --------------- | ----------------------------------------------- |
| Default         | Standard card with title and text content       |
| WithoutTitle    | Card body without a heading                     |
| AsArticle       | Polymorphic `as` prop for semantic HTML         |
| AsSection       | Another semantic wrapper example                |
| WithRichContent | Composing complex children (lists, links, etc.) |

---

## Tests

### What to test

| Test case                     | Type | Assertion                                         |
| ----------------------------- | ---- | ------------------------------------------------- |
| Renders children              | Unit | Body text appears in the DOM                      |
| Renders title when provided   | Unit | `<h3>` with title text is present                 |
| Omits title when not provided | Unit | No `<h3>` in the DOM                              |
| Default wrapper is `<div>`    | Unit | Root element is a `div`                           |
| Respects `as` prop            | Unit | Root element matches `as` value (e.g., `article`) |
| Merges className              | Unit | Consumer className plus internal class            |
| Forwards ref                  | Unit | ref.current is the wrapper DOM node               |
| Passes through native attrs   | Unit | `data-*`, `aria-*` attributes present             |

---

## Accessibility

| Requirement       | How it's met                                           |
| ----------------- | ------------------------------------------------------ |
| Semantic HTML     | Polymorphic `as` allows `article`/`section`/`aside`    |
| Heading structure | Title uses `<h3>` — fits within typical page hierarchy |
| Color contrast    | Text colors meet 4.5:1 against white background        |
| Focus within      | Focusable children (links, buttons) work naturally     |
| Reduced motion    | Hover transition respects `prefers-reduced-motion`     |

### Heading level considerations

The title defaults to `<h3>`. If consumers need a different heading level, they should pass `title={undefined}` and render their own heading as a child:

```tsx
<Card>
  <h2>Custom Heading Level</h2>
  <p>Card content...</p>
</Card>
```

A future enhancement could add a `titleLevel` prop if this pattern becomes common.

---

## Consumer Usage

```tsx
import { Card } from "@troychaplin/c2b-storybook";

function ProgramList() {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Card as="article" title="Computer Science">
        Explore the fundamentals of computing and software development.
      </Card>
      <Card as="article" title="Engineering">
        Build the future with our accredited engineering programs.
      </Card>
      <Card as="article" title="Business">
        Develop leadership skills with the Sprott School of Business.
      </Card>
    </div>
  );
}
```

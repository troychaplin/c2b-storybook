# Button Component

A versatile button component that supports multiple visual variants, sizes, and states. Designed to be accessible (WCAG 2.1 AA) and composable.

---

## File Structure

```
src/components/Button/
├── Button.tsx              # Component implementation
├── Button.module.scss      # Scoped styles
├── Button.stories.tsx      # Storybook stories
├── Button.test.tsx         # Unit tests
└── index.ts                # Barrel export
```

---

## Props API

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "outline";

  /** Size of the button
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /** Standard button children (text, icons, etc.) */
  children: React.ReactNode;
}
```

### Props Table

| Prop        | Type                                    | Default     | Description                                 |
| ----------- | --------------------------------------- | ----------- | ------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style of the button                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`      | Size controlling padding and font-size      |
| `disabled`  | `boolean`                               | `false`     | Disables interaction and grays out          |
| `type`      | `'button' \| 'submit' \| 'reset'`       | `'button'`  | HTML button type attribute                  |
| `onClick`   | `(e: MouseEvent) => void`               | —           | Click handler                               |
| `className` | `string`                                | —           | Additional CSS class (merged, not replaced) |
| `children`  | `React.ReactNode`                       | —           | Button content (required)                   |
| `ref`       | `Ref<HTMLButtonElement>`                | —           | Forwarded ref to the `<button>` element     |
| `...rest`   | `ButtonHTMLAttributes`                  | —           | All native button attributes pass through   |

---

## Component Implementation

```tsx
// src/components/Button/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      type = "button",
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      disabled ? styles["button--disabled"] : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classNames}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

---

## Styles

```scss
// src/components/Button/Button.module.scss
@use "../../tokens" as tokens;
@use "../../mixins" as mixins;

// ──────────────────────────────────────
// Base
// ──────────────────────────────────────
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: tokens.$spacing-xs;

  font-family: tokens.$font-family-base;
  font-weight: tokens.$font-weight-semibold;
  line-height: tokens.$line-height-tight;

  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:focus-visible {
    outline: 2px solid tokens.$color-primary;
    outline-offset: 2px;
  }
}

// ──────────────────────────────────────
// Variants
// ──────────────────────────────────────
.button--primary {
  background-color: tokens.$color-primary;
  color: tokens.$color-white;
  border-color: tokens.$color-primary;

  &:hover:not(:disabled) {
    background-color: tokens.$color-primary-dark;
    border-color: tokens.$color-primary-dark;
  }

  &:active:not(:disabled) {
    background-color: tokens.$color-primary-dark;
  }
}

.button--secondary {
  background-color: tokens.$color-secondary;
  color: tokens.$color-white;
  border-color: tokens.$color-secondary;

  &:hover:not(:disabled) {
    background-color: tokens.$color-secondary-dark;
    border-color: tokens.$color-secondary-dark;
  }

  &:active:not(:disabled) {
    background-color: tokens.$color-secondary-dark;
  }
}

.button--outline {
  background-color: transparent;
  color: tokens.$color-primary;
  border-color: tokens.$color-primary;

  &:hover:not(:disabled) {
    background-color: tokens.$color-primary;
    color: tokens.$color-white;
  }

  &:active:not(:disabled) {
    background-color: tokens.$color-primary-dark;
    color: tokens.$color-white;
  }
}

// ──────────────────────────────────────
// Sizes
// ──────────────────────────────────────
.button--sm {
  font-size: tokens.$font-size-sm;
  padding: tokens.$spacing-xs tokens.$spacing-sm;
}

.button--md {
  font-size: tokens.$font-size-base;
  padding: tokens.$spacing-sm tokens.$spacing-md;
}

.button--lg {
  font-size: tokens.$font-size-lg;
  padding: tokens.$spacing-sm tokens.$spacing-lg;
}

// ──────────────────────────────────────
// Disabled
// ──────────────────────────────────────
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Token Usage Map

| Style property       | Token                         |
| -------------------- | ----------------------------- |
| Background (primary) | `$color-primary`              |
| Background (hover)   | `$color-primary-dark`         |
| Text color           | `$color-white`                |
| Border               | variant-matched color         |
| Font family          | `$font-family-base`           |
| Font weight          | `$font-weight-semibold`       |
| Padding (sm)         | `$spacing-xs` / `$spacing-sm` |
| Padding (md)         | `$spacing-sm` / `$spacing-md` |
| Padding (lg)         | `$spacing-sm` / `$spacing-lg` |
| Focus ring           | `$color-primary`              |

---

## Stories

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  component: Button,
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    a11y: { test: "error" },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Primary variants ──

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

// ── Sizes ──

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// ── States ──

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
```

### Story Coverage

| Story     | What it demonstrates               |
| --------- | ---------------------------------- |
| Primary   | Default variant appearance         |
| Secondary | Secondary brand color variant      |
| Outline   | Transparent background with border |
| Small     | Compact sizing for tight layouts   |
| Large     | Prominent sizing for CTAs          |
| Disabled  | Grayed-out, non-interactive state  |

---

## Tests

### What to test

| Test case                 | Type        | Assertion                                    |
| ------------------------- | ----------- | -------------------------------------------- |
| Renders children          | Unit        | Text appears in the DOM                      |
| Applies variant class     | Unit        | Correct CSS module class is present          |
| Applies size class        | Unit        | Correct CSS module class is present          |
| onClick fires             | Interaction | Handler called once on click                 |
| Disabled prevents onClick | Interaction | Handler not called when `disabled`           |
| Default type is "button"  | Unit        | `type="button"` attribute present            |
| Forwards ref              | Unit        | ref.current is the `<button>` DOM node       |
| Merges className          | Unit        | Consumer className plus internal classes     |
| Accessible role           | a11y        | `role="button"` is implicit (native element) |

---

## Accessibility

| Requirement         | How it's met                                     |
| ------------------- | ------------------------------------------------ |
| Keyboard accessible | Native `<button>` — Enter/Space triggers click   |
| Focus indicator     | `:focus-visible` with 2px primary-color outline  |
| Disabled state      | `disabled` attribute + `aria-disabled` inherited |
| Color contrast      | Primary/secondary meet 4.5:1 against white       |
| Reduced motion      | Transition respects `prefers-reduced-motion`     |

---

## Consumer Usage

```tsx
import { Button } from "@troychaplin/c2b-storybook";

function MyPage() {
  return (
    <div>
      <Button variant="primary" size="lg" onClick={() => alert("Clicked!")}>
        Apply Now
      </Button>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
      <Button variant="secondary" disabled>
        Coming Soon
      </Button>
    </div>
  );
}
```

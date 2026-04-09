# Component Architecture

This document defines the patterns and conventions used for every React component. All components follow the same structure to ensure consistency, discoverability, and maintainability.

---

## File Structure Per Component

Every component lives in its own directory under `src/components/`:

```
src/components/Button/
├── Button.tsx              # Component implementation
├── Button.module.scss      # Scoped styles (CSS Modules)
├── Button.stories.tsx      # Storybook stories
├── Button.test.tsx         # Unit + interaction tests
└── index.ts                # Barrel export
```

---

## Anatomy of a Component

### 1. Props Interface

Every component exports a named props interface. Props extend the native HTML element's attributes where appropriate.

```tsx
import { type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
}
```

**Conventions:**

- Interface name = `{ComponentName}Props`
- Extend native HTML attributes when the component maps to a single HTML element
- Use JSDoc `/** */` comments on each prop — Storybook autodocs reads these
- Default values are documented in the comment and applied via destructuring

### 2. Component Implementation

Components use `forwardRef` for DOM ref forwarding. Named exports only — no default exports.

```tsx
import { forwardRef } from "react";
import styles from "./Button.module.scss";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
    const classNames = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classNames} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

**Conventions:**

- `forwardRef` — allows consumers to attach refs
- `displayName` — required for readable React DevTools and Storybook
- Spread `...rest` onto the root element — passes through `aria-*`, `data-*`, event handlers
- `className` prop is merged (never replaced) with internal styles
- CSS Module classes use BEM-like naming: `button`, `button--primary`, `button--sm`

### 3. CSS Module

```scss
// Button.module.scss
@use "../../tokens" as tokens;
@use "../../mixins" as mixins;

.button {
  // Base styles for all buttons
}

.button--primary {
  // Primary variant styles
}

.button--sm {
  // Small size styles
}
```

**Conventions:**

- Import tokens and mixins via `@use` — never hardcode values
- Use BEM-style naming for modifier classes: `block--modifier`
- Each variant/size gets its own class (composed in the TSX)

### 4. Barrel Export

```ts
// index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

These roll up to the library entry point:

```ts
// src/index.ts
export { Button, type ButtonProps } from "./components/Button";
export { Card, type CardProps } from "./components/Card";
```

### 5. Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};
```

**Conventions:**

- `tags: ['autodocs']` — generates a docs page from props
- `parameters.a11y.test: 'error'` — a11y violations fail the test
- One story per meaningful variant/state
- Stories are named descriptively: `Primary`, `Secondary`, `Disabled`, `WithIcon`

### 6. Tests

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

**Conventions:**

- Test file co-located with the component
- Use `@testing-library/react` — test from the user's perspective
- Use `screen.getByRole` over `getByTestId` for accessibility
- Test: rendering, interactions, disabled/error states, a11y-relevant behavior

---

## Checklist for Adding a New Component

1. **Create directory:** `src/components/{ComponentName}/`
2. **Create files:** `{ComponentName}.tsx`, `.module.scss`, `.stories.tsx`, `.test.tsx`, `index.ts`
3. **Define props interface** extending native HTML attributes
4. **Implement with `forwardRef`**, spread rest props, merge `className`
5. **Style with CSS Module** consuming tokens and mixins
6. **Write stories** with `autodocs` tag and `a11y: { test: 'error' }`
7. **Write tests** covering render, interaction, and edge cases
8. **Export from barrel** in `index.ts` and `src/index.ts`
9. **Document** in `docs/components/{component-name}.md`

---

## Component Documentation

| Component | Document               |
| --------- | ---------------------- |
| Button    | [button.md](button.md) |
| Card      | [card.md](card.md)     |

# Contributing to design-to-deploy

This guide covers the development workflow, component creation conventions, testing requirements, and Claude Code tips for contributors.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Component Creation Guide](#component-creation-guide)
- [Testing Requirements](#testing-requirements)
- [Claude Code Workflow Tips](#claude-code-workflow-tips)
- [PR Review Checklist](#pr-review-checklist)

---

## Development Workflow

### 1. Pick an Issue

Browse [open issues](https://github.com/sachin1245/design-to-deploy/issues) and assign one to yourself. Issues are organized by phase and labeled accordingly.

### 2. Create a Branch

```bash
# Feature work
git checkout -b feature/<issue-number>-<short-description>

# Bug fix
git checkout -b fix/<issue-number>-<short-description>
```

Examples:
- `feature/42-add-tooltip-component`
- `fix/55-dialog-focus-trap`

### 3. Implement

Follow the conventions described in this guide. Key references:

- **Component patterns**: See [Component Creation Guide](#component-creation-guide) below
- **Design tokens**: Defined in `src/app/globals.css` and documented in `.claude/rules/design-system.md`
- **Existing components**: Browse `src/components/ui/` for reference implementations

### 4. Test

Every change should include appropriate tests:

- **New UI component**: Unit tests + visual regression tests
- **Page changes**: E2E tests
- **API routes**: Integration tests
- **Bug fixes**: Regression test that proves the fix

See [Testing Requirements](#testing-requirements) for details.

### 5. Verify

Run the full verification pipeline before committing:

```bash
pnpm typecheck        # TypeScript strict checks
pnpm lint             # Biome lint + format (use pnpm lint:fix to auto-fix)
pnpm test:unit        # Unit tests
pnpm test:integration # Integration tests
pnpm build            # Production build
```

Or use the Claude Code shortcut: `/verify`

### 6. Commit

Follow [Conventional Commits](https://www.conventionalcommits.org):

```
feat(components): add Tooltip component (#42)
fix(dialog): restore focus on close (#55)
test(button): add disabled state coverage
docs: update README with deployment instructions
```

Commitlint enforces the convention via a pre-commit hook (Lefthook).

### 7. Open a Pull Request

```bash
git push -u origin HEAD
gh pr create --title "feat(components): add Tooltip (#42)" --body "..."
```

Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`. The PR must pass all CI checks:
- TypeScript type checking
- Biome lint and format
- Unit tests (Vitest)
- E2E tests (Playwright)
- Lighthouse audits

---

## Component Creation Guide

All UI components live in `src/components/ui/` and follow strict conventions.

### File Structure

For a component named `Tooltip`:

```
src/components/ui/
├── tooltip.tsx                    # Component source
├── __tests__/tooltip.test.tsx     # Unit tests
└── index.ts                      # Add export here
```

### Required Patterns

Every component must:

1. **Use `forwardRef`** for ref forwarding
2. **Set `displayName`** on the forwardRef component
3. **Accept a `className` prop** and merge it with `cn()`
4. **Export TypeScript types** alongside the component
5. **Use design tokens** -- never hardcode colors, spacing, or radii

### CVA Pattern (for variant components)

Use `class-variance-authority` when a component has variants (size, color, style):

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "absolute z-50 rounded-md px-3 py-1.5 text-sm shadow-md", // base classes
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground border border-border",
        dark: "bg-foreground text-background",
      },
      side: {
        top: "-translate-y-full",
        bottom: "translate-y-full",
      },
    },
    defaultVariants: {
      variant: "default",
      side: "top",
    },
  },
);

type TooltipProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tooltipVariants>;

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, variant, side, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tooltipVariants({ variant, side }), className)}
      {...props}
    />
  ),
);
Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
export type { TooltipProps };
```

### Compound Pattern (for multi-part components)

Use composition when a component has distinct sub-parts (Card, Table, Dialog):

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export { Card, CardHeader };
```

### Barrel Export

Add new components to `src/components/ui/index.ts`:

```ts
export { Tooltip, tooltipVariants } from "./tooltip";
export type { TooltipProps } from "./tooltip";
```

### Design Token Usage

Always use semantic tokens, never raw values:

| Do | Don't |
|----|-------|
| `bg-primary` | `bg-violet-600` |
| `text-muted-foreground` | `text-gray-500` |
| `border-border` | `border-gray-200` |
| `rounded-lg` | `rounded-[12px]` |
| `shadow-md` | `shadow-[0_4px_6px_rgba(0,0,0,0.1)]` |

### Accessibility

- Use semantic HTML elements (`button`, `nav`, `dialog`, etc.)
- Add ARIA attributes where needed (`aria-label`, `aria-expanded`, `aria-describedby`)
- Support keyboard navigation (Tab, Escape, Enter, Space)
- Include focus-visible indicators: `focus-visible:ring-2 focus-visible:ring-ring`
- Give unique `aria-label` to every `<nav>`, `<aside>`, and `<section>` landmark
- Associate every form control with a `<label>` or `aria-label`
- Avoid `text-*/<opacity>` for readable text (fails WCAG AA contrast)

---

## Testing Requirements

### Unit Tests (Required for all components)

**Framework**: Vitest + React Testing Library
**Location**: `src/components/ui/__tests__/<component>.test.tsx`

Every component test file must cover:

- **Default render**: Component renders without errors
- **All variants**: Each variant option renders correctly
- **All sizes**: Each size option renders correctly
- **Event handlers**: Click, change, focus, blur (use `userEvent.setup()`)
- **Disabled state**: Disabled attribute applied, events blocked
- **Ref forwarding**: `createRef` attaches to the correct element
- **Custom className**: `className` prop merges correctly
- **Accessibility**: Roles, ARIA attributes, labels present

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

**Selector priority**: `getByRole` > `getByText` > `getByTestId`

### Integration Tests (Required for API routes)

**Framework**: Vitest
**Location**: `src/app/api/__tests__/<route>.test.ts`

Test HTTP status codes, response bodies, and edge cases. Mock external dependencies with `vi.mock()`.

### E2E Tests (Required for page changes)

**Framework**: Playwright
**Location**: `tests/e2e/<feature>.spec.ts`

Test user flows, not individual components. Scope locators to landmarks to avoid strict mode violations:

```ts
// Scope to a specific navigation region
const nav = page.getByRole("navigation", { name: "Main" });
await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
```

### Visual Regression Tests (Recommended for new components)

**Framework**: Playwright screenshots
**Location**: `tests/visual/`

Test every variant in both light and dark themes. Disable animations before screenshots.

### Running Tests

```bash
pnpm test:unit              # Unit tests
pnpm test:unit -- button    # Single component
pnpm test:integration       # API route tests
pnpm test:e2e               # End-to-end tests
pnpm test:visual            # Visual regression
pnpm test:coverage          # Unit tests with coverage report
pnpm test:all               # All suites
```

Coverage threshold: **80%** (enforced in `vitest.config.ts`).

---

## Claude Code Workflow Tips

### Quick Start

```bash
# Install Claude Code CLI
# https://claude.ai/claude-code

# Start working on an issue
claude
> /work-on-issue 42
```

The `/work-on-issue` command handles the entire workflow: reads the issue, creates a branch, implements, verifies, and opens a PR.

### Useful Commands

| Command | What It Does |
|---------|--------------|
| `/verify` | Runs typecheck + lint + unit tests + integration tests + build |
| `/new-component Tooltip` | Scaffolds a component with source, tests, and barrel export |
| `/pr-ready` | Verifies, commits, pushes, and opens a PR |
| `/work-on-issue 42` | Full issue workflow from branch to PR |
| `/orchestrate 19,20,21` | Parallel work on multiple issues (one subagent per issue) |
| `/cleanup-worktrees` | Removes worktrees for merged branches |

### Parallel Development

For working on multiple issues simultaneously:

```bash
# Option 1: Worktrees (simple)
claude -w issue-42    # Terminal 1
claude -w issue-43    # Terminal 2

# Option 2: Subagent orchestration
claude
> /orchestrate 42,43,44
```

Each worktree gets its own git branch and working directory. Run `pnpm install` in each worktree before starting.

### Design Token Reference

When implementing UI, use these semantic tokens:

```
bg-background / bg-foreground     # Page background / text
bg-primary / text-primary         # Brand color
bg-secondary / text-secondary     # Secondary actions
bg-muted / text-muted-foreground  # Subdued elements
bg-accent / text-accent           # Highlights
bg-destructive                    # Errors, delete actions
border-border                     # Default borders
bg-card / text-card-foreground    # Card surfaces
```

### Shared Config Files

These files must NOT be modified without explicit approval from the project maintainer:

- `package.json` / `pnpm-lock.yaml`
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `vitest.config.ts`, `playwright.config.ts`
- `biome.json`, `lefthook.yml`
- `src/app/layout.tsx`
- `.claude/settings.json`

---

## PR Review Checklist

Before requesting review, verify your PR passes all of these:

### Code Quality
- [ ] TypeScript strict mode passes (`pnpm typecheck`)
- [ ] Biome lint and format passes (`pnpm lint`)
- [ ] No `any` types (use `unknown` if needed)
- [ ] No type assertions (`as`) unless documented
- [ ] No dead code or unused imports

### Component Conventions
- [ ] Uses `forwardRef` and sets `displayName`
- [ ] Accepts and merges `className` via `cn()`
- [ ] Uses `cva` for variant management (where applicable)
- [ ] Exports types alongside components
- [ ] Uses design tokens (no hardcoded colors/spacing/radii)
- [ ] Added to barrel export in `src/components/ui/index.ts`

### Accessibility
- [ ] Semantic HTML elements used
- [ ] ARIA attributes present where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible (`focus-visible:ring-2`)
- [ ] Unique `aria-label` on landmark elements
- [ ] Form controls have associated labels
- [ ] Color contrast meets WCAG AA (4.5:1 normal, 3:1 large text)

### Testing
- [ ] Unit tests cover: render, variants, events, disabled, ref, className, a11y
- [ ] E2E tests cover page-level changes
- [ ] All tests pass (`pnpm test:all`)
- [ ] Coverage threshold met (80%)

### Performance
- [ ] Default to Server Components (no unnecessary `"use client"`)
- [ ] Images use Next.js `<Image>` with dimensions
- [ ] No layout shifts from dynamic content
- [ ] No inline function definitions in JSX causing re-renders

### Build
- [ ] Production build succeeds (`pnpm build`)
- [ ] No console errors or warnings
- [ ] CI pipeline passes (all GitHub Actions workflows green)

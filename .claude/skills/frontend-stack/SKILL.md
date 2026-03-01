---
description: Next.js 15 + React 19 + Tailwind v4 patterns for this project
globs:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "tailwind.config.*"
  - "src/app/globals.css"
---

# Frontend Stack Patterns

## Next.js 15 App Router
- Default to Server Components (no "use client" unless needed)
- Use "use client" only for: event handlers, useState/useEffect, browser APIs
- Layouts in `layout.tsx` — shared UI that doesn't re-render on navigation
- Pages in `page.tsx` — unique UI for each route
- Loading states in `loading.tsx`
- Error boundaries in `error.tsx` (must be client component)
- Route handlers in `route.ts` for API endpoints

## React 19
- Server Actions for form mutations (no API routes needed)
- `use()` for reading promises and context in render
- `useTransition` for non-blocking state updates
- `useOptimistic` for optimistic UI updates

## Tailwind v4
- CSS-first config via `@theme inline` in `src/app/globals.css`
- No `tailwind.config.ts` — all customization lives in CSS
- Design tokens defined as CSS custom properties in `:root` and `.dark`
- Token mapping: `@theme inline` maps `--color-*` vars → Tailwind utilities
- Use semantic color classes: `bg-primary`, `text-muted-foreground`, `border-border`
- Responsive: mobile-first with `sm:`, `md:`, `lg:` prefixes
- Dark mode via `.dark` class (managed by `next-themes`)

### Design Token Colors
Light `:root` / Dark `.dark` tokens:
`--background`, `--foreground`, `--card`, `--card-foreground`,
`--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`,
`--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`,
`--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`,
`--border`, `--input`, `--ring`

### Fonts
- `--font-sans` → Geist Sans (body text)
- `--font-mono` → Geist Mono (code)
- `--font-display` → Space Grotesk (headings)

## Component Conventions
- All components in `src/components/ui/`
- Barrel export from `src/components/ui/index.ts`
- Use `cva` (class-variance-authority) for variant management
- Use `cn()` from `src/lib/utils.ts` for class merging (clsx + tailwind-merge)
- Always use `forwardRef` and accept `className` prop
- Always set `displayName` on forwardRef components
- Types exported alongside components (e.g., `ButtonProps`)

### CVA Component Pattern
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("base-classes...", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
```

### Compound Component Pattern (no cva)
For components with sub-parts (Card, Dialog), use composition:
```tsx
import * as React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["rounded-xl border border-border bg-card text-card-foreground shadow-sm", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

### Radix UI Integration
Complex interactive components (Avatar, Dialog) use Radix UI primitives:
- `@radix-ui/react-avatar` for Avatar
- `@radix-ui/react-dialog` for Dialog
- `@radix-ui/react-slot` for polymorphic components

### Framer Motion (Animation)
- **Package**: `motion` (v12+) — import from `motion/react` (NOT `framer-motion`)
- **SSR**: All `motion.*` components MUST be in `"use client"` files
- **Presets**: Spring configs, variant presets, interaction helpers in `src/lib/motion.ts`
- **Wrapper components**: `MotionReveal`, `MotionStagger`, `MotionItem` in `src/components/motion/`
- **Accessibility**: ALWAYS call `useReducedMotion()` — wrapper components handle this automatically
- **Decision guide**: Use CSS for hover/focus/infinite loops; use Framer Motion for viewport reveals, stagger, springs, exit animations
- See `.claude/rules/animation-patterns.md` for complete patterns

## Existing Components
| Component | Type | Variants |
|-----------|------|----------|
| Button | CVA | primary, secondary, outline, ghost, destructive × sm, md, lg |
| Badge | CVA | default, success, warning, error, info |
| Avatar | CVA + Radix | sm, md, lg (with image + initials fallback) |
| Card | Compound | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Dialog | Compound + Radix | Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogPortal |
| Input | Simple | label, error message support |

## Testing
- Unit tests co-located: `src/components/ui/__tests__/`
- Use Vitest + React Testing Library
- E2E tests: `tests/e2e/`
- Visual regression: `tests/visual/`

## Key Utilities
- `cn()` in `src/lib/utils.ts` — merges Tailwind classes with conflict resolution
- Design tokens in `src/lib/tokens.ts` — typed token definitions for the design system

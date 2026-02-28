# Design System Rules — design-to-deploy

## Stack
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config via `@theme inline`)
- class-variance-authority (cva) for variants
- clsx + tailwind-merge via `cn()` utility

## Component Conventions

### File Structure
- Components: `src/components/ui/<name>.tsx`
- Tests: `src/components/ui/__tests__/<name>.test.tsx`
- Barrel export: `src/components/ui/index.ts`

### Required Patterns
1. **forwardRef** — every component must use `forwardRef`
2. **displayName** — set `ComponentName.displayName = "ComponentName"`
3. **className prop** — always accept and merge via `cn()`
4. **Type exports** — export `ComponentNameProps` alongside component
5. **Design tokens** — never hardcode colors, spacing, or radii

### CVA Pattern (for variant components)
```tsx
const variants = cva("base-classes", {
  variants: { variant: {}, size: {} },
  defaultVariants: {},
});
type Props = HTMLAttributes & VariantProps<typeof variants>;
const Component = forwardRef<Element, Props>(({ className, variant, size, ...props }, ref) => (
  <element ref={ref} className={cn(variants({ variant, size }), className)} {...props} />
));
```

### Compound Pattern (for multi-part components)
```tsx
const Part = React.forwardRef<Element, Props>(({ className, ...props }, ref) => (
  <element ref={ref} className={cn("base-classes", className)} {...props} />
));
Part.displayName = "Part";
```

## Design Tokens

### Colors (CSS Custom Properties)
- Semantic: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- With foregrounds: `--primary-foreground`, `--secondary-foreground`, etc.
- UI: `--border`, `--input`, `--ring`, `--card`, `--popover`
- Tailwind classes: `bg-primary`, `text-foreground`, `border-border`

### Dark Mode
- Toggle via `.dark` class on `<html>` (managed by `next-themes`)
- All tokens have light (`:root`) and dark (`.dark`) values
- Never use `dark:` prefix for token-based colors — they auto-switch

### Typography
- Scale: `text-xs` → `text-4xl`
- Families: `font-sans` (Geist Sans), `font-mono` (Geist Mono), `font-display` (Space Grotesk)
- Use `font-display` for headings and hero text

### Motion
- Durations: `--duration-instant` (50ms), `--duration-fast` (150ms), `--duration-normal` (250ms), `--duration-slow` (400ms), `--duration-slower` (600ms)
- Easing: `--ease-default`, `--ease-spring`, `--ease-out`
- Use CSS transitions, not JS animation libraries

### Spacing & Radius
- Spacing: Tailwind default scale (0–20)
- Radius: `rounded-sm` (0.375rem), `rounded-md` (0.5rem), `rounded-lg` (0.75rem), `rounded-xl` (1rem)

### Shadows
- Scale: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Testing
- Framework: Vitest + React Testing Library
- Selectors: `getByRole` > `getByText` > `getByTestId`
- Interactions: `@testing-library/user-event`
- Required tests: default render, variants, events, disabled state, ref forwarding, className merging
- Coverage threshold: 80%

## Accessibility
- Semantic HTML elements (`nav`, `button`, `dialog`, etc.)
- ARIA attributes where needed (`role`, `aria-label`, `aria-expanded`, etc.)
- Keyboard navigation support
- Focus visible indicators via `focus-visible:ring-2 focus-visible:ring-ring`

## Component Count: 36
Foundational (11) | Form Controls (6) | Feedback (5) | Navigation (6) | Data & Composite (8)

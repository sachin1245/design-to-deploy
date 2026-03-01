# Animation Patterns — CSS vs Framer Motion

Scoped to: `src/components/motion/**`, `src/components/landing/**`, `src/app/**/page.tsx`

## When to Use CSS vs Framer Motion

| Use CSS | Use Framer Motion |
|---------|-------------------|
| Hover/focus transitions | Viewport-triggered reveals |
| Dialog open/close (Radix) | Staggered entrance sequences |
| Infinite decorative loops (orbs, pulses) | Spring physics (natural bounce/ease) |
| Theme toggle animation | Exit animations (AnimatePresence) |
| Simple opacity/transform on `:hover` | Layout animations (shared layout) |
| Skeleton pulse animations | Scroll-linked progress |
| | Interactive feedback (hover lift, tap shrink) |
| | SVG path drawing |

## SSR Rules
- `motion.*` components MUST be in `"use client"` files or imported from client components
- Import from `motion/react` (NOT `framer-motion` — renamed at v11)
- The wrapper components in `src/components/motion/` handle the client boundary

## Spring Preset Reference

| Preset | Stiffness | Damping | Use Case |
|--------|-----------|---------|----------|
| `snappy` | 400 | 30 | Buttons, toggles, micro-interactions |
| `default` | 200 | 24 | General purpose, balanced feel |
| `gentle` | 80 | 14 | Viewport reveals, page entrances |
| `bouncy` | 300 | 12 | Hero elements, playful emphasis |

All presets defined in `src/lib/tokens.ts` and re-exported from `src/lib/motion.ts`.

## Pattern Examples

### Viewport Reveal
```tsx
import { MotionReveal } from "@/components/motion";

<MotionReveal direction="up" spring="gentle">
  <h2>Section Title</h2>
</MotionReveal>
```

### Staggered Children
```tsx
import { MotionStagger, MotionItem } from "@/components/motion";

<MotionStagger stagger={0.1} className="grid grid-cols-3 gap-4">
  {items.map((item) => (
    <MotionItem key={item.id}>
      <Card>{item.content}</Card>
    </MotionItem>
  ))}
</MotionStagger>
```

### Interactive Feedback (spread pattern)
```tsx
import { motion } from "motion/react";
import { hoverLift } from "@/lib/motion";

<motion.div {...hoverLift}>
  <Card>Hover me</Card>
</motion.div>
```

## Accessibility — Non-Negotiable
- ALWAYS call `useReducedMotion()` in components that animate
- The wrapper components (`MotionReveal`, `MotionStagger`, `MotionItem`) handle this automatically
- When using `motion.*` directly, check `useReducedMotion()` and set `transition: { duration: 0 }` if true
- Add `aria-hidden="true"` on purely decorative animated elements (particles, orbs)

## Testing Animated Components
Mock `motion/react` in Vitest to replace `motion.*` with plain HTML elements:
```tsx
vi.mock("motion/react", () => ({
  motion: new Proxy({}, {
    get: (_target, prop: string) => {
      const Component = forwardRef((props: Record<string, unknown>, ref: unknown) => {
        const htmlProps: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(props)) {
          if (!key.startsWith("while") && !key.startsWith("animate") &&
              !["initial", "exit", "variants", "transition", "viewport",
               "whileInView", "layout", "layoutId"].includes(key)) {
            htmlProps[key] = value;
          }
        }
        return createElement(prop, { ...htmlProps, ref });
      });
      Component.displayName = `motion.${prop}`;
      return Component;
    },
  }),
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));
```

Unit tests should verify: rendering, props, refs, events, className merging.
Do NOT test actual animation values — that's Framer Motion's responsibility.

## Advanced Patterns (Reference)
These are available in the `motion` package but not wrapped in our utilities:
- **Layout animations**: `layout` prop on `motion.*` for smooth layout shifts
- **Exit animations**: `AnimatePresence` + `exit` prop for unmount animations
- **Scroll-linked progress**: `useScroll()` + `useTransform()` for parallax/progress bars
- **SVG path drawing**: `pathDraw` variant from `@/lib/motion` with `motion.path`

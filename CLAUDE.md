# design-to-deploy

## Tech Stack
- Next.js 15 (App Router, Server Components)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Vitest + React Testing Library (unit/integration)
- Playwright (E2E + visual regression)
- Vercel (deployment)

## Conventions
- Components in `src/components/ui/` use `cva` for variants
- All components use `forwardRef` and accept `className` prop
- Tests co-located: `src/components/ui/__tests__/`
- E2E tests in `tests/e2e/`
- Visual tests in `tests/visual/`

## Verification Commands
```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run typecheck     # TypeScript check
npm run lint          # ESLint
npm run test:unit     # Unit tests
npm run test:e2e      # E2E tests
npm run test:visual   # Visual regression
npm run test:all      # Everything
```

## Branch Strategy
- `main` = production (protected)
- Feature branches: `feature/<issue-number>-<short-description>`
- Bug fix branches: `fix/<issue-number>-<short-description>`

## Mandatory Skills

### frontend-design Skill (REQUIRED)
**You MUST invoke the `frontend-design` skill (installed as a Claude Code plugin) before writing or modifying any UI component code.** This is non-negotiable.

Use `frontend-design` for:
- Creating new UI components (Button, Input, Card, Avatar, Dialog, Badge, etc.)
- Building or modifying page layouts (Home, About, Dashboard)
- Implementing designs from Figma into code
- Any visual/styling work involving Tailwind CSS or component variants
- Component showcase pages
- Any JSX/TSX that renders visible UI elements

**Workflow**: Always invoke `frontend-design` skill first → get design guidance → then implement the code. Never skip this step.

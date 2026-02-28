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

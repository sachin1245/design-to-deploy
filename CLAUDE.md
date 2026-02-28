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

## Parallel Session Workflow
Use git worktrees for parallel Claude sessions:
```bash
claude -w issue-<number>    # Creates isolated worktree
```
Each worktree session must:
1. Run `pnpm install` first
2. Stay focused on the assigned issue only
3. Use a unique dev server port if needed: `PORT=300X pnpm dev`
4. Run full verification before committing
5. Create PR with `gh pr create` targeting `main`

Do NOT modify shared config files (package.json, tsconfig.json, next.config.ts)
without explicit user approval.

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

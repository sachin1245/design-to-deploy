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
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm typecheck        # TypeScript check
pnpm lint             # Biome lint + format check
pnpm lint:fix         # Auto-fix lint + format issues
pnpm format           # Format files with Biome
pnpm test:unit        # Unit tests
pnpm test:integration # Integration tests (API routes)
pnpm test:e2e         # E2E tests
pnpm test:visual      # Visual regression
pnpm test:coverage    # Unit tests with coverage report
pnpm test:all         # All suites sequentially
```

## Branch Strategy & PR Workflow
- `main` = production (protected)
- Feature branches: `feature/<issue-number>-<short-description>`
- Bug fix branches: `fix/<issue-number>-<short-description>`
- **ALWAYS**: Every task → GitHub issue → feature branch → PR → merge. See `.claude/rules/pr-workflow.md`.

## Task Planning & Execution
ALWAYS plan before building. See `.claude/rules/task-planning.md` for the full sequence:
Explore → Plan → Implement → Simplify → Verify → Review → Ship.

## Parallel Workflows
Use native Claude Code features for parallel execution.
See `.claude/rules/parallel-execution.md` for full details (worktrees, agent teams, orchestrator).

## Shared Config File Registry
Workers/teammates must NOT modify these files without explicit justification:
- `package.json` / `pnpm-lock.yaml`
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `vitest.config.ts`, `playwright.config.ts`
- `biome.json`, `lefthook.yml`
- `src/app/layout.tsx`
- `.claude/settings.json`

## Mandatory Skills

**You MUST invoke the `frontend-design` skill before writing or modifying any UI component code.** This is non-negotiable. Always invoke first, get design guidance, then implement.

## MCP Servers
See `.claude/rules/mcp-servers.md` for Playwright + Figma configuration, rate limits, and design workflow.

## Battle-Tested Patterns
Detailed patterns are in dedicated rule files loaded contextually:
- **Biome linter**: `.claude/rules/biome-gotchas.md` (loads for `src/**/*.{ts,tsx}`)
- **SSR/Hydration**: `.claude/rules/ssr-pitfalls.md` (loads for `src/app/**/*.tsx`)
- **CI/CD**: `.claude/rules/cicd-patterns.md` (loads for `.github/**/*.yml`)
- **Claude Code config**: `.claude/rules/claude-code-config.md`
- **Design system**: `.claude/rules/design-system.md`

## Self-Improvement Protocol
When the user corrects your output or points out a mistake:
1. Acknowledge the correction immediately
2. Proactively ask: "Want me to capture this as a lesson with `/learn`?"
3. If yes (or if user invokes `/learn` directly), reflect and save

Rules for saving lessons:
- Check existing rules/memory first — no duplicates
- Use NEVER/ALWAYS directive format, 1-2 lines
- Include the "why" not just the "what"
- Choose the right location:
  - Project patterns -> `.claude/rules/<topic>.md`
  - Personal preferences -> auto memory `MEMORY.md`
  - Cross-project principles -> `~/.claude/rules/workflow-principles.md`
- If same mistake happens twice -> escalate to a hard rule in `.claude/rules/`
- Delete outdated rules when patterns change

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

## Parallel Execution (Native Claude Code)
Use Claude Code's built-in features instead of custom scripts:

### Option 1: Worktrees (Simple Parallel Sessions)
```bash
# Start isolated sessions for each issue
claude -w issue-42    # Creates .claude/worktrees/issue-42/ with new branch
claude -w issue-43    # In a separate terminal

# Each session auto-cleans up when done (or prompts to keep)
```

### Option 2: Agent Teams (Coordinated Parallel Work)
Enable in settings:
```json
// .claude/settings.json or env
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```
Then ask Claude to create a team:
```
Create an agent team to work on issues #42, #43, and #44 in parallel.
Spawn one teammate per issue. Each should create a feature branch,
implement, test, and open a PR.
```
Agent Teams provide: shared task list, inter-agent messaging, centralized
coordination, and automatic cleanup — no tmux required.

### Option 3: Subagent Worktrees (Automated Isolation)
Subagents can use `isolation: worktree` for automatic parallel execution
within a single session. Useful for research/review tasks.

### Shared Config File Registry
Workers/teammates must NOT modify these files without explicit justification:
- `package.json` / `pnpm-lock.yaml`
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `vitest.config.ts`, `playwright.config.ts`
- `biome.json`, `lefthook.yml`
- `src/app/layout.tsx`
- `.claude/settings.json`

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

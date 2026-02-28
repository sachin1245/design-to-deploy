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
pnpm test:e2e         # E2E tests
pnpm test:visual      # Visual regression
pnpm test:all         # Everything
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

## Orchestrated Parallel Execution
Run multiple issues in parallel blocks using tmux + worktrees:

```bash
# Preview what will happen
./scripts/orchestrate.sh --dry-run --block "42,43" --block "44,8,9"

# Run with defaults ($5 budget/worker, manual merge confirmation)
./scripts/orchestrate.sh --block "42,43" --block "44,8,9"

# Higher budget + auto-wait for merges
./scripts/orchestrate.sh --block "42,43" --block "44,8,9" --auto-merge-wait --budget 8.00

# Or use the slash command (generates the shell command for you)
# /orchestrate 42,43 | 44,8,9
```

**Block format:** Issues within a `--block` run in parallel. Blocks run sequentially — each waits for the previous block's PRs to merge.

**Options:**
| Flag | Description |
|------|-------------|
| `--block "<issues>"` | Comma-separated issue numbers (repeatable) |
| `--budget <amount>` | Max USD per worker (default: 5.00) |
| `--auto-merge-wait` | Poll GitHub for merged PRs instead of manual Enter |
| `--dry-run` | Preview without executing |

**tmux navigation:**
- `tmux attach -t claude-orchestrator` — attach to session
- `Ctrl-B n` / `Ctrl-B p` — next/prev window
- `Ctrl-B 0` — status window
- `Ctrl-B d` — detach (workers keep running)

**Status/logs:**
- `.claude/worktrees/status/issue-N.status` — worker state
- `.claude/worktrees/logs/issue-N.log` — full output

### Shared Config File Registry
Workers must NOT modify these files without explicit justification:
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

# Parallel Execution Rules

## Worktrees (Simple Parallel Sessions)
```bash
claude -w issue-42    # Creates .claude/worktrees/issue-42/ with new branch
claude -w issue-43    # In a separate terminal
# Each session auto-cleans up when done (or prompts to keep)
```
Each worktree session must:
1. Run `pnpm install` first
2. Stay focused on the assigned issue only
3. Use a unique dev server port if needed: `PORT=300X pnpm dev`
4. Run full verification before committing
5. Create PR with `gh pr create` targeting `main`

## Agent Teams (Coordinated Parallel Work)
Enable in settings:
```json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```
Agent Teams provide: shared task list, inter-agent messaging, centralized
coordination, and automatic cleanup.

## Subagent Worktrees (Automated Parallel)
Use `/orchestrate <issue-numbers>` to spawn parallel subagents, each in an
isolated worktree. The orchestrator validates issues, spawns agents with
`isolation: worktree` and `run_in_background: true`, and reports results.
Example: `/orchestrate 19,20,21` or `/orchestrate 16,17 | 18,19` for sequential blocks.

## Shared Config File Registry
Workers/teammates must NOT modify these files without explicit justification:
- `package.json` / `pnpm-lock.yaml`
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `vitest.config.ts`, `playwright.config.ts`
- `biome.json`, `lefthook.yml`
- `src/app/layout.tsx`
- `.claude/settings.json`

Run multiple GitHub issues in parallel using Claude Code's native features.

$ARGUMENTS should be comma-separated issue numbers, optionally pipe-delimited into blocks.
Example: `42,43 | 44,8,9` means Block 1 runs issues 42+43 in parallel, then
Block 2 runs issues 44+8+9 after Block 1's PRs are merged.

## Approach Options

### Option A: Simple Worktrees (Recommended for independent issues)
Generate terminal commands for the user to run in separate terminals:
```bash
claude -w issue-42 -p "Work on GitHub issue #42. Read the issue with gh issue view 42, create a feature branch, implement, verify with pnpm typecheck && pnpm lint && pnpm build, then create a PR." --dangerously-skip-permissions --max-budget-usd 5.00
```

### Option B: Agent Teams (For coordinated/dependent work)
Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.
Suggest the user ask Claude to:
```
Create an agent team to work on issues #42, #43, and #44 in parallel.
Spawn one teammate per issue. Each should:
1. Run pnpm install
2. Read their assigned issue with gh issue view
3. Create a feature branch: feature/<issue>-<short-desc>
4. Implement all tasks
5. Run verification: pnpm typecheck && pnpm lint && pnpm build
6. Create a PR targeting main
```

## Steps:
1. Parse the arguments into issue numbers and blocks
2. Recommend Option A (worktrees) for independent issues or Option B (Agent Teams) for coordinated work
3. Generate the appropriate commands
4. Remind user of the shared config file registry (don't modify package.json, tsconfig.json, etc.)
5. For multi-block execution, remind user to merge Block 1 PRs before starting Block 2

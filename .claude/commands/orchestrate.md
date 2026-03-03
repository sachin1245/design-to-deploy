Run multiple GitHub issues in parallel using automated subagent worktrees.

$ARGUMENTS should be comma-separated issue numbers, optionally pipe-delimited into sequential blocks.
Examples:
- `19,20,21` — run all 3 in parallel
- `16,17 | 18,19` — run Block 1 (16+17) in parallel, wait for completion, then run Block 2 (18+19)

## How It Works

This command spawns **one Agent tool call per issue**, all in a single response, using:
- `subagent_type: "general-purpose"`
- `isolation: "worktree"` (each agent gets its own git worktree)
- `run_in_background: true` (non-blocking, parallel execution)

Subagents do NOT have access to slash commands, so the full workflow is inlined in each agent's prompt.

## Steps

### 1. Parse Arguments
Split $ARGUMENTS on `|` to get sequential blocks, then split each block on `,` to get issue numbers.
Trim whitespace from each issue number.

### 2. Validate Issues
For each issue number, run `gh issue view <number> --json state,title` to confirm:
- The issue exists
- The issue is open (state == "OPEN")

If any issue is invalid or closed, report the error and stop.

### 2.5 Check Path Overlap

Before spawning agents, analyze issue titles and bodies for potential file overlap:

1. For each pair of issues, check if they reference the same files or directories
2. Use `gh issue view <NUMBER> --json body` and scan for file paths (patterns like `src/`, `.claude/`, `.github/`)
3. If two issues reference overlapping paths, emit a warning:

> **Warning — Path overlap detected**: Issues #X and #Y both reference `src/components/ui/`. Consider running them sequentially to avoid merge conflicts.

The warning is advisory — the user can proceed anyway, but should be aware of potential conflicts.

### 3. Spawn Agents (Per Block)
For each block of issues, spawn all agents in a **single response** (this is critical for true parallelism).
Each agent gets this prompt (with issue number substituted):

```
You are working on GitHub issue #<NUMBER> for the design-to-deploy project.

IMPORTANT CONSTRAINTS:
- Do NOT modify shared config files (package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, tailwind.config.ts, vitest.config.ts, playwright.config.ts, biome.json, lefthook.yml, src/app/layout.tsx, .claude/settings.json) without explicit justification.
- Stay focused on this issue ONLY. Do not modify unrelated files.
- If creating or modifying UI components, follow the project's frontend-design conventions: use cva for variants, forwardRef, accept className prop.

WORKFLOW:
1. Run `pnpm install` (worktrees always need fresh dependencies)
2. Read the issue: `gh issue view <NUMBER>`
3. Update project board: `./scripts/update-project-status.sh <NUMBER> in-progress`
4. Create feature branch: `git checkout -b feature/<NUMBER>-<short-description>`
5. Implement all tasks from the issue
6. Run verification: `pnpm typecheck && pnpm lint && pnpm build`
   - If lint fails, try `pnpm lint:fix` first, then re-run verification
7. Run tests if applicable: `pnpm test:unit` (don't fail if no tests exist yet)
8. Commit with a conventional commit message referencing #<NUMBER>
9. Push and create PR: `git push -u origin HEAD && gh pr create --fill`
10. Update project board: `./scripts/update-project-status.sh <NUMBER> review`

Report back with: the PR URL, a summary of changes made, and any issues encountered.
```

All agents in a block use:
- `subagent_type: "general-purpose"`
- `isolation: "worktree"`
- `run_in_background: true`
- `description: "Work on issue #<NUMBER>"`

### 4. Wait for Completion
After spawning all agents in a block, wait for all background agents to complete.
You will be automatically notified when each finishes — do NOT poll or sleep.

### 5. Report Results

After all agents in a block complete, present results in a structured table:

| Issue | Title | Status | PR | Branch | Files Changed |
|-------|-------|--------|------|--------|---------------|
| #19 | Add feature X | ✅ Success | #45 | feature/19-add-x | 3 |
| #20 | Fix bug Y | ❌ Failed | — | fix/20-fix-y | — |
| #21 | Update docs | ✅ Success | #46 | feature/21-update-docs | 2 |

For each completed agent, extract:
- **Status**: ✅ Success (PR created) or ❌ Failed (error occurred)
- **PR**: The PR number/URL if created, "—" if failed
- **Branch**: The branch name used
- **Files Changed**: Count of files modified (from `git diff --stat`)

### Error Details

When an agent fails, include the last 20 lines of its output to help diagnose the issue:

<details>
<summary>❌ Issue #20 — Error details</summary>

[Last 20 lines of agent output from the output file]

</details>

Read the agent's output file (provided in the agent completion notification) and extract the final 20 lines for the error excerpt.

### 6. Next Block (if applicable)
If there are more blocks (`|`-separated), proceed to spawn the next block's agents.
Remind the user that Block 1 PRs should be merged before Block 2 agents start (if there are dependencies).

## Example Execution

For `/orchestrate 19,20,21`:
1. Validate issues #19, #20, #21 are open
2. Spawn 3 Agent tool calls in ONE response (all with isolation: worktree, run_in_background: true)
3. Wait for all 3 to complete
4. Report: "Issue #19: PR #XX created, Issue #20: PR #YY created, Issue #21: PR #ZZ created"

For `/orchestrate 16,17 | 18,19`:
1. Validate all 4 issues
2. Spawn 2 agents for Block 1 (#16, #17)
3. Wait for Block 1 to complete, report results
4. Spawn 2 agents for Block 2 (#18, #19)
5. Wait for Block 2 to complete, report final results

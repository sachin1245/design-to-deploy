# Task Planning & Agent Orchestration

Based on Boris Cherny's workflow (Claude Code creator).

## Plan First — Always
- ALWAYS start in Plan mode for non-trivial tasks. Planning is cheap; rework is expensive.
- Iterate on the plan with the user until both sides are satisfied BEFORE writing code.
- After plan approval, switch to auto-accept edits mode — Claude can usually one-shot it.
- Use Plan mode for: PRs, bug investigation, codebase exploration, performance work, multi-file changes.
- Skip Plan mode ONLY for: single-line fixes, typos, obvious bugs, very specific instructions.

## Agent Execution Sequence
For a typical feature task, follow this order:

1. **Explore** — Use the Explore agent to understand the codebase area before planning.
2. **Plan** — Use Plan mode or the Plan agent to design the approach. Get user sign-off.
3. **Implement** — Write the code. Use auto-accept mode after plan approval.
4. **Simplify** — Run `code-simplifier` agent to reduce complexity as a cleanup pass.
5. **Verify** — Run `/verify` (typecheck + lint + tests). Use Playwright for visual checks.
6. **Review** — Run `code-reviewer` agent to catch issues before creating the PR.
7. **Ship** — Run `/pr-ready` to create the branch and PR.

Not every step is needed for every task — scale to complexity.

## Subagent Selection Rules
- **Explore agent**: Codebase research, finding files/patterns, understanding architecture.
- **Plan agent**: Architectural design, identifying files to create/modify, trade-off analysis.
- **code-simplifier**: Post-implementation cleanup. ALWAYS run after complex changes.
- **code-reviewer**: Pre-PR validation. Catches bugs, security issues, style violations.
- **test-writer**: When test coverage is needed for new/modified components.
- **design-implementer**: When implementing from Figma designs.
- Use subagents for **isolated results or side effects** — they protect main context from bloat.
- NEVER duplicate work: if you delegate research to a subagent, don't also search yourself.
- Specialization > generalization: modular roles with constraints are more reliable than one big agent.

## Verification Loops — Non-Negotiable
- ALWAYS give Claude a way to verify its work. This 2-3x the quality of final results.
- Match verification to domain:
  - **TypeScript/Lint**: `pnpm typecheck && pnpm lint`
  - **Unit tests**: `pnpm test:unit`
  - **Frontend/Visual**: Playwright MCP screenshots at multiple viewports
  - **E2E**: `pnpm test:e2e`
- Run the full verification pipeline before declaring done.
- Hooks handle automatic quality gates — don't fight them, lean into them.

## Async & Parallel Mindset
- AI coding is asynchronous, not synchronous. Launch parallel work where possible.
- Use `run_in_background: true` for independent subagents; continue other work while they run.
- Batch reviews: review multiple outputs together rather than constant checking.
- Use system notifications to know when Claude needs input — don't poll.

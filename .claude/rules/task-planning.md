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
3. **Staff Review** — For complex features, run `staff-reviewer` agent to validate the plan before coding.
4. **Implement** — Write the code. Use auto-accept mode after plan approval.
5. **Simplify** — Run `/simplify` (code-simplifier plugin) to reduce complexity as a cleanup pass.
6. **Verify** — Run `verify-app` agent for thorough end-to-end verification (or `/verify` for quick checks).
7. **Review** — Run `code-reviewer` agent to catch issues before creating the PR.
8. **Build Validate** — Run `build-validator` agent to confirm production readiness.
9. **Ship** — Run `/pr-ready` to create the branch and PR.

Not every step is needed for every task — scale to complexity.

## Project Agents (`.claude/agents/`)

| Agent | Model | When to Use |
|-------|-------|-------------|
| `staff-reviewer` | opus | BEFORE implementation — validates plan, finds problems early |
| `design-implementer` | opus | UI component work from specs or Figma designs |
| `test-writer` | sonnet | Comprehensive test suites for new/modified components |
| `code-reviewer` | sonnet | Pre-PR structured review (TypeScript, a11y, perf, security) |
| `verify-app` | sonnet | End-to-end verification: static analysis + tests + live app checks |
| `build-validator` | sonnet | Production build validation + bundle analysis |
| `feature-orchestrator` | opus | Coordinates full feature lifecycle — delegates to other agents |

## Installed Plugins (global)

| Plugin | Skill | When to Use |
|--------|-------|-------------|
| `code-simplifier` | `/simplify` | Post-implementation cleanup — reduce complexity, improve naming |
| `feature-dev` | `/feature-dev` | Guided feature development with code-reviewer/architect/explorer |
| `frontend-design` | `/frontend-design` | MANDATORY before any UI component work |

## Subagent Selection Rules
- Use **subagents for isolated results or side effects** — they protect main context from bloat.
- NEVER duplicate work: if you delegate research to a subagent, don't also search yourself.
- Specialization > generalization: modular roles with constraints beat one big agent.
- Run independent subagents with `run_in_background: true` and continue other work.

## Verification Loops — Non-Negotiable
- ALWAYS give Claude a way to verify its work. This 2-3x the quality of final results.
- Match verification to domain:
  - **TypeScript/Lint**: `pnpm typecheck && pnpm lint`
  - **Unit tests**: `pnpm test:unit`
  - **Frontend/Visual**: Playwright MCP screenshots at multiple viewports
  - **E2E**: `pnpm test:e2e`
  - **Production readiness**: `build-validator` agent
- NEVER declare "done" with only typecheck + lint + build. The MINIMUM verification for any frontend work is: `pnpm typecheck && pnpm lint && pnpm test:unit && pnpm build`. For pages/routes, ALSO run `pnpm test:e2e`. Cherry-picking 3 of 5 checks is not "verification."
- If the plan specifies writing tests (e.g., E2E, visual), those tests are deliverables — not optional extras to skip.
- Hooks handle automatic quality gates — don't fight them, lean into them.

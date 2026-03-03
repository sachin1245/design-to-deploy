# Agentic Infrastructure Inventory

> Canonical reference for all Claude Code infrastructure in design-to-deploy.
> Last updated: 2026-03-04

## Agents (8)

| Agent | Model | File | Purpose |
|-------|-------|------|---------|
| staff-reviewer | opus | `.claude/agents/staff-reviewer.md` | Pre-implementation plan review — finds problems before code is written |
| design-implementer | opus | `.claude/agents/design-implementer.md` | Implements components from design specs using the project design system |
| feature-orchestrator | opus | `.claude/agents/feature-orchestrator.md` | Coordinates full feature lifecycle — implement, test, review |
| code-reviewer | sonnet | `.claude/agents/code-reviewer.md` | Reviews code for bugs, logic errors, security, and quality |
| test-writer | sonnet | `.claude/agents/test-writer.md` | Writes unit + visual tests for components |
| verify-app | sonnet | `.claude/agents/verify-app.md` | End-to-end verification: static analysis, tests, live app checks |
| build-validator | sonnet | `.claude/agents/build-validator.md` | Build and CI specialist — validates production readiness |
| agent-team-template | opus | `.claude/agents/agent-team-template.md` | Parallel team coordination template (UX + Implementation + QA) |

## Commands (7)

| Command | File | Description |
|---------|------|-------------|
| `/work-on-issue` | `.claude/commands/work-on-issue.md` | End-to-end issue workflow: read issue, create branch, implement, verify, PR |
| `/pr-ready` | `.claude/commands/pr-ready.md` | Prepare current work for PR: verify, commit, push, create PR |
| `/verify` | `.claude/commands/verify.md` | Run full verification pipeline: typecheck + lint + unit tests + build |
| `/new-component` | `.claude/commands/new-component.md` | Scaffold a new UI component with tests, barrel export, and showcase entry |
| `/orchestrate` | `.claude/commands/orchestrate.md` | Spawn parallel subagents in isolated worktrees, one per issue |
| `/cleanup-worktrees` | `.claude/commands/cleanup-worktrees.md` | List and remove worktrees whose branches have been merged |
| `/learn` | `.claude/commands/learn.md` | Capture a correction or lesson as a durable rule in project memory |

## Skills (3)

| Skill | File | Trigger | Globs |
|-------|------|---------|-------|
| frontend-stack | `.claude/skills/frontend-stack/SKILL.md` | Contextual (file patterns) | `src/**/*.tsx`, `src/**/*.ts`, `tailwind.config.*`, `src/app/globals.css` |
| testing | `.claude/skills/testing/SKILL.md` | Contextual (file patterns) | `src/**/__tests__/**`, `tests/**`, `vitest.config.*`, `playwright.config.*` |
| gemini | `.claude/skills/gemini/SKILL.md` | Manual (must invoke before `mcp__gemini-cli__*` calls) | N/A |

## Rules (10)

| Rule | File | Path Scope |
|------|------|------------|
| Animation Patterns | `.claude/rules/animation-patterns.md` | `src/components/motion/**`, `src/components/landing/**`, `src/app/**/page.tsx` |
| Biome Gotchas | `.claude/rules/biome-gotchas.md` | `src/**/*.{ts,tsx}`, `tests/**/*.{ts,tsx}`, `biome.json` |
| CI/CD Patterns | `.claude/rules/cicd-patterns.md` | `.github/**/*.yml`, `.github/**/*.yaml` |
| Claude Code Config | `.claude/rules/claude-code-config.md` | General (no path scope) |
| Design System | `.claude/rules/design-system.md` | General (no path scope) |
| MCP Servers | `.claude/rules/mcp-servers.md` | General (no path scope) |
| Parallel Execution | `.claude/rules/parallel-execution.md` | General (no path scope) |
| PR Workflow | `.claude/rules/pr-workflow.md` | General (no path scope) |
| SSR Pitfalls | `.claude/rules/ssr-pitfalls.md` | `src/app/**/*.tsx`, `src/app/**/*.ts` |
| Task Planning | `.claude/rules/task-planning.md` | General (no path scope) |

## Hooks (3 groups)

| Hook Type | Event | Action | Timeout |
|-----------|-------|--------|---------|
| PostToolUse | Write or Edit | `biome check --write --unsafe` on modified file | 30s |
| Stop | Session end | `pnpm typecheck` + `pnpm lint` (last 20 lines) | 120s |
| Stop | Session end | Self-improvement reminder (prompt to use `/learn`) | 5s |
| Notification | Task complete | macOS desktop notification via `osascript` | 10s |

## MCP Servers (3)

| Server | Type | Package/URL | Auth | Rate Limit |
|--------|------|-------------|------|------------|
| Playwright | Local (npx) | `@anthropic-ai/mcp-playwright` | None | Unlimited |
| Figma | Remote (HTTP) | `https://mcp.figma.com/mcp` | OAuth (browser popup) | 6 calls/month (free tier) |
| Gemini CLI | Local (npx) | `mcp-gemini-cli` | Google OAuth (`~/.gemini/oauth_creds.json`) | Unlimited |

## Security Model

### Tool Permissions (.claude/settings.json)

**Bash commands allowed** (26 patterns):
- Build: `pnpm *`, `npm run *`, `npx vitest *`, `npx playwright *`, `npx tsc *`, `npx next *`, `npx biome *`
- GitHub: `gh issue view *`, `gh pr create *`, `gh pr list *`, `gh pr view *`, `gh issue edit *`, `gh api *`, `gh project *`
- Git: `git checkout *`, `git branch *`, `git push *`, `git status`, `git log *`, `git diff *`, `git pull *`, `git worktree *`
- Scripts: `./scripts/update-project-status.sh *`, `bash scripts/update-project-status.sh *`, `chmod +x scripts/*`

**File edit patterns allowed** (9 paths):
- `src/**`, `tests/**`, `.github/**`, `scripts/**`
- `.claude/commands/**`, `.claude/agents/**`, `.claude/rules/**`
- `docs/**`, `CLAUDE.md`

### Protected Files (Shared Config Registry)

These files must NOT be modified by agents/worktree workers without explicit justification:
- `package.json` / `pnpm-lock.yaml`
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `vitest.config.ts`, `playwright.config.ts`
- `biome.json`, `lefthook.yml`
- `src/app/layout.tsx`
- `.claude/settings.json`

### MCP Auth Boundaries

| Server | Auth Type | Scope | Risk |
|--------|-----------|-------|------|
| Playwright | None | Local browser only | Low — local automation |
| Figma | OAuth token | Read designs, manage Code Connect | Medium — rate-limited, read-mostly |
| Gemini CLI | Google OAuth | Gemini API access | Low — local CLI, no write access |

## Counts Summary

| Category | Count |
|----------|-------|
| Agents | 8 |
| Commands | 7 |
| Skills | 3 |
| Rules | 10 |
| Hook groups | 3 (4 individual hooks) |
| MCP servers | 3 |
| Protected files | 10 |
| Bash permission patterns | 26 |
| File edit patterns | 9 |

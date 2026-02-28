# Build Summary: design-to-deploy

A complete design system and application built from scratch using Claude Code,
demonstrating an AI-assisted development workflow from initial scaffolding
through production deployment.

## Project Statistics

| Metric | Count |
|--------|-------|
| UI Components | 36 |
| Component Lines (TSX) | ~2,600 |
| Unit/Integration Test Files | 47 |
| Unit Tests (individual) | 310 |
| E2E Spec Files | 4 |
| Visual Regression Spec Files | 2 |
| Total Test Lines | ~600 |
| App Pages | 6 (Home, About, Dashboard, Showcase, Landing, Design System) |
| CI Workflows | 5 (test, PR automation, Lighthouse, Vercel preview, Vercel production) |
| Merged PRs | 39 |
| Total Commits | ~113 |
| Claude Agents | 5 (code reviewer, design implementer, test writer, orchestrator, team template) |
| Slash Commands | 6 (new-component, verify, pr-ready, work-on-issue, orchestrate, cleanup-worktrees) |
| Skills | 2 (frontend-stack, testing) |
| Design Systems | 2 (Clarity default + Area nature theme) |

## Phase-by-Phase Retrospective

### Phase 1: Project Scaffolding (PR #33-34)
**What happened**: Initialized Next.js 15 with App Router, set up CLAUDE.md,
created `.claude/` directory structure, added GitHub issue templates and
project board.

**Key learning**: Investing in CLAUDE.md early pays compound dividends. Every
subsequent phase benefited from clear conventions being documented upfront.
The `.claude/settings.json` permissions model prevented accidental file access
while giving Claude enough freedom to work autonomously.

**What worked**: Defining branch naming conventions (`feature/<issue>-<desc>`)
and the shared config file registry from day one.

### Phase 2: Design Tokens and Core Components (PR #35-38)
**What happened**: Created the CSS custom property-based design token system,
built the first 6 components (Button, Input, Badge, Card, Avatar, Dialog),
and assembled the component showcase page.

**Key learning**: Using semantic token indirection (`--primary`, `--foreground`,
etc.) rather than direct color values made the later theme-swapping feature
(Phase 7+) possible with zero component changes. The CVA + forwardRef pattern
established here became the template for all 30 subsequent components.

**What worked**: Co-locating tests with components (`__tests__/` directories)
made it natural to write tests alongside implementation. The `cn()` utility
(clsx + tailwind-merge) eliminated className conflict bugs.

### Phase 3: Testing Infrastructure (PR #39-40, #52, #55)
**What happened**: Set up Vitest with React Testing Library, Playwright for
E2E testing, visual regression with screenshot comparison, and unified test
runner with 80% coverage thresholds.

**Key learning**: Setting coverage thresholds early (80% for statements,
branches, functions, and lines) created healthy pressure to maintain test
quality throughout the project. The `v8` coverage provider with glob includes
automatically tracked new files.

**What worked**: Separating test types (unit in `src/`, E2E in `tests/e2e/`,
visual in `tests/visual/`) with distinct configs kept concerns clean. The
`pnpm test:all` script provided a single command to verify everything.

**What could be improved**: Visual regression snapshots are platform-dependent
(macOS vs Linux font rendering). CI runs on Ubuntu, so snapshots generated
locally on macOS needed `--update-snapshots` on first CI run.

### Phase 4: CI/CD Pipeline (PR #56-58)
**What happened**: Added GitHub Actions test pipeline, PR automation
(auto-labeling, test result comments), and Vercel deployment (preview on PR,
production on main push).

**Key learning**: Concurrency groups with `cancel-in-progress: true` are
essential for avoiding CI waste. Separating preview and production deploy
workflows prevented accidental production deployments from PR merges.

**What worked**: The PR automation workflow that auto-labels PRs based on
changed file paths (components, tests, CI, docs) made triage effortless.

### Phase 5: Developer Experience Tools (PR #47-48, #51)
**What happened**: Migrated npm to pnpm, replaced ESLint with Biome, added
lefthook pre-commit hooks, commitlint for conventional commits, bundle
analyzer, and TypeScript strict flags.

**Key learning**: The npm-to-pnpm migration was smooth but required updating
every command reference in CLAUDE.md and slash commands. Biome (Rust-based)
is 10-25x faster than ESLint for linting + formatting combined. Adding
`noPropertyAccessFromIndexSignature` strict flag surfaced real bugs but
required `biome-ignore` comments for legitimate bracket notation usage.

**What worked**: Lefthook pre-commit hooks catching Biome errors and TypeScript
issues before they reached CI. The commitlint integration enforced clean
commit history.

**What could be improved**: The strict TypeScript flag
`noPropertyAccessFromIndexSignature` conflicts with Biome's
`useLiteralKeys` rule. This required `biome-ignore` comments in several
config files — a friction point that should be documented for new contributors.

### Phase 6: Claude Code Skills, Commands, and Agents (PR #59-64, #76)
**What happened**: Created slash commands (`/new-component`, `/verify`,
`/pr-ready`, `/work-on-issue`, `/orchestrate`), skills (frontend-stack,
testing patterns), and agents (code reviewer, design implementer, test writer,
feature orchestrator).

**Key learning**: Slash commands are most valuable when they encode multi-step
workflows that are easy to get wrong manually. The `/new-component` command,
for example, enforces the full pattern: forwardRef + displayName + CVA +
className merging + barrel export + test file scaffold.

**What worked**: The test-writer agent consistently produced high-quality tests
because it had access to the testing skill's pattern library. Agent
specialization (reviewer vs implementer vs tester) matched natural development
roles.

**What could be improved**: Agent Teams (experimental) required the
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable and had
occasional coordination issues. Worktree-based parallelism was more reliable.

### Phase 7: MCP Integration and Figma (PR #22/66, #67, #68, #74/75)
**What happened**: Configured Playwright and Figma MCP servers, built all 30
remaining components (expanding from 6 to 36), created the landing page from
Figma-verified design, and added the design system reference page for Figma
import.

**Key learning**: Figma MCP's free tier (6 calls/month) is severely limiting.
The workaround was to use Playwright MCP for screenshots of the running app
and the `html.to.design` Chrome extension for Figma import. The
`create_design_system_rules` and `generate_diagram` tools were the most
valuable Figma calls.

**What worked**: Building 30 components in implementation waves (Foundational,
Form Controls, Feedback, Navigation, Data/Composite) with co-located tests
maintained quality at scale. Each wave shipped with 100% test coverage for
its components.

**What could be improved**: The `generate_figma_design` tool (Code to Canvas)
is not available in Claude Code CLI, only in Claude.ai browser. This blocked
the direct code-to-Figma pipeline.

### Phase 8: Application Pages and Performance (PR #79, #80, #82, #84, #85)
**What happened**: Built Home, About, and Dashboard pages, added the swappable
Area design system with nature/organic theme, fixed hydration and border radius
issues, added Lighthouse CI, and wrote comprehensive test coverage for all
pages.

**Key learning**: The design token architecture proved its value here. Adding
the Area theme required only new CSS custom property values in `globals.css`
and a provider component — zero changes to any of the 36 existing components.
The hydration mismatch from `nonce` clearing was a subtle SSR bug that took
investigation to understand.

**What worked**: Lighthouse CI with performance budgets (Performance >= 90,
Accessibility >= 95, LCP < 2.5s, CLS < 0.1, TBT < 200ms) caught regressions
automatically. All pages use Server Components for optimal performance.

**What could be improved**: The Area theme's initial `--radius-base-xl: 9999px`
(pill shape) created oval-shaped cards and dialogs. Extreme design token values
should be validated against all component contexts, not just buttons.

### Phase 9: Automation and Orchestration (PR #77, #76, #83)
**What happened**: Added Claude Code hooks (PostToolUse auto-format, Stop
verification, Notification), the feature orchestrator agent, and documented
Agent Teams experiment.

**Key learning**: PostToolUse hooks for auto-formatting eliminated an entire
category of review feedback. The Stop hook (typecheck + lint) ensured no
session ended with broken code. These hooks were the highest-ROI configuration
change in the entire project.

**What worked**: The orchestrator pattern (spawn parallel subagents in
worktrees) enabled working on multiple issues simultaneously. Each agent
operated in isolation with its own branch and dependencies.

### Phase 10: Retrospective and Documentation (this PR)
**What happened**: Reviewed all 39 merged PRs, identified patterns and
learnings, updated CLAUDE.md with battle-tested rules, created reusable
config documentation, and verified production readiness.

## What Worked Well with Claude Code

1. **CLAUDE.md as living documentation**: The file evolved across every phase,
   accumulating rules that prevented repeated mistakes. New sessions
   immediately inherited all project knowledge.

2. **Hooks for automated quality**: PostToolUse (Biome format) + Stop
   (typecheck + lint) eliminated manual quality checks.

3. **Worktree isolation for parallel work**: `claude -w issue-<N>` provided
   clean environments without branch switching overhead.

4. **Skills as reusable knowledge**: The frontend-stack and testing skills
   encoded patterns that agents could apply consistently across components.

5. **Slash commands for multi-step workflows**: `/new-component`,
   `/verify`, and `/pr-ready` eliminated common errors in repetitive
   workflows.

6. **Shared Config File Registry**: Listing protected files in CLAUDE.md
   prevented merge conflicts when multiple agents worked in parallel.

7. **Conventional commits via commitlint**: Clean commit history made the
   retrospective analysis straightforward.

## What Could Be Improved

1. **Figma MCP rate limits**: 6 calls/month on the free tier is too
   restrictive for a real design-to-code workflow. Budget for a paid plan
   or use the html.to.design workaround.

2. **Visual regression snapshot portability**: Screenshots differ between
   macOS and Linux due to font rendering. Consider using Docker for
   consistent snapshot environments.

3. **Agent Teams stability**: The experimental Agent Teams feature had
   coordination issues. Worktree-based parallelism was more reliable for
   this project's needs.

4. **Strict TypeScript vs Biome conflicts**: The `noPropertyAccessFromIndexSignature`
   flag requires bracket notation that Biome's `useLiteralKeys` rule
   discourages. This creates `biome-ignore` comment noise. Consider
   disabling one or the other.

5. **Component API documentation**: While the showcase page demonstrates
   every component, there is no generated API documentation (props tables,
   usage examples). A tool like Storybook or a custom docs page would help.

6. **E2E test speed**: Playwright tests on CI (Ubuntu, single worker) are
   slower than local runs. Consider parallelizing with multiple Chromium
   workers or sharding across CI jobs.

## Architecture Decisions That Paid Off

1. **CSS custom properties over Tailwind config**: Design tokens in
   `globals.css` as CSS custom properties (not `tailwind.config.ts` theme
   extensions) enabled runtime theme switching without rebuilds.

2. **Server Components by default**: All pages and most components are
   Server Components. Client interactivity is opt-in (`"use client"`) only
   where needed (theme toggle, mobile nav, design system toggle).

3. **Vitest over Jest**: Vitest's native ESM support, Vite-based transform
   pipeline, and first-class TypeScript support eliminated the configuration
   overhead typical of Jest + Next.js setups.

4. **Biome over ESLint + Prettier**: A single tool for linting and
   formatting, written in Rust, with sub-second execution times. The
   migration from ESLint was straightforward.

5. **pnpm over npm**: Strict dependency resolution caught phantom dependency
   issues. Faster installs in CI. Workspace-aware for potential monorepo
   expansion.

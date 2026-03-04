# design-to-deploy

A reference project demonstrating how to build a production-ready Next.js application with [Claude Code](https://claude.ai/claude-code). From design system to deployment, every phase was implemented using AI-assisted development workflows -- skills, agents, slash commands, and hooks.

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router, Server Components) | 16 |
| UI Library | [React](https://react.dev) | 19 |
| Language | [TypeScript](https://www.typescriptlang.org) (strict mode) | 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) (CSS-first config) | 4 |
| Component Variants | [class-variance-authority](https://cva.style) (cva) | 0.7 |
| Unit Testing | [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com) | 4 |
| E2E / Visual Testing | [Playwright](https://playwright.dev) | 1.58 |
| Linter / Formatter | [Biome](https://biomejs.dev) | 2 |
| Git Hooks | [Lefthook](https://github.com/evilmartians/lefthook) + [Commitlint](https://commitlint.js.org) | - |
| Error Monitoring | [Sentry](https://sentry.io) | 10 |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) | - |
| Deployment | [Vercel](https://vercel.com) | - |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [pnpm](https://pnpm.io) 9+
- [Claude Code CLI](https://claude.ai/claude-code) (for AI-assisted workflows)

### Installation

```bash
# Clone the repository
git clone https://github.com/sachin1245/design-to-deploy.git
cd design-to-deploy

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run Biome lint and format checks |
| `pnpm lint:fix` | Auto-fix lint and format issues |
| `pnpm format` | Format files with Biome |
| `pnpm test:unit` | Run unit tests (Vitest) |
| `pnpm test:integration` | Run integration tests (API routes) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm test:visual` | Run visual regression tests (Playwright) |
| `pnpm test:coverage` | Run unit tests with coverage report |
| `pnpm test:all` | Run all test suites sequentially |
| `pnpm analyze` | Build with bundle analyzer |
| `pnpm lighthouse` | Run Lighthouse CI audits |

## Project Structure

```
design-to-deploy/
├── .claude/                        # Claude Code configuration
│   ├── agents/                     # Agent definitions (8 agents)
│   │   ├── staff-reviewer.md       # Pre-implementation plan review agent
│   │   ├── code-reviewer.md        # Code review checklist agent
│   │   ├── test-writer.md          # Unit + visual test writer agent
│   │   ├── design-implementer.md   # Figma-to-code implementation agent
│   │   ├── feature-orchestrator.md # Full feature lifecycle coordinator
│   │   ├── agent-team-template.md  # Parallel team coordination template
│   │   ├── verify-app.md           # End-to-end verification agent
│   │   └── build-validator.md      # Production build validation agent
│   ├── commands/                   # Slash commands (7 commands)
│   │   ├── verify.md               # /verify — full verification pipeline
│   │   ├── new-component.md        # /new-component — scaffold a UI component
│   │   ├── pr-ready.md             # /pr-ready — prepare and open a PR
│   │   ├── work-on-issue.md        # /work-on-issue — end-to-end issue workflow
│   │   ├── orchestrate.md          # /orchestrate — parallel subagent execution
│   │   ├── cleanup-worktrees.md    # /cleanup-worktrees — remove merged worktrees
│   │   └── learn.md                # /learn — capture corrections as durable rules
│   ├── rules/
│   │   └── design-system.md        # Design system conventions and tokens
│   ├── skills/                     # Contextual skills (3 skills)
│   │   ├── frontend-stack/SKILL.md # Next.js + React + Tailwind patterns
│   │   ├── testing/SKILL.md        # Vitest + Playwright test patterns
│   │   └── gemini/SKILL.md         # Gemini CLI MCP integration patterns
│   └── settings.json               # Permissions and hooks
├── .github/                        # GitHub configuration
│   ├── workflows/                  # CI/CD workflows
│   │   ├── test.yml                # Test pipeline (typecheck, lint, unit, e2e)
│   │   ├── lighthouse.yml          # Lighthouse CI audits
│   │   ├── pr-automation.yml       # PR labeling and automation
│   │   ├── vercel-preview.yml      # Preview deployments
│   │   └── vercel-production.yml   # Production deployments
│   └── ISSUE_TEMPLATE/             # Bug, feature, and task templates
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── (main)/                 # Main layout group
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── about/page.tsx      # About page
│   │   │   └── dashboard/          # Dashboard page + tests
│   │   ├── api/                    # API routes (health, theme)
│   │   ├── design-system/page.tsx  # Design system reference page
│   │   ├── landing/page.tsx        # Landing page
│   │   ├── showcase/               # Component showcase
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Design tokens + Tailwind config
│   ├── components/
│   │   ├── ui/                     # 36 UI components (design system)
│   │   │   ├── __tests__/          # Co-located unit tests
│   │   │   ├── button.tsx          # Example: CVA variant component
│   │   │   ├── card.tsx            # Example: Compound component
│   │   │   ├── dialog.tsx          # Example: Radix UI integration
│   │   │   ├── index.ts            # Barrel export
│   │   │   └── ...                 # 33 more components
│   │   ├── landing/                # Landing page sections
│   │   └── *.tsx                   # Shared components (theme, nav, etc.)
│   ├── lib/                        # Utilities
│   │   ├── utils.ts                # cn() — class merging (clsx + tailwind-merge)
│   │   ├── tokens.ts               # Typed design token definitions
│   │   └── logger.ts               # Structured logging (Pino)
│   └── middleware.ts               # Request middleware
├── tests/
│   ├── e2e/                        # End-to-end tests (Playwright)
│   └── visual/                     # Visual regression tests (Playwright)
├── scripts/
│   └── update-project-status.sh    # GitHub Projects board automation
├── CLAUDE.md                       # Claude Code project instructions
├── CONTRIBUTING.md                 # Contributor guide
├── biome.json                      # Biome linter/formatter config
├── lefthook.yml                    # Git hooks config
├── commitlint.config.js            # Commit message convention
├── playwright.config.ts            # Playwright test config
├── vitest.config.ts                # Vitest test config
└── package.json                    # Dependencies and scripts
```

## Architecture

### Design Tokens to Components to Pages

The architecture follows a layered approach where design decisions flow from tokens through components into pages:

```
Design Tokens (CSS Custom Properties)
  └─> Tailwind CSS v4 (utility classes via @theme inline)
       └─> UI Components (36 components in src/components/ui/)
            └─> Page Layouts (composed from components)
                 └─> App Routes (Next.js App Router)
```

**Design Tokens** are defined as CSS custom properties in `src/app/globals.css`:
- Semantic colors: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Each color has a `-foreground` companion for text on that background
- Light and dark themes via `:root` and `.dark` selectors
- Motion tokens: `--duration-fast` (150ms), `--duration-normal` (250ms), `--duration-slow` (400ms)
- Fonts: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono), `--font-display` (Space Grotesk)

**Components** follow strict conventions:
- `forwardRef` for ref forwarding
- `cva` (class-variance-authority) for variant management
- `cn()` for className merging (clsx + tailwind-merge)
- TypeScript types exported alongside components
- Design tokens only (no hardcoded colors, spacing, or radii)

**36 components** organized by category:
- **Foundational (11)**: Button, Badge, Avatar, Input, Card, Dialog, Divider, Spinner, Skeleton, Progress, NotificationDot
- **Form Controls (6)**: Textarea, Select, Checkbox, Radio, Toggle, Slider
- **Feedback (5)**: Alert, Toast, Tooltip, Popover, EmptyState
- **Navigation (6)**: Tabs, Breadcrumb, Pagination, Stepper, NavBar, SidebarNav
- **Data & Composite (8)**: Table, Accordion, DatePicker, Chip, Toolbar, FileUpload, Sheet, CommandPalette

### Dark Mode

Dark mode is implemented with `next-themes` and CSS custom properties. The `.dark` class on `<html>` switches all design tokens automatically -- components do not need `dark:` prefixed classes.

### Testing Strategy

| Layer | Framework | Location | Scope |
|-------|-----------|----------|-------|
| Unit | Vitest + React Testing Library | `src/components/ui/__tests__/` | Components: render, variants, events, a11y |
| Integration | Vitest | `src/app/api/__tests__/` | API routes: status codes, responses |
| E2E | Playwright | `tests/e2e/` | User flows: navigation, page content |
| Visual | Playwright screenshots | `tests/visual/` | Pixel-level regression across themes |

## Claude Code Integration

This project is designed to work with [Claude Code](https://claude.ai/claude-code), Anthropic's AI coding assistant. The `.claude/` directory contains all AI-assisted development configuration.

### Skills

Skills provide contextual knowledge that Claude Code activates based on file patterns:

| Skill | Activates On | Purpose |
|-------|-------------|---------|
| `frontend-stack` | `src/**/*.tsx`, `src/**/*.ts`, `globals.css` | Next.js 16, React 19, Tailwind v4 patterns, component conventions, CVA usage |
| `testing` | `__tests__/**`, `tests/**`, `vitest.config.*`, `playwright.config.*` | Vitest + Playwright test patterns, selector best practices, visual regression setup |
| `gemini` | Manual invocation (before `mcp__gemini-cli__*` calls) | Gemini CLI MCP integration: model config, auth, and tool prefixes |

### Agents

Agents are specialized AI personas for specific development tasks:

| Agent | Model | Purpose |
|-------|-------|---------|
| **Staff Reviewer** | Opus | Pre-implementation plan review -- validates plans and finds problems before code is written |
| **Code Reviewer** | Sonnet | Structured code review: TypeScript, a11y, performance, security, Tailwind, testing |
| **Test Writer** | Sonnet | Writes unit tests (Vitest) and visual regression tests (Playwright) for components |
| **Design Implementer** | Opus | Implements UI components from Figma designs or specs using the design system |
| **Feature Orchestrator** | Opus | Coordinates full feature lifecycle: plan, implement, test, review, verify, PR |
| **Agent Team Template** | Opus | Defines UX + Implementation + QA team roles for parallel coordinated work |
| **Verify App** | Sonnet | End-to-end verification: static analysis, tests, and live app checks |
| **Build Validator** | Sonnet | Build and CI specialist -- validates production readiness and bundle size |

### Slash Commands

Commands are reusable workflows invoked with `/command-name` in Claude Code:

| Command | Usage | Description |
|---------|-------|-------------|
| `/verify` | `/verify` | Runs the full verification pipeline: typecheck, lint, unit tests, integration tests, build |
| `/new-component` | `/new-component Button` | Scaffolds a new UI component with source, tests, barrel export, and showcase entry |
| `/pr-ready` | `/pr-ready` | Runs verification, stages changes, commits, pushes, and opens a PR |
| `/work-on-issue` | `/work-on-issue 42` | End-to-end issue workflow: read issue, create branch, implement, verify, PR |
| `/orchestrate` | `/orchestrate 19,20,21` | Spawns parallel subagents in isolated worktrees, one per issue |
| `/cleanup-worktrees` | `/cleanup-worktrees` | Lists and removes worktrees whose branches have been merged to main |
| `/learn` | `/learn` | Captures a correction or lesson as a durable rule in project memory |

### Hooks

Hooks run automatically at specific points in the Claude Code workflow:

| Hook | Trigger | Action |
|------|---------|--------|
| **Auto-format** | After any `Write` or `Edit` tool call | Runs `biome check --write` on the modified file |
| **Verification** | When Claude Code stops (end of task) | Runs `pnpm typecheck` and `pnpm lint` to catch issues |
| **Notification** | When a notification is sent | macOS notification: "Claude Code task completed" |

### MCP Servers

Three MCP (Model Context Protocol) servers are configured in `.mcp.json`:

- **Playwright MCP** (local): Browser automation for visual verification, E2E testing, and responsive design checks. No rate limits.
- **Figma MCP** (remote): Design integration for extracting design context, generating design system rules, and managing Code Connect mappings. Free tier: 6 calls/month.
- **Gemini CLI MCP** (local): Broad codebase analysis, second opinions, accessibility audits, and research via Google Gemini. No rate limits.

### Parallel Development

Claude Code supports three modes of parallel work:

1. **Worktrees**: `claude -w issue-42` creates an isolated git worktree with a new branch
2. **Agent Teams**: Coordinated parallel work with shared task lists and inter-agent messaging (experimental)
3. **Subagent Worktrees**: `/orchestrate 19,20,21` spawns one subagent per issue, each in its own worktree

## Deployment

The project deploys to [Vercel](https://vercel.com) with:

- **Preview deployments** on every pull request (via `.github/workflows/vercel-preview.yml`)
- **Production deployments** on merge to `main` (via `.github/workflows/vercel-production.yml`)
- **Lighthouse CI** audits on every PR (via `.github/workflows/lighthouse.yml`)
- **Automated testing** on every PR: typecheck, lint, unit tests, E2E tests (via `.github/workflows/test.yml`)

### Environment

Configure the following for deployment:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` -- Vercel deployment
- `SENTRY_DSN` -- Error monitoring (optional)
- `NEXT_PUBLIC_SENTRY_DSN` -- Client-side error monitoring (optional)

## Branch Strategy

- `main` -- production (protected)
- `feature/<issue-number>-<short-description>` -- feature branches
- `fix/<issue-number>-<short-description>` -- bug fix branches

All branches require passing CI checks before merge.

## License

This project is intended as a reference implementation. See the repository for license details.

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

### Option 3: Subagent Worktrees (Recommended for Automated Parallel Execution)
Use `/orchestrate <issue-numbers>` to spawn parallel subagents, each in an
isolated worktree. The orchestrator validates issues, spawns agents with
`isolation: worktree` and `run_in_background: true`, and reports results.
Example: `/orchestrate 19,20,21` or `/orchestrate 16,17 | 18,19` for sequential blocks.

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

## MCP Servers

Two MCP servers are configured in `.mcp.json` for browser automation and design integration.

### Playwright MCP (Local)
- **Server**: `@anthropic-ai/mcp-playwright` (runs locally via npx)
- **Rate limits**: None — unlimited usage
- **Capabilities**: Navigate to URLs, take screenshots, click/type/interact with pages, evaluate JS, resize viewport
- **Tools prefix**: `mcp__plugin_playwright_playwright__*`
- **Use for**: Visual verification, E2E testing, capturing rendered component screenshots, responsive design checks

### Figma MCP (Remote)
- **Server**: `https://mcp.figma.com/mcp` (remote HTTP)
- **Auth**: OAuth popup — first Figma tool call triggers a browser popup, click "Allow" to authenticate
- **Rate limits**: Free tier = 6 MCP calls/month. Be strategic with calls.
- **Capabilities**: Read designs, generate design system rules, create FigJam diagrams, manage Code Connect mappings
- **Tools prefix**: `mcp__claude_ai_Figma__*`
- **Key tools**:
  - `whoami` — Verify authentication
  - `get_design_context` — Extract design code + screenshot from a Figma node
  - `get_screenshot` — Visual reference of a Figma node
  - `create_design_system_rules` — Generate project-specific design system rules
  - `generate_diagram` — Create diagrams in FigJam
  - `add_code_connect_map` — Link Figma components to code files
- **Use Playwright instead of Figma** for screenshots of running app (saves Figma calls)

### Design Workflow (Figma ↔ Code)
1. **Figma → Code**: `get_design_context(nodeId, fileKey)` → adapt output to project stack
2. **Code → Visual**: Use Playwright to screenshot running app at multiple viewports
3. **Code Connect**: Map components via `add_code_connect_map` (deferred until Figma plan upgrade)

## Battle-Tested Patterns (Learned from 39 PRs)

These patterns emerged from building this project end-to-end and represent
corrections, optimizations, and best practices confirmed through real usage.

### Biome Linter Gotchas
- **Bracket notation for env vars**: TypeScript's `noPropertyAccessFromIndexSignature`
  requires `process.env["CI"]` instead of `process.env.CI`. Biome flags this — add
  `// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation`
  above the line when bracket notation is intentional.
- **Node protocol imports**: Biome auto-fixes `import path from "path"` to
  `import path from "node:path"`. Let the pre-commit hook handle this — do not
  fight it.
- **Import organization**: Biome sorts and groups imports automatically on format.
  Do not manually organize imports; run `pnpm format` instead.

### Playwright E2E Test Patterns
- **Always use `{ exact: true }` with `getByText()`** — text like "Home" appears
  in navigation, breadcrumbs, footer, and page content. Without exact matching,
  Playwright's strict mode throws ambiguity errors.
- **Scope locators to landmarks**: When the same link text appears in multiple
  areas, chain locators:
  ```ts
  page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home" })
  ```
- **Use separate ports for local E2E**: The Playwright config uses port 3100
  locally (`CI ? 3000 : 3100`) to avoid conflicts with `pnpm dev` on 3000.
- **Visual regression thresholds**: `threshold: 0.2` and `maxDiffPixels: 100`
  balance sensitivity against false positives from font rendering differences.

### Component Architecture Lessons
- **Semantic tokens enable theme swapping for free**: All 36 components use
  CSS custom properties (`bg-primary`, `text-foreground`, etc.) instead of
  hardcoded colors. Adding the "Area" design system (PR #80) required zero
  component modifications — only new token values in `globals.css`.
- **`forwardRef` + `displayName` on every component**: Enforced from day one.
  This paid off when composing components (Dialog, Sheet, Popover) and when
  debugging React DevTools.
- **CVA for variants, compound pattern for multi-part components**: This split
  keeps simple components (Button, Badge) lightweight while allowing complex
  components (Table, Accordion, Stepper) to export multiple parts cleanly.

### Hydration and SSR Pitfalls
- **`suppressHydrationWarning` on theme scripts**: Inline `<script>` tags that
  read `localStorage` (for FOUC prevention) cause hydration mismatches because
  browsers clear `nonce` attributes from the DOM after reading them. Always add
  `suppressHydrationWarning` to these script elements.
- **`next-themes` + custom design systems**: The `.dark` class and
  `data-design-system` attribute are independent axes. Test all 4 combinations
  (default-light, default-dark, area-light, area-dark).

### Testing Lessons
- **JSDOM `setTimeout` reliability**: Tests using `waitFor` with tooltip or
  popover timers may need increased timeouts (e.g., `{ timeout: 3000 }`)
  because JSDOM's timer simulation is less precise than real browsers.
- **Test selector priority**: `getByRole` > `getByLabelText` > `getByText` >
  `getByTestId`. Role-based selectors are more resilient to copy changes and
  enforce accessibility.
- **Coverage thresholds (80%)**: Set early (Phase 3) and maintained throughout.
  The `vitest.config.ts` uses `v8` provider with glob includes so new files
  are automatically tracked.

### Accessibility Rules (Learned the Hard Way)
- **Unique `aria-label` on every landmark**: Multiple `<nav>` elements without
  distinct labels break Lighthouse accessibility scores AND Playwright locator
  resolution. Always label: `aria-label="Main navigation"`,
  `aria-label="Footer navigation"`.
- **Form controls need labels even in showcases**: Lighthouse does not distinguish
  demo components from production usage. Every `<input>`, `<select>`, toggle,
  slider, and progress bar needs an associated `<label>` or `aria-label`.
- **Avoid `text-primary/50` for readable text**: Opacity-based text colors
  (e.g., `text-primary/50`) often fail WCAG AA 4.5:1 contrast ratio. Use
  semantic tokens like `text-muted-foreground` instead.

### CI/CD Patterns That Worked
- **Concurrency groups with `cancel-in-progress`**: Every workflow uses
  `concurrency: { group: ..., cancel-in-progress: true }` to avoid wasting
  CI minutes on superseded pushes.
- **Separate preview and production deploy workflows**: `vercel-preview.yml`
  runs on PRs (with deployment URL comment), `vercel-production.yml` runs
  on `main` push only. This prevents accidental production deploys.
- **Lighthouse CI as a dedicated workflow**: Keeps the main test pipeline fast
  while still catching performance regressions on every PR.

### Claude Code Configuration Patterns
- **PostToolUse hooks for auto-formatting**: The Biome format hook
  (`biome check --write --unsafe "$CLAUDE_FILE_PATH"`) runs after every
  Write/Edit, eliminating manual formatting steps entirely.
- **Stop hooks for verification**: Running `pnpm typecheck` and `pnpm lint`
  on Stop ensures no session ends with broken code.
- **Shared Config File Registry**: Listing protected files in CLAUDE.md
  prevents worktree agents from creating merge conflicts on critical configs.
- **Worktrees for parallel work**: `claude -w issue-<N>` creates isolated
  environments. Always run `pnpm install` first in a new worktree.

### Design System Token Architecture
- **Indirection layers for theme swapping**: CSS custom properties like
  `--display-font` and `--radius-base-*` allow design systems (Clarity vs Area)
  to override presentation without touching components or Tailwind config.
- **Avoid extreme radius values**: `--radius-base-xl: 9999px` (pill shape)
  creates oval-shaped cards and dialogs. Use reasonable values like `1.5rem`.
- **Motion tokens over hardcoded durations**: `--duration-fast: 150ms`,
  `--ease-spring`, etc. keep animations consistent and adjustable per theme.

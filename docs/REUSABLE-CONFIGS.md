# Reusable Configurations

This document catalogues the reusable configuration patterns and files from the
design-to-deploy project. These can serve as templates for new Next.js + Claude
Code projects.

## 1. Claude Code Configuration (`.claude/`)

The `.claude/` directory contains all Claude Code customization files.

### Directory Structure
```
.claude/
  settings.json          # Permissions, hooks, environment
  rules/
    design-system.md     # Component conventions, token docs, a11y rules
  commands/
    new-component.md     # /new-component — scaffold component + test + export
    verify.md            # /verify — run typecheck + lint + build + tests
    pr-ready.md          # /pr-ready — full verification + PR creation
    work-on-issue.md     # /work-on-issue — branch + implement + test + PR
    orchestrate.md       # /orchestrate — parallel subagent execution
    cleanup-worktrees.md # /cleanup-worktrees — remove stale worktrees
  agents/
    code-reviewer.md     # Automated PR review agent
    design-implementer.md # Figma-to-code implementation agent
    test-writer.md       # Automated test generation agent
    feature-orchestrator.md # Multi-issue parallel orchestration agent
    agent-team-template.md  # Template for Agent Teams coordination
  skills/
    frontend-stack/
      SKILL.md           # React + Tailwind + CVA patterns
    testing/
      SKILL.md           # Vitest + Playwright + RTL patterns
  docs/
    agent-teams-experiment.md # Agent Teams findings and recommendations
```

### Key File: `.claude/settings.json`
```jsonc
{
  "permissions": {
    "allow": [
      // Package manager and build tools
      "Bash(pnpm *)", "Bash(npx vitest *)", "Bash(npx playwright *)",
      "Bash(npx tsc *)", "Bash(npx next *)", "Bash(npx biome *)",
      // Git and GitHub CLI
      "Bash(gh issue view *)", "Bash(gh pr create *)", "Bash(git checkout *)",
      "Bash(git branch *)", "Bash(git push *)", "Bash(git status)", // etc.
      // File editing scoped to source directories
      "Edit(src/**)", "Edit(tests/**)", "Edit(.github/**)",
      "Edit(docs/**)", "Edit(CLAUDE.md)",
      // MCP tool permissions (Playwright, Figma)
      "mcp__plugin_playwright_playwright__browser_navigate", // etc.
    ]
  },
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "pnpm biome check --write --unsafe \"$CLAUDE_FILE_PATH\"",
        "timeout": 30,
        "statusMessage": "Formatting with Biome..."
      }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "pnpm typecheck 2>&1 | tail -20 && pnpm lint 2>&1 | tail -20",
        "timeout": 120,
        "statusMessage": "Running verification (typecheck + lint)..."
      }]
    }],
    "Notification": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Task completed\" with title \"Project\"'",
        "timeout": 10
      }]
    }]
  }
}
```

**Reuse notes**:
- Adapt `permissions.allow` paths to your project structure.
- The PostToolUse hook assumes Biome. Replace with Prettier/ESLint if preferred.
- The Notification hook uses macOS `osascript`. Replace for Linux/Windows.

### Key File: `.claude/rules/design-system.md`
This rules file is automatically loaded by Claude Code for every session. It
documents component conventions, design tokens, testing patterns, and
accessibility rules. Adapt the token names and component patterns to your
design system.

## 2. GitHub Actions Workflows (`.github/workflows/`)

### `test.yml` — Main Test Pipeline
- Triggers: push to `main`, PRs targeting `main`
- Steps: checkout, pnpm setup, install, typecheck, lint, build, unit tests
- Concurrency: `cancel-in-progress: true` per branch

### `pr-automation.yml` — PR Labeling and Comments
- Triggers: PR opened/synchronized/reopened
- Steps: auto-label by file paths (uses `.github/labeler.yml`), post test results as PR comment
- Permissions: `contents: read`, `pull-requests: write`

### `lighthouse.yml` — Performance Budget Checks
- Triggers: push to `main`, PRs targeting `main`
- Steps: build app, run LHCI against configured pages and budgets
- Config: `lighthouserc.js` defines page URLs and assertion thresholds

### `vercel-preview.yml` — Preview Deployments
- Triggers: PRs targeting `main`
- Steps: Vercel CLI pull + build + deploy, comment deployment URL on PR
- Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### `vercel-production.yml` — Production Deployments
- Triggers: push to `main` only
- Steps: Vercel CLI pull + build + deploy with `--prod` flag
- Concurrency: `cancel-in-progress: false` (never skip production deploys)

**Reuse notes**:
- All workflows use `pnpm/action-setup@v4` for pnpm installation.
- Vercel workflows require three repository secrets.
- Lighthouse config is in `lighthouserc.js` at project root.

## 3. Vitest Configuration (`vitest.config.ts`)

```ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "tests/e2e", "tests/visual"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.*", "src/**/*.spec.*", "src/test/**", "src/**/*.d.ts"],
      reporter: ["text", "json", "lcov"],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
```

**Reuse notes**:
- The `@` alias maps to `./src` — update if your source root differs.
- `src/test/setup.ts` imports `@testing-library/jest-dom` matchers.
- E2E and visual tests are explicitly excluded from unit test runs.
- Coverage thresholds enforce minimum 80% across all dimensions.

## 4. Playwright Configuration (`playwright.config.ts`)

```ts
import { defineConfig, devices } from "@playwright/test";

const CI = process.env["CI"];
const PORT = CI ? 3000 : 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 1 : 0,
  ...(CI ? { workers: 1 } : {}),
  reporter: "html",
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry" },
  expect: {
    toHaveScreenshot: { threshold: 0.2, maxDiffPixels: 100 },
  },
  snapshotPathTemplate: "{testDir}/{testFileDir}/__snapshots__/{testFileName}/{arg}{ext}",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx next dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
  },
});
```

**Reuse notes**:
- Local port 3100 avoids conflicts with dev server on 3000.
- `biome-ignore` comment needed on `process.env["CI"]` line for strict TS.
- Visual regression uses lenient thresholds to account for font rendering.
- Single Chromium project keeps CI fast; add Firefox/WebKit as needed.

## 5. Design Token System (`src/app/globals.css`)

The token system uses CSS custom properties with three layers:

### Layer 1: Semantic Color Tokens
```css
:root {
  --background: #faf8f5;
  --foreground: #1c1427;
  --primary: #7c3aed;
  --primary-foreground: #faf8f5;
  --secondary: #f0ecf9;
  --muted: #f3f0f7;
  --muted-foreground: #736b7e;
  --accent: #f59e0b;
  --destructive: #e11d48;
  --border: #e8e0f0;
  --ring: #7c3aed;
  /* ... foreground variants for each */
}
.dark { /* ... dark overrides */ }
```

### Layer 2: Indirection Tokens (Theme-Swappable)
```css
:root {
  --display-font: var(--font-space-grotesk);
  --radius-base-sm: 0.375rem;
  --radius-base-md: 0.5rem;
  --radius-base-lg: 0.75rem;
  --radius-base-xl: 1rem;
}
[data-design-system="area"] {
  --display-font: var(--font-dm-serif-display);
  --radius-base-sm: 0.5rem;
  /* ... different values */
}
```

### Layer 3: Motion Tokens
```css
:root {
  --duration-instant: 50ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

**Reuse notes**:
- Components reference tokens via Tailwind: `bg-primary`, `text-foreground`.
- Dark mode auto-switches via `.dark` class (managed by `next-themes`).
- Theme swapping works by adding `data-design-system` attribute to `<html>`.
- Never hardcode colors in components; always use token-based classes.

## 6. Component Pattern (CVA + forwardRef)

The standard pattern for every UI component:

```tsx
import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-8 text-base",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

**Required for every component**:
1. `forwardRef` wrapping
2. `displayName` assignment
3. `className` prop accepted and merged via `cn()`
4. Type exports (`ButtonProps`)
5. Design tokens only (no hardcoded colors)

## 7. Pre-commit Hooks (`lefthook.yml`)

```yaml
pre-commit:
  commands:
    biome-check:
      glob: "*.{ts,tsx,js,jsx,json,css}"
      run: npx biome check --write --staged --unsafe {staged_files}
      stage_fixed: true
    typecheck:
      run: npx tsc --noEmit

commit-msg:
  commands:
    commitlint:
      run: npx commitlint --edit {1}
```

**Reuse notes**:
- `stage_fixed: true` re-stages files after Biome auto-fixes.
- commitlint uses `@commitlint/config-conventional` for `feat:`, `fix:`, etc.
- Requires `lefthook` as a dev dependency with `pnpm lefthook install`.

## 8. MCP Server Configuration (`.mcp.json`)

```jsonc
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-playwright"]
    },
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "streamable-http"
    }
  }
}
```

**Reuse notes**:
- Playwright MCP runs locally via npx — no rate limits.
- Figma MCP uses OAuth (browser popup on first call) — free tier has 6 calls/month.
- Add tool permissions to `.claude/settings.json` for each MCP server.

## Summary: Files to Copy for a New Project

| Priority | Files/Dirs | Purpose |
|----------|-----------|---------|
| Essential | `CLAUDE.md` | Project knowledge base for Claude Code |
| Essential | `.claude/settings.json` | Permissions and hooks |
| Essential | `.claude/rules/` | Design system and coding conventions |
| High | `.claude/commands/` | Slash commands for common workflows |
| High | `.github/workflows/` | CI/CD pipeline |
| High | `vitest.config.ts` | Unit test configuration |
| High | `playwright.config.ts` | E2E test configuration |
| Medium | `.claude/agents/` | Specialized AI agents |
| Medium | `.claude/skills/` | Reusable knowledge packages |
| Medium | `lefthook.yml` | Pre-commit hooks |
| Medium | `biome.json` | Linter/formatter config |
| Medium | `lighthouserc.js` | Performance budgets |
| Optional | `.mcp.json` | MCP server connections |
| Optional | `src/app/globals.css` | Design token template |

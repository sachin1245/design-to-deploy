---
description: Testing patterns for Vitest + Playwright in this project
globs:
  - "src/**/__tests__/**"
  - "tests/**"
  - "vitest.config.*"
  - "playwright.config.*"
---

# Testing Patterns

## Philosophy
- Test behavior, not implementation
- Use getByRole > getByText > getByTestId (accessibility-first selectors)
- Each test should be independent and not depend on other tests
- Prefer userEvent over fireEvent for realistic interactions

## Vitest Unit Tests
- Location: `src/components/ui/__tests__/`
- Pattern: `[component].test.tsx`
- Use `@testing-library/react` for rendering
- Use `@testing-library/user-event` for interactions
- Use `vi.fn()` for mocking callbacks
- Always test: default render, all variants, event handlers, disabled state, accessibility
- Setup file at `src/test/setup.ts` imports `@testing-library/jest-dom/vitest` and runs `cleanup()` after each test
- Config: `vitest.config.ts` uses jsdom environment, `@` path alias, and v8 coverage (80% threshold)

## Integration Tests (API Routes)
- Location: `src/app/api/__tests__/`
- Pattern: `[route].test.ts`
- Mock external dependencies with `vi.mock()`
- Use dynamic `await import()` for route handlers after mocking
- Test HTTP status codes, response bodies, and edge cases

## Playwright E2E Tests
- Location: `tests/e2e/`
- Pattern: `[feature].spec.ts`
- Use `page.getByRole()` as primary locator
- Web server auto-starts via Playwright config (`next dev` on port 3100 locally, 3000 in CI)
- Test user flows, not individual components
- Use `test.beforeEach` to navigate to the page under test

### Strict Mode & Locator Precision (CRITICAL)
Playwright runs in strict mode by default — if a locator matches multiple elements, the test **throws an error** instead of silently picking the first match. Every locator must resolve to exactly one element.

**Rules to prevent strict mode violations:**

1. **Scope locators to a parent section first** — this is the most reliable approach when text appears in multiple page regions. Use `page.locator("section").filter(...)` to narrow the search:
   ```ts
   // BAD — "TypeScript" exists in both Tech Stack cards AND "By the Numbers" stats
   await expect(page.getByText("TypeScript", { exact: true })).toBeVisible(); // STILL FAILS!
   // GOOD — scope to the specific section
   const techSection = page.locator("section").filter({ has: page.getByText("Tech Stack") }).first();
   await expect(techSection.getByText("TypeScript")).toBeVisible();
   ```
   NOTE: `{ exact: true }` only prevents **substring** matching. It does NOT help when two **different elements** contain the **exact same text**. Scoping is the only reliable fix.

2. **Use `{ exact: true }` as a secondary defense** — add it when text might appear as a substring elsewhere (e.g., "React" inside "React 19"). But never rely on it as the sole fix.

3. **Scope to landmarks for navigation elements** — when the same link/role appears in multiple page regions (nav, footer, sidebar). Use chained locators:
   ```ts
   // BAD — "Home" link exists in both nav and footer
   await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
   // GOOD — scope to the specific navigation
   const nav = page.getByRole("navigation", { name: "Main" });
   await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
   ```

3. **Prefer `getByRole` with `name` over `getByText`** — roles are more specific and less prone to accidental duplicates:
   ```ts
   // OK but fragile
   await expect(page.getByText("Components", { exact: true })).toBeVisible();
   // BETTER — targets the specific heading
   await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();
   ```

4. **Use `page.locator()` with CSS/data attributes as last resort** when semantic locators can't disambiguate:
   ```ts
   await expect(page.locator("[data-testid='stat-components']")).toBeVisible();
   ```

5. **Watch out for common duplicate sources**: footer links mirror nav links, breadcrumbs repeat page names, descriptions contain keyword substrings, copyright text contains tech names.

## Visual Regression Tests
- Location: `tests/visual/`
- Baselines: `tests/visual/__snapshots__/`
- Test every component variant in both light and dark themes
- Test pages at 375px (mobile) and 1440px (desktop) viewports
- Disable animations before screenshots with `addStyleTag` (set all durations to 0s)
- Use `localStorage.setItem("theme", theme)` via `addInitScript` to set theme before navigation
- Screenshot config: threshold 0.2, maxDiffPixels 100
- Update baselines: `pnpm test:visual -- --update-snapshots`

## Running Tests
- Unit: `pnpm test:unit`
- Integration: `pnpm test:integration`
- E2E: `pnpm test:e2e`
- Visual: `pnpm test:visual`
- Coverage: `pnpm test:coverage`
- All: `pnpm test:all`

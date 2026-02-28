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

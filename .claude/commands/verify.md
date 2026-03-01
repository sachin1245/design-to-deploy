Run the full verification pipeline for this project:

1. TypeScript type checking: `pnpm typecheck`
2. Lint and format check: `pnpm lint`
3. Unit tests: `pnpm test:unit`
4. Integration tests: `pnpm test:integration`
5. E2E tests: `pnpm test:e2e`
6. Visual regression: `pnpm test:visual` (report results, do NOT block on failure)
7. Build check: `pnpm build`

Steps 1-5 and 7 are blocking — stop and report on failure.
Step 6 (visual) is informational — report pass/fail but continue regardless.

If all blocking steps pass, report a summary of results including visual test status.

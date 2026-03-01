# PR Workflow Rule

ALWAYS follow this workflow for every task that changes code or configuration:

0. **Verify a GitHub issue exists** — NEVER start work without a GitHub issue. This is non-negotiable.
   If an issue doesn't exist, create one FIRST using `gh issue create`.
   Every code change must be traceable to a "why" (the issue).
1. **Create a feature branch**: `feature/<issue-number>-<short-description>`
   - Bug fixes use: `fix/<issue-number>-<short-description>`
2. **Do the work** on the feature branch
3. **Commit** with a message referencing the issue (e.g., `feat: optimize CLAUDE.md (#89)`)
4. **Create a PR** targeting `main` using `gh pr create`
   - PR title should be concise (<70 chars)
   - PR body must include: Summary, Test Plan, and link to the issue
   - Use `Closes #<issue-number>` in the body to auto-close the issue on merge
5. **Never push directly to `main`** — all changes go through PRs

This applies to ALL work: features, bug fixes, documentation, configuration changes, and rule file updates.

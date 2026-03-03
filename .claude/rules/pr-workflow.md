# PR Workflow Rule

ALWAYS follow this workflow for every task that changes code or configuration:

1. **Create a GitHub issue** (if one doesn't exist) describing the work
2. **Create a feature branch**: `feature/<issue-number>-<short-description>`
   - Bug fixes use: `fix/<issue-number>-<short-description>`
3. **Do the work** on the feature branch
4. **Commit** with a message referencing the issue (e.g., `feat: optimize CLAUDE.md (#89)`)
5. **Create a PR** targeting `main` using `gh pr create`
   - PR title should be concise (<70 chars)
   - PR body must include: Summary, Test Plan, and link to the issue
   - Use `Closes #<issue-number>` in the body to auto-close the issue on merge
6. **Never push directly to `main`** — all changes go through PRs

This applies to ALL work: features, bug fixes, documentation, configuration changes, and rule file updates.

## No Exceptions — Even With Pre-Approved Plans
NEVER skip issue creation or branch workflow just because the user provides a complete implementation plan. A pre-approved plan means planning is done — it does NOT bypass issue → branch → implement → verify → PR. The workflow is about traceability and review, not just planning.

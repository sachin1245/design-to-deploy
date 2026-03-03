---
paths:
  - ".github/**/*.yml"
  - ".github/**/*.yaml"
---

# CI/CD Patterns

## Workflow Inventory (5 workflows)

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| Test | `test.yml` | push to main, PRs | Typecheck, lint, build, unit, integration, E2E, visual |
| Lighthouse CI | `lighthouse.yml` | push to main, PRs | Performance audits |
| PR Automation | `pr-automation.yml` | PRs | Auto-labeling and size labels |
| Vercel Preview | `vercel-preview.yml` | PRs | Preview deployments with URL comment |
| Vercel Production | `vercel-production.yml` | push to main | Production deployment |

## Permissions — Non-Negotiable

- ALWAYS add an explicit `permissions:` block to every workflow
- Use least-privilege: only grant what the workflow actually needs
- Common patterns:
  - Read-only workflows (test, lint, build): `permissions: { contents: read }`
  - PR comment workflows: `permissions: { contents: read, pull-requests: write }`
  - Deployment workflows: `permissions: { contents: read, deployments: write }`
- NEVER use `permissions: write-all` or omit the block entirely

## Concurrency

- ALWAYS use `concurrency` with `cancel-in-progress: true` on PR-triggered workflows
- Group key pattern: `${{ github.workflow }}-${{ github.ref }}`
- This avoids wasting CI minutes on superseded pushes

## Deployment Separation

- Separate preview and production deploy workflows
- `vercel-preview.yml` runs on PRs (with deployment URL comment)
- `vercel-production.yml` runs on `main` push only
- This prevents accidental production deploys from PR merges triggering both

## Lighthouse CI

- Keep as a dedicated workflow separate from the test pipeline
- This keeps the main test pipeline fast while still catching performance regressions
- Runs on both PRs and main pushes for trend tracking

## Dependabot Configuration

- Located at `.github/dependabot.yml`
- Update schedule: weekly (Monday)
- Two ecosystems monitored:
  - `npm` — for package dependencies
  - `github-actions` — for workflow action versions
- Grouping strategy: minor + patch updates grouped together to reduce PR noise
- Major version updates get individual PRs for careful review

## PR Automation

- **Auto-labeling** (`pr-automation.yml`): Labels PRs based on changed file paths
  - `src/components/**` → `design-system`
  - `tests/**` → `testing`
  - `.github/**` → `ci-cd`
  - `.claude/**` → `agents` or `skills` or `orchestration`
- **Size labels**: Automatically applied based on diff size (XS, S, M, L, XL)

## Artifact Retention

- Test reports, visual diffs, and Lighthouse results: 14 days
- Use `actions/upload-artifact@v7` with `retention-days: 14`
- Always upload on `if: always()` to capture failure artifacts

## Merge Queue Readiness

- All required-check workflows should support `merge_group` trigger for future merge queue adoption
- Currently using standard PR merge (not merge queue)
- When enabling: add `merge_group:` to the `on:` trigger of `test.yml` and `lighthouse.yml`

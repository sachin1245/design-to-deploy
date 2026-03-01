---
paths:
  - ".github/**/*.yml"
  - ".github/**/*.yaml"
---

# CI/CD Patterns

- **Concurrency groups with `cancel-in-progress`**: Every workflow uses
  `concurrency: { group: ..., cancel-in-progress: true }` to avoid wasting
  CI minutes on superseded pushes.

- **Separate preview and production deploy workflows**: `vercel-preview.yml`
  runs on PRs (with deployment URL comment), `vercel-production.yml` runs
  on `main` push only. This prevents accidental production deploys.

- **Lighthouse CI as a dedicated workflow**: Keeps the main test pipeline fast
  while still catching performance regressions on every PR.

---
paths:
  - "src/**/*.{ts,tsx}"
  - "tests/**/*.{ts,tsx}"
  - "biome.json"
---

# Biome Linter Gotchas

- **Bracket notation for env vars**: TypeScript's `noPropertyAccessFromIndexSignature`
  requires `process.env["CI"]` instead of `process.env.CI`. Biome flags this — add
  `// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation`
  above the line when bracket notation is intentional.

- **Node protocol imports**: Biome auto-fixes `import path from "path"` to
  `import path from "node:path"`. Let the pre-commit hook handle this — do not fight it.

- **Import organization**: Biome sorts and groups imports automatically on format.
  Do not manually organize imports; run `pnpm format` instead.

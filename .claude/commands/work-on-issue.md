Work on GitHub Issue #$ARGUMENTS in this project.

Steps:
1. Run `pnpm install` (always required — worktrees need fresh dependencies)
2. Read the issue: `gh issue view $ARGUMENTS`
3. **Update project board**: `./scripts/update-project-status.sh $ARGUMENTS in-progress`
4. Create feature branch: `feature/$ARGUMENTS-<short-description>`
5. Implement all tasks from the issue
6. Run verification: `pnpm typecheck && pnpm lint && pnpm build`
   - If lint fails, try `pnpm lint:fix` first, then re-run verification
7. Run tests if test scripts exist: `pnpm test:unit` (don't fail if script missing)
8. Commit with conventional commit message referencing #$ARGUMENTS
9. Push and create PR: `gh pr create`
10. **Update project board**: `./scripts/update-project-status.sh $ARGUMENTS review`

## Constraints
- Stay focused on this issue only. Do not modify unrelated files.
- Do NOT modify shared config files without explicit justification:
  package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, tailwind.config.ts,
  vitest.config.ts, playwright.config.ts, biome.json, lefthook.yml, src/app/layout.tsx,
  .claude/settings.json

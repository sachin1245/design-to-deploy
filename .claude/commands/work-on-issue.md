Work on GitHub Issue #$ARGUMENTS in this project.

Steps:
1. Run `pnpm install` if node_modules is missing
2. Read the issue: `gh issue view $ARGUMENTS`
3. Create feature branch: `feature/$ARGUMENTS-<short-description>`
4. Implement all tasks from the issue
5. Run verification: `pnpm typecheck && pnpm lint && pnpm build`
6. Run tests if test scripts exist: `pnpm test:unit` (don't fail if script missing)
7. Commit with conventional commit message referencing #$ARGUMENTS
8. Push and create PR: `gh pr create`

Stay focused on this issue only. Do not modify unrelated files.

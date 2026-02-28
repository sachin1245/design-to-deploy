Work on GitHub Issue #$ARGUMENTS in this project.

Steps:
1. Run `pnpm install` if node_modules is missing
2. Read the issue: `gh issue view $ARGUMENTS`
3. **Update project board**: `./scripts/update-project-status.sh $ARGUMENTS in-progress`
4. Create feature branch: `feature/$ARGUMENTS-<short-description>`
5. Implement all tasks from the issue
6. Run verification: `pnpm typecheck && pnpm lint && pnpm build`
7. Run tests if test scripts exist: `pnpm test:unit` (don't fail if script missing)
8. Commit with conventional commit message referencing #$ARGUMENTS
9. Push and create PR: `gh pr create`
10. **Update project board**: `./scripts/update-project-status.sh $ARGUMENTS review`

Stay focused on this issue only. Do not modify unrelated files.

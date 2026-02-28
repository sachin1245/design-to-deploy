Prepare the current work for a pull request:

1. Run full verification: typecheck, lint, unit tests, integration tests, build
2. If anything fails, fix it
3. Stage all changes: `git add -A`
4. Create a descriptive commit message based on the changes
5. Push to the current branch
6. Open a PR using `gh pr create` with:
   - Clear title
   - Summary of changes
   - Test plan
   - Link to related issue
7. Report the PR URL

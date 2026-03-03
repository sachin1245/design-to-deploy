Prepare the current work for a pull request:
0. Verify a GitHub issue exists for this work:
   - Check the current branch name for an issue number (e.g., `feature/42-description` or `fix/42-description`)
   - If no issue number found, run `gh issue list` to find a matching issue
   - STOP and ask the user to create an issue if none exists — do not proceed without one
   - Store the issue number for use in the PR body (`Closes #<number>`)
1. Run full verification: typecheck, lint, unit tests, integration tests, e2e tests, visual regression (soft-fail), build
2. If anything fails, fix it
3. Stage all changes: `git add -A`
4. Create a descriptive commit message based on the changes
5. Push to the current branch
6. Open a PR using `gh pr create` with:
   - Clear title
   - Summary of changes
   - Test plan
   - `Closes #<issue-number>` (from step 0)
7. Report the PR URL

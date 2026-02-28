List all git worktrees with `git worktree list`.
For each worktree whose branch has been merged to main
(check with `git branch --merged main`), ask for confirmation,
then remove with `git worktree remove <path>` and
`git branch -d <branch>`. Finally run `git worktree prune`.

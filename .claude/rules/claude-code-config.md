# Claude Code Configuration Patterns

- **PostToolUse hooks for auto-formatting**: The Biome format hook
  (`biome check --write --unsafe "$CLAUDE_FILE_PATH"`) runs after every
  Write/Edit, eliminating manual formatting steps entirely.

- **Stop hooks for verification**: Running `pnpm typecheck` and `pnpm lint`
  on Stop ensures no session ends with broken code.

- **Shared Config File Registry**: Listing protected files in CLAUDE.md
  prevents worktree agents from creating merge conflicts on critical configs.

- **Worktrees for parallel work**: `claude -w issue-<N>` creates isolated
  environments. Always run `pnpm install` first in a new worktree.

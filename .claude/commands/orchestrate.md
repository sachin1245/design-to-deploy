Run the parallel worktree orchestrator for the given issue blocks.

$ARGUMENTS should be pipe-delimited blocks of comma-separated issue numbers.
Example: `42,43 | 44,8,9` means Block 1 runs issues 42+43 in parallel, then
Block 2 runs issues 44+8+9 after Block 1's PRs are merged.

Steps:
1. Parse the arguments into blocks (split by `|`)
2. Build the orchestrate.sh command with `--block` flags for each block
3. Show the user the exact command that will be run
4. Remind the user to run this from a regular terminal (not nested in Claude Code) for best results, OR run it directly since the script handles `unset CLAUDECODE` internally

Generated command format:
```
./scripts/orchestrate.sh --block "<block1>" --block "<block2>" [--block ...]
```

Options the user can add:
- `--budget <amount>` — max USD per worker (default: 5.00)
- `--auto-merge-wait` — auto-poll for merged PRs instead of manual confirmation
- `--dry-run` — preview without executing

Example usage:
- `/orchestrate 42,43 | 44,8,9` generates:
  `./scripts/orchestrate.sh --block "42,43" --block "44,8,9"`

- For a dry run, suggest:
  `./scripts/orchestrate.sh --dry-run --block "42,43" --block "44,8,9"`

After generating the command, offer to run it or let the user copy it to their terminal.

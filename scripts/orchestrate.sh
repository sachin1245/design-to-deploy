#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────────────────────────────────────
# orchestrate.sh — Parallel Claude Code worktree orchestrator
#
# Runs multiple GitHub issues in parallel using Claude Code worktrees and tmux.
# Issues are organized into sequential "blocks"; within each block, issues run
# concurrently. Between blocks, the script waits for PRs to be merged before
# continuing.
#
# Usage:
#   ./scripts/orchestrate.sh --block "42,43" --block "44,8,9" [options]
#
# Options:
#   --block "<issues>"     Comma-separated issue numbers (repeatable, sequential)
#   --budget <amount>      Max budget per worker in USD (default: 5.00)
#   --auto-merge-wait      Poll for PR merges instead of waiting for Enter
#   --dry-run              Print what would happen without executing
#   --help                 Show this help message
# ──────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Directories for status tracking and logs
STATUS_DIR="$PROJECT_ROOT/.claude/worktrees/status"
LOG_DIR="$PROJECT_ROOT/.claude/worktrees/logs"
PROMPT_DIR="$PROJECT_ROOT/.claude/worktrees/prompts"
WORKER_DIR="$PROJECT_ROOT/.claude/worktrees/workers"
TMUX_SESSION="claude-orchestrator"

# Defaults
BUDGET="5.00"
AUTO_MERGE_WAIT=false
DRY_RUN=false
BLOCKS=()

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Helpers ───────────────────────────────────────────────────────────────────

usage() {
  cat <<EOF
${BOLD}Parallel Claude Code Worktree Orchestrator${NC}

Usage:
  ./scripts/orchestrate.sh --block "42,43" --block "44,8,9" [options]

Options:
  --block "<issues>"     Comma-separated issue numbers (repeatable, sequential)
  --budget <amount>      Max budget per worker in USD (default: 5.00)
  --auto-merge-wait      Poll for PR merges instead of waiting for Enter
  --dry-run              Print what would happen without executing
  --help                 Show this help message

Examples:
  # Two blocks: issues 42+43 in parallel, then 44+8+9 after merging
  ./scripts/orchestrate.sh --block "42,43" --block "44,8,9"

  # Dry run to preview
  ./scripts/orchestrate.sh --dry-run --block "42,43" --block "44,8,9"

  # Higher budget, auto-wait for merges
  ./scripts/orchestrate.sh --block "42,43" --block "44,8,9" --auto-merge-wait --budget 8.00
EOF
}

log_info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
log_ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*"; }
log_step()  { echo -e "\n${CYAN}${BOLD}══ $* ══${NC}"; }

# ── Argument parsing ──────────────────────────────────────────────────────────

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --block)
        shift
        BLOCKS+=("$1")
        shift
        ;;
      --budget)
        shift
        BUDGET="$1"
        shift
        ;;
      --auto-merge-wait)
        AUTO_MERGE_WAIT=true
        shift
        ;;
      --dry-run)
        DRY_RUN=true
        shift
        ;;
      --help|-h)
        usage
        exit 0
        ;;
      *)
        log_error "Unknown option: $1"
        usage
        exit 1
        ;;
    esac
  done

  if [[ ${#BLOCKS[@]} -eq 0 ]]; then
    log_error "At least one --block is required"
    usage
    exit 1
  fi
}

# ── Prerequisite checks ──────────────────────────────────────────────────────

check_prerequisites() {
  log_step "Checking prerequisites"

  # tmux
  if ! command -v tmux &>/dev/null; then
    log_warn "tmux not found. Installing via Homebrew..."
    if command -v brew &>/dev/null; then
      brew install tmux
      log_ok "tmux installed"
    else
      log_error "tmux is required but not installed, and Homebrew is not available."
      log_error "Install tmux manually: https://github.com/tmux/tmux/wiki/Installing"
      exit 1
    fi
  else
    log_ok "tmux $(tmux -V | awk '{print $2}')"
  fi

  # claude
  if ! command -v claude &>/dev/null; then
    log_error "claude CLI not found. Install: https://docs.anthropic.com/en/docs/claude-code"
    exit 1
  else
    log_ok "claude CLI found"
  fi

  # gh
  if ! command -v gh &>/dev/null; then
    log_error "gh CLI not found. Install: https://cli.github.com/"
    exit 1
  else
    log_ok "gh CLI $(gh --version | head -1 | awk '{print $3}')"
  fi

  # git
  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    log_error "Not inside a git repository"
    exit 1
  fi

  # Ensure we're on main and up to date
  local current_branch
  current_branch=$(git branch --show-current)
  if [[ "$current_branch" != "main" ]]; then
    log_warn "Currently on branch '$current_branch', not 'main'"
    log_warn "The orchestrator works best when started from 'main'"
    read -rp "Continue anyway? [y/N] " confirm
    [[ "$confirm" =~ ^[Yy]$ ]] || exit 0
  fi
}

# ── Status tracking ──────────────────────────────────────────────────────────

init_status_dirs() {
  mkdir -p "$STATUS_DIR" "$LOG_DIR" "$PROMPT_DIR" "$WORKER_DIR"
}

set_status() {
  local issue="$1" status="$2"
  echo "$status" > "$STATUS_DIR/issue-${issue}.status"
}

get_status() {
  local issue="$1"
  local file="$STATUS_DIR/issue-${issue}.status"
  if [[ -f "$file" ]]; then
    cat "$file"
  else
    echo "unknown"
  fi
}

# ── Worker prompt builder ────────────────────────────────────────────────────

build_worker_prompt() {
  local issue="$1"
  local prompt_file="$PROMPT_DIR/issue-${issue}.txt"
  local port=$((3100 + issue))

  cat > "$prompt_file" <<PROMPT
You are working on GitHub issue #${issue} for the design-to-deploy project.

## Instructions

1. Run pnpm install first
2. Read the issue: gh issue view ${issue}
3. Create a feature branch: feature/${issue}-<short-description>
4. Implement all tasks described in the issue
5. Run full verification: pnpm typecheck && pnpm lint && pnpm build
6. Run tests if available: pnpm test:unit (skip if script does not exist)
7. Commit with a conventional commit message referencing #${issue}
8. Push and create PR: gh pr create --base main --title "<title>" --body "Closes #${issue}"

## Rules

- Stay focused on issue #${issue} only
- Do NOT modify shared config files (package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts, tailwind.config.ts, vitest.config.ts, playwright.config.ts, biome.json, lefthook.yml, src/app/layout.tsx, .claude/settings.json) unless absolutely required by the issue
- Use dev server port ${port} if you need to run a dev server
- If the issue requires UI work, invoke the frontend-design skill first
- Write clean, tested code following project conventions
PROMPT

  echo "$prompt_file"
}

# ── Worker shell script builder ──────────────────────────────────────────────

build_worker_script() {
  local issue="$1"
  local prompt_file="$2"
  local log_file="$LOG_DIR/issue-${issue}.log"
  local worktree_name="issue-${issue}"
  local worker_script="$WORKER_DIR/issue-${issue}.sh"

  cat > "$worker_script" <<WORKEREOF
#!/usr/bin/env bash
cd "$PROJECT_ROOT"
unset CLAUDECODE

echo "Starting worker for issue #${issue}..."
echo "Prompt file: ${prompt_file}"
echo "Log file: ${log_file}"
echo "Worktree: ${worktree_name}"
echo "Budget: \$${BUDGET}"
echo "---"

claude -p -w "${worktree_name}" \\
  --permission-mode bypassPermissions \\
  --max-budget-usd "${BUDGET}" \\
  "\$(cat "${prompt_file}")" \\
  2>&1 | tee "${log_file}"

exit_code=\$?
echo "\$exit_code" > "${STATUS_DIR}/issue-${issue}.exitcode"

if [ "\$exit_code" -eq 0 ]; then
  echo "completed" > "${STATUS_DIR}/issue-${issue}.status"
else
  echo "failed" > "${STATUS_DIR}/issue-${issue}.status"
fi

echo ""
echo "Worker for issue #${issue} finished (exit code: \$exit_code)."
echo "Press Enter to close this window."
read
WORKEREOF

  chmod +x "$worker_script"
  echo "$worker_script"
}

# ── tmux management ──────────────────────────────────────────────────────────

create_tmux_session() {
  # Kill existing session if any
  tmux kill-session -t "$TMUX_SESSION" 2>/dev/null || true

  # Create a status-monitoring script
  local status_script="$WORKER_DIR/status-monitor.sh"
  cat > "$status_script" <<'STATUSEOF'
#!/usr/bin/env bash
while true; do
  clear
  echo "=== Orchestrator Status ==="
  echo ""
  found=false
  for f in STATUS_DIR_PLACEHOLDER/issue-*.status; do
    [ -f "$f" ] || continue
    found=true
    issue=$(basename "$f" .status | sed 's/issue-//')
    status=$(cat "$f")
    case "$status" in
      completed) symbol="✓" ;;
      failed)    symbol="✗" ;;
      running)   symbol="⟳" ;;
      starting)  symbol="…" ;;
      *)         symbol="?" ;;
    esac
    echo "  Issue #$issue: $symbol $status"
  done
  if [ "$found" = false ]; then
    echo "  No workers running"
  fi
  echo ""
  echo "Updated: $(date '+%H:%M:%S')"
  echo "Press Ctrl-C to exit status view"
  sleep 5
done
STATUSEOF
  sed -i '' "s|STATUS_DIR_PLACEHOLDER|${STATUS_DIR}|g" "$status_script"
  chmod +x "$status_script"

  # Create session with status monitor
  tmux new-session -d -s "$TMUX_SESSION" -n "status" "bash $status_script"

  log_ok "tmux session '$TMUX_SESSION' created"
  log_info "Attach with: tmux attach -t $TMUX_SESSION"
  log_info "Navigate: Ctrl-B n (next window), Ctrl-B p (prev), Ctrl-B 0 (status)"
}

spawn_worker() {
  local issue="$1"

  set_status "$issue" "starting"

  # Build prompt file (avoids quoting issues)
  local prompt_file
  prompt_file=$(build_worker_prompt "$issue")

  # Build worker shell script (avoids tmux quoting hell)
  local worker_script
  worker_script=$(build_worker_script "$issue" "$prompt_file")

  # Create a new tmux window running the worker script
  tmux new-window -t "$TMUX_SESSION" -n "issue-${issue}" "bash $worker_script"

  set_status "$issue" "running"
  log_info "Spawned worker for issue #${issue} (window: issue-${issue})"
  log_info "  Prompt: ${prompt_file}"
  log_info "  Log:    ${LOG_DIR}/issue-${issue}.log"
}

# ── Block execution ──────────────────────────────────────────────────────────

wait_for_workers() {
  local -a issues=("$@")
  local all_done=false

  log_info "Waiting for ${#issues[@]} worker(s) to complete..."

  while [[ "$all_done" == "false" ]]; do
    sleep 10
    all_done=true
    for issue in "${issues[@]}"; do
      local status
      status=$(get_status "$issue")
      if [[ "$status" != "completed" && "$status" != "failed" ]]; then
        all_done=false
      fi
    done
  done

  # Report results
  echo
  for issue in "${issues[@]}"; do
    local status
    status=$(get_status "$issue")
    if [[ "$status" == "completed" ]]; then
      log_ok "Issue #${issue}: completed"
    else
      log_error "Issue #${issue}: ${status}"
    fi
  done
}

wait_for_merges() {
  local -a issues=("$@")

  if [[ "$AUTO_MERGE_WAIT" == "true" ]]; then
    log_info "Auto-merge-wait: polling for merged PRs..."
    local all_merged=false
    while [[ "$all_merged" == "false" ]]; do
      sleep 30
      all_merged=true
      for issue in "${issues[@]}"; do
        # Check if there's a merged PR that closes this issue
        local merged_count
        merged_count=$(gh pr list --search "closes #${issue}" --state merged --json number --jq length 2>/dev/null || echo "0")
        if [[ "$merged_count" -eq 0 ]]; then
          # Also check by branch name pattern
          merged_count=$(gh pr list --head "feature/${issue}-" --state merged --json number --jq length 2>/dev/null || echo "0")
        fi
        if [[ "$merged_count" -eq 0 ]]; then
          all_merged=false
        fi
      done
      if [[ "$all_merged" == "false" ]]; then
        echo -n "."
      fi
    done
    echo
    log_ok "All PRs merged!"
  else
    echo
    log_step "Block complete — PRs created"
    echo -e "${YELLOW}Review and merge the PRs for issues: ${issues[*]}${NC}"
    echo -e "${YELLOW}Check PRs at: $(gh repo view --json url --jq .url)/pulls${NC}"
    echo
    read -rp "Press Enter when all PRs are merged to continue to next block... "
  fi

  # Update main after merges
  log_info "Updating main branch..."
  git checkout main 2>/dev/null
  git pull origin main
  log_ok "main branch updated"
}

run_block() {
  local block_num="$1"
  local block_str="$2"
  local -a issues

  # Parse comma-separated issues
  IFS=',' read -ra issues <<< "$block_str"

  log_step "Block ${block_num}: Issues ${issues[*]}"

  if [[ "$DRY_RUN" == "true" ]]; then
    for issue in "${issues[@]}"; do
      issue=$(echo "$issue" | xargs) # trim whitespace
      log_info "[DRY RUN] Would spawn worker for issue #${issue}"
      log_info "  Permission mode: bypassPermissions"
      log_info "  Budget: \$${BUDGET}"
      log_info "  Prompt: ${PROMPT_DIR}/issue-${issue}.txt"
      log_info "  Log: ${LOG_DIR}/issue-${issue}.log"
      log_info "  Status: ${STATUS_DIR}/issue-${issue}.status"
    done
    return
  fi

  # Spawn all workers in this block
  for issue in "${issues[@]}"; do
    issue=$(echo "$issue" | xargs) # trim whitespace
    spawn_worker "$issue"
    sleep 2  # Brief pause between spawns to avoid race conditions
  done

  # Wait for all workers to finish
  local -a trimmed_issues=()
  for issue in "${issues[@]}"; do
    trimmed_issues+=("$(echo "$issue" | xargs)")
  done
  wait_for_workers "${trimmed_issues[@]}"

  # Check for failures
  local has_failures=false
  for issue in "${trimmed_issues[@]}"; do
    if [[ "$(get_status "$issue")" == "failed" ]]; then
      has_failures=true
      log_error "Issue #${issue} failed. Check log: ${LOG_DIR}/issue-${issue}.log"
    fi
  done

  if [[ "$has_failures" == "true" ]]; then
    log_warn "Some workers failed. Review logs before continuing."
    read -rp "Continue to merge wait anyway? [y/N] " confirm
    [[ "$confirm" =~ ^[Yy]$ ]] || exit 1
  fi
}

# ── Main ──────────────────────────────────────────────────────────────────────

main() {
  parse_args "$@"

  echo -e "${BOLD}${CYAN}"
  echo "  ╔══════════════════════════════════════════════════════╗"
  echo "  ║   Claude Code Parallel Worktree Orchestrator        ║"
  echo "  ╚══════════════════════════════════════════════════════╝"
  echo -e "${NC}"

  log_info "Blocks: ${#BLOCKS[@]}"
  for i in "${!BLOCKS[@]}"; do
    log_info "  Block $((i + 1)): issues ${BLOCKS[$i]}"
  done
  log_info "Budget per worker: \$${BUDGET}"
  log_info "Auto-merge wait: ${AUTO_MERGE_WAIT}"
  log_info "Permission mode: bypassPermissions"
  [[ "$DRY_RUN" == "true" ]] && log_warn "DRY RUN MODE — no actions will be taken"
  echo

  if [[ "$DRY_RUN" == "false" ]]; then
    check_prerequisites
    init_status_dirs
    create_tmux_session
  else
    log_info "[DRY RUN] Would check prerequisites"
    log_info "[DRY RUN] Would create tmux session '$TMUX_SESSION'"
    init_status_dirs  # Safe to create dirs even in dry run
  fi

  # Execute blocks sequentially
  local total_blocks=${#BLOCKS[@]}
  for i in "${!BLOCKS[@]}"; do
    local block_num=$((i + 1))
    run_block "$block_num" "${BLOCKS[$i]}"

    # Wait for merges between blocks (except after the last block)
    if [[ "$block_num" -lt "$total_blocks" && "$DRY_RUN" == "false" ]]; then
      wait_for_merges "${BLOCKS[$i]//,/ }"
    elif [[ "$block_num" -lt "$total_blocks" && "$DRY_RUN" == "true" ]]; then
      log_info "[DRY RUN] Would wait for PRs to merge before starting block $((block_num + 1))"
    fi
  done

  # Final summary
  echo
  log_step "Orchestration Complete"
  if [[ "$DRY_RUN" == "true" ]]; then
    log_info "[DRY RUN] Would have processed ${total_blocks} block(s)"
  else
    echo -e "${GREEN}${BOLD}All ${total_blocks} block(s) processed.${NC}"
    echo
    log_info "Status files: ${STATUS_DIR}/"
    log_info "Log files:    ${LOG_DIR}/"
    log_info "Prompt files: ${PROMPT_DIR}/"
    log_info "tmux session: tmux attach -t ${TMUX_SESSION}"
    echo
    log_info "Next steps:"
    log_info "  1. Review any remaining PRs"
    log_info "  2. Clean up worktrees: claude /cleanup-worktrees"
    log_info "  3. Kill tmux session: tmux kill-session -t ${TMUX_SESSION}"
  fi
}

main "$@"

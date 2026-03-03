#!/usr/bin/env bash
# Inventory drift-detection script
# Compares actual Claude Code infrastructure counts against expected values.
# Run: ./scripts/check-inventory.sh
# Exit 0 = no drift, Exit 1 = drift detected

set -euo pipefail

# ─── Expected Counts ─────────────────────────────────────────────────
# Update these when adding/removing infrastructure components.
# These should match .claude/docs/agentic-inventory.md
EXPECTED_AGENTS=8
EXPECTED_COMMANDS=7
EXPECTED_SKILLS=2
EXPECTED_RULES=10
EXPECTED_MCP_SERVERS=2

# ─── Count from Filesystem ──────────────────────────────────────────
ACTUAL_AGENTS=$(find .claude/agents -name "*.md" -maxdepth 1 2>/dev/null | wc -l | tr -d ' ')
ACTUAL_COMMANDS=$(find .claude/commands -name "*.md" -maxdepth 1 2>/dev/null | wc -l | tr -d ' ')
ACTUAL_SKILLS=$(find .claude/skills -name "SKILL.md" -maxdepth 2 2>/dev/null | wc -l | tr -d ' ')
ACTUAL_RULES=$(find .claude/rules -name "*.md" -maxdepth 1 2>/dev/null | wc -l | tr -d ' ')
ACTUAL_MCP_SERVERS=$(node -e "console.log(Object.keys(require('./.mcp.json').mcpServers || {}).length)" 2>/dev/null || echo 0)

# ─── Compare ────────────────────────────────────────────────────────
DRIFT=0

check() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" -ne "$actual" ]; then
    echo "DRIFT: $label — expected $expected, found $actual"
    DRIFT=1
  else
    echo "OK: $label: $actual (matches expected)"
  fi
}

echo "=== Inventory Drift Check ==="
echo ""
check "Agents"      "$EXPECTED_AGENTS"      "$ACTUAL_AGENTS"
check "Commands"    "$EXPECTED_COMMANDS"     "$ACTUAL_COMMANDS"
check "Skills"      "$EXPECTED_SKILLS"       "$ACTUAL_SKILLS"
check "Rules"       "$EXPECTED_RULES"        "$ACTUAL_RULES"
check "MCP Servers" "$EXPECTED_MCP_SERVERS"  "$ACTUAL_MCP_SERVERS"
echo ""

if [ "$DRIFT" -eq 0 ]; then
  echo "All counts match. No drift detected."
  exit 0
else
  echo "Drift detected! Update expected counts in this script"
  echo "and .claude/docs/agentic-inventory.md to match reality."
  exit 1
fi

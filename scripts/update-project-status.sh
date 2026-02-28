#!/usr/bin/env bash
# Updates a GitHub issue's status on the project board.
# Usage: ./scripts/update-project-status.sh <issue-number> <status>
# Status: backlog | in-progress | review | done
#
# Example:
#   ./scripts/update-project-status.sh 13 in-progress
#   ./scripts/update-project-status.sh 13 review

set -euo pipefail

# --- Configuration (Design to Deploy project) ---
PROJECT_NUMBER=2
OWNER="sachin1245"
PROJECT_ID="PVT_kwHOAQSZVM4BQX3V"
STATUS_FIELD_ID="PVTSSF_lAHOAQSZVM4BQX3Vzg-gyXc"

# --- Validate args ---
if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <issue-number> <status>"
  echo "Status: backlog | in-progress | review | done"
  exit 1
fi

ISSUE_NUMBER="$1"
STATUS="$2"

# Map status name to project field option ID (compatible with bash 3.2+)
case "$STATUS" in
  backlog)     OPTION_ID="37eec724" ;;
  in-progress) OPTION_ID="3dcfe2ac" ;;
  review)      OPTION_ID="9e320f0c" ;;
  done)        OPTION_ID="020a5a37" ;;
  *)
    echo "Error: Invalid status '$STATUS'. Must be one of: backlog, in-progress, review, done"
    exit 1
    ;;
esac

# --- Find the project item ID for this issue ---
echo "Finding project item for issue #${ISSUE_NUMBER}..."

ITEM_ID=$(gh project item-list "$PROJECT_NUMBER" --owner "$OWNER" --format json | \
  python3 -c "
import json, sys
data = json.load(sys.stdin)
for item in data['items']:
    if item['content'].get('number') == ${ISSUE_NUMBER}:
        print(item['id'])
        break
" 2>/dev/null)

if [[ -z "$ITEM_ID" ]]; then
  echo "Warning: Issue #${ISSUE_NUMBER} not found on project board. Skipping status update."
  exit 0
fi

# --- Update the status ---
echo "Setting issue #${ISSUE_NUMBER} → ${STATUS}..."

gh api graphql -f query="
  mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: \"${PROJECT_ID}\"
        itemId: \"${ITEM_ID}\"
        fieldId: \"${STATUS_FIELD_ID}\"
        value: { singleSelectOptionId: \"${OPTION_ID}\" }
      }
    ) {
      projectV2Item { id }
    }
  }
" --silent

echo "Done: Issue #${ISSUE_NUMBER} is now '${STATUS}' on the project board."

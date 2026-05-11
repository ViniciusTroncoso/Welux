#!/bin/bash
# Snapshot system-prompt.md in git before any edit/write

FILE=$(jq -r '.tool_input.file_path // ""')

# Only act on agents/*/system-prompt.md files
echo "$FILE" | grep -qE 'agents/.+/system-prompt\.md$' || exit 0

# Find git root from the file's directory
GIT_ROOT=$(git -C "$(dirname "$FILE")" rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$GIT_ROOT" || exit 0

# Nothing to snapshot if file is clean
git diff --quiet HEAD -- "$FILE" 2>/dev/null && exit 0

# Extract agent label (e.g., granbrasil/byd)
AGENT=$(echo "$FILE" | sed 's|.*agents/||;s|/system-prompt\.md||')

git add "$FILE" && git commit -m "$AGENT: snapshot before edit" 2>/dev/null || true

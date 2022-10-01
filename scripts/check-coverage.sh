#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
REPO_DIR=$( echo "$SCRIPT_DIR" | sed -E "s|/scripts||g" )
DEFAULT_GIT_BRANCH=main
CURRENT_GIT_BRANCH=$(git branch --show-current)

node "${SCRIPT_DIR}/../index.js" \
  --repoPath="$REPO_DIR" \
  --reportPath="coverage/lcov.info" \
  --fileTemplate="src/**/*.js" \
  --source="$CURRENT_GIT_BRANCH" \
  --target="$DEFAULT_GIT_BRANCH" \
  --reportFormat=lcov \
  --minimumOverallCoverage=90 \
  -v

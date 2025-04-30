#!/usr/bin/env bash
set -e

# verify Git LFS is installed
if ! command -v git-lfs &> /dev/null; then
  echo "❌ Git LFS not found. Please install it first (see README.md)." >&2
  exit 1
fi

echo "🎯 1. Rewriting history to remove .next directory from all commits…"
git filter-branch --force --index-filter \
  "git rm -r --cached --ignore-unmatch .next" \
  --prune-empty --tag-name-filter cat -- --all

echo "🧹 2. Cleaning up refs and running garbage collection…"
# delete backup refs created by filter-branch
git for-each-ref --format="%(refname)" refs/original/ | \
  xargs -r -n1 git update-ref -d
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "🚀 3. Force-pushing cleaned history to origin…"
git push origin --force --all

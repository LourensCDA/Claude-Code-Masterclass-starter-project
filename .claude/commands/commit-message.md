---
description: Create a commit message by analyzing git diffs
allowed-tools: Bash(git add .:*), Bash(git status:*), Bash(git diff --staged:*), Bash(git commit:*)
---

## Context:

- Add staged changes: !`git add .`
- Current git status: !`git status`
- Current git diffs: !`git diff --staged`

## Your task:

Analyze above staged git changes and create a commit message. Use present tense and explain "why" something has changed, not just "what" has changed.

## Commit types with emojis:

Only use the following emojis:

- 💫 'feat' for new features
- 🐛 'fix' for bug fixes
- 📝 'docs' for documentation changes
- 🎨 'style' for code style changes (formatting, missing semi-colons, etc.)
- ♻️ 'refactor' for code refactoring (no new features or bug fixes)
- 🚀 'perf' for performance improvements
- ✅ 'test' for adding or updating tests
- 🔧 'chore' for maintenance tasks (build process, dependencies, etc.)

## Format:

Use the following format for the commit message:

```
<emoji> <type>: <short description>
<optional longer description>
```

## Output:

1. Show summary of changes
2. Provide the commit message in the specified format
3. Ask for confirmation before committing the changes

DO NOT auto-commit the changes without user confirmation.

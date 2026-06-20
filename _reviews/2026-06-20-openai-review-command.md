# Review: openai-review command + review template

- **Date:** 2026-06-20
- **Reviewer:** OpenAI GPT-4o via mcp__openai__openai_chat
- **Scope:** staged diff
- **Files touched:** `.claude/commands/openai-review.md`, `_reviews/TEMPLATE.md`

## Summary

Both files accomplish their intended purpose. No correctness or security issues found; the two findings are process/robustness suggestions for the command's prompt instructions rather than bugs.

## Findings

### `.claude/commands/openai-review.md`

- **[Low]** No instruction for how to handle a failed `mcp__openai__openai_chat` call — the command has no fallback step if the API call errors out.
- **[Medium] (possible false positive)** Nothing enforces that the written review actually matches `_reviews/TEMPLATE.md`'s structure beyond the instruction text; since this is a prompt for an LLM (not executable code), there's no automated validation to add — flagging for awareness rather than as an actionable defect.

### `_reviews/TEMPLATE.md`

No issues found.

## Action Items

- [ ] Consider adding a line to the command noting what to tell the user if the OpenAI call fails (e.g. surface the error rather than silently stopping).

## Not Actioned

- Template-conformance validation — not applicable; this is an instruction file for an LLM step, not code that can run a schema check.

# Review Template

Copy this structure for every review doc saved under `_reviews/`. Keep section headers identical across reviews so they stay easy to scan and diff over time.

File naming: `_reviews/YYYY-MM-DD-<short-topic-slug>.md` (e.g. `2026-06-20-auth-form-validation.md`).

---

# Review: <short topic / branch name>

- **Date:** YYYY-MM-DD
- **Reviewer:** <model/tool, e.g. "OpenAI GPT-4o via mcp__openai__openai_chat">
- **Scope:** <staged diff / unstaged diff / specific files>
- **Files touched:** <list of files in the diff>

## Summary

1-3 sentences: overall impression and whether anything is blocking.

## Findings

One subsection per file. Within a file, list findings as bullets ordered by severity (High/Medium/Low). Mark suspected false positives explicitly rather than omitting them.

### `path/to/file.ts`

- **[Severity]** Description of the issue. Suggested fix if non-obvious.
- **[Severity] (possible false positive)** Description and why it might not apply.

## Action Items

Checklist of concrete follow-ups, only for findings worth acting on:

- [ ] Fix X in `file.ts:line`
- [ ] Confirm Y is intentional

## Not Actioned

Findings reviewed and deliberately skipped, with a one-line reason (keeps future reviewers from re-raising the same point).

- <finding> — <reason skipped>

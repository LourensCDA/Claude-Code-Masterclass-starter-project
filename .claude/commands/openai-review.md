---
description: Get a second-opinion code review of the current diff from OpenAI via the OpenAI MCP server
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git diff --staged:*), mcp__openai__openai_chat, Write
---

## Context:

- Current git status: !`git status`
- Staged diff: !`git diff --staged`
- Unstaged diff: !`git diff`

User input: $ARGUMENTS

## Model selection

The user may name a review tier in `$ARGUMENTS`. The `mcp__openai__openai_chat` tool only accepts `gpt-4o`, `gpt-4o-mini`, `o1-preview`, or `o1-mini` — none of the named GPT-5 tiers exist on the MCP server yet, so each maps to the closest available model today:

| Requested tier                          | Use for                          | Actual `model` value | Note |
|------------------------------------------|-----------------------------------|-----------------------|------|
| GPT-5 (**default**)                      | Standard reviews                  | `gpt-4o`               | Used if `$ARGUMENTS` doesn't name a tier |
| GPT-5 with high reasoning                 | Deep/high-risk reviews            | `o1-preview`           | Slower, more thorough reasoning |
| GPT-5-Codex                               | Repo-aware coding agent review    | `gpt-4o`               | No Codex variant on the MCP server; falls back to `gpt-4o` |
| GPT-5 mini                                 | Budget option                     | `gpt-4o-mini`          | Cheaper, lighter-weight pass |
| GPT-5 nano                                 | Avoid for serious review          | `gpt-4o-mini`          | Lowest-cost tier available; warn the user it's not suited for serious review |

If `$ARGUMENTS` names a tier that doesn't match the table (case-insensitively, allowing minor variations), ask the user to clarify rather than guessing.

## Your task

Get a second-opinion code review from OpenAI using the `mcp__openai__openai_chat` tool.

1. Pick the diff to review: prefer the staged diff; if it's empty, fall back to the unstaged diff. If both are empty, tell the user there's nothing to review and stop here.
2. Resolve the model per the table above.
3. Call `mcp__openai__openai_chat` with the resolved `model` and:
   - a `system` message instructing the model to act as a senior code reviewer focused on correctness bugs, security issues, and simplification/efficiency opportunities — not style nits
   - a `user` message containing the diff to review
4. Write the review to `_reviews/YYYY-MM-DD-<short-topic-slug>.md`, following the structure in `_reviews/TEMPLATE.md` exactly (same section headers). Use today's date and a short slug derived from the diff's topic/branch name. Note any finding you think is a false positive in the findings themselves rather than dropping it. Record which tier and actual model were used in the review doc.
5. Relay the same findings to the user in chat, grouped by file, and mention the path of the review file you wrote and which model tier was used.
6. Do not edit any other files. This command only produces a review doc for the user to read; it's a second opinion from a different model, not a replacement for `/code-review`.

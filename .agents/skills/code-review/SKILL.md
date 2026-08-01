---
name: code-review
description: Use this skill only for code review tasks in next-shop.
---

# code-review Skill

## Purpose

Review changes for correctness, security, data isolation, performance, database/API/frontend impact, tests, and release risk.

## When to Use

- Reviewing a PR, diff, or a set of proposed changes.
- Providing feedback before merge.

## Required Docs to Read

- `docs/ai/context.md`
- `docs/ai/code-review.md`
- Relevant security or architecture docs if the changes touch auth, data scope, deployment, or schema.

## Step-by-Step Workflow

1. Read `docs/ai/context.md` and `docs/ai/code-review.md`.
2. Inspect only the changed files and directly related files.
3. Check each review dimension from `docs/ai/code-review.md`.
4. Note blockers, suggestions, questions, required tests, and risk level.
5. Report if more context is needed.

## Validation Checklist (for the review output)

- [ ] Summary provided
- [ ] Blockers listed
- [ ] Suggestions listed
- [ ] Questions listed
- [ ] Required tests listed
- [ ] Risk level stated

## Forbidden Actions

- Do not scan the full repo unless needed.
- Do not rewrite code during review unless explicitly asked.
- Do not approve changes without noting risks.

## Final Response Format

```md
## Summary
## Blockers
## Suggestions
## Questions
## Required Tests
## Risk Level
```

Use this exact format.

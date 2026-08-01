# AI Agent Operating Rules

This repository uses the `docs/ai/` framework as the source of truth for AI-assisted development.

## Default Reading

Always read only:

- `docs/ai/context.md`

## Conditional Reading

Read additional docs only when the task matches:

- Architecture / modules / data flow / deployment → `docs/ai/architecture.md`
- Behavior changes / validation / tests → `docs/ai/testing-policy.md`
- Auth / permissions / data isolation / logs / PII / admin / integrations → `docs/ai/security-policy.md`
- Release / production-impacting changes → `docs/ai/release-policy.md`
- Code review tasks → `docs/ai/code-review.md`
- Unclear domain terms → `docs/ai/glossary.md`

## Skill Usage

Use only the relevant skill for the current task:

- Backend change → `.agents/skills/backend-change/SKILL.md`
- Frontend change → `.agents/skills/frontend-change/SKILL.md`
- Bug fix → `.agents/skills/bug-fix/SKILL.md`
- Code review → `.agents/skills/code-review/SKILL.md`
- Release check → `.agents/skills/release-check/SKILL.md`

## Work Rules

- Do not perform a full codebase scan unless explicitly required.
- Inspect only impacted modules and nearby related files.
- Make the smallest safe change.
- Follow existing patterns.
- Do not perform broad refactors unless explicitly requested.
- Do not remove existing behavior unless explicitly requested.
- Do not hardcode customer-specific, tenant-specific, or environment-specific behavior.
- Do not bypass permissions, audit logs, or security checks.
- Do not expose secrets, tokens, credentials, or sensitive data.
- Do not change database schema without migration and rollback notes.

## Final Response

Always include:

- Changed files
- What changed
- Tests run
- Tests not run, if any
- Risks
- Rollback notes

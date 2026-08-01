# Claude Code Instructions for next-shop

`docs/ai/` is the source of truth for AI-assisted development in this repository.

## Default Import

Only import by default:

- `@docs/ai/context.md`

## Conditional References

Reference other `docs/ai/` files only when the task clearly overlaps with their scope:

- Architecture changes → `docs/ai/architecture.md`
- Behavior / test changes → `docs/ai/testing-policy.md`
- Auth / security / data scope / admin / logging → `docs/ai/security-policy.md`
- Release validation → `docs/ai/release-policy.md`
- Code review → `docs/ai/code-review.md`
- Domain terminology → `docs/ai/glossary.md`

Reference a skill only when it matches the task:

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

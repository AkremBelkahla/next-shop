---
name: bug-fix
description: Use this skill only for bug fixes in next-shop. Trace root cause, make minimal fixes, and validate without broad refactors.
---

# bug-fix Skill

## Purpose

Investigate and fix bugs with minimal, upstream fixes rather than workarounds.

## When to Use

- Any defect in storefront, cart, checkout, data fetching, or build/runtime behavior.
- Type, lint, or runtime errors.
- Broken pages or API routes.

## Required Docs to Read

- `docs/ai/context.md`
- `docs/ai/bug-fix/SKILL.md` references `docs/ai/security-policy.md` if auth/data scope is involved
- `docs/ai/testing-policy.md`

## Step-by-Step Workflow

1. Reproduce or locate the failure from the report.
2. Read the impacted file(s) and nearby related files only.
3. Identify root cause. Add logging temporarily if needed, then remove it.
4. Apply the smallest safe fix.
5. Run `npm run lint` and `npm run build` if possible.
6. If the fix touches the database, checkout, or security path, read `docs/ai/security-policy.md`.
7. Report if more context is needed.

## Validation Checklist

- [ ] Bug root cause described
- [ ] Fix is minimal and does not mask symptoms
- [ ] `npm run lint` passes (or reason documented)
- [ ] `npm run build` passes (or reason documented)
- [ ] No leftover debug code
- [ ] No new tests added unless requested (none exist currently)

## Forbidden Actions

- Do not scan the full repo unless needed.
- Do not apply broad refactors under the guise of a bug fix.
- Do not remove existing behavior unless explicitly requested.
- Do not bypass permissions, audit logs, or security checks.

## Final Response Format

- Changed files
- What changed (including root cause)
- Tests run
- Tests not run, if any
- Risks
- Rollback notes

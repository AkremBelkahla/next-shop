---
name: release-check
description: Use this skill only for release readiness validation in next-shop.
---

# release-check Skill

## Purpose

Validate that the repository is ready for a production-impacting release.

## When to Use

- Before tagging or deploying.
- When asked to do a release readiness check.
- After schema, environment, or Docker changes.

## Required Docs to Read

- `docs/ai/context.md`
- `docs/ai/release-policy.md`
- `docs/ai/security-policy.md` if secrets/env changes are involved

## Step-by-Step Workflow

1. Read `docs/ai/context.md` and `docs/ai/release-policy.md`.
2. Inspect files changed since last release or the current diff.
3. Verify `npm run lint` and `npm run build`.
4. Verify Docker build instructions if Dockerfile/Compose changed.
5. Confirm environment variables and migrations are documented.
6. Determine risk level and list rollback steps.
7. Report if more context is needed.

## Validation Checklist

- [ ] `npm run lint` passes (or reason documented)
- [ ] `npm run build` passes (or reason documented)
- [ ] All required env vars documented
- [ ] Migrations generated and committed if schema changed
- [ ] Docker image builds (or reason documented)
- [ ] Rollback steps documented
- [ ] Risk level stated

## Forbidden Actions

- Do not scan the full repo unless needed.
- Do not make code changes during a release check unless explicitly asked.
- Do not skip migration or rollback documentation.

## Final Response Format

- Changed files
- What changed
- Tests run
- Tests not run, if any
- Risks
- Rollback notes

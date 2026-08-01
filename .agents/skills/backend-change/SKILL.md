---
name: backend-change
description: Use this skill only for backend changes in next-shop (API routes, Prisma queries, data access, Stripe, database schema, seed, Docker).
---

# backend-change Skill

## Purpose

Modify server-side logic safely: API routes, Prisma queries, database schema, seed data, Stripe integration, and Docker build/runtime files.

## When to Use

- Adding or editing files in `src/app/api/`
- Editing `src/lib/products.ts`, `src/lib/collections.ts`, `src/lib/cms/index.ts`, `src/lib/prisma.ts`, `src/lib/stripe.ts`
- Editing `prisma/schema.prisma`, `prisma/seed.ts`, or `prisma/migrations/`
- Editing `Dockerfile`, `docker-compose.yml`, Prisma config

## Required Docs to Read

- `docs/ai/context.md`
- `docs/ai/architecture.md`
- `docs/ai/coding-standards.md`
- `docs/ai/security-policy.md`
- `docs/ai/testing-policy.md`

## Step-by-Step Workflow

1. Identify the impacted module(s) and read only those files plus the docs above.
2. Understand the existing data flow. Prefer using `cms` facade for page data, Prisma helpers for new queries.
3. Make the smallest change that satisfies the requirement.
4. If schema changed, generate a migration and note rollback.
5. Run `npm run lint` and `npm run build` if possible.
6. Report if more context is needed.

## Validation Checklist

- [ ] `npm run lint` passes (or reason documented)
- [ ] `npm run build` passes (or reason documented)
- [ ] No secrets exposed
- [ ] Database access uses Prisma singleton or the existing pattern
- [ ] API route returns safe error JSON
- [ ] If schema/migration changed: rollback path documented

## Forbidden Actions

- Do not scan the full repo unless needed.
- Do not add raw SQL without explicit approval.
- Do not expose `STRIPE_SECRET_KEY`, `DATABASE_URL`, or any secret.
- Do not invent authentication/authorization/tenant logic.
- Do not change database schema without migration and rollback notes.

## Final Response Format

- Changed files
- What changed
- Tests run
- Tests not run, if any
- Risks
- Rollback notes

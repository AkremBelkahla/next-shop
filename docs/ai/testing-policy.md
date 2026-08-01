# next-shop — Testing Policy

## Test Frameworks Found

`Not found in current codebase scan` — no Jest, Vitest, Playwright, Cypress, or other test framework is configured.

## Test Folders

`Not found in current codebase scan` — no `__tests__/`, `tests/`, `e2e/`, or `playwright/` directories.

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint with `eslint-config-next` |
| `npm run build` | Next.js production build |
| `npm run dev` | Development server |
| `npm run db:push` | Prisma `db push` |
| `npm run db:migrate` | Prisma `migrate dev` |
| `npm run db:seed` | Seed sample catalog |
| `npm run db:studio` | Prisma Studio |

## When to Add Tests

For this codebase, add tests only when explicitly requested. Until then:

- Run `npm run lint` after any code change.
- Run `npm run build` to verify the app compiles before finishing a task.
- Verify the changed page or API route still loads in `npm run dev` when possible.

## What to Do if Tests Cannot Be Run

If `npm run build` or `npm run lint` cannot run locally (missing env vars, missing DB), report this in your final response under **Tests not run, if any** and explain why.

## Minimum Validation Checklist

Before finishing any task:

- [ ] `npm run lint` passes (or explicitly note why not)
- [ ] `npm run build` passes (or explicitly note why not)
- [ ] No TypeScript errors introduced
- [ ] No new `console.log` leftover unless for explicit user feedback or existing pattern
- [ ] If database schema changed: migration file generated and `npm run db:seed` / Prisma generate noted

## E2E / UI Tests

`Not found in current codebase scan` — if adding Playwright or similar, create the minimal config and document commands here.

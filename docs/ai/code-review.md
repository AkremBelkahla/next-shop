# next-shop — Code Review

## Review Dimensions

### Correctness

- Does the change do what the task requires?
- Are Prisma queries correct? Do they use `include`/`orderBy` consistently?
- Are prices handled in cents until display time?
- Does the change preserve Server/Client Component boundaries?
- Are async params handled with `use()` for Client Components and `await` for Server Components?

### Security

- Are secrets ever logged or exposed?
- Are API routes returning safe error messages?
- Is `STRIPE_SECRET_KEY` used server-side only?
- No raw SQL except the existing health check pattern?

### Data Isolation

`Not found in current codebase scan` — no tenant scoping to verify. If such logic is added, review isolation per customer/tenant.

### Performance

- Avoid over-fetching in Prisma `include` blocks.
- Avoid making product detail pages Client Components unnecessarily.
- Images use `next/image` with allowed remote hosts.

### Database Changes

- Schema changes must include a migration.
- New indexes should be added for frequently queried fields.
- Rollback path documented.

### API Changes

- New route handlers must be in `src/app/api/<route>/route.ts`.
- Response shapes should be JSON with safe error payloads.
- Checkout-related changes require extra scrutiny on price and cart validation.

### Frontend Impact

- UI changes should reuse existing `src/components/ui/` primitives.
- Tailwind classes should follow existing patterns.
- `'use client'` directive is justified.

### Tests

- No test suite exists. Verify `npm run lint` and `npm run build`.
- If tests are added, they must be runnable with a documented command.

### Release Risk

- Classify as Low / Medium / High.
- High-risk changes need build + Docker validation before merge.

## Output Format

```md
## Summary
## Blockers
## Suggestions
## Questions
## Required Tests
## Risk Level
```

Use this format in any AI-assisted code review response.

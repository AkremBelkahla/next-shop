# next-shop — Coding Standards

## Existing Patterns

- TypeScript with strict mode; `noUncheckedIndexedAccess` enabled.
- Path aliases from `tsconfig.json`: `@/*`, `@/components/*`, `@/lib/*`, `@/types/*`, `@/hooks/*`.
- Components use named exports.
- Server Components by default. Client Components add `'use client'`.
- Tailwind CSS utility classes only; theme variables defined in `src/app/globals.css`.
- shadcn/ui components live in `src/components/ui/`. Use existing primitives before creating new ones.

## Backend Conventions

- Prisma is the only database access layer.
- Prisma queries are in `src/lib/products.ts` and `src/lib/collections.ts`.
- Re-export queries through `src/lib/cms/index.ts` for page-level use.
- Prefer `findUnique` / `findMany` with explicit `include` and `orderBy`.
- `src/lib/prisma.ts` is a singleton; always import from there.
- API routes (`src/app/api/`) return `NextResponse.json()`.

## Frontend Conventions

- Use `next/font` (currently `Inter`) for web fonts.
- Layout in `src/app/layout.tsx` wraps `Header` + `<main>` + `Footer`.
- Use `Container` from `src/components/ui/container.tsx` for page width.
- Lucide icons via `lucide-react`.
- Buttons use `Button` from `@/components/ui/button`.

## API Conventions

- Route handlers live in `src/app/api/<route>/route.ts`.
- Return `{ error }` for failures with an appropriate HTTP status.
- Catch blocks must return a response; do not leak stack traces or secret values.

## Error Handling

- API route errors: log to `console.error` and return safe JSON.
- Product detail: `notFound()` from `next/navigation` for missing slugs.
- Cart parse errors silently return empty cart (`src/lib/cart.ts`).
- Missing `STRIPE_SECRET_KEY` throws at module load (`src/lib/stripe.ts`).

## Logging

- Use `console.error` for errors and `console.log` for simple operational messages.
- No structured logging or external logging service found.
- Do not log cart contents, payment details, or environment secrets.

## Validation

- Inferred from codebase: validation is minimal. Prisma types provide compile-time safety.
- Cart cookie values are parsed inside a `try/catch`.
- TBD - needs team confirmation: whether to add runtime validation (e.g. zod) for API bodies.

## Database Access

- Use `prisma` singleton.
- Avoid raw SQL except in the health check.
- Always define Prisma relations and indexes in `schema.prisma`.
- Migrations go in `prisma/migrations/`.

## Permission Checks

`Not found in current codebase scan` — there is no authentication or authorization layer.

## Data Scoping

`Not found in current codebase scan` — the application operates on a single global catalog.

## Rules for Safe Changes

- Do not edit `prisma/schema.prisma` without planning a migration.
- Do not hardcode environment-specific values (URLs, keys, domains).
- Keep price handling in cents until display time.
- Do not change the `cart` cookie shape without updating `CartItem` and `getCart()`.
- Reuse existing UI primitives and shadcn/ui patterns.
- Preserve React Server Component defaults; do not make pages Client Components unnecessarily.

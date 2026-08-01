# next-shop — Security Policy

## Authentication Rules

`Not found in current codebase scan` — there is no user authentication, login, session, or JWT implementation.

## Authorization Rules

`Not found in current codebase scan` — there are no roles, permissions, or access-control lists.

## Data Isolation / Tenant Rules

`Not found in current codebase scan` — this is a single-tenant storefront with a shared catalog.

## Sensitive Data Handling

- **Stripe secret key** (`STRIPE_SECRET_KEY`) must only be used server-side in `src/lib/stripe.ts` and `src/app/api/checkout/route.ts`.
- **Stripe publishable key** (`STRIPE_PUBLISHABLE_KEY`) may be public but must be loaded through environment variables if used in client code.
- **Database URL** (`DATABASE_URL`) must stay in `.env` / `.env.local` and never be committed.
- **Cart cookie** is JSON-serialized client state. Do not store PII or secrets in it.
- Do not log or return raw `error` objects from API routes. Return safe `{ error: string }` payloads.

## Logging Restrictions

- Do not log payment details, full cart contents, secrets, or personally identifiable information.
- `console.error` for operational errors is acceptable; stack traces should stay server-side.

## Secrets Handling

- Required env vars: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_BASE_URL`
- Docker Compose expects `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` from host environment.
- No `.env.example` file exists in repo; add one only if explicitly requested.

## API Security

- `POST /api/checkout` does not validate inventory or price freshness. It trusts the cookie cart.
- No CSRF tokens; `sameSite: 'lax'` cart cookie provides basic mitigation.
- No rate limiting found.
- `GET /api/health` exposes database connectivity status publicly.
- TBD - needs team confirmation: whether to restrict `/api/health`, add rate limits, or validate checkout line items.

## Admin Permissions

`Not found in current codebase scan` — there is no admin interface.

## Common Mistakes AI Must Avoid

- Never expose `STRIPE_SECRET_KEY` in client code or logs.
- Never hardcode customer or environment-specific data (Stripe keys, DB URLs, domains).
- Never store sensitive data in the cart cookie.
- Never allow client-side setting of prices or totals at checkout.
- Never bypass Prisma to run raw SQL without review.
- Never add authentication/authorization modules unless explicitly requested.

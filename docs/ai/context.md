# next-shop — AI Shared Context

## Product Summary

`next-shop` is a modern headless e-commerce storefront:

- Product catalog, collections, and variants
- Cookie-based shopping cart
- Stripe-hosted checkout
- Static / dynamic SEO (metadata, sitemap, JSON-LD)
- Docker-ready for PostgreSQL + Next.js

It is a single-tenant demo/storefront app. There is no admin panel, no authentication, and no multi-tenancy in the current codebase.

## Core Modules

| Module | Location | Purpose |
|--------|----------|---------|
| Storefront pages | `src/app/(shop)/` | Home, collection list, collection detail, product detail |
| Cart / checkout pages | `src/app/cart/`, `src/app/checkout/` | Cart page, success/cancel |
| API routes | `src/app/api/` | `/api/checkout` (Stripe), `/api/health` |
| Data access | `src/lib/products.ts`, `src/lib/collections.ts` | Prisma queries |
| Cart logic | `src/lib/cart.ts` | Cookie cart read/write |
| CMS abstraction | `src/lib/cms/index.ts` | Facade over products/collections queries |
| Stripe client | `src/lib/stripe.ts` | Stripe SDK initialization |
| Prisma client | `src/lib/prisma.ts` | Singleton Prisma client |
| UI components | `src/components/ui/` | shadcn/ui building blocks |
| Page components | `src/components/home/`, `src/components/product/`, `src/components/layout/` | Page sections |
| Types | `src/types/product.ts` | Shared TS types |
| Database | `prisma/schema.prisma`, `prisma/seed.ts` | Schema + seed data |

## Architecture Summary

- Next.js 16 App Router (React 19 + Server Components by default)
- TypeScript with strict mode and `noUncheckedIndexedAccess`
- Tailwind CSS v4 + `tw-animate-css`
- shadcn/ui (`components.json` style `new-york`, icons: lucide)
- Prisma + PostgreSQL (schema in `prisma/schema.prisma`)
- Stripe Checkout in `eur`
- React Compiler enabled in `next.config.ts`
- Standalone build for Docker (`output: 'standalone'`)

## Critical Rules

- **No test suite exists.** `npm run lint` and `npm run build` are the primary automated checks.
- **Server Components by default.** Only add `'use client'` when interactivity is required.
- **Cart is cookie-based** (`cart` cookie, 7 days, JSON array).
- **Prices are stored in cents** as integers; display formatting uses `formatPrice()`.
- **Database access goes through Prisma in `src/lib/`.** No raw SQL except the health check.
- **Product detail page is a Client Component** that fetches via `cms.products.getBySlug(slug)` and uses React `use()` for the async params promise.
- **Checkout is hosted by Stripe** — `POST /api/checkout` creates a Stripe Checkout Session from the cookie cart.
- **No auth, no admin, no multi-tenancy.** Do not invent user/role/tenant models.

## Data Isolation / Multi-tenancy

`Not found in current codebase scan` — the application has no tenant, customer, or organization scoping. It operates on a single shared catalog.

## Common Risk Areas

- `add-to-cart-button.tsx` currently only logs to `console` (cart actions are not wired to the cookie cart).
- Product detail page uses `use()` on a Client Component promise — ensure this pattern stays consistent.
- Hardcoded `eur` currency in checkout and SEO. Changing currency requires touching `src/lib/stripe.ts` and `src/lib/seo.ts`.
- Cart cookie serialization must stay in sync with `CartItem` type.
- `src/lib/stripe.ts` throws at import if `STRIPE_SECRET_KEY` is missing. The app will not start without it.
- `prisma.config.ts` uses `import "dotenv/config"` — environment loading depends on `dotenv` being installed.

## AI Working Policy

- Read only `docs/ai/context.md` by default.
- Read additional docs only when the task overlaps with their scope.
- Use the matching skill in `.agents/skills/` for the task type.
- Inspect only impacted modules and nearby related files.
- Do not scan the full repo unless explicitly asked.
- Keep changes minimal and follow existing patterns.

## Token-Efficient Reading Policy

Always read this file first.

Then read other docs only when relevant:

- Architecture changes → `docs/ai/architecture.md`
- Behavior/test changes → `docs/ai/testing-policy.md`
- Auth/security/data-scope/admin/logging changes → `docs/ai/security-policy.md`
- Release validation → `docs/ai/release-policy.md`
- Code review → `docs/ai/code-review.md`
- Unclear domain terms → `docs/ai/glossary.md`

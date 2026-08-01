# next-shop — Architecture

## Technology Stack

| Layer | Technology | File |
|-------|------------|------|
| Framework | Next.js 16.0.10 (App Router) | `package.json` |
| Runtime | React 19.2.1 | `package.json` |
| Language | TypeScript 5.x | `package.json`, `tsconfig.json` |
| Styling | Tailwind CSS v4, `tw-animate-css` | `package.json`, `postcss.config.mjs`, `src/app/globals.css` |
| UI kit | shadcn/ui `new-york` + lucide icons | `components.json` |
| ORM | Prisma 6.19.1 | `package.json`, `prisma/schema.prisma` |
| Database | PostgreSQL | `prisma/schema.prisma`, `docker-compose.yml` |
| Payments | Stripe (`stripe`, `@stripe/stripe-js`) | `package.json`, `src/lib/stripe.ts` |
| Build target | Standalone output for Docker | `next.config.ts` |

## Codebase Structure

```
next-shop/
├── src/
│   ├── app/
│   │   ├── (shop)/              # Shop route group
│   │   │   ├── page.tsx         # Home
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx     # Collections list
│   │   │   │   └── [slug]/page.tsx  # Collection detail (Server Component)
│   │   │   └── products/
│   │   │       ├── [slug]/page.tsx  # Product detail (Client Component)
│   │   │       └── [slug]/loading.tsx
│   │   ├── api/
│   │   │   ├── checkout/route.ts   # Stripe session creation
│   │   │   └── health/route.ts     # Health check
│   │   ├── cart/page.tsx        # Cart page (Server Component)
│   │   ├── checkout/success/page.tsx
│   │   ├── checkout/cancel/page.tsx
│   │   ├── layout.tsx           # Root layout with Header/Footer
│   │   ├── globals.css          # Tailwind theme tokens
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives
│   │   ├── home/                # Homepage sections
│   │   ├── layout/              # Header, Footer
│   │   └── product/             # Product grid, card, info, images, etc.
│   ├── lib/
│   │   ├── prisma.ts            # Prisma singleton
│   │   ├── stripe.ts            # Stripe client
│   │   ├── cart.ts              # Cookie cart helpers
│   │   ├── products.ts          # Product Prisma queries
│   │   ├── collections.ts       # Collection Prisma queries
│   │   ├── cms/index.ts         # CMS abstraction facade
│   │   ├── seo.ts               # Metadata + JSON-LD helpers
│   │   └── utils.ts             # cn(), formatPrice()
│   └── types/
│       └── product.ts           # Shared TypeScript types
├── prisma/
│   ├── schema.prisma
│   ├── migrations/              # Prisma migration files
│   └── seed.ts                  # Seed sample catalog
├── next.config.ts
├── components.json
├── Dockerfile
└── docker-compose.yml
```

## Main Services / Modules

### Catalog (`src/lib/products.ts`, `src/lib/collections.ts`)

- `getProducts(options?)` — list with `featured`, `collectionSlug`, `limit`, `offset`
- `getProductBySlug(slug)` — detail by slug
- `searchProducts(query)` — title/description search (case-insensitive)
- `getRelatedProducts(productId)` — same-collection products
- `getCollections(options?)` — list collections
- `getCollectionBySlug(slug)` — collection with products and relations

### CMS Facade (`src/lib/cms/index.ts`)

Inferred from codebase: provides a stable API surface so future swaps (Sanity/Payload/etc.) are localized. Currently re-exports Prisma-based helpers.

### Cart (`src/lib/cart.ts`)

- `getCart()` / `addToCart()` / `removeFromCart()` / `updateQuantity()` / `clearCart()`
- Persisted in `cart` cookie for 7 days (`maxAge: 60 * 60 * 24 * 7`, `sameSite: 'lax'`)
- Calculated totals from stored `price` * `quantity`

### Checkout (`src/app/api/checkout/route.ts`)

- Reads cookie cart via `getCart()`
- Creates Stripe Checkout Session in `eur` with line items
- Redirects to Stripe via returned `url`

### SEO (`src/lib/seo.ts`)

- `generateProductMetadata()`
- `generateCollectionMetadata()`
- `generateProductJsonLd()`
- All prices divided by 100 for display; currency hardcoded to `EUR`.

## Important Data Flows

1. **Homepage**: `src/app/(shop)/page.tsx` → `cms.products.getFeatured()` + `cms.collections.getFeatured()`
2. **Collection page**: `cms.collections.getBySlug(slug)` → `ProductGrid`
3. **Product page**: `use(cms.products.getBySlug(slug))` → `ProductImages`, `ProductInfo`, `VariantSelector`, `AddToCartButton`
4. **Cart page**: `getCart()` (cookies) → render items + summary
5. **Checkout**: `POST /api/checkout` → `getCart()` → `stripe.checkout.sessions.create()` → return `{ url }`
6. **Health**: `GET /api/health` → `prisma.$queryRaw` → status JSON

## Deployment / Runtime

- Docker multi-stage build based on `node:20-alpine`
- `output: 'standalone'` in `next.config.ts`
- Prisma client generated at build time (`npx prisma generate` in Dockerfile)
- Docker Compose service `app` depends on `postgres` healthcheck
- Non-root `nextjs` user in final image
- `HOSTNAME="0.0.0.0"` and `PORT=3000`

## Architecture Rules for AI

- Prefer Server Components; use `'use client'` only for interactivity.
- Keep data access in `src/lib/` files. Reuse `cms` facade for new page-level data.
- Do not bypass Prisma or write raw SQL except in the existing health check pattern.
- Do not introduce new backend frameworks or servers unless explicitly requested.
- Keep environment variables in `.env` files. Do not hardcode credentials.
- If changing Docker build, verify `npx prisma generate` and `output: 'standalone'` still work.
- TBD - needs team confirmation: actual production deployment target and environment-specific variable management.

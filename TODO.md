# Next-Shop E-commerce - Development Roadmap

> Modern headless e-commerce built with Next.js App Router, React Server Components, and Stripe.
> Inspired by Nextmerce aesthetics, production-ready architecture.

---

## Phase 1 – Setup & Foundations

- [ ] Initialize Next.js 14+ project with App Router (`npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir=false`)
- [ ] Configure TypeScript strict mode in `tsconfig.json` (strict: true, noUncheckedIndexedAccess: true)
- [ ] Setup Tailwind CSS with custom theme extending default config (colors, fonts, spacing)
- [ ] Install and configure shadcn/ui (`npx shadcn-ui@latest init` with New York style, neutral base color)
- [ ] Add essential shadcn components: Button, Card, Input, Sheet, Skeleton, Badge, Separator, AspectRatio
- [ ] Setup Prisma ORM (`npm install prisma @prisma/client`, init with PostgreSQL provider)
- [ ] Create `.env.local` template with DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_BASE_URL
- [ ] Create `docker-compose.yml` for local PostgreSQL database (postgres:15-alpine, port 5432)
- [ ] Setup path aliases in tsconfig.json (@/components, @/lib, @/types, @/hooks)
- [ ] Create base folder structure: app/, components/, lib/, types/, hooks/, public/
- [ ] Add `.env.example` file documenting all required environment variables
- [ ] Configure ESLint with Next.js recommended rules and Prettier integration

---

## Phase 2 – Design System & Layout

- [ ] Define design tokens in `tailwind.config.ts` (brand colors, typography scale, container sizes, animations)
- [ ] Create `app/globals.css` with CSS variables for theming (--background, --foreground, --primary, --muted, etc.)
- [ ] Build `components/ui/container.tsx` - responsive max-width wrapper component
- [ ] Build `components/layout/header.tsx` - Server Component with logo, navigation links, cart icon with count
- [ ] Build `components/layout/mobile-nav.tsx` - Client Component using Sheet for mobile menu
- [ ] Build `components/layout/footer.tsx` - Server Component with links, newsletter signup placeholder, copyright
- [ ] Build `components/layout/announcement-bar.tsx` - dismissible top banner for promotions
- [ ] Create `app/layout.tsx` root layout with Header, Footer, font loading (Inter or similar)
- [ ] Build `components/ui/logo.tsx` - SVG logo component with text fallback
- [ ] Build `components/ui/icon-button.tsx` - accessible icon button wrapper
- [ ] Build `components/ui/price.tsx` - formatted price display with currency support
- [ ] Build `components/ui/badge-new.tsx` and `components/ui/badge-sale.tsx` - product badges
- [ ] Setup `lib/utils.ts` with cn() helper (clsx + tailwind-merge) and formatPrice() utility

---

## Phase 3 – Data Layer & CMS Abstraction

- [ ] Design Prisma schema in `prisma/schema.prisma`: Product, ProductVariant, Collection, ProductImage models
- [ ] Add Product model fields: id, slug, title, description, price, compareAtPrice, images, variants, collections, featured, createdAt, updatedAt
- [ ] Add ProductVariant model: id, productId, title, sku, price, inventory, options (JSON for size/color)
- [ ] Add Collection model: id, slug, title, description, image, products (many-to-many), featured
- [ ] Add ProductImage model: id, productId, url, alt, position (for ordering)
- [ ] Create `lib/prisma.ts` singleton client with connection pooling for serverless
- [ ] Run `npx prisma migrate dev --name init` to create initial migration
- [ ] Create `prisma/seed.ts` with realistic sample data (8-12 products, 3-4 collections, variants)
- [ ] Add seed script to package.json: `"db:seed": "npx prisma db seed"`
- [ ] Create `lib/products.ts` with functions: getProducts(), getProductBySlug(), getFeaturedProducts(), searchProducts()
- [ ] Create `lib/collections.ts` with functions: getCollections(), getCollectionBySlug(), getCollectionProducts()
- [ ] Create `types/product.ts` with TypeScript interfaces: Product, ProductVariant, Collection, CartItem
- [ ] Build abstraction layer in `lib/cms/index.ts` exporting unified API (future-proof for Sanity/Payload swap)

---

## Phase 4 – Shop Pages

### 4.1 Homepage
- [ ] Create `app/(shop)/page.tsx` as Server Component assembling homepage sections
- [ ] Build `components/home/hero-section.tsx` - full-width hero with headline, CTA button, background image
- [ ] Build `components/home/featured-collections.tsx` - grid of 3-4 collection cards with images
- [ ] Build `components/home/featured-products.tsx` - horizontal scroll or grid of featured products
- [ ] Build `components/home/value-props.tsx` - icon grid (free shipping, secure payment, etc.)
- [ ] Build `components/home/newsletter-section.tsx` - email capture form with Server Action placeholder

### 4.2 Product Card & Grid
- [ ] Build `components/product/product-card.tsx` - image, title, price, hover effect, link to PDP
- [ ] Build `components/product/product-grid.tsx` - responsive grid layout (2 cols mobile, 3-4 desktop)
- [ ] Build `components/product/product-card-skeleton.tsx` - loading skeleton matching card dimensions
- [ ] Add image hover zoom effect and quick-add button overlay on product cards

### 4.3 Collection Pages
- [ ] Create `app/(shop)/collections/page.tsx` - list all collections with images
- [ ] Create `app/(shop)/collections/[slug]/page.tsx` - Server Component fetching collection + products
- [ ] Build `components/collection/collection-header.tsx` - title, description, product count
- [ ] Build `components/collection/collection-filters.tsx` - Client Component for sort dropdown (price, newest)
- [ ] Implement URL-based filtering with searchParams (sort, page)
- [ ] Add pagination or infinite scroll for large collections

### 4.4 Product Detail Page (PDP)
- [ ] Create `app/(shop)/products/[slug]/page.tsx` - Server Component with full product data
- [ ] Build `components/product/product-images.tsx` - main image + thumbnail gallery, Client Component for interaction
- [ ] Build `components/product/product-info.tsx` - title, price, description, badges
- [ ] Build `components/product/variant-selector.tsx` - Client Component for size/color selection
- [ ] Build `components/product/add-to-cart-button.tsx` - Client Component with quantity selector
- [ ] Build `components/product/product-details-accordion.tsx` - expandable sections (details, shipping, returns)
- [ ] Build `components/product/related-products.tsx` - Server Component showing products from same collection
- [ ] Add image zoom on hover/click functionality

---

## Phase 5 – Cart & Checkout

### 5.1 Cart State Management
- [ ] Create `lib/cart.ts` with cart logic: addItem(), removeItem(), updateQuantity(), getCart(), clearCart()
- [ ] Implement cart persistence using cookies (server-readable) with JSON serialization
- [ ] Create `hooks/use-cart.ts` - Client hook wrapping cart actions with optimistic updates
- [ ] Create `components/cart/cart-provider.tsx` - Context provider for cart state across app
- [ ] Build cart item type with productId, variantId, quantity, price snapshot

### 5.2 Cart UI
- [ ] Build `components/cart/cart-sheet.tsx` - slide-out drawer using Sheet component
- [ ] Build `components/cart/cart-item.tsx` - product image, title, variant, quantity controls, remove button
- [ ] Build `components/cart/cart-summary.tsx` - subtotal, shipping estimate, total
- [ ] Build `components/cart/empty-cart.tsx` - empty state with CTA to continue shopping
- [ ] Create `app/cart/page.tsx` - full cart page as alternative to sheet
- [ ] Add cart icon badge showing item count in header

### 5.3 Stripe Checkout Integration
- [ ] Install Stripe packages: `npm install stripe @stripe/stripe-js`
- [ ] Create `lib/stripe.ts` with Stripe client initialization (server-side)
- [ ] Create `app/api/checkout/route.ts` - POST endpoint creating Stripe Checkout Session
- [ ] Map cart items to Stripe line_items format with price_data
- [ ] Configure success_url and cancel_url for redirect flow
- [ ] Create `app/checkout/success/page.tsx` - order confirmation page
- [ ] Create `app/checkout/cancel/page.tsx` - cancelled checkout page with retry option
- [ ] Build `components/checkout/checkout-button.tsx` - Client Component triggering Stripe redirect
- [ ] Add loading state during checkout session creation

---

## Phase 6 – SEO & Performance

### 6.1 Metadata & SEO
- [ ] Create `lib/seo.ts` with helper functions: generateProductMetadata(), generateCollectionMetadata()
- [ ] Add dynamic metadata export to `app/(shop)/products/[slug]/page.tsx` using generateMetadata()
- [ ] Add dynamic metadata to collection pages with title, description, openGraph
- [ ] Create `app/sitemap.ts` generating sitemap.xml with all products and collections
- [ ] Create `app/robots.ts` with robots.txt configuration
- [ ] Add JSON-LD structured data for products (Product schema with offers, images)
- [ ] Configure OpenGraph images for social sharing

### 6.2 Image Optimization
- [ ] Configure `next.config.js` with remotePatterns for product images
- [ ] Use Next.js Image component everywhere with proper sizes, priority, placeholder="blur"
- [ ] Create `components/ui/optimized-image.tsx` wrapper with error handling and fallback
- [ ] Add blur placeholder generation for product images
- [ ] Implement responsive image srcset for different breakpoints

### 6.3 Loading States & Skeletons
- [ ] Create `app/(shop)/loading.tsx` - homepage loading skeleton
- [ ] Create `app/(shop)/products/[slug]/loading.tsx` - PDP skeleton
- [ ] Create `app/(shop)/collections/[slug]/loading.tsx` - collection page skeleton
- [ ] Build skeleton components matching each major UI section
- [ ] Add Suspense boundaries around dynamic content sections
- [ ] Implement streaming with React Suspense for slow data fetches

### 6.4 Performance Optimization
- [ ] Configure static generation for collection pages with generateStaticParams()
- [ ] Add ISR (Incremental Static Regeneration) with revalidate option where appropriate
- [ ] Implement route prefetching for product links on hover
- [ ] Audit and minimize Client Components, keep interactivity at leaf nodes
- [ ] Add `loading="lazy"` for below-fold images
- [ ] Configure font optimization with next/font

---

## Phase 7 – Polish & Production Ready

### 7.1 Error Handling
- [ ] Create `app/error.tsx` - global error boundary with retry option
- [ ] Create `app/not-found.tsx` - custom 404 page with navigation
- [ ] Create `app/(shop)/products/[slug]/not-found.tsx` - product not found page
- [ ] Add error boundaries around critical sections
- [ ] Implement graceful degradation for failed API calls

### 7.2 Accessibility
- [ ] Audit all interactive elements for keyboard navigation
- [ ] Add proper ARIA labels to icon buttons and interactive elements
- [ ] Ensure color contrast meets WCAG AA standards
- [ ] Add focus-visible styles for keyboard users
- [ ] Test with screen reader (VoiceOver/NVDA)

### 7.3 Final Polish
- [ ] Add page transitions with subtle animations
- [ ] Implement toast notifications for cart actions using Sonner or similar
- [ ] Add "Back to top" button on long pages
- [ ] Create favicon and app icons in `app/` directory
- [ ] Add loading spinner for async operations
- [ ] Review and clean up all console.log statements
- [ ] Run TypeScript strict check and fix all errors

### 7.4 Docker & Deployment
- [ ] Create `Dockerfile` with multi-stage build (deps, builder, runner)
- [ ] Create `.dockerignore` excluding node_modules, .git, .env files
- [ ] Update `docker-compose.yml` to include app service alongside postgres
- [ ] Add health check endpoint at `app/api/health/route.ts`
- [ ] Configure `next.config.js` with output: 'standalone' for Docker
- [ ] Test full Docker build and run locally
- [ ] Document deployment process for common platforms (Railway, Render, DigitalOcean)

### 7.5 Documentation
- [ ] Write comprehensive `README.md` with project overview, tech stack, features
- [ ] Add setup instructions: prerequisites, environment variables, database setup
- [ ] Document available npm scripts and their purposes
- [ ] Add architecture overview explaining folder structure and design decisions
- [ ] Include screenshots/GIFs of key features
- [ ] Add contributing guidelines and code style notes
- [ ] Create `CHANGELOG.md` for version tracking

---

## Stretch Goals (Post-MVP)

- [ ] Add product search with debounced input and results dropdown
- [ ] Implement wishlist functionality with local storage
- [ ] Add product reviews and ratings system
- [ ] Implement inventory tracking and "Out of Stock" states
- [ ] Add email notifications via Resend or similar
- [ ] Implement admin dashboard for product management
- [ ] Add multi-currency support
- [ ] Implement A/B testing infrastructure
- [ ] Add analytics integration (Plausible, Umami)
- [ ] Progressive Web App (PWA) configuration

---

## Development Notes

### Commands Reference
```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Docker
docker-compose up -d     # Start services
docker-compose down      # Stop services
docker build -t next-shop .  # Build image
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/nextshop
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Key Architectural Decisions
1. **Server Components by default** - Only use Client Components for interactivity
2. **Cookie-based cart** - Readable on server for SSR, no hydration mismatch
3. **CMS abstraction** - Easy swap between Prisma/Sanity/Payload
4. **Stripe Checkout** - Hosted checkout for PCI compliance, minimal integration
5. **No Vercel dependencies** - Standard Node.js runtime, Docker-ready

---

*Last updated: December 2024*

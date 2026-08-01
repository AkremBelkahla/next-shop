# next-shop — Glossary

## Product

Definition: A sellable item in the catalog with a title, description, price, images, variants, and collection membership.
Where used: `prisma/schema.prisma` model `Product`, `src/lib/products.ts`, `src/types/product.ts`.
Related modules: ProductVariant, ProductImage, Collection.
Notes: Prices are stored in cents as integers.

## ProductVariant

Definition: A specific version of a Product (e.g. color, size, strap). Has its own SKU, price, inventory count, and `options` JSON.
Where used: `prisma/schema.prisma` model `ProductVariant`, `src/types/product.ts`, `src/components/product/variant-selector.tsx`.
Related modules: Product, CartItem.
Notes: Variant price overrides the base product price at display time in the product page.

## ProductImage

Definition: An image belonging to a Product, with URL, alt text, and display position.
Where used: `prisma/schema.prisma` model `ProductImage`, `src/types/product.ts`, `src/components/product/product-images.tsx`.
Related modules: Product.
Notes: Ordered by `position` ascending in queries.

## Collection

Definition: A grouping of Products (e.g. New Arrivals, Sale). Products can belong to many collections via an implicit many-to-many relation.
Where used: `prisma/schema.prisma` model `Collection`, `src/lib/collections.ts`, `src/types/product.ts`.
Related modules: Product.
Notes: Collections have a featured flag and are addressed by slug in URLs.

## CMS (in `src/lib/cms/index.ts`)

Definition: A thin abstraction layer that exposes `products` and `collections` query methods. Designed to allow swapping the underlying data source.
Where used: `src/lib/cms/index.ts`, imported in pages such as `src/app/(shop)/products/[slug]/page.tsx` and `src/app/(shop)/collections/[slug]/page.tsx`.
Related modules: `src/lib/products.ts`, `src/lib/collections.ts`.
Notes: Currently backed directly by Prisma queries. Not a headless CMS integration yet.

## CartItem

Definition: A single entry in the shopping cart, stored in the `cart` cookie. Contains productId, optional variantId, quantity, price, title, image, and variant metadata.
Where used: `src/types/product.ts`, `src/lib/cart.ts`.
Related modules: Cart, ProductVariant.
Notes: Price is stored in cents and multiplied by quantity for totals.

## Cookie Cart

Definition: The cart persistence mechanism. A JSON-serialized array of `CartItem` objects stored in a `cart` cookie.
Where used: `src/lib/cart.ts`.
Related modules: CartItem, `src/components/product/add-to-cart-button.tsx` (intended consumer).
Notes: 7-day expiry, `sameSite: 'lax'`. The current AddToCartButton does not write to the cookie.

## Price (cents)

Definition: Monetary values stored as integers representing the smallest currency unit (cents). Used in `Product`, `ProductVariant`, and `CartItem`.
Where used: `prisma/schema.prisma`, `src/lib/seo.ts`, `src/lib/utils.ts` (inferred via `formatPrice`).
Related modules: Product, ProductVariant, CartItem, Stripe checkout.
Notes: `formatPrice` divides by 100 for display. Stripe `unit_amount` expects cents.

## SKU

Definition: Stock Keeping Unit — a unique string for each ProductVariant.
Where used: `prisma/schema.prisma` model `ProductVariant`.
Related modules: ProductVariant.
Notes: `@unique` in schema.

## React Server Component (RSC)

Definition: Next.js App Router component that renders on the server. Default for files without `'use client'`.
Where used: `src/app/(shop)/page.tsx`, `src/app/(shop)/collections/[slug]/page.tsx`, `src/app/cart/page.tsx`.
Related modules: All page and layout files.
Notes: Can read cookies and access Prisma directly.

## Client Component

Definition: React component that hydrates in the browser, required for state and event handlers. Marked with `'use client'`.
Where used: `src/app/(shop)/products/[slug]/page.tsx`, `src/components/product/add-to-cart-button.tsx`, `src/components/product/variant-selector.tsx`.
Related modules: Interactive UI components.
Notes: Client Components in this repo use `use()` for async params/data promises.

## TBD - needs team confirmation

- Exact meaning of `options` JSON shape for variants.
- Intended public/hosted image domain policy (currently `images.unsplash.com`).
- Whether `add-to-cart-button.tsx` will be wired to the cookie cart or to a server action.

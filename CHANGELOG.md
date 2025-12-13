# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-13

### Added
- Initial project setup with Next.js 15 App Router
- TypeScript strict mode configuration
- Tailwind CSS and shadcn/ui integration
- PostgreSQL database with Prisma ORM
- Product and Collection models
- Homepage with hero, featured collections, and featured products
- Product listing pages with grid layout
- Product detail pages with image gallery and variant selection
- Shopping cart functionality with cookie persistence
- Stripe Checkout integration
- SEO optimization with dynamic metadata and sitemap
- Docker support with multi-stage build
- Responsive design for mobile and desktop
- Loading states and skeleton components
- Error handling and 404 pages
- Health check API endpoint

### Technical Details
- React Server Components by default
- Client Components only for interactivity
- Cookie-based cart for SSR compatibility
- CMS abstraction layer for data flexibility
- Stripe hosted checkout for PCI compliance
- Docker Compose for local development
- Standalone output for Docker deployment

# Next Shop

Modern headless e-commerce built with Next.js App Router, React Server Components, and Stripe.

## Features

- 🛍️ **Modern E-commerce** - Full-featured online shop with products, collections, and cart
- ⚡ **Next.js 15** - App Router with React Server Components
- 🎨 **Beautiful UI** - Built with Tailwind CSS and shadcn/ui components
- 🗄️ **PostgreSQL** - Robust database with Prisma ORM
- 💳 **Stripe Checkout** - Secure payment processing
- 🔍 **SEO Optimized** - Dynamic metadata, sitemap, and structured data
- 📱 **Responsive** - Mobile-first design
- 🐳 **Docker Ready** - Containerized for easy deployment

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payment**: Stripe
- **Deployment**: Docker

## Prerequisites

- Node.js 20+ (or use Docker)
- PostgreSQL (or use Docker)
- Stripe account for payment processing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AkremBelkahla/next-shop.git
cd next-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nextshop
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Start PostgreSQL with Docker

```bash
docker-compose up -d postgres
```

### 5. Run database migrations

```bash
npm run db:migrate
```

### 6. Seed the database

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## Docker Deployment

### Build and run with Docker Compose

```bash
docker-compose up --build
```

This will start both PostgreSQL and the Next.js application.

### Build Docker image only

```bash
docker build -t next-shop .
```

## Project Structure

```
next-shop/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (shop)/            # Shop pages (grouped route)
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   ├── layout/            # Layout components
│   │   ├── home/              # Homepage components
│   │   ├── product/           # Product components
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   ├── prisma.ts          # Prisma client
│   │   ├── stripe.ts          # Stripe client
│   │   ├── cart.ts            # Cart logic
│   │   ├── products.ts        # Product queries
│   │   ├── collections.ts     # Collection queries
│   │   └── seo.ts             # SEO utilities
│   ├── types/                 # TypeScript types
│   └── hooks/                 # Custom React hooks
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── public/                    # Static assets
├── docker-compose.yml         # Docker Compose config
├── Dockerfile                 # Docker image config
└── next.config.ts             # Next.js configuration
```

## Key Features Explained

### Server Components by Default

This project leverages React Server Components for optimal performance. Client Components are only used where interactivity is required (cart, variant selectors, etc.).

### Cookie-based Cart

The shopping cart is persisted using cookies, making it readable on the server for SSR without hydration mismatches.

### CMS Abstraction

The `lib/cms/` folder provides an abstraction layer, making it easy to swap between different data sources (Prisma, Sanity, Payload, etc.).

### Stripe Checkout

Uses Stripe's hosted checkout for PCI compliance and minimal integration complexity.

## Deployment

This application is designed to be deployed on any platform that supports Node.js and Docker:

- **Railway**: Connect your GitHub repo and deploy
- **Render**: Use the Dockerfile for deployment
- **DigitalOcean App Platform**: Deploy with Docker
- **Any VPS**: Use Docker Compose

**Note**: This project does not use Vercel-specific features and can be deployed anywhere.

## Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL`: Your production PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `NEXT_PUBLIC_BASE_URL`: Your production domain

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

---

**Author**: Akrem Belkahla  
**Agency**: InfinityWeb  
**Website**: [InfinityWeb.tn](https://InfinityWeb.tn)

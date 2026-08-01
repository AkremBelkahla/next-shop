# next-shop — Release Policy

## Release Readiness Checklist

Before any production-impacting release:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds (standalone output)
- [ ] `npx prisma generate` runs during build
- [ ] All required environment variables are set for the target environment:
  - `DATABASE_URL`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PUBLISHABLE_KEY`
  - `NEXT_PUBLIC_BASE_URL`
- [ ] Database migrations are generated and committed if `schema.prisma` changed
- [ ] Docker image builds successfully: `docker build -t next-shop .`
- [ ] `docker-compose up` healthcheck passes

## Risk Levels

| Level | Indicators |
|-------|-----------|
| Low | UI-only changes, copy changes, static SEO updates, component styling |
| Medium | New query methods, new API routes, cart logic changes, checkout tweaks |
| High | Schema changes, Stripe flow changes, Dockerfile/Compose changes, environment changes |

## Migration / Config Checklist

- If `prisma/schema.prisma` changed:
  - Generate migration: `npx prisma migrate dev --name <name>`
  - Commit migration SQL files in `prisma/migrations/`
  - Test `npx prisma migrate deploy` in a fresh environment
  - Document rollback: `npx prisma migrate deploy` to previous migration target
- If environment variables changed, document them in the final response.

## Monitoring Checklist

- Health endpoint: `GET /api/health`
- Stripe payment success/cancel pages: `/checkout/success` and `/checkout/cancel`
- Watch Stripe Dashboard for failed sessions after release
- Watch application logs for `Checkout error` or Prisma errors

## Rollback Notes Expectations

Final response must include:

- Previous Docker image tag or commit hash to roll back to
- Database migration rollback command (`npx prisma migrate deploy` to prior migration)
- Environment variables that must remain stable
- Steps to revert the release

## Release Notes Expectations

For each release summarize:

- Changed files / modules
- New or modified environment variables
- Migrations applied
- Risk level
- Verification steps

## Post-Release Validation

- [ ] Home page loads
- [ ] Product page loads for a known slug
- [ ] Cart page loads
- [ ] `POST /api/checkout` with a sample cart returns a Stripe URL
- [ ] `/api/health` reports `healthy`
- [ ] Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) are reachable

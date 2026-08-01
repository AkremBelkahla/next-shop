---
name: frontend-change
description: Use this skill only for frontend/UI changes in next-shop (pages, components, Tailwind, shadcn/ui, SEO, sitemap, robots).
---

# frontend-change Skill

## Purpose

Modify the storefront UI and related frontend logic safely: pages, components, styles, SEO metadata, sitemap, and robots.

## When to Use

- Editing files in `src/app/`, `src/components/`, `src/lib/seo.ts`, `src/lib/utils.ts`
- Changing `src/app/globals.css`
- Adding or changing `src/app/sitemap.ts`, `src/app/robots.ts`
- Adding new shadcn/ui primitives

## Required Docs to Read

- `docs/ai/context.md`
- `docs/ai/coding-standards.md`
- `docs/ai/architecture.md`

## Step-by-Step Workflow

1. Read `docs/ai/context.md` and `docs/ai/coding-standards.md`.
2. Inspect the impacted page/component and nearby related files only.
3. Reuse existing UI primitives from `src/components/ui/`.
4. Keep Server Components by default. Add `'use client'` only for interactivity.
5. Make the smallest change.
6. Run `npm run lint` and `npm run build` if possible.
7. Report if more context is needed.

## Validation Checklist

- [ ] `npm run lint` passes (or reason documented)
- [ ] `npm run build` passes (or reason documented)
- [ ] No unnecessary `'use client'` directives
- [ ] Existing Tailwind / shadcn patterns followed
- [ ] No hardcoded environment values

## Forbidden Actions

- Do not scan the full repo unless needed.
- Do not introduce new CSS methodologies; use Tailwind utilities.
- Do not hardcode customer or environment-specific values.
- Do not change application behavior unless explicitly requested.

## Final Response Format

- Changed files
- What changed
- Tests run
- Tests not run, if any
- Risks
- Rollback notes

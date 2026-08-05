# TODO — next-shop

> Dernière analyse du code : 2026-08-04. Plusieurs « bloqueurs » anciens ont été résolus.

## Bloqueurs (corriger avant release)

- [x] **`AddToCartButton` connecté au panier**
  - Fichier : `src/components/product/add-to-cart-button.tsx`
  - État : utilise `addToCartAction` (Server Action dans `src/app/actions.ts`) qui appelle `addToCart` dans `src/lib/cart.ts`.

- [x] **Page `/checkout` créée**
  - Fichier : `src/app/checkout/page.tsx`
  - État : page présente, utilise `createCheckoutSessionAction` (Server Action) pour rediriger vers Stripe.
  - Reste à faire : tester le flux complet bout-en-bout.

- [x] **Page produit en Server Component avec `notFound()` synchrone**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - État : Server Component, `await params`, `if (!product) notFound()`.

- [x] **Version Stripe**
  - Fichier : `src/lib/stripe.ts`
  - État : plus de version API surchargée ; le SDK utilise sa version par défaut (tous types valides).

## Sécurité

- [ ] **Valider les données du cookie panier**
  - Fichier : `src/lib/cart.ts`
  - Problème : `JSON.parse` sans validation de structure/type. Cookie non signé, non chiffré.
  - Action : ajouter une validation runtime (ex. zod) sur le contenu parsé ; envisager un cookie signé/chiffré (ex. `iron-session`) si manipulation côté client à craindre.

- [ ] **Valider les line_items côté serveur avant Stripe**
  - Fichiers : `src/app/api/checkout/route.ts`, `src/app/actions.ts` (duplication de la logique Stripe)
  - Problème : prix, quantités et titres viennent directement du cookie client sans revérification en base.
  - Action : requêter Prisma pour vérifier l'existence du produit/variant, son stock et son prix réel ; utiliser ces valeurs pour les `line_items`.

- [x] **Ne pas exposer les messages d'erreur bruts**
  - Fichier : `src/app/api/health/route.ts`
  - État : réponse 503 contient uniquement `'Internal error'`, l'erreur est loggée côté serveur.

- [ ] **Duplication de la logique checkout Stripe**
  - Fichiers : `src/app/api/checkout/route.ts` et `src/app/actions.ts` (`createCheckoutSessionAction`)
  - Problème : le code de création de session Stripe est dupliqué ; risque de divergence.
  - Action : extraire une fonction partagée dans `src/lib/` (ex. `src/lib/checkout.ts`) utilisée par les deux.

## Corrections / améliorations

- [x] **Typage de la page produit**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - État : plus de `any`, `ProductWithRelations` utilisé via `PurchasePanel`.

- [x] **`??` au lieu de `||` pour le prix du variant**
  - Fichier : `src/components/product/purchase-panel.tsx`
  - État : `selectedVariant?.price ?? product.price`.

- [x] **Éviter `use()` sur promesse fetchée dans un Client Component**
  - État : la page produit est désormais un Server Component ; le state client est limité à `PurchasePanel`.

- [x] **Uniformiser la devise**
  - Fichiers : `src/lib/constants.ts` (`CURRENCY`, `LOCALE`), `src/lib/utils.ts`, `src/lib/seo.ts`
  - État : constantes centralisées.
  - Attention partielle : `'eur'` reste en dur dans `src/app/api/checkout/route.ts` et `src/app/actions.ts` → remplacer par `CURRENCY_LOWER` importé de `src/lib/constants`.

- [x] **Images dans le panier**
  - Fichier : `src/app/cart/page.tsx`
  - État : `item.image` affichée via `next/image` quand présente.

## Tests / validation

- [x] **`npm run lint`** — passe (2026-08-04).
- [x] **`npm run build`** — passe (2026-08-04) après `export const dynamic = 'force-dynamic'` dans `src/app/sitemap.ts`.
  - Note : le build pré-render toutes les routes produit/collection via Prisma ; il reste dépendant d'une base PostgreSQL accessible au moment du build pour les pages statiques (`/`, `/collections`, `/products/[slug]`…). Sans DB, le build échoue malgré le sitemap dynamique.
  - En CI/CD, il faudra soit une DB de build, soit migrer vers `generateStaticParams`/rendu dynamique complet.
- [ ] **Tester manuellement :**
  - ajout au panier (vérifier cookie après clic)
  - affichage du panier (quantité, prix, image)
  - bouton checkout → page `/checkout` → redirection Stripe
  - retour Stripe : `/checkout/success` et `/checkout/cancel`
  - page produit inexistante → 404
  - variant out of stock → bouton désactivé
- [ ] **Base de données** : `prisma db push` / `migrate` + `db:seed` sur un environnement local, vérifier que `DATABASE_URL` pointe sur une instance up (le lint passe mais les routes DB n'ont pas été exercées).

## Documentation / repo

- [x] **`.env.example`** créé avec `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_BASE_URL`.
- [ ] **Décider si le framework IA (`AGENTS.md`, `CLAUDE.md`, `docs/ai/`, `.agents/`) doit être versionné ou ignoré**.
- [ ] **Compléter les éléments TBD identifiés dans `docs/ai/`** (forme JSON `options`, politique d'images, etc.).
- [ ] **Sections « Final Response / Work Rules » dupliquées** entre `AGENTS.md` et `CLAUDE.md` — envisager une source unique (ex. `CLAUDE.md` → lien vers `AGENTS.md`).

## Basse priorité

- [ ] Supprimer le stockage du prix dans le cookie panier (`CartItem.price`) une fois la validation serveur en place — le prix doit venir de la DB au moment du checkout.
- [ ] Ajouter une suite de tests unitaires (Vitest) et/ou E2E (Playwright) — critique pour un e-commerce.
- [ ] Ajouter un pipeline CI/CD (lint + build).
- [ ] Ajouter rate limiting sur `/api/checkout`.
- [ ] Restreindre l'accès à `/api/health` si nécessaire.
- [ ] Piste d'évolution : incrémenter/décrémenter la quantité et supprimer un article depuis la page panier (les helpers `updateQuantity`, `removeFromCart` existent dans `src/lib/cart.ts` mais ne sont exposés par aucune Server Action ni UI).

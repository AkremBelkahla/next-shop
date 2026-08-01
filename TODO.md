# TODO — next-shop

## Bloqueurs (corriger avant release)

- [ ] **`AddToCartButton` ne met pas à jour le panier**
  - Fichier : `src/components/product/add-to-cart-button.tsx`
  - Problème : ne fait qu'un `console.log` et une pause de 500 ms. Le cookie panier n'est jamais modifié.
  - Action : connecter `handleAddToCart` à `addToCart` via Server Action ou route API.

- [ ] **Page `/checkout` inexistante**
  - Fichier : `src/app/cart/page.tsx`
  - Problème : le bouton "Proceed to Checkout" redirige vers `/checkout`, mais seuls `/checkout/success` et `/checkout/cancel` existent.
  - Action : créer `src/app/checkout/page.tsx` ou modifier le lien pour rediriger directement vers Stripe via `POST /api/checkout`.

- [ ] **`notFound()` appelé dans une callback asynchrone**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - Problème : `notFound()` est appelé dans `.then()` de `use(...)`. Il doit être lancé de manière synchrone pendant le rendu.
  - Action : transformer la page en Server Component et utiliser `await params` + `if (!product) notFound()`.

- [ ] **Version Stripe probablement invalide**
  - Fichier : `src/lib/stripe.ts`
  - Problème : `apiVersion: '2025-11-17.clover'` n'est pas un format reconnu par Stripe.
  - Action : remplacer par une version API valide, ex. `2025-01-27.acacia`.

## Sécurité

- [ ] **Valider les données du cookie panier**
  - Fichier : `src/lib/cart.ts`
  - Problème : `JSON.parse` sans validation. Le contenu du cookie n'est ni signé, ni chiffré.
  - Action : ajouter une validation de type (`CartItem`) et signer/chiffrer le cookie si possible.

- [ ] **Valider les line_items côté serveur avant Stripe**
  - Fichier : `src/app/api/checkout/route.ts`
  - Problème : les prix, quantités et produits viennent directement du cookie client sans vérification en base.
  - Action : requêter Prisma pour vérifier l'existence, le stock et le prix réel des variants.

- [ ] **Ne pas exposer les messages d'erreur bruts**
  - Fichier : `src/app/api/health/route.ts`
  - Problème : `error.message` est renvoyé dans la réponse publique.
  - Action : logger l'erreur côté serveur et renvoyer un message générique.

## Corrections / améliorations

- [ ] **Typer correctement `product` dans la page produit**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - Problème : `useState<any>` et `v: any` contournent TypeScript.
  - Action : utiliser `ProductWithRelations` partout.

- [ ] **Utiliser `??` au lieu de `||` pour le prix du variant**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - Problème : `selectedVariant?.price || product.price` fallback si le prix est `0`.
  - Action : remplacer par `selectedVariant?.price ?? product.price`.

- [ ] **Éviter `use()` sur une promesse fetchée dans un Client Component**
  - Fichier : `src/app/(shop)/products/[slug]/page.tsx`
  - Problème : pattern fragile et non recommandé.
  - Action : passer par un Server Component ou utiliser `useEffect` + `useState` proprement.

- [ ] **Uniformiser la devise**
  - Fichiers : `src/lib/seo.ts`, `src/lib/utils.ts`, `src/app/api/checkout/route.ts`
  - Problème : `eur` minuscule dans Stripe, `EUR` ailleurs, `fr-FR` forcé dans `formatPrice`.
  - Action : centraliser la devise et la locale dans des constantes ou variables d'environnement.

- [ ] **Ajouter des images dans le panier**
  - Fichier : `src/app/cart/page.tsx`
  - Problème : les images des articles du panier ne sont pas affichées (placeholder `bg-muted`).
  - Action : afficher `item.image` ou la première image du produit.

## Tests / validation

- [ ] **Exécuter `npm run lint` après `npm install`**
- [ ] **Exécuter `npm run build` et valider le build standalone**
- [ ] **Tester manuellement :**
  - ajout au panier
  - affichage du panier
  - bouton checkout
  - création de session Stripe
  - page produit inexistante
  - variant out of stock

## Documentation / repo

- [ ] **Créer `.env.example`** avec `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_BASE_URL`.
- [ ] **Décider si le framework IA (`AGENTS.md`, `CLAUDE.md`, `docs/ai/`, `.agents/`) doit être versionné ou ignoré**.
- [ ] **Compléter les éléments TBD identifiés dans `docs/ai/`** (forme JSON `options`, politique d'images, etc.).

## Basse priorité

- [ ] Ajouter une suite de tests unitaires (Jest/Vitest) et/ou E2E (Playwright).
- [ ] Ajouter un pipeline CI/CD (lint + build).
- [ ] Ajouter rate limiting sur `/api/checkout`.
- [ ] Restreindre l'accès à `/api/health` si nécessaire.

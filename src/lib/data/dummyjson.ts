import type {
  Collection,
  Product,
  ProductDimensions,
  ProductImage,
  ProductReview,
  ProductVariant,
  ProductWithRelations,
} from '@/types/product'

/* -------------------------------------------------------------------------- */
/*  DummyJSON API types                                                        */
/* -------------------------------------------------------------------------- */

const API_BASE = 'https://dummyjson.com'

interface DummyJsonDimensions {
  width: number
  height: number
  depth: number
}

interface DummyJsonReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

interface DummyJsonProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: DummyJsonDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: DummyJsonReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  images: string[]
}

interface DummyJsonCategory {
  slug: string
  name: string
  url: string
}

interface DummyJsonProductsResponse {
  products: DummyJsonProduct[]
  total: number
  skip: number
  limit: number
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toCents(price: number): number {
  return Math.round(price * 100)
}

function compareAtPrice(price: number, discount: number): number | null {
  if (!discount || discount <= 0) return null
  return Math.round((price / (1 - discount / 100)) * 100)
}

/* -------------------------------------------------------------------------- */
/*  Category → Collection mapping                                              */
/* -------------------------------------------------------------------------- */

const FEATURED_CATEGORIES = new Set([
  'beauty',
  'fragrances',
  'mens-shirts',
  'womens-bags',
  'sunglasses',
  'womens-watches',
])

// Unsplash images for category headers (dummyjson has no category images)
const CATEGORY_IMAGES: Record<string, string> = {
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80',
  fragrances: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80',
  furniture: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80',
  groceries: 'https://images.unsplash.com/photo-1542838132-25c8709e43bc?w=1600&q=80',
  'home-decoration': 'https://images.unsplash.com/photo-1513519245088-0e12902e3556?w=1600&q=80',
  'kitchen-accessories': 'https://images.unsplash.com/photo-1556909114-f6e9ad8d3b6b?w=1600&q=80',
  laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&q=80',
  'mens-shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
  'mens-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80',
  'mens-watches': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=80',
  'mobile-accessories': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600&q=80',
  motorcycle: 'https://images.unsplash.com/photo-1558981806-ec5c4d8c33e3?w=1600&q=80',
  'skin-care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
  smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=80',
  'sports-accessories': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80',
  sunglasses: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&q=80',
  tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc3b0?w=1600&q=80',
  tops: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=1600&q=80',
  vehicle: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
  'womens-bags': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1600&q=80',
  'womens-dresses': 'https://images.unsplash.com/photo-15391092361195367e51e9d6a3a00a44f?w=1600&q=80',
  'womens-jewellery': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80',
  'womens-shoes': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&q=80',
  'womens-watches': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1600&q=80',
}

let collectionsCache: Collection[] | null = null
let productsCache: ProductWithRelations[] | null = null

/* -------------------------------------------------------------------------- */
/*  Parent category grouping                                                   */
/* -------------------------------------------------------------------------- */

export interface CollectionGroup {
  parent: string
  collections: Collection[]
}

// Group the 24 dummyjson categories into logical parent categories
const PARENT_CATEGORIES: { name: string; slugs: string[] }[] = [
  {
    name: 'Beauty & Care',
    slugs: ['beauty', 'fragrances', 'skin-care'],
  },
  {
    name: "Men's Fashion",
    slugs: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  },
  {
    name: "Women's Fashion",
    slugs: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
  },
  {
    name: 'Electronics',
    slugs: ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
  },
  {
    name: 'Home & Living',
    slugs: ['furniture', 'groceries', 'home-decoration', 'kitchen-accessories'],
  },
  {
    name: 'Sports & Vehicles',
    slugs: ['sports-accessories', 'motorcycle', 'vehicle'],
  },
  {
    name: 'Accessories',
    slugs: ['sunglasses', 'tops'],
  },
]

/* -------------------------------------------------------------------------- */
/*  Fetch + map collections                                                    */
/* -------------------------------------------------------------------------- */

async function fetchCollections(): Promise<Collection[]> {
  if (collectionsCache) return collectionsCache

  const res = await fetch(`${API_BASE}/products/categories`)
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)

  const categories: DummyJsonCategory[] = await res.json()
  const now = new Date()

  collectionsCache = categories.map((cat, index) => ({
    id: `col_${cat.slug}`,
    slug: cat.slug,
    title: cat.name,
    description: `Browse our ${cat.name.toLowerCase()} collection`,
    image: CATEGORY_IMAGES[cat.slug] ?? null,
    featured: FEATURED_CATEGORIES.has(cat.slug),
    createdAt: new Date(now.getTime() - index * 1000),
    updatedAt: now,
  }))

  return collectionsCache
}

/* -------------------------------------------------------------------------- */
/*  Fetch + map products                                                       */
/* -------------------------------------------------------------------------- */

function mapProduct(
  p: DummyJsonProduct,
  collection: Collection | undefined
): ProductWithRelations {
  const createdAt = new Date(p.meta.createdAt)
  const updatedAt = new Date(p.meta.updatedAt)

  const dimensions: ProductDimensions = {
    width: p.dimensions.width,
    height: p.dimensions.height,
    depth: p.dimensions.depth,
  }

  const reviews: ProductReview[] = p.reviews.map((r) => ({
    rating: r.rating,
    comment: r.comment,
    date: r.date,
    reviewerName: r.reviewerName,
    reviewerEmail: r.reviewerEmail,
  }))

  const baseProduct: Product = {
    id: String(p.id),
    slug: slugify(p.title),
    title: p.title,
    description: p.description,
    price: toCents(p.price),
    compareAtPrice: compareAtPrice(p.price, p.discountPercentage),
    featured: p.rating >= 4.5,
    createdAt,
    updatedAt,
    brand: p.brand ?? null,
    rating: p.rating,
    stock: p.stock,
    tags: p.tags,
    weight: p.weight,
    dimensions,
    warrantyInformation: p.warrantyInformation,
    shippingInformation: p.shippingInformation,
    availabilityStatus: p.availabilityStatus,
    returnPolicy: p.returnPolicy,
    minimumOrderQuantity: p.minimumOrderQuantity,
    barcode: p.meta.barcode,
    reviews,
  }

  const images: ProductImage[] = [
    {
      id: `img_${p.id}_0`,
      productId: String(p.id),
      url: p.thumbnail,
      alt: `${p.title} - Thumbnail`,
      position: 0,
    },
    ...p.images.map((url, index): ProductImage => ({
      id: `img_${p.id}_${index + 1}`,
      productId: String(p.id),
      url,
      alt: `${p.title} - Image ${index + 1}`,
      position: index + 1,
    })),
  ]

  const variants: ProductVariant[] = [
    {
      id: `var_${p.id}_default`,
      productId: String(p.id),
      title: 'Default',
      sku: p.sku,
      price: toCents(p.price),
      inventory: p.stock,
      options: p.brand ? { brand: p.brand } : null,
    },
  ]

  return {
    ...baseProduct,
    images,
    variants,
    collections: collection ? [collection] : [],
  }
}

async function fetchAllProducts(): Promise<ProductWithRelations[]> {
  if (productsCache) return productsCache

  const limit = 100
  let skip = 0
  let total = Infinity
  const all: DummyJsonProduct[] = []

  while (skip < total) {
    const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`)
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)

    const data: DummyJsonProductsResponse = await res.json()
    total = data.total
    all.push(...data.products)
    skip += limit
  }

  const collections = await fetchCollections()
  const collectionMap = new Map(collections.map((c) => [c.slug, c]))

  productsCache = all.map((p) => mapProduct(p, collectionMap.get(p.category)))

  return productsCache
}

// Fetch products for a single category using the dedicated API endpoint
// https://dummyjson.com/docs/products#products-by-category
async function fetchProductsByCategory(
  categorySlug: string
): Promise<ProductWithRelations[]> {
  const res = await fetch(`${API_BASE}/products/category/${categorySlug}`)
  if (!res.ok) throw new Error(`Failed to fetch category products: ${res.status}`)

  const data: DummyJsonProductsResponse = await res.json()
  const collections = await fetchCollections()
  const collection = collections.find((c) => c.slug === categorySlug)

  return data.products.map((p) => mapProduct(p, collection))
}

/* -------------------------------------------------------------------------- */
/*  Public API — matches the existing products.ts / collections.ts interface   */
/* -------------------------------------------------------------------------- */

export async function getDummyProducts(options?: {
  featured?: boolean
  collectionSlug?: string
  limit?: number
  offset?: number
}): Promise<ProductWithRelations[]> {
  const { featured, collectionSlug, limit, offset } = options ?? {}

  let results = (await fetchAllProducts()).filter((product) => {
    if (featured !== undefined && product.featured !== featured) {
      return false
    }
    if (
      collectionSlug &&
      !product.collections.some((c) => c.slug === collectionSlug)
    ) {
      return false
    }
    return true
  })

  results = [...results].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  if (offset) {
    results = results.slice(offset)
  }
  if (limit) {
    results = results.slice(0, limit)
  }

  return results
}

export async function getDummyProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  const products = await fetchAllProducts()
  const product = products.find((p) => p.slug === slug)
  if (!product) return null

  return {
    ...product,
    images: [...product.images].sort((a, b) => a.position - b.position),
  }
}

export async function getDummyFeaturedProducts(
  limit: number = 6
): Promise<ProductWithRelations[]> {
  return getDummyProducts({ featured: true, limit })
}

export async function searchDummyProducts(
  query: string
): Promise<ProductWithRelations[]> {
  const lowerQuery = query.toLowerCase()
  const products = await fetchAllProducts()

  return products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 20)
}

export async function getDummyRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductWithRelations[]> {
  const products = await fetchAllProducts()
  const product = products.find((p) => p.id === productId)

  if (!product || product.collections.length === 0) {
    return []
  }

  const collectionIds = new Set(product.collections.map((c) => c.id))

  return products
    .filter(
      (p) =>
        p.id !== productId && p.collections.some((c) => collectionIds.has(c.id))
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export async function getDummyCollections(options?: {
  featured?: boolean
}): Promise<Collection[]> {
  const { featured } = options ?? {}
  const collections = await fetchCollections()

  return collections
    .filter((c) => featured === undefined || c.featured === featured)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getDummyCollectionBySlug(
  slug: string
): Promise<(Collection & { products: ProductWithRelations[] }) | null> {
  const collections = await fetchCollections()
  const collection = collections.find((c) => c.slug === slug)

  if (!collection) return null

  const products = (await fetchProductsByCategory(slug)).map((product) => ({
    ...product,
    images: [...product.images].sort((a, b) => a.position - b.position),
  }))

  return { ...collection, products }
}

export async function getDummyFeaturedCollections(
  limit: number = 3
): Promise<Collection[]> {
  const collections = await fetchCollections()
  return collections
    .filter((c) => c.featured)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export async function getDummyGroupedCollections(): Promise<CollectionGroup[]> {
  const collections = await fetchCollections()
  const collectionMap = new Map(collections.map((c) => [c.slug, c]))

  return PARENT_CATEGORIES.map((group) => ({
    parent: group.name,
    collections: group.slugs
      .map((slug) => collectionMap.get(slug))
      .filter((c): c is Collection => c !== undefined),
  })).filter((group) => group.collections.length > 0)
}

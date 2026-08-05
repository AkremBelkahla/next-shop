import { productsData } from './data/seed-data'
import type { ProductWithRelations } from '@/types/product'

function sortByImagePosition(
  product: ProductWithRelations
): ProductWithRelations {
  return {
    ...product,
    images: [...product.images].sort((a, b) => a.position - b.position),
  }
}

function sortByCreatedAtDesc(
  products: ProductWithRelations[]
): ProductWithRelations[] {
  return [...products].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )
}

export async function getProducts(options?: {
  featured?: boolean
  collectionSlug?: string
  limit?: number
  offset?: number
}): Promise<ProductWithRelations[]> {
  const { featured, collectionSlug, limit, offset } = options ?? {}

  let results = productsData.filter((product) => {
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

  results = sortByCreatedAtDesc(results).map(sortByImagePosition)

  if (offset) {
    results = results.slice(offset)
  }
  if (limit) {
    results = results.slice(0, limit)
  }

  return results
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  const product = productsData.find((p) => p.slug === slug)
  return product ? sortByImagePosition(product) : null
}

export async function getFeaturedProducts(
  limit: number = 6
): Promise<ProductWithRelations[]> {
  return getProducts({ featured: true, limit })
}

export async function searchProducts(
  query: string
): Promise<ProductWithRelations[]> {
  const lowerQuery = query.toLowerCase()

  const results = productsData.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
  )

  return sortByCreatedAtDesc(results).map(sortByImagePosition).slice(0, 20)
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductWithRelations[]> {
  const product = productsData.find((p) => p.id === productId)

  if (!product || product.collections.length === 0) {
    return []
  }

  const collectionIds = new Set(product.collections.map((c) => c.id))

  const results = productsData.filter(
    (p) =>
      p.id !== productId && p.collections.some((c) => collectionIds.has(c.id))
  )

  return sortByCreatedAtDesc(results).map(sortByImagePosition).slice(0, limit)
}

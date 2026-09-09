import {
  getDummyProducts,
  getDummyProductBySlug,
  searchDummyProducts,
  getDummyRelatedProducts,
} from './data/dummyjson'
import type { ProductWithRelations } from '@/types/product'

function sortByImagePosition(
  product: ProductWithRelations
): ProductWithRelations {
  return {
    ...product,
    images: [...product.images].sort((a, b) => a.position - b.position),
  }
}

export async function getProducts(options?: {
  featured?: boolean
  collectionSlug?: string
  limit?: number
  offset?: number
}): Promise<ProductWithRelations[]> {
  const results = await getDummyProducts(options)
  return results.map(sortByImagePosition)
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  const product = await getDummyProductBySlug(slug)
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
  const results = await searchDummyProducts(query)
  return results.map(sortByImagePosition)
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductWithRelations[]> {
  const results = await getDummyRelatedProducts(productId, limit)
  return results.map(sortByImagePosition)
}

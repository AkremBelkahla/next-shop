import { collectionsData, productsData } from './data/seed-data'
import type { Collection, CollectionWithProducts } from '@/types/product'

function sortByCreatedAtDesc(collections: Collection[]): Collection[] {
  return [...collections].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )
}

export async function getCollections(options?: {
  featured?: boolean
}): Promise<Collection[]> {
  const { featured } = options ?? {}

  const results = collectionsData.filter(
    (collection) => featured === undefined || collection.featured === featured
  )

  return sortByCreatedAtDesc(results)
}

export async function getCollectionBySlug(
  slug: string
): Promise<CollectionWithProducts | null> {
  const collection = collectionsData.find((c) => c.slug === slug)

  if (!collection) {
    return null
  }

  const products = productsData
    .filter((product) => product.collections.some((c) => c.slug === slug))
    .map((product) => ({
      ...product,
      images: [...product.images].sort((a, b) => a.position - b.position),
    }))

  return { ...collection, products }
}

export async function getFeaturedCollections(
  limit: number = 3
): Promise<Collection[]> {
  const results = collectionsData.filter((c) => c.featured)
  return sortByCreatedAtDesc(results).slice(0, limit)
}

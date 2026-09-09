import {
  getDummyCollections,
  getDummyCollectionBySlug,
  getDummyFeaturedCollections,
} from './data/dummyjson'
import type { Collection, CollectionWithProducts } from '@/types/product'

export async function getCollections(options?: {
  featured?: boolean
}): Promise<Collection[]> {
  return getDummyCollections(options)
}

export async function getCollectionBySlug(
  slug: string
): Promise<CollectionWithProducts | null> {
  return getDummyCollectionBySlug(slug)
}

export async function getFeaturedCollections(
  limit: number = 3
): Promise<Collection[]> {
  return getDummyFeaturedCollections(limit)
}

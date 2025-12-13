import { prisma } from './prisma'
import type { CollectionWithProducts } from '@/types/product'

export async function getCollections(options?: {
  featured?: boolean
}) {
  const { featured } = options ?? {}

  return prisma.collection.findMany({
    where: {
      ...(featured !== undefined && { featured }),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getCollectionBySlug(
  slug: string
): Promise<CollectionWithProducts | null> {
  return prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          images: {
            orderBy: {
              position: 'asc',
            },
          },
          variants: true,
          collections: true,
        },
      },
    },
  })
}

export async function getFeaturedCollections(
  limit: number = 3
) {
  return prisma.collection.findMany({
    where: {
      featured: true,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

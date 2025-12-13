import { prisma } from './prisma'
import type { ProductWithRelations } from '@/types/product'

export async function getProducts(options?: {
  featured?: boolean
  collectionSlug?: string
  limit?: number
  offset?: number
}): Promise<ProductWithRelations[]> {
  const { featured, collectionSlug, limit, offset } = options ?? {}

  return prisma.product.findMany({
    where: {
      ...(featured !== undefined && { featured }),
      ...(collectionSlug && {
        collections: {
          some: {
            slug: collectionSlug,
          },
        },
      }),
    },
    include: {
      images: {
        orderBy: {
          position: 'asc',
        },
      },
      variants: true,
      collections: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    ...(limit && { take: limit }),
    ...(offset && { skip: offset }),
  })
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: {
          position: 'asc',
        },
      },
      variants: true,
      collections: true,
    },
  })
}

export async function getFeaturedProducts(
  limit: number = 6
): Promise<ProductWithRelations[]> {
  return getProducts({ featured: true, limit })
}

export async function searchProducts(
  query: string
): Promise<ProductWithRelations[]> {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      images: {
        orderBy: {
          position: 'asc',
        },
      },
      variants: true,
      collections: true,
    },
    take: 20,
  })
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductWithRelations[]> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      collections: true,
    },
  })

  if (!product || product.collections.length === 0) {
    return []
  }

  return prisma.product.findMany({
    where: {
      id: {
        not: productId,
      },
      collections: {
        some: {
          id: {
            in: product.collections.map((c: { id: string }) => c.id),
          },
        },
      },
    },
    include: {
      images: {
        orderBy: {
          position: 'asc',
        },
      },
      variants: true,
      collections: true,
    },
    take: limit,
  })
}

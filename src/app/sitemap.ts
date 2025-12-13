import { MetadataRoute } from 'next'
import { cms } from '@/lib/cms'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await cms.products.getAll()
  const collections = await cms.collections.getAll()

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const collectionUrls = collections.map((collection: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: collection.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...collectionUrls,
    ...productUrls,
  ]
}

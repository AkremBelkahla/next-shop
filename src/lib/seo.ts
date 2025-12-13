import type { Metadata } from 'next'
import type { ProductWithRelations, CollectionWithProducts } from '@/types/product'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export function generateProductMetadata(product: ProductWithRelations): Metadata {
  const firstImage = product.images[0]
  const price = product.price / 100

  return {
    title: `${product.title} | Next Shop`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      type: 'website',
      url: `${baseUrl}/products/${product.slug}`,
      images: firstImage
        ? [
            {
              url: firstImage.url,
              width: 800,
              height: 800,
              alt: firstImage.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description.substring(0, 160),
      images: firstImage ? [firstImage.url] : [],
    },
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'EUR',
    },
  }
}

export function generateCollectionMetadata(
  collection: CollectionWithProducts
): Metadata {
  return {
    title: `${collection.title} | Next Shop`,
    description: collection.description || `Shop ${collection.title} collection`,
    openGraph: {
      title: collection.title,
      description: collection.description || `Shop ${collection.title} collection`,
      type: 'website',
      url: `${baseUrl}/collections/${collection.slug}`,
      images: collection.image
        ? [
            {
              url: collection.image,
              width: 800,
              height: 600,
              alt: collection.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.title,
      description: collection.description || `Shop ${collection.title} collection`,
      images: collection.image ? [collection.image] : [],
    },
  }
}

export function generateProductJsonLd(product: ProductWithRelations) {
  const firstImage = product.images[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: firstImage?.url,
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toString(),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/products/${product.slug}`,
    },
  }
}

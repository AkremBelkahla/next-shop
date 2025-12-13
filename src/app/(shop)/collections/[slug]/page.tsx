import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { ProductGrid } from '@/components/product/product-grid'
import { cms } from '@/lib/cms'
import { generateCollectionMetadata } from '@/lib/seo'

interface CollectionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await cms.collections.getBySlug(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return generateCollectionMetadata(collection)
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await cms.collections.getBySlug(slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{collection.title}</h1>
          {collection.description && (
            <p className="mt-4 text-lg text-muted-foreground">{collection.description}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {collection.products.length} {collection.products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <ProductGrid products={collection.products} />
      </Container>
    </div>
  )
}

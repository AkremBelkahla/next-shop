import { Container } from '@/components/ui/container'
import { ProductGrid } from './product-grid'
import { cms } from '@/lib/cms'

interface RelatedProductsProps {
  productId: string
}

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const products = await cms.products.getRelated(productId, 4)

  if (products.length === 0) {
    return null
  }

  return (
    <section className="border-t py-16 md:py-24">
      <Container>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">You May Also Like</h2>
        <ProductGrid products={products} />
      </Container>
    </section>
  )
}

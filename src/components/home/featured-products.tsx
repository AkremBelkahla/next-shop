import { Container } from '@/components/ui/container'
import { ProductGrid } from '@/components/product/product-grid'
import { cms } from '@/lib/cms'

export async function FeaturedProducts() {
  const products = await cms.products.getFeatured(8)

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Handpicked favorites from our collection
          </p>
        </div>

        <ProductGrid products={products} />
      </Container>
    </section>
  )
}

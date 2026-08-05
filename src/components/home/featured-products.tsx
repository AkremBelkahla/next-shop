import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { ProductGrid } from '@/components/product/product-grid'
import { cms } from '@/lib/cms'

export async function FeaturedProducts() {
  const products = await cms.products.getFeatured(8)

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Featured Products"
          description="Handpicked favorites from our collection"
        />

        <ProductGrid products={products} />
      </Container>
    </section>
  )
}

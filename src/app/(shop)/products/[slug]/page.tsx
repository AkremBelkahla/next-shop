import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { ProductImages } from '@/components/product/product-images'
import { ProductInfo } from '@/components/product/product-info'
import { PurchasePanel } from '@/components/product/purchase-panel'
import { Separator } from '@/components/ui/separator'
import { cms } from '@/lib/cms'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await cms.products.getBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ProductImages images={product.images} productTitle={product.title} />

          <div className="space-y-6">
            <ProductInfo product={product} />

            <Separator />

            <PurchasePanel product={product} />
          </div>
        </div>
      </Container>
    </div>
  )
}

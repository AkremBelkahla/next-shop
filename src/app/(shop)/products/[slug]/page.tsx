import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ProductImages } from '@/components/product/product-images'
import { ProductInfo } from '@/components/product/product-info'
import { PurchasePanel } from '@/components/product/purchase-panel'
import { TrustBadges } from '@/components/product/trust-badges'
import { ProductDetailsAccordion } from '@/components/product/product-details-accordion'
import { RelatedProducts } from '@/components/product/related-products'
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

  const primaryCollection = product.collections[0]

  return (
    <div className="py-8 md:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            ...(primaryCollection
              ? [
                  {
                    label: primaryCollection.title,
                    href: `/collections/${primaryCollection.slug}`,
                  },
                ]
              : []),
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
          <ProductImages images={product.images} productTitle={product.title} />

          <div className="space-y-6">
            <ProductInfo product={product} />

            <Separator />

            <PurchasePanel product={product} />

            <TrustBadges product={product} />

            <ProductDetailsAccordion product={product} />
          </div>
        </div>
      </Container>

      <RelatedProducts productId={product.id} />
    </div>
  )
}

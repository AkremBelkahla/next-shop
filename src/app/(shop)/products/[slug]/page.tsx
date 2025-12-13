'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { ProductImages } from '@/components/product/product-images'
import { ProductInfo } from '@/components/product/product-info'
import { VariantSelector } from '@/components/product/variant-selector'
import { AddToCartButton } from '@/components/product/add-to-cart-button'
import { Separator } from '@/components/ui/separator'
import { cms } from '@/lib/cms'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const [product, setProduct] = useState<any>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  use(
    cms.products.getBySlug(slug).then((data) => {
      if (!data) {
        notFound()
      }
      setProduct(data)
      if (data.variants.length > 0) {
        setSelectedVariantId(data.variants[0]?.id || null)
      }
      setIsLoading(false)
    })
  )

  if (isLoading) {
    return (
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square w-full animate-pulse bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse bg-muted rounded" />
              <div className="h-6 w-1/4 animate-pulse bg-muted rounded" />
              <div className="h-24 w-full animate-pulse bg-muted rounded" />
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const selectedVariant = product.variants.find(
    (v: any) => v.id === selectedVariantId
  )
  const price = selectedVariant?.price || product.price
  const firstImage = product.images[0]

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ProductImages images={product.images} productTitle={product.title} />

          <div className="space-y-6">
            <ProductInfo product={product} />

            <Separator />

            {product.variants.length > 0 && (
              <>
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onVariantChange={setSelectedVariantId}
                />
                <Separator />
              </>
            )}

            <AddToCartButton
              productId={product.id}
              productTitle={product.title}
              price={price}
              image={firstImage?.url}
              variantId={selectedVariantId || undefined}
              variantTitle={selectedVariant?.title}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

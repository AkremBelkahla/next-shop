'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { VariantSelector } from '@/components/product/variant-selector'
import { AddToCartButton } from '@/components/product/add-to-cart-button'
import type { ProductWithRelations } from '@/types/product'

interface PurchasePanelProps {
  product: ProductWithRelations
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null
  )

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)
  const price = selectedVariant?.price ?? product.price
  const outOfStock =
    product.variants.length > 0 &&
    selectedVariant !== undefined &&
    selectedVariant.inventory === 0

  return (
    <>
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
        image={product.images[0]?.url}
        variantId={selectedVariantId ?? undefined}
        variantTitle={selectedVariant?.title}
        disabled={outOfStock}
      />
    </>
  )
}

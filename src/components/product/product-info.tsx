import { Price } from '@/components/ui/price'
import { BadgeSale } from '@/components/ui/badge-sale'
import type { ProductWithRelations } from '@/types/product'

interface ProductInfoProps {
  product: ProductWithRelations
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          {hasDiscount && <BadgeSale />}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.title}</h1>
        <Price
          amount={product.price}
          compareAtAmount={product.compareAtPrice}
          className="mt-4 text-2xl"
        />
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-muted-foreground">{product.description}</p>
      </div>
    </div>
  )
}

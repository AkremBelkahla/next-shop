import { Price } from '@/components/ui/price'
import { BadgeSale } from '@/components/ui/badge-sale'
import { BadgeNew } from '@/components/ui/badge-new'
import type { ProductWithRelations } from '@/types/product'

interface ProductInfoProps {
  product: ProductWithRelations
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const isNew = new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          {hasDiscount && <BadgeSale />}
          {isNew && <BadgeNew />}
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

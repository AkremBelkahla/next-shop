import { Star, Package } from 'lucide-react'
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
          {product.availabilityStatus && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              <Package className="h-3 w-3" />
              {product.availabilityStatus}
            </span>
          )}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.title}</h1>

        <div className="mt-2 flex items-center gap-3">
          {product.brand && (
            <span className="text-sm font-medium text-muted-foreground">
              by {product.brand}
            </span>
          )}
          {product.rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews?.length ?? 0} review{(product.reviews?.length ?? 0) !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>

        <Price
          amount={product.price}
          compareAtAmount={product.compareAtPrice}
          className="mt-4 text-2xl"
        />
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      {(product.tags?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags!.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

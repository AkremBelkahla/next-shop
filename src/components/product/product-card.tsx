import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Price } from '@/components/ui/price'
import { BadgeSale } from '@/components/ui/badge-sale'
import type { ProductWithRelations } from '@/types/product'

interface ProductCardProps {
  product: ProductWithRelations
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0]
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
          {hasDiscount && (
            <div className="absolute right-2 top-2">
              <BadgeSale />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">{product.title}</h3>
          <Price
            amount={product.price}
            compareAtAmount={product.compareAtPrice}
            className="mt-2"
          />
        </div>
      </Card>
    </Link>
  )
}

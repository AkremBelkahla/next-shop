'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { BadgeSale } from '@/components/ui/badge-sale'
import { addToCartAction } from '@/app/actions'
import { useCart } from '@/components/cart/cart-provider'
import type { ProductWithRelations } from '@/types/product'

interface ProductCardProps {
  product: ProductWithRelations
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0]
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const { setCart, openCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  async function handleQuickAdd(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    setIsAdding(true)
    try {
      const updatedCart = await addToCartAction({
        productId: product.id,
        quantity: 1,
        price: product.price,
        title: product.title,
        image: firstImage?.url,
      })
      setCart(updatedCart)
      openCart()
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="gap-0 overflow-hidden rounded-none border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
          {hasDiscount && (
            <div className="absolute left-2 top-2">
              <BadgeSale />
            </div>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="absolute inset-x-2 bottom-2 translate-y-2 cursor-pointer gap-2 rounded-full opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {isAdding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ShoppingBag className="h-3.5 w-3.5" />
            )}
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
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

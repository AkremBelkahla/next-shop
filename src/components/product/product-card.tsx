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
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.alt}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
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
            size="icon"
            aria-label="Add to cart"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="absolute bottom-3 right-3 h-9 w-9 translate-y-2 rounded-full bg-primary text-primary-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 disabled:opacity-100"
          >
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
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

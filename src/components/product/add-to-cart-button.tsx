'use client'

import { useState } from 'react'
import { ShoppingCart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCartAction } from '@/app/actions'

interface AddToCartButtonProps {
  productId: string
  productTitle: string
  price: number
  image?: string
  variantId?: string
  variantTitle?: string
  disabled?: boolean
}

export function AddToCartButton({
  productId,
  productTitle,
  price,
  image,
  variantId,
  variantTitle,
  disabled,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCartAction({
        productId,
        variantId,
        quantity,
        price,
        title: productTitle,
        image,
        variant: variantTitle ? { title: variantTitle } : undefined,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={isLoading || disabled}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  )
}

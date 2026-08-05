'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart/cart-provider'

export function CartButton() {
  const { cart, openCart } = useCart()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="Open cart"
      onClick={openCart}
    >
      <ShoppingBag className="h-5 w-5" />
      {cart.itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
          {cart.itemCount}
        </span>
      )}
    </Button>
  )
}

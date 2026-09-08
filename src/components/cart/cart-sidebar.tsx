'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { removeFromCartAction, updateQuantityAction } from '@/app/actions'
import { useCart } from './cart-provider'

export function CartSidebar() {
  const { cart, isOpen, closeCart, setCart } = useCart()
  const [isPending, startTransition] = useTransition()

  function handleRemove(productId: string, variantId?: string) {
    startTransition(async () => {
      const updated = await removeFromCartAction(productId, variantId)
      setCart(updated)
    })
  }

  function handleQuantityChange(
    productId: string,
    quantity: number,
    variantId?: string
  ) {
    startTransition(async () => {
      const updated = await updateQuantityAction(productId, quantity, variantId)
      setCart(updated)
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({cart.itemCount})
          </SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild onClick={closeCart}>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId ?? ''}`}
                  className="flex gap-3 border-b pb-4 last:border-b-0"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none bg-muted">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => handleRemove(item.productId, item.variantId)}
                        className="shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">
                        {item.variant.title}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="cursor-pointer p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={isPending}
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1,
                              item.variantId
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="cursor-pointer p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={isPending}
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity + 1,
                              item.variantId
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t">
              <div className="flex justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <Button size="lg" className="w-full" asChild onClick={closeCart}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                asChild
                onClick={closeCart}
              >
                <Link href="/cart">View Cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

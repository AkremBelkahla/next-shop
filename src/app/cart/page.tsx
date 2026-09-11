import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { OrderSummary } from '@/components/checkout/order-summary'
import { getCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Shopping Cart | Next Shop',
  description: 'Review your shopping cart',
}

export default async function CartPage() {
  const cart = await getCart()

  if (cart.items.length === 0) {
    return (
      <div className="py-24 md:py-32">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-10 w-10 text-foreground" />
            </div>
            <h1 className="mt-8 text-3xl font-bold tracking-tight">Your cart is empty</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start shopping to add items to your cart
            </p>
            <Button size="lg" className="mt-8 w-full sm:w-auto" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 rounded-none border p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-none bg-white">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.variant && (
                      <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                    )}
                    <p className="mt-1 font-medium">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary subtotal={cart.total} mode="cart" />
          </div>
        </div>
      </Container>
    </div>
  )
}

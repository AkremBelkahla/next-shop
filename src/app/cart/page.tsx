import Link from 'next/link'
import Image from 'next/image'
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
      <div className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start shopping to add items to your cart
            </p>
            <Button size="lg" className="mt-8" asChild>
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
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 rounded-lg border p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
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

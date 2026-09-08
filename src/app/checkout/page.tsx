import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { createCheckoutSessionAction } from '@/app/actions'
import { getCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'

export default async function CheckoutPage() {
  const cart = await getCart()

  if (cart.items.length === 0) {
    return (
      <div className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Add items to your cart before checking out.
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
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 rounded-lg border p-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
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
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.variant && (
                      <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
              <form action={createCheckoutSessionAction}>
                <Button size="lg" type="submit" className="w-full">
                  Continue to Stripe
                </Button>
              </form>
              <p className="text-center text-xs text-muted-foreground">
                You will be redirected to Stripe to complete your purchase securely.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

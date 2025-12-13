import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Checkout Cancelled | Next Shop',
  description: 'Your checkout was cancelled',
}

export default function CheckoutCancelPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Checkout Cancelled</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your checkout was cancelled. Your cart items are still saved.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/cart">Return to Cart</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

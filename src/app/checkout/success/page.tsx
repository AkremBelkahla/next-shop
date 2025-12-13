import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Order Confirmed | Next Shop',
  description: 'Your order has been confirmed',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

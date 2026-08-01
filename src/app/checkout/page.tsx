'use client'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { createCheckoutSessionAction } from '@/app/actions'

export default function CheckoutPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You will be redirected to Stripe to complete your purchase securely.
          </p>
          <form action={createCheckoutSessionAction} className="mt-8">
            <Button size="lg" type="submit" className="w-full">
              Continue to Stripe
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

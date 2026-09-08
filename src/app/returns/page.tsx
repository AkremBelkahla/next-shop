import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'Returns & Refunds | Next Shop',
  description: 'Our return and refund policy for Next Shop orders.',
}

export default function ReturnsPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Returns & Refunds</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We want you to love what you buy. If something isn't right, we're here to help.
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Return Window</h2>
              <p className="mt-2">
                You have 30 days from the delivery date to return an item. Products
                must be unused, in their original packaging, and accompanied by proof
                of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">2. How to Return</h2>
              <p className="mt-2">
                To start a return, contact us via our{' '}
                <a href="/contact" className="text-foreground underline underline-offset-2">
                  contact page
                </a>{' '}
                with your order number. We will send you a return label and
                instructions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Refunds</h2>
              <p className="mt-2">
                Once we receive and inspect your returned item, a refund is issued to
                your original payment method within 5–10 business days. Shipping costs
                are non-refundable except in the case of a defective or incorrect item.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Exchanges</h2>
              <p className="mt-2">
                To exchange an item for a different size or color, return the original
                item and place a new order for the desired product.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Non-Returnable Items</h2>
              <p className="mt-2">
                Certain items such as gift cards and personalized products cannot be
                returned.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

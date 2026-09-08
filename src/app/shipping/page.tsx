import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'Shipping | Next Shop',
  description: 'Shipping information and delivery times for Next Shop orders.',
}

export default function ShippingPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Shipping</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need to know about how we ship your orders.
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Processing Time</h2>
              <p className="mt-2">
                Orders are processed within 1–2 business days. You will receive a
                confirmation email with tracking information once your order ships.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">2. Delivery Times</h2>
              <p className="mt-2">
                Standard delivery takes 3–5 business days within France and 5–8
                business days for the rest of Europe. Express delivery (1–2 business
                days) is available at checkout for an additional fee.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Shipping Costs</h2>
              <p className="mt-2">
                Shipping is free for all orders over €50. Below that threshold, a flat
                rate of €4.90 applies for standard delivery within France.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">4. International Shipping</h2>
              <p className="mt-2">
                We ship to most European countries. International shipping costs and
                times are calculated at checkout based on your destination.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Tracking</h2>
              <p className="mt-2">
                Once your order has shipped, you will receive an email with a tracking
                link. You can also view your orders on your{' '}
                <a href="/account" className="text-foreground underline underline-offset-2">
                  account page
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'Terms of Service | Next Shop',
  description: 'Terms and conditions for using the Next Shop website.',
}

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing and using this website, you accept and agree to be bound by
                these Terms of Service. If you do not agree, please do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">2. Products & Pricing</h2>
              <p className="mt-2">
                All products are subject to availability. We reserve the right to modify
                or discontinue products at any time. Prices are listed in euros and may
                change without notice. This is a demo store — no real transactions are
                processed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Orders</h2>
              <p className="mt-2">
                Placing an order constitutes an offer to purchase. We reserve the right
                to refuse or cancel any order. In the case of a demo order, the data is
                stored locally in your browser only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Intellectual Property</h2>
              <p className="mt-2">
                All content on this site, including text, graphics, and logos, is the
                property of Next Shop or its partners and is protected by intellectual
                property law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
              <p className="mt-2">
                Next Shop shall not be liable for any indirect, incidental, or
                consequential damages arising from the use of this website or the
                inability to use it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">6. Changes to These Terms</h2>
              <p className="mt-2">
                We may update these terms from time to time. Continued use of the site
                after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
              <p className="mt-2">
                For any questions regarding these terms, please visit our{' '}
                <a href="/contact" className="text-foreground underline underline-offset-2">
                  contact page
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

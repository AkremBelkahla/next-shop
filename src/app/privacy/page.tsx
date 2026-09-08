import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'Privacy Policy | Next Shop',
  description: 'How Next Shop collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Data We Collect</h2>
              <p className="mt-2">
                We collect information you provide directly, such as your name, email address,
                shipping address, and payment details when you place an order or contact us.
                We also collect limited technical data (browser type, device, pages visited)
                through cookies to improve our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Data</h2>
              <p className="mt-2">
                Your data is used to process orders, provide customer support, send order
                updates, and — where you have consented — send marketing communications. We
                do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Cookies</h2>
              <p className="mt-2">
                We use essential cookies to operate core features such as the shopping cart,
                and optional analytics cookies to understand site usage. You can manage your
                cookie preferences at any time via the cookie banner or your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
              <p className="mt-2">
                We share data with trusted service providers strictly for the purpose of
                fulfilling orders (e.g. shipping carriers).
                These providers are contractually bound to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
              <p className="mt-2">
                Under the GDPR, you have the right to access, correct, delete, or export your
                personal data, and to withdraw consent at any time. To exercise these rights,
                contact us at{' '}
                <a href="mailto:privacy@nextshop.example" className="text-foreground underline underline-offset-2">
                  privacy@nextshop.example
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">6. Data Retention</h2>
              <p className="mt-2">
                We retain personal data only as long as necessary to fulfill the purposes
                described in this policy, or as required by law (e.g. tax and accounting
                obligations).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
              <p className="mt-2">
                For any questions regarding this policy, please visit our{' '}
                <a href="/contact" className="text-foreground underline underline-offset-2">
                  Contact page
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

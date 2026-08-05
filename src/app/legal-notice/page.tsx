import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'Legal Notice | Next Shop',
  description: 'Legal information about Next Shop (mentions légales).',
}

export default function LegalNoticePage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Legal Notice</h1>
          <p className="mt-2 text-sm text-muted-foreground">Mentions légales</p>

          <div className="prose prose-sm mt-10 max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">Site Publisher</h2>
              <p className="mt-2">
                Next Shop SAS<br />
                12 Rue de Commerce, 75015 Paris, France<br />
                RCS Paris 000 000 000<br />
                Share capital: €10,000
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Publication Director</h2>
              <p className="mt-2">Next Shop SAS Management</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Hosting</h2>
              <p className="mt-2">
                This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
                91789, United States.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Intellectual Property</h2>
              <p className="mt-2">
                All content on this site (text, images, logos) is the property of Next Shop
                SAS or its partners and is protected by intellectual property law. Any
                reproduction without prior authorization is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Contact</h2>
              <p className="mt-2">
                For any legal inquiries, please reach us at{' '}
                <a href="mailto:legal@nextshop.example" className="text-foreground underline underline-offset-2">
                  legal@nextshop.example
                </a>{' '}
                or via our{' '}
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

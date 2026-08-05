import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata = {
  title: 'Contact Us | Next Shop',
  description: 'Get in touch with the Next Shop team.',
}

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'support@nextshop.example' },
  { icon: Phone, label: 'Phone', value: '+33 1 23 45 67 89' },
  { icon: MapPin, label: 'Address', value: '12 Rue de Commerce, 75015 Paris, France' },
]

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions about an order, a product, or anything else? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <detail.icon className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <p className="text-sm font-medium">{detail.label}</p>
                  <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </Container>
    </div>
  )
}

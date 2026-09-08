import { Truck, Shield, RefreshCw, CreditCard } from 'lucide-react'
import { Container } from '@/components/ui/container'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over €50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'SSL encrypted checkout',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options',
  },
]

export function ValueProps() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border border-border/60 bg-card p-6 text-center transition-colors duration-300 hover:border-foreground/30"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-accent/40 text-accent">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

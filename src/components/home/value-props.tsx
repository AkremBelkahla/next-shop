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
    <section className="border-y bg-muted/30 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
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

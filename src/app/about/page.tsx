import { Sparkles, Leaf, HeartHandshake } from 'lucide-react'
import { Container } from '@/components/ui/container'

export const metadata = {
  title: 'About Us | Next Shop',
  description: 'Learn more about Next Shop, our mission, and our values.',
}

const values = [
  {
    icon: Sparkles,
    title: 'Thoughtful Design',
    description:
      'Every product in our catalog is selected for its craftsmanship, durability, and timeless design.',
  },
  {
    icon: Leaf,
    title: 'Responsible Sourcing',
    description:
      'We work with makers who prioritize sustainable materials and ethical production practices.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description:
      'From easy returns to responsive support, we build every part of the experience around you.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Our Story
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About Next Shop
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Next Shop started with a simple idea: everyday essentials should be well made,
            honestly priced, and easy to shop for. We curate a focused catalog of products
            built to last, so you can spend less time browsing and more time enjoying what
            you buy.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <h2 className="mt-4 font-semibold">{value.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

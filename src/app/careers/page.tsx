import { Briefcase, Heart, Rocket } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Careers | Next Shop',
  description: 'Join the Next Shop team and help build the future of modern commerce.',
}

const values = [
  {
    icon: Rocket,
    title: 'Move Fast',
    description: 'We ship, learn, and iterate. Small team, big impact.',
  },
  {
    icon: Heart,
    title: 'Care Deeply',
    description: 'About our customers, our craft, and each other.',
  },
  {
    icon: Briefcase,
    title: 'Own Your Work',
    description: 'Autonomy and accountability go hand in hand here.',
  },
]

export default function CareersPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Careers
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Build the future of commerce with us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We are a small team obsessed with craft, speed, and customer experience.
            We do not have open roles right now, but we are always happy to hear from
            talented people.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-none border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <h2 className="mt-4 font-semibold">{value.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-none border bg-muted/40 p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Want to say hello?</h2>
          <p className="mt-3 text-muted-foreground">
            Send us a message and tell us what you would like to work on. We read every one.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <a href="/contact">Get in touch</a>
          </Button>
        </div>
      </Container>
    </div>
  )
}

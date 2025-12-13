import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function HeroSection() {
  return (
    <section className="relative bg-muted/50 py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Elevate Your Everyday Style
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover our curated collection of premium products designed for modern living.
            Quality craftsmanship meets timeless design.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/collections/new-arrivals">Shop New Arrivals</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/collections/bestsellers">View Bestsellers</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

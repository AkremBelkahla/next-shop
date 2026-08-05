import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function PromoBanner() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 md:py-24">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
              Limited Time
            </span>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Up to 30% off select styles
            </h2>
            <p className="max-w-md text-primary-foreground/80">
              Refresh your everyday essentials before the sale ends. New markdowns added weekly.
            </p>
            <Button size="lg" variant="secondary" className="shadow-lg" asChild>
              <Link href="/collections/sale">
                Shop the Sale
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

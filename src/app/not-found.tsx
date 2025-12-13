import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-6xl font-bold tracking-tight">404</h1>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Page Not Found</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}

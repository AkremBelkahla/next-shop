'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're sorry, but something unexpected happened.
          </p>
          <Button size="lg" className="mt-8" onClick={reset}>
            Try Again
          </Button>
        </div>
      </Container>
    </div>
  )
}

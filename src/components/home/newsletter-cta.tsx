'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function NewsletterCta() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="border-t bg-muted/30 py-16">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Mail className="h-6 w-6 text-accent" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="text-muted-foreground">
            Subscribe to get exclusive offers, new arrivals, and style tips straight to your inbox.
          </p>

          {submitted ? (
            <p className="mt-2 text-sm font-medium text-accent">
              Thanks for subscribing! Check your inbox soon.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="h-11"
              />
              <Button type="submit" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

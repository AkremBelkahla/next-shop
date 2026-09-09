'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  eyebrow: string
  title: string
  description: string
  image: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const AUTOPLAY_INTERVAL_MS = 6000

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goToPrevious = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  const activeSlide = slides[index]

  if (!activeSlide) return null

  return (
    <section
      className="relative isolate overflow-hidden bg-muted/50 h-[300px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.title}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className={cn(
                'object-cover transition-transform duration-[6000ms] ease-out',
                slideIndex === index ? 'scale-110' : 'scale-100'
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
          </div>
        ))}
      </div>

      <Container>
        <div
          key={index}
          className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm text-shadow-hero-sm">
            {activeSlide.eyebrow}
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-white text-shadow-hero sm:text-4xl">
            {activeSlide.title}
          </h1>
          <p className="mt-2 hidden text-sm leading-6 text-white/95 text-shadow-hero-sm line-clamp-2 sm:block">
            {activeSlide.description}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button size="sm" className="shadow-lg shadow-primary/20" asChild>
              <Link href={activeSlide.primaryCta.href}>
                {activeSlide.primaryCta.label}
              </Link>
            </Button>
            {activeSlide.secondaryCta && (
              <Button size="sm" variant="outline" asChild>
                <Link href={activeSlide.secondaryCta.href}>
                  {activeSlide.secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Previous slide"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-background/70 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-background/90"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Next slide"
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-background/70 text-foreground shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-background/90"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            onClick={() => goTo(slideIndex)}
            className={cn(
              'h-2 cursor-pointer rounded-full bg-foreground/30 outline-none transition-all duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50',
              slideIndex === index ? 'w-6 bg-foreground' : 'w-2 hover:bg-foreground/50'
            )}
          />
        ))}
      </div>
    </section>
  )
}

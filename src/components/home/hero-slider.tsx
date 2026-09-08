'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

interface HeroSlide {
  eyebrow: string
  title: string
  description: string
  image: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const slides: HeroSlide[] = [
  {
    eyebrow: 'New Season',
    title: 'Elevate Your Everyday Style',
    description:
      'Discover our curated collection of premium products designed for modern living. Quality craftsmanship meets timeless design.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    primaryCta: { label: 'Shop New Arrivals', href: '/collections/new-arrivals' },
    secondaryCta: { label: 'View Bestsellers', href: '/collections/bestsellers' },
  },
  {
    eyebrow: 'Premium Craft',
    title: 'Crafted to Last, Made to Impress',
    description:
      'From premium leather goods to everyday essentials, explore pieces built with care and designed to stand the test of time.',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=80',
    primaryCta: { label: 'Explore Bestsellers', href: '/collections/bestsellers' },
    secondaryCta: { label: 'Shop Accessories', href: '/collections/accessories' },
  },
  {
    eyebrow: 'Sale',
    title: 'Limited-Time Offers, Unlimited Style',
    description:
      'Save on standout pieces across the store while supplies last. Refresh your everyday carry without breaking the bank.',
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
    primaryCta: { label: 'Shop the Sale', href: '/collections/sale' },
  },
]

const AUTOPLAY_INTERVAL_MS = 6000

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [])

  const goToNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goToPrevious = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [isPaused])

  const activeSlide = slides[index]

  if (!activeSlide) return null

  return (
    <section
      className="relative isolate overflow-hidden bg-muted/50 py-12 md:py-20 min-h-[400px]"
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
          className="relative mx-auto flex max-w-3xl flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm text-shadow-hero-sm">
            {activeSlide.eyebrow}
          </span>
          <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight text-white text-shadow-hero sm:text-7xl">
            {activeSlide.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/95 text-shadow-hero-sm">
            {activeSlide.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
              <Link href={activeSlide.primaryCta.href}>
                {activeSlide.primaryCta.label}
              </Link>
            </Button>
            {activeSlide.secondaryCta && (
              <Button size="lg" variant="outline" asChild>
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

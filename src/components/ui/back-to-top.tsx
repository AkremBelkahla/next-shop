'use client'

import { useSyncExternalStore } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 400

function subscribe(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  return () => window.removeEventListener('scroll', onStoreChange)
}

function getSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD
}

function getServerSnapshot() {
  return false
}

export function BackToTop() {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 cursor-pointer rounded-full shadow-lg transition-all duration-300',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}

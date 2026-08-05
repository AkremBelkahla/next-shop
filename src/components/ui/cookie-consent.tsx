'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_EVENT = 'cookie-consent-change'

type Consent = 'accepted' | 'declined'

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getSnapshot(): Consent | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as Consent | null
  } catch {
    return null
  }
}

function getServerSnapshot(): Consent | null {
  return null
}

function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // localStorage unavailable (e.g. private browsing) — ignore
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (consent) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
    >
      <Container>
        <div className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
          <div className="flex items-start gap-3 text-sm text-muted-foreground sm:items-center">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent sm:mt-0" />
            <p>
              We use cookies to enhance your experience and analyze site traffic. By
              continuing, you agree to our{' '}
              <Link href="/privacy" className="font-medium text-foreground underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full shrink-0 gap-3 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setConsent('declined')}
            >
              Decline
            </Button>
            <Button
              type="button"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setConsent('accepted')}
            >
              Accept
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

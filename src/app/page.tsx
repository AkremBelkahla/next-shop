import { HeroSlider } from '@/components/home/hero-slider'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { PromoBanner } from '@/components/home/promo-banner'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ValueProps } from '@/components/home/value-props'
import { NewsletterCta } from '@/components/home/newsletter-cta'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedCollections />
      <PromoBanner />
      <FeaturedProducts />
      <ValueProps />
      <NewsletterCta />
    </>
  )
}

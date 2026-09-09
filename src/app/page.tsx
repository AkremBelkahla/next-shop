import { HeroSlider, type HeroSlide } from '@/components/home/hero-slider'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { PromoBanner } from '@/components/home/promo-banner'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ValueProps } from '@/components/home/value-props'
import { NewsletterCta } from '@/components/home/newsletter-cta'

// Hero category slides with curated Unsplash photos
const HERO_CATEGORIES: {
  eyebrow: string
  title: string
  description: string
  image: string
  primarySlug: string
  primaryLabel: string
}[] = [
  {
    eyebrow: 'Collection',
    title: "Men's Fashion",
    description: 'Discover our latest collection of shirts, shoes, and watches for the modern man.',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&q=80',
    primarySlug: 'mens-shirts',
    primaryLabel: 'Shop Men',
  },
  {
    eyebrow: 'Collection',
    title: 'Electronics',
    description: 'Laptops, smartphones, tablets, and mobile accessories — tech for every need.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80',
    primarySlug: 'laptops',
    primaryLabel: 'Shop Electronics',
  },
  {
    eyebrow: 'Collection',
    title: 'Sports & Vehicles',
    description: 'Sports accessories, motorcycles, and vehicles for the active lifestyle.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
    primarySlug: 'sports-accessories',
    primaryLabel: 'Shop Sports',
  },
]

export default async function Home() {
  const slides: HeroSlide[] = HERO_CATEGORIES.map((cat) => ({
    eyebrow: cat.eyebrow,
    title: cat.title,
    description: cat.description,
    image: cat.image,
    primaryCta: { label: cat.primaryLabel, href: `/collections/${cat.primarySlug}` },
    secondaryCta: { label: 'All Collections', href: '/collections' },
  }))

  return (
    <>
      <HeroSlider slides={slides} />
      <FeaturedCollections />
      <PromoBanner />
      <FeaturedProducts />
      <ValueProps />
      <NewsletterCta />
    </>
  )
}

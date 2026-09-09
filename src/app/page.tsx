import { HeroSlider, type HeroSlide } from '@/components/home/hero-slider'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { PromoBanner } from '@/components/home/promo-banner'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ValueProps } from '@/components/home/value-props'
import { NewsletterCta } from '@/components/home/newsletter-cta'
import { cms } from '@/lib/cms'

export default async function Home() {
  const featuredProducts = await cms.products.getFeatured(10)

  // Pick up to 3 products from different categories for hero slides
  const seenCategories = new Set<string>()
  const heroProducts = featuredProducts.filter((p) => {
    const cat = p.collections[0]?.slug
    if (!cat || seenCategories.has(cat)) return false
    seenCategories.add(cat)
    return true
  }).slice(0, 3)

  const slides: HeroSlide[] = heroProducts.map((product) => {
    const collection = product.collections[0]
    const categorySlug = collection?.slug ?? 'all'
    const categoryName = collection?.title ?? 'Collection'
    const hasDiscount = product.compareAtPrice !== null

    return {
      eyebrow: hasDiscount ? 'Special Offer' : 'Featured',
      title: product.title,
      description: product.description,
      image: collection?.image ?? product.images[0]?.url ?? '',
      primaryCta: { label: `Shop ${categoryName}`, href: `/collections/${categorySlug}` },
      secondaryCta: { label: 'View Product', href: `/products/${product.slug}` },
    }
  })

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

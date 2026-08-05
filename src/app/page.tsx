import { HeroSlider } from '@/components/home/hero-slider'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ValueProps } from '@/components/home/value-props'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedCollections />
      <FeaturedProducts />
      <ValueProps />
    </>
  )
}

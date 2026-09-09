import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { cms } from '@/lib/cms'

export async function FeaturedCollections() {
  const collections = await cms.collections.getFeatured(3)

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Shop by Collection"
          description="Curated selections for every style"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection: { id: string; slug: string; title: string; description: string | null; image: string | null }) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative isolate flex aspect-[4/3] overflow-hidden rounded-none bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {collection.image && (
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

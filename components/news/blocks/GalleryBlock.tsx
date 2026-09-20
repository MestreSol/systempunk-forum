import Image from 'next/image'
import type { GalleryBlockData } from '@/lib/news/blockTypes'

export function GalleryBlock({ data }: { data: GalleryBlockData }) {
  const images = (data.images ?? []).filter((image) => image.url)
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800"
        >
          <Image
            src={image.url}
            alt={image.alt || ''}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

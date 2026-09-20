import Image from 'next/image'
import type { ImageBlockData } from '@/lib/news/blockTypes'

export function ImageBlock({ data }: { data: ImageBlockData }) {
  if (!data.url) return null

  return (
    <figure>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
        <Image
          src={data.url}
          alt={data.alt || ''}
          fill
          className="object-cover"
        />
      </div>
      {data.caption && (
        <figcaption className="mt-2 text-sm text-zinc-500 text-center">
          {data.caption}
        </figcaption>
      )}
    </figure>
  )
}

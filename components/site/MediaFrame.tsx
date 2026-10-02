import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { MediaItem, PlaceholderArt } from '@/data/types'
import type { Locale } from '@/i18n/config'
import { tr } from '@/lib/site/localize'
import LazyVideo from './LazyVideo'
import { ShipSchematic } from './ShipSchematic'
import { OrbitalField } from './OrbitalField'

function youTubeId(url: string) {
  return url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  )?.[1]
}

/**
 * Framed media slot. Renders an image, a lazily-played video or a YouTube
 * embed — or a technical placeholder when nothing has been cleared yet.
 */
export function MediaFrame({
  media,
  locale,
  placeholder,
  art = 'orbital',
  caption,
  priority,
  sizes = '(min-width: 1024px) 66vw, 100vw',
  className
}: {
  media?: MediaItem
  locale: Locale
  placeholder?: { title: string; note: string }
  art?: PlaceholderArt
  caption?: string
  priority?: boolean
  sizes?: string
  className?: string
}) {
  return (
    <figure className={cn('brackets relative', className)}>
      <div className="relative aspect-video overflow-hidden border border-line bg-hull">
        {!media && (
          <>
            {art === 'schematic' ? (
              <ShipSchematic />
            ) : (
              <div aria-hidden className="bg-grid absolute inset-0">
                <OrbitalField className="absolute left-1/2 top-1/2 w-[85%] -translate-x-1/2 -translate-y-1/2" />
              </div>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-signal/[0.06] to-transparent motion-safe:animate-scan"
            />
            {placeholder && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-void/90 to-transparent p-4 sm:p-6">
                <p className="label text-ink">
                  <span
                    className="mr-2 inline-block size-1.5 bg-signal motion-safe:animate-pulse-dot"
                    aria-hidden
                  />
                  {placeholder.title}
                </p>
                <p className="label hidden sm:block">{placeholder.note}</p>
              </div>
            )}
          </>
        )}

        {media?.kind === 'image' && (
          <Image
            src={media.src}
            alt={tr(media.alt, locale)}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        )}

        {media?.kind === 'video' && (
          <LazyVideo
            src={media.src}
            poster={media.poster}
            label={tr(media.alt, locale)}
          />
        )}

        {media?.kind === 'youtube' && youTubeId(media.src) && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId(media.src)}`}
            title={tr(media.alt, locale)}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        )}
      </div>
      {caption && <figcaption className="label mt-3">{caption}</figcaption>}
    </figure>
  )
}

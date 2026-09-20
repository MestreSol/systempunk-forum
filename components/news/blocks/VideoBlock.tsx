import type { VideoBlockData } from '@/lib/news/blockTypes'

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export function VideoBlock({ data }: { data: VideoBlockData }) {
  if (!data.url) return null

  if (data.provider === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(data.url)
    if (!embedUrl) return null

    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <video
      src={data.url}
      controls
      className="w-full rounded-lg border border-zinc-800 bg-black"
    />
  )
}

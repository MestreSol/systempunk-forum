import type { QuoteBlockData } from '@/lib/news/blockTypes'

export function QuoteBlock({ data }: { data: QuoteBlockData }) {
  if (!data.text) return null

  return (
    <blockquote className="border-l-4 border-lime-500 pl-6 py-1">
      <p className="text-xl md:text-2xl font-medium text-lime-100 italic leading-snug">
        &ldquo;{data.text}&rdquo;
      </p>
      {data.attribution && (
        <footer className="mt-3 text-sm text-zinc-500">
          — {data.attribution}
        </footer>
      )}
    </blockquote>
  )
}

import type { HeadingBlockData } from '@/lib/news/blockTypes'

export function HeadingBlock({ data }: { data: HeadingBlockData }) {
  if (!data.text) return null

  if (data.level === 3) {
    return (
      <h3 className="text-xl md:text-2xl font-bold text-lime-100">
        {data.text}
      </h3>
    )
  }

  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white">{data.text}</h2>
  )
}

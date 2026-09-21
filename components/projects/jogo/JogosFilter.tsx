'use client'

import { Search } from 'lucide-react'

interface JogosFilterProps {
  query: string
  onQueryChange: (value: string) => void
  tags: string[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
  resultCount: number
}

export function JogosFilter({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
  resultCount
}: JogosFilterProps) {
  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm border transition-all ${
      active
        ? 'bg-lime-600 border-lime-500 text-white scale-105'
        : 'border-zinc-700 text-zinc-300 hover:border-lime-500/60 hover:text-white'
    }`

  return (
    <div className="mb-10 space-y-4">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar jogo..."
          aria-label="Buscar jogo"
          className="w-full rounded-full bg-zinc-900 border border-zinc-700 py-2.5 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-lime-500"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          className={chip(activeTag === null)}
          onClick={() => onTagChange(null)}
        >
          Todos
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={chip(activeTag === tag)}
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-zinc-500" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'jogo' : 'jogos'}
      </p>
    </div>
  )
}

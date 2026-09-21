'use client'

import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { projects } from '@/mocks/Projects'
import { JogosHero } from '@/components/projects/jogo/JogosHero'
import { JogosStats } from '@/components/projects/jogo/JogosStats'
import { JogosFilter } from '@/components/projects/jogo/JogosFilter'
import { GameCard } from '@/components/projects/jogo/GameCard'
import { JogosCTA } from '@/components/projects/jogo/JogosCTA'
import { Marquee } from '@/components/projects/jogo/text-effects'

const featured = projects.find((p) => p.featured) ?? projects[0]
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

export default function JogosPage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(
      (p) =>
        (!activeTag || p.tags.includes(activeTag)) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q))
    )
  }, [query, activeTag])

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <JogosHero
        featured={featured}
        onBrowseClick={() =>
          document
            .getElementById('catalogo')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <JogosStats projects={projects} />

      <Marquee
        className="mt-16"
        items={[...allTags, ...projects.map((p) => p.name)]}
      />

      <section id="catalogo" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-4">
        <JogosFilter
          query={query}
          onQueryChange={setQuery}
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
          resultCount={filtered.length}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <GameCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-500">
            <SearchX className="w-12 h-12 mx-auto mb-4" />
            Nenhum jogo encontrado com esses filtros.
          </div>
        )}
      </section>

      <JogosCTA />
    </div>
  )
}

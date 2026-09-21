'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/mocks/Projects'
import type { Project } from '@/types/Project.type'
import type { ProjectDetail } from '@/types/ProjectDetail.type'
import { Button } from '@/components/ui/button'
import {
  AnimatedText,
  Marquee
} from '@/components/projects/jogo/text-effects'
import { DetailHero } from '@/components/projects/jogo/detail/DetailHero'
import {
  Reveal,
  SectionHeader,
  SectionTabs
} from '@/components/projects/jogo/detail/common'
import { NewsCards, TeamGrid } from '@/components/projects/jogo/detail/TeamAndNews'
import { LoreGrid } from '@/components/projects/jogo/detail/LoreGrid'
import { SystemsExplorer } from '@/components/projects/jogo/detail/SystemsExplorer'
import { MediaGallery } from '@/components/projects/jogo/detail/MediaGallery'
import { SprintProgress } from '@/components/projects/jogo/detail/SprintProgress'
import { RoadmapTimeline } from '@/components/projects/jogo/detail/RoadmapTimeline'

export default function ProjectDetailPage() {
  const params = useParams()
  const id = String(params.id || '')
  const project = projects.find((p) => p.id === id) as Project | undefined

  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(true)

  useEffect(() => {
    if (!project) {
      setDetailLoading(false)
      return
    }

    let cancelled = false
    setDetail(null)
    setDetailLoading(true)

    fetch(`/projects/jogo/${project.id}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setDetail(data)
      })
      .catch(() => {
        if (!cancelled) setDetail(null)
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">Jogo não encontrado</div>
          <Link href="/projects/jogo">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (detailLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-lime-200 text-lg animate-pulse">Carregando...</div>
      </div>
    )
  }

  const platforms = detail?.platforms || detail?.footer?.platforms
  const description = detail?.fastDescription?.description || project.description

  const blocks = [
    { id: 'sobre', label: 'Sobre', show: true },
    { id: 'noticias', label: 'Notícias', show: !!detail?.lastNews?.length },
    { id: 'lore', label: 'Lore', show: !!detail?.lore?.length },
    {
      id: 'sistemas',
      label: 'Sistemas',
      show: !!detail?.systems && Object.keys(detail.systems).length > 0
    },
    { id: 'midia', label: 'Mídia', show: !!detail?.media?.length },
    { id: 'progresso', label: 'Progresso', show: !!detail?.sprints?.length },
    { id: 'roadmap', label: 'Roadmap', show: !!detail?.roadmap?.length },
    { id: 'equipe', label: 'Equipe', show: !!detail?.team?.length }
  ].filter((b) => b.show)

  const sectionClass = 'max-w-5xl mx-auto px-6 py-16 scroll-mt-14'

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <DetailHero
        image={detail?.hero?.image || project.image}
        title={detail?.hero?.title || project.name}
        subtitle={detail?.hero?.subtitle || project.description}
        status={project.status}
        rating={project.rating}
        downloads={project.downloads}
        platforms={platforms}
        tags={project.tags ?? []}
        trailer={detail?.fastDescription?.video}
        onScrollDown={() =>
          document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <Marquee
        items={[
          ...(platforms ?? []),
          ...(project.tags ?? []),
          ...Object.keys(detail?.systems ?? {}).map((k) =>
            k.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          ),
          project.status
        ]}
      />

      <SectionTabs sections={blocks} />

      <section id="sobre" className={sectionClass}>
        <Reveal>
          <SectionHeader eyebrow="sobre" title="Sobre o jogo" />
          <AnimatedText
            as="p"
            text={description}
            stagger={25}
            className="block text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl"
          />
        </Reveal>
      </section>

      {detail?.lastNews && detail.lastNews.length > 0 && (
        <section id="noticias" className={sectionClass}>
          <SectionHeader eyebrow="novidades" title="Últimas Notícias" />
          <NewsCards items={detail.lastNews} />
        </section>
      )}

      {detail?.lore && detail.lore.length > 0 && (
        <section id="lore" className={sectionClass}>
          <SectionHeader eyebrow="universo" title="Lore" />
          <LoreGrid items={detail.lore} />
        </section>
      )}

      {detail?.systems && Object.keys(detail.systems).length > 0 && (
        <section id="sistemas" className={sectionClass}>
          <SectionHeader eyebrow="mecânicas" title="Sistemas" />
          <SystemsExplorer systems={detail.systems} />
        </section>
      )}

      {detail?.media && detail.media.length > 0 && (
        <section id="midia" className={sectionClass}>
          <SectionHeader eyebrow="galeria" title="Mídia" />
          <MediaGallery items={detail.media} />
        </section>
      )}

      {detail?.sprints && detail.sprints.length > 0 && (
        <section id="progresso" className={sectionClass}>
          <SectionHeader eyebrow="desenvolvimento" title="Progresso" />
          <SprintProgress sprints={detail.sprints} />
        </section>
      )}

      {detail?.roadmap && detail.roadmap.length > 0 && (
        <section id="roadmap" className={sectionClass}>
          <SectionHeader eyebrow="futuro" title="Roadmap" />
          <RoadmapTimeline items={detail.roadmap} />
        </section>
      )}

      {detail?.team && detail.team.length > 0 && (
        <section id="equipe" className={sectionClass}>
          <SectionHeader eyebrow="quem faz" title="Equipe" />
          <TeamGrid members={detail.team} />
        </section>
      )}

      {detail?.footer && (
        <footer className="max-w-5xl mx-auto px-6 pb-10">
          <div className="border-t border-zinc-800 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
            <div>{detail.footer.company}</div>
            <div className="flex flex-wrap items-center gap-3">
              <span>Classificação: {detail.footer.rating}</span>
              <span>{detail.footer.platforms.join(', ')}</span>
              <span>{detail.footer.copyright}</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

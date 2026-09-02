'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/mocks/Projects'
import type { Project } from '@/types/Project.type'
import type {
  ProjectDetail,
  SprintActivityStatus
} from '@/types/ProjectDetail.type'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Star, Download, PlayCircle, Users } from 'lucide-react'

// Plain <img> with a graceful fallback: some of the JSON-driven content
// (e.g. MON.json's lore/media images) references assets that don't exist in
// public/ yet, and that must not break the page.
function SafeImage({
  src,
  alt,
  className
}: {
  src: string
  alt: string
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs text-center p-2 ${className || ''}`}
      >
        {alt || 'Imagem indisponível'}
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}

function humanizeKey(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

const statusLabel: Record<SprintActivityStatus, string> = {
  done: 'Concluído',
  ongoing: 'Em andamento',
  stopped: 'Parado',
  todo: 'A fazer'
}

const statusColor: Record<SprintActivityStatus, string> = {
  done: 'bg-lime-600/20 text-lime-300 border-lime-500/30',
  ongoing: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30',
  stopped: 'bg-red-600/20 text-red-300 border-red-500/30',
  todo: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30'
}

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
        <div className="text-lime-200 text-lg">Carregando...</div>
      </div>
    )
  }

  const hero = detail?.hero
  const heroImage = hero?.image || project.image
  const heroTitle = hero?.title || project.name
  const heroSubtitle = hero?.subtitle || project.description
  const platforms = detail?.platforms || detail?.footer?.platforms

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/projects/jogo" className="inline-block mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        {/* Hero */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden mb-8">
          <SafeImage
            src={heroImage}
            alt={heroTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold text-lime-200 mb-2">
              {heroTitle}
            </h1>
            <p className="text-zinc-300 text-lg max-w-2xl">{heroSubtitle}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-lime-600/20 text-lime-300 border-lime-500/30">
                {project.status}
              </Badge>
              {project.rating && (
                <Badge variant="outline" className="gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {project.rating}
                </Badge>
              )}
              {project.downloads && (
                <Badge variant="outline" className="gap-1">
                  <Download className="w-3 h-3" />
                  {project.downloads}
                </Badge>
              )}
              {platforms?.map((p) => (
                <Badge key={p} variant="secondary">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Fast description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              {detail?.fastDescription?.description || project.description}
            </p>
            {detail?.fastDescription?.video && (
              <a
                href={detail.fastDescription.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2 bg-lime-600 hover:bg-lime-700">
                  <PlayCircle className="w-4 h-4" />
                  Assistir Trailer
                </Button>
              </a>
            )}
          </CardContent>
        </Card>

        {/* Last news */}
        {detail?.lastNews && detail.lastNews.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">
              Últimas Notícias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.lastNews.map((news) => (
                <Link key={news.title} href={`/news/${slugify(news.title)}`}>
                  <Card className="hover:border-lime-500/50 transition-colors h-full">
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {news.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lime-100 mb-1">
                        {news.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-2">
                        {news.subtitle}
                      </p>
                      <div className="text-xs text-zinc-500">
                        {news.year} · {news.readingTime}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Lore */}
        {detail?.lore && detail.lore.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">Lore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.lore.map((item) => (
                <Card key={item.title} className="overflow-hidden p-0">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="pt-4 pb-6">
                    <h3 className="font-semibold text-lime-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Systems */}
        {detail?.systems && Object.keys(detail.systems).length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">Sistemas</h2>
            <Accordion
              type="multiple"
              className="bg-zinc-900 rounded-lg border border-zinc-800 px-4"
            >
              {Object.entries(detail.systems).map(([key, items]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-zinc-200">
                    {humanizeKey(key)} ({items.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Media */}
        {detail?.media && detail.media.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">Mídia</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {detail.media.map((src) => (
                <SafeImage
                  key={src}
                  src={src}
                  alt="Mídia do jogo"
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </section>
        )}

        {/* Sprints */}
        {detail?.sprints && detail.sprints.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">
              Progresso de Desenvolvimento
            </h2>
            <Accordion
              type="multiple"
              className="bg-zinc-900 rounded-lg border border-zinc-800 px-4"
            >
              {detail.sprints.map((sprint) => {
                const total = sprint.activities.length
                const done = sprint.activities.filter(
                  (a) => a.status === 'done'
                ).length
                const pct = total > 0 ? Math.round((done / total) * 100) : 0

                return (
                  <AccordionItem key={sprint.title} value={sprint.title}>
                    <AccordionTrigger className="text-zinc-200">
                      <div className="flex flex-col items-start gap-2 w-full pr-4">
                        <span>{sprint.title}</span>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {sprint.activities.map((activity) => (
                          <li
                            key={activity.name}
                            className="flex items-center justify-between gap-2 text-sm"
                          >
                            <span className="text-zinc-400">
                              {activity.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={statusColor[activity.status]}
                            >
                              {statusLabel[activity.status]}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </section>
        )}

        {/* Roadmap */}
        {detail?.roadmap && detail.roadmap.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4">Roadmap</h2>
            <div className="space-y-4 border-l-2 border-lime-500/30 pl-6">
              {detail.roadmap.map((item) => (
                <div key={item.title} className="relative">
                  <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-lime-500" />
                  <div className="text-xs text-zinc-500 mb-1">{item.date}</div>
                  <h3 className="font-semibold text-lime-100">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Team */}
        {detail?.team && detail.team.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-lime-200 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Equipe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {detail.team.map((member) => (
                <Card key={member.name}>
                  <CardContent className="pt-6 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lime-100">
                      {member.name}
                    </h3>
                    <div className="text-xs text-cyan-300 mb-2">
                      {member.role}
                    </div>
                    <p className="text-zinc-500 text-xs">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Project footer info */}
        {detail?.footer && (
          <div className="border-t border-zinc-800 pt-6 mt-10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
            <div>{detail.footer.company}</div>
            <div className="flex items-center gap-3">
              <span>Classificação: {detail.footer.rating}</span>
              <span>{detail.footer.platforms.join(', ')}</span>
              <span>{detail.footer.copyright}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

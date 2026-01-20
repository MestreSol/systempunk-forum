'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Eye, Clock, Share } from 'lucide-react'
import Link from 'next/link'
import { mockArticles, getCategoryLabel } from '@/mocks/NewsArticles'
import type { NewsArticle } from '@/types/NewsArticle.type'

// Helper para gerar slug a partir do título da notícia
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

interface NewsCard {
  tags: string[]
  title: string
  subtitle: string
  image: string
  year: number
  readingTime: string
  content?: string
}

interface ProjectNews {
  projectId: string
  news: NewsCard
}

interface NewsPageParams {
  params: Promise<{ slug: string }>
}

export default function NewsPage({ params }: NewsPageParams) {
  const [slug, setSlug] = useState<string>('')
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [legacyNews, setLegacyNews] = useState<ProjectNews | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getSlug() {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return

    async function fetchNews() {
      try {
        // First, try to find the article in our new data structure
        const foundArticle = mockArticles.find(
          (article) => article.slug === slug
        )

        if (foundArticle) {
          setArticle(foundArticle)
          setIsLoading(false)
          return
        }

        // If not found, try the legacy format from project files
        const projectIds = ['RR', 'MON', 'NOV']
        for (const projectId of projectIds) {
          const res = await fetch(`/projects/jogo/${projectId}.json`)
          if (!res.ok) continue
          const data = await res.json()
          if (Array.isArray(data.lastNews)) {
            const found = data.lastNews.find(
              (n: NewsCard) => slugify(n.title) === slug
            )
            if (found) {
              setLegacyNews({ projectId, news: found })
              setIsLoading(false)
              return
            }
          }
        }
        setError(true)
        setIsLoading(false)
      } catch {
        setError(true)
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado'
      case 'draft':
        return 'Rascunho'
      default:
        return 'Arquivado'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="animate-pulse text-lime-400">Carregando notícia...</div>
      </div>
    )
  }

  if (error || (!article && !legacyNews)) {
    notFound()
  }

  // Render new format article
  if (article) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Header with back button */}
        <div className="container mx-auto px-6 py-6">
          <Link
            href="/news"
            className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Notícias
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-video lg:aspect-[21/9] bg-zinc-800 overflow-hidden">
            {article.featuredImage ? (
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <Calendar className="w-24 h-24" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>

          {/* Article metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                {/* Tags and category */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge
                    variant="outline"
                    className={getStatusBadge(article.status)}
                  >
                    {getStatusText(article.status)}
                  </Badge>
                  <Badge variant="secondary" className="bg-lime-600 text-white">
                    {getCategoryLabel(article.category)}
                  </Badge>
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-zinc-600 text-zinc-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title and metadata */}
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>

                <p className="text-lg text-zinc-300 mb-6 max-w-2xl">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {formatViews(article.views)} visualizações
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {estimateReadingTime(article.content)} de leitura
                  </span>
                  <span>Por {article.author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-zinc-600 text-zinc-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300"
              >
                <Share className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
                {article.content}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm mb-2">
                    Publicado em {formatDate(article.publishDate)}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Última modificação: {formatDate(article.lastModified)}
                  </p>
                </div>
                <Link href="/news">
                  <Button variant="outline" className="border-zinc-700">
                    Ver mais notícias
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }

  // Render legacy format
  if (legacyNews) {
    const { news: n } = legacyNews

    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Header with back button */}
        <div className="container mx-auto px-6 py-6">
          <Link
            href="/news"
            className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Notícias
          </Link>
        </div>

        {/* HERO DA NOTÍCIA */}
        <section
          className="relative flex flex-col items-center justify-center text-center min-h-[40vh] w-full py-10 px-2 sm:px-4 bg-gradient-to-b from-black/80 to-zinc-900 overflow-hidden"
          style={{
            backgroundImage: `url(${n.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        >
          <div className="absolute inset-0 bg-black/70 -z-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {n.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-lime-800/40 text-lime-300 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg mb-2 bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
              {n.title}
            </h1>
            <div className="text-lime-400 text-sm mb-2">
              {n.year} • {n.readingTime}
            </div>
            <p className="text-lg sm:text-xl text-lime-100 mb-4">
              {n.subtitle}
            </p>
          </div>
        </section>

        {/* TEXTO COMPLETO DA NOTÍCIA */}
        <article className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-zinc-900 border border-lime-700 rounded-lg shadow-lg p-6">
            {n.content ? (
              <div
                className="prose prose-invert prose-lg max-w-none text-lime-100"
                dangerouslySetInnerHTML={{ __html: n.content }}
              />
            ) : (
              <div className="text-lime-200 text-base">
                Conteúdo completo em breve.
              </div>
            )}
          </div>
        </article>
      </div>
    )
  }

  return null
}

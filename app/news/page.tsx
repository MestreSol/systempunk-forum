'use client'

import { useState, useEffect } from 'react'
import { NewsArticle } from '@/types/NewsArticle.type'
import { categoryOptions, mockArticles } from '@/mocks/NewsArticles'
import NewsFilters from '@/components/news/NewsFilters'
import ArticlesGrid from '@/components/news/ArticlesGrid'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('published')
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setArticles(mockArticles)
        setFilteredArticles(
          mockArticles.filter((article) => article.status === 'published')
        )
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao carregar artigos:', error)
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  useEffect(() => {
    let filtered = articles

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((article) => article.status === selectedStatus)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        )
        break
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
        )
        break
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredArticles(filtered)
  }, [articles, searchTerm, selectedCategory, selectedStatus, sortBy])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-lime-400">
              Carregando notícias...
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Featured article is always the first published article, unaffected by filters
  const featuredArticle = articles.find(
    (article) => article.status === 'published'
  )
  
  // Filter out the featured article from the filtered results
  const otherArticles = filteredArticles.filter(
    (article) => article.id !== featuredArticle?.id
  )

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedStatus('published')
    setSortBy('newest')
  }

  const activeBadges = [] as { label: string }[]
  if (selectedCategory !== 'all') {
    const label = categoryOptions.find(
      (opt) => opt.value === selectedCategory
    )?.label
    if (label) activeBadges.push({ label })
  }
  if (selectedStatus !== 'published') {
    activeBadges.push({
      label:
        selectedStatus === 'all'
          ? 'Todos os status'
          : selectedStatus === 'draft'
            ? 'Rascunhos'
            : 'Arquivados'
    })
  }
  if (sortBy !== 'newest') {
    const sortLabels: Record<string, string> = {
      oldest: 'Mais antigas',
      views: 'Mais visualizadas',
      title: 'A-Z'
    }
    activeBadges.push({ label: sortLabels[sortBy] || sortBy })
  }
  if (searchTerm) activeBadges.push({ label: `"${searchTerm}"` })

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Header Section */}
      <div className="relative border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-lime-500 rounded-full"></div>
              <span className="text-lime-400 font-semibold uppercase tracking-wider text-sm">
                Central de Notícias
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Notícias <span className="text-lime-400">SystemPunk</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Fique por dentro das últimas novidades, atualizações e lançamentos
              dos nossos jogos e projetos. Conteúdo exclusivo direto dos
              desenvolvedores.
            </p>

            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-zinc-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Atualizado diariamente</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                  {filteredArticles.length} artigos disponíveis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <NewsFilters
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryOptions={categoryOptions}
          activeBadges={activeBadges}
          resultsCount={filteredArticles.length}
          totalCount={articles.length}
          onClearFilters={handleClearFilters}
        />

        <ArticlesGrid
          featured={featuredArticle}
          articles={otherArticles}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

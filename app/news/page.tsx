'use client'

import { useState, useEffect } from 'react'
import { NewsArticle } from '@/types/NewsArticle.type'
import { categoryOptions, mockArticles } from '@/mocks/NewsArticles'
import NewsFilters from '@/components/news/NewsFilters'
import ArticlesGrid from '@/components/news/ArticlesGrid'
import { Badge } from '@/components/ui/badge'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('published')
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

    setFilteredArticles(filtered)
  }, [articles, searchTerm, selectedCategory, selectedStatus])

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

  const featuredArticle = filteredArticles.find(
    (article) => article.status === 'published'
  )
  const otherArticles = filteredArticles.slice(featuredArticle ? 1 : 0)

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
  if (searchTerm) activeBadges.push({ label: `"${searchTerm}"` })

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-lime-400 mb-4">
            Notícias SystemPunk
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Fique por dentro das últimas novidades, atualizações e lançamentos
            dos nossos jogos e projetos.
          </p>
        </div>

        <NewsFilters
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          categoryOptions={categoryOptions}
          activeBadges={activeBadges}
        />

        <ArticlesGrid featured={featuredArticle} articles={otherArticles} />
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

import { FeaturedNews } from '@/components/news/FeaturedNews'
import { NewsCard } from '@/components/news/NewsCard'
import { NewsArticle } from '@/types/NewsArticle.type'
import { categoryOptions, mockArticles } from '@/mocks/NewsArticles'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('published')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const loadArticles = async () => {
      try {
        // Em um app real, isso viria de uma API
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

    // Filtrar por status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((article) => article.status === selectedStatus)
    }

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      )
    }

    // Filtrar por termo de busca
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

  // Get featured article (most recent published article)
  const featuredArticle = filteredArticles.find(
    (article) => article.status === 'published'
  )
  const otherArticles = filteredArticles.slice(featuredArticle ? 1 : 0)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-lime-400 mb-4">
            Notícias SystemPunk
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Fique por dentro das últimas novidades, atualizações e lançamentos
            dos nossos jogos e projetos.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <FeaturedNews article={featuredArticle} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input
                placeholder="Buscar por título, conteúdo ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48 bg-zinc-800 border-zinc-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
                <SelectItem value="all">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <div className="text-zinc-400 text-sm">
              {filteredArticles.length}{' '}
              {filteredArticles.length === 1
                ? 'artigo encontrado'
                : 'artigos encontrados'}
            </div>

            {/* Active filters */}
            <div className="flex gap-2">
              {selectedCategory !== 'all' && (
                <Badge
                  variant="outline"
                  className="border-lime-500 text-lime-400"
                >
                  {
                    categoryOptions.find(
                      (opt) => opt.value === selectedCategory
                    )?.label
                  }
                </Badge>
              )}
              {selectedStatus !== 'published' && (
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-400"
                >
                  {selectedStatus === 'all'
                    ? 'Todos os status'
                    : selectedStatus === 'draft'
                      ? 'Rascunhos'
                      : 'Arquivados'}
                </Badge>
              )}
              {searchTerm && (
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-400"
                >
                  &quot;{searchTerm}&quot;
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {otherArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-zinc-500">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load more button (for future pagination) */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Carregar mais artigos
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { FeaturedNews } from '@/components/news/FeaturedNews'
import { NewsCard } from '@/components/news/NewsCard'
import { Button } from '@/components/ui/button'

type Props = {
  featured?: any
  articles: any[]
  isLoading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}

export default function ArticlesGrid({
  featured,
  articles,
  isLoading = false,
  onLoadMore,
  hasMore = false
}: Props) {
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-zinc-700 border-t-lime-500"></div>
          <div className="animate-ping absolute inset-0 rounded-full h-12 w-12 border-2 border-lime-500 opacity-20"></div>
        </div>
        <p className="text-zinc-400 mt-6 font-medium">Carregando artigos...</p>
        <p className="text-zinc-500 text-sm mt-2">
          Aguarde enquanto buscamos o conteúdo
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Featured Article */}
      {featured && (
        <div className="mb-16">
          <FeaturedNews article={featured} />
        </div>
      )}

      {/* Articles Section */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 border border-zinc-700/50">
            <svg
              className="w-10 h-10 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-3">
            Nenhum artigo encontrado
          </h3>
          <p className="text-zinc-500 text-center max-w-md leading-relaxed">
            Tente ajustar os filtros ou termos de busca para encontrar o
            conteúdo que procura.
          </p>
        </div>
      ) : (
        <>
          {/* Articles Count */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50">
            <h2 className="text-lg font-semibold text-zinc-200">
              {articles.length}{' '}
              {articles.length === 1
                ? 'artigo encontrado'
                : 'artigos encontrados'}
            </h2>
            <div className="text-zinc-500 text-sm">
              Ordenado por mais recente
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <NewsCard article={article} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <Button
                variant="outline"
                onClick={onLoadMore}
                disabled={isLoading}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-lime-500/50 transition-all duration-200 px-8 py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-zinc-700 border-t-lime-500"></div>
                    Carregando...
                  </div>
                ) : (
                  'Carregar mais artigos'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

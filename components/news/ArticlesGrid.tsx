'use client'

import React from 'react'
import { FeaturedNews } from '@/components/news/FeaturedNews'
import { NewsCard } from '@/components/news/NewsCard'
import { Button } from '@/components/ui/button'

type Props = {
  featured?: any
  articles: any[]
}

export default function ArticlesGrid({ featured, articles }: Props) {
  return (
    <>
      {featured && (
        <div className="mb-12">
          <FeaturedNews article={featured} />
        </div>
      )}

      {articles.length === 0 ? (
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
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

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
    </>
  )
}

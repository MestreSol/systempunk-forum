'use client'

import React from 'react'
import NewsCard from './NewsCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Article = any

export default function NewsSection({
  articles,
  isLoading
}: {
  articles: Article[]
  isLoading: boolean
}) {
  return (
    <section className="py-20 bg-zinc-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-lime-400 mb-4">
            Últimas Notícias
          </h2>
          <p className="text-xl text-primary-400 max-w-2xl mx-auto">
            Fique por dentro das novidades, atualizações e lançamentos dos
            nossos projetos.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse"
              >
                <div className="aspect-video bg-zinc-800 rounded-t-lg" />
                <div className="p-6">
                  <div className="h-4 bg-zinc-800 rounded mb-2" />
                  <div className="h-6 bg-zinc-800 rounded mb-4" />
                  <div className="h-16 bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/news">
            <Button
              variant="outline"
              className="border-background-700 text-primary-300 hover:bg-background-800"
            >
              Ver Todas as Notícias
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

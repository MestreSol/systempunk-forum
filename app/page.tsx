'use client'

import { NewsArticle } from '@/types/NewsArticle.type'
import { useEffect, useState } from 'react'
import { mockArticles } from '@/mocks/NewsArticles'
import HeroSection from '@/components/layout/home/HeroSection'
import { stats } from '@/mocks/StatsItem'
import { projects } from '@/mocks/Projects'
import { features } from '@/mocks/FeatureItem'
import ProjectsSection from '@/components/layout/home/ProjectsSection'
import NewsSection from '@/components/layout/home/NewsSection'
import WhySection from '@/components/layout/home/WhySection'
import CTASection from '@/components/layout/home/CTASection'

export default function Home() {
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadRecentNews = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const publishedNews = mockArticles
          .filter((article) => article.status === 'published')
          .sort(
            (a, b) =>
              new Date(b.publishDate).getTime() -
              new Date(a.publishDate).getTime()
          )
          .slice(0, 3)
        setRecentNews(publishedNews)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
        setIsLoading(false)
      }
    }
    loadRecentNews()
  }, [])

  return (
    <div className="min-h-screen bg-background-950 text-primary">
      <HeroSection stats={stats} />
      <ProjectsSection projects={projects} />
      <NewsSection articles={recentNews} isLoading={isLoading} />
      <WhySection features={features} />
      <CTASection />
    </div>
  )
}

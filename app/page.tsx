'use client'
import { NewsArticle } from '@/types/NewsArticle.type'
import { useEffect, useState } from 'react'
import { mockArticles } from '@/mocks/NewsArticles'
import HeroSection from '@/components/layout/home/HeroSection'
import { stats } from '@/mocks/StatsItem'
import { projects } from '@/mocks/Projects'
import ProjectCard from '@/components/layout/home/ProjectCard'
import { ArrowRight, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-lime-400 mb-4">
              Nossos Projetos
            </h2>
            <p className="text-xl text-primary-400 max-w-2xl mx-auto">
              Conheça os jogos que estamos desenvolvendo com paixão e dedicação.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-background-700 text-primary-300 hover:bg-background-800"
              >
                Ver Todos os Projetos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

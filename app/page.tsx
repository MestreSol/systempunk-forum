'use client'
import { NewsArticle } from '@/types/NewsArticle.type'
import { useEffect, useState } from 'react'
import { mockArticles } from '@/mocks/NewsArticles'
import HeroSection from '@/components/layout/home/HeroSection'
import { stats } from '@/mocks/StatsItem'
import { projects } from '@/mocks/Projects'
import ProjectCard from '@/components/layout/home/ProjectCard'
import { ArrowRight, Globe, Link, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NewsCard from '@/components/layout/home/NewsCard'
import FeatureItem from '@/components/layout/home/FeatureItem'
import { features } from '@/mocks/FeatureItem'
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
              {recentNews.map((article) => (
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-lime-400 mb-4">
              Por que Systempunk?
            </h2>
            <p className="text-xl text-background-400 max-w-2xl mx-auto">
              Somos apaixonados por criar experiências únicas e memoráveis para
              nossos jogadores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-lime-900/20 to-background-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-lime-400 mb-4">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-xl text-primary-300 mb-8 max-w-2xl mx-auto">
            Faça parte da jornada SystemPunk. Descubra novos jogos, participe de
            discussões e contribua com o desenvolvimento dos nossos projetos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contribuicoes">
              <Button
                size="lg"
                className="bg-lime-600 hover:bg-lime-700 text-white font-semibold"
              >
                <Users className="w-5 h-5 mr-2" />
                Contribuir
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-background-700 text-primary-300 hover:bg-background-800"
              >
                <Globe className="w-5 h-5 mr-2" />
                Sobre Nós
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Building2,
  Target,
  Users,
  Gamepad2,
  BarChart3,
  Award,
  Zap,
  Heart,
  Rocket,
  Eye,
  Coffee,
  CheckCircle,
  Star,
  Download,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'

// Import components
import { MetricCard } from '@/components/about/MetricCard'
import { ProjectDistribution } from '@/components/about/ProjectDistribution'
import { ProjectStatus } from '@/components/about/ProjectStatus'
import { CapabilityCard } from '@/components/about/CapabilityCard'
import { AchievementCard } from '@/components/about/AchievementCard'
import { FutureProjects } from '@/components/about/FutureProjects'
import { ExpansionPlans } from '@/components/about/ExpansionPlans'
import { TeamOverview } from '@/components/about/TeamOverview'

// Import constants
import {
  projectCategories,
  achievements,
  metrics,
  capabilities,
  teamComposition,
  futureProjects,
  expansionItems
} from '@/components/about/constants'

export default function VisaoGeralPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Project statistics
  const totalProjects = 20
  const completedProjects = 15
  const inDevelopmentProjects = 4
  const plannedProjects = 1
  const totalTeamMembers = 8

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <section className="py-12 px-6 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/about/introducao"
            className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Introdução
          </Link>

          <div
            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-lime-500/20 rounded-xl">
                <Building2 className="w-8 h-8 text-lime-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-lime-200 mb-2">
                  Visão Geral
                </h1>
                <p className="text-zinc-400 text-lg">
                  Uma análise completa do SystemPunk: conquistas, capacidades e
                  direção futura
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-5 bg-zinc-900 border-zinc-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-lime-600"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Resumo
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-lime-600"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Projetos
            </TabsTrigger>
            <TabsTrigger
              value="capabilities"
              className="data-[state=active]:bg-lime-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Capacidades
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-lime-600"
            >
              <Award className="w-4 h-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger
              value="future"
              className="data-[state=active]:bg-lime-600"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Futuro
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-lime-400" />
                    <CardTitle className="text-lime-200">
                      Nossa Missão
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    Criar experiências digitais inovadoras que conectam
                    tecnologia e criatividade, inspirando e engajando
                    comunidades através de jogos e aplicações únicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <CardTitle className="text-cyan-200">Nossa Visão</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    Ser reconhecido como um estúdio pioneiro na intersecção
                    entre arte e tecnologia, criando o futuro das experiências
                    interativas digitais.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-rose-400" />
                    <CardTitle className="text-rose-200">
                      Nossos Valores
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-zinc-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      Criatividade sem limites
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      Qualidade excepcional
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      Colaboração inclusiva
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      Inovação constante
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Team Overview */}
            <TeamOverview
              teamData={teamComposition}
              totalMembers={totalTeamMembers}
            />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectDistribution categories={projectCategories} />
              <ProjectStatus
                completed={completedProjects}
                inDevelopment={inDevelopmentProjects}
                planned={plannedProjects}
                total={totalProjects}
              />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lime-200">
                  Projetos em Destaque
                </CardTitle>
                <CardDescription>
                  Nossos trabalhos mais significativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-4">
                    <Gamepad2 className="w-12 h-12 text-lime-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Neon Runners
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      Jogo de corrida cyberpunk com elementos de RPG
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-zinc-300">
                        4.8/5 • 15K downloads
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-cyan-400 font-bold">DT</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      DevTools Suite
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      Conjunto de ferramentas para desenvolvedores indie
                    </p>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-zinc-300">
                        8.2K downloads
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-4">
                    <Smartphone className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Creative Hub
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      App mobile para colaboração criativa
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-zinc-300">
                        2.1K usuários ativos
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Capabilities Tab */}
          <TabsContent value="capabilities" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-lime-200 mb-4">
                Nossas Capacidades
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Uma combinação única de habilidades técnicas e criativas que nos
                permite criar experiências excepcionais
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <CapabilityCard key={index} capability={capability} />
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-lime-200 mb-4">
                Conquistas e Marcos
              </h2>
              <p className="text-zinc-400 text-lg">
                Uma jornada de crescimento, reconhecimento e inovação
              </p>
            </div>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          {/* Future Tab */}
          <TabsContent value="future" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-lime-200 mb-4">
                Visão de Futuro
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Nossos planos, ambições e a direção que estamos tomando para os
                próximos anos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FutureProjects
                projects={futureProjects}
                icon={Rocket}
                title="Próximos Projetos"
              />
              <ExpansionPlans
                items={expansionItems}
                icon={Building2}
                title="Expansão e Crescimento"
              />
            </div>

            <Card className="bg-gradient-to-r from-lime-900/20 to-cyan-900/20 border-lime-500/30">
              <CardContent className="p-8 text-center">
                <Rocket className="w-16 h-16 mx-auto mb-4 text-lime-400" />
                <h3 className="text-2xl font-bold text-lime-200 mb-4">
                  Junte-se à Nossa Jornada
                </h3>
                <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                  Estamos sempre em busca de talentos apaixonados por tecnologia
                  e criatividade. Venha fazer parte do futuro das experiências
                  digitais!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-lime-600 hover:bg-lime-700">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Vagas Abertas
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Conhecer a Equipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

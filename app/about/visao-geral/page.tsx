'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Gamepad2,
  BarChart3,
  Award,
  Zap,
  Heart,
  Rocket,
  Eye,
  Coffee,
  Target
} from 'lucide-react'

// Import components
import { MetricCard } from '@/components/about/MetricCard'
import { ProjectDistribution } from '@/components/about/ProjectDistribution'
import { ProjectStatus } from '@/components/about/ProjectStatus'
import { CapabilityCard } from '@/components/about/CapabilityCard'
import { AchievementCard } from '@/components/about/AchievementCard'
import { FutureProjects } from '@/components/about/FutureProjects'
import { ExpansionPlans } from '@/components/about/ExpansionPlans'
import { TeamOverview } from '@/components/about/TeamOverview'
import { PageHeader } from '@/components/about/PageHeader'
import { SummaryCard, ValueList } from '@/components/about/SummaryCard'
import { FeaturedProjects } from '@/components/about/FeaturedProjects'
import { usePageVisibility } from '@/components/about/usePageVisibility'

// Import constants
import {
  projectCategories,
  achievements,
  metrics,
  capabilities,
  teamComposition,
  futureProjects,
  expansionItems,
  companyValues,
  companyMission,
  companyVision,
  projectStats
} from '@/components/about/constants'

export default function VisaoGeralPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const isVisible = usePageVisibility()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <PageHeader
        title="Visão Geral"
        description="Uma análise completa do SystemPunk: conquistas, capacidades e direção futura"
        backLink={{
          href: '/about/introducao',
          label: 'Voltar à Introdução'
        }}
        isVisible={isVisible}
      />

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
              <SummaryCard
                title="Nossa Missão"
                icon={Target}
                iconColor="text-lime-400"
                titleColor="text-lime-200"
              >
                <p className="text-zinc-300 leading-relaxed">
                  {companyMission}
                </p>
              </SummaryCard>

              <SummaryCard
                title="Nossa Visão"
                icon={Eye}
                iconColor="text-cyan-400"
                titleColor="text-cyan-200"
              >
                <p className="text-zinc-300 leading-relaxed">{companyVision}</p>
              </SummaryCard>

              <SummaryCard
                title="Nossos Valores"
                icon={Heart}
                iconColor="text-rose-400"
                titleColor="text-rose-200"
              >
                <ValueList values={companyValues} />
              </SummaryCard>
            </div>

            {/* Team Overview */}
            <TeamOverview teamData={teamComposition} totalMembers={8} />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectDistribution categories={projectCategories} />
              <ProjectStatus
                completed={projectStats.completed}
                inDevelopment={projectStats.inDevelopment}
                planned={projectStats.planned}
                total={projectStats.total}
              />
            </div>

            <FeaturedProjects />
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
                title="Expansão e Crescimento"
                icon={Users}
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

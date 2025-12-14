'use client'
import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Users, Target, Eye, Heart } from 'lucide-react'

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
import { FutureCTA } from '@/components/about/FutureCTA'
import { NavigationTabs } from '@/components/about/NavigationTabs'
import {
  TabContentWrapper,
  TabSectionHeader
} from '@/components/about/TabContentWrapper'
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
        description="Uma análise completa do Systempunk: conquistas, capacidades e direção futura"
        isVisible={isVisible}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="space-y-8"
        >
          <NavigationTabs />

          {/* Overview Tab */}
          <TabsContent value="overview">
            <TabContentWrapper>
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
          </TabContentWrapper>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <TabContentWrapper>
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
          </TabContentWrapper>
        </TabsContent>

        {/* Capabilities Tab */}
        <TabsContent value="capabilities">
          <TabContentWrapper>
            <TabSectionHeader
              title="Nossas Capacidades"
              description="Uma combinação única de habilidades técnicas e criativas que nos permite criar experiências excepcionais"
            />

            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <CapabilityCard key={index} capability={capability} />
              ))}
            </div>
          </TabContentWrapper>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <TabContentWrapper>
            <TabSectionHeader
              title="Conquistas e Marcos"
              description="Uma jornada de crescimento, reconhecimento e inovação"
            />

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} achievement={achievement} />
              ))}
            </div>
          </TabContentWrapper>
        </TabsContent>

        {/* Future Tab */}
        <TabsContent value="future">
          <TabContentWrapper>
            <TabSectionHeader
              title="Visão de Futuro"
              description="Nossos planos, ambições e a direção que estamos tomando para os próximos anos"
            />

            <div className="grid md:grid-cols-2 gap-8">
              <FutureProjects
                projects={futureProjects}
                title="Próximos Projetos"
              />
              <ExpansionPlans
                items={expansionItems}
                title="Expansão e Crescimento"
                icon={Users}
              />
            </div>

            <FutureCTA />
          </TabContentWrapper>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

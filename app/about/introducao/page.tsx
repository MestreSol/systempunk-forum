'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePageVisibility } from '@/components/about/usePageVisibility'

import { HeroSection } from '@/components/about/HeroSection'
import { StatsSection } from '@/components/about/StatsSection'
import { TechnologyCards } from '@/components/about/TechnologyCards'
import { Timeline } from '@/components/about/Timeline'
import { TeamSection } from '@/components/about/TeamSection'
import { ProjectsTeaser } from '@/components/about/ProjectsTeaser'
import { ContactCTA } from '@/components/about/ContactCTA'
import { AboutTab } from '@/components/about/introducao/AboutTab'
import { MissionTab } from '@/components/about/introducao/MissionTab'
import { TabHeading } from '@/components/about/introducao/TabHeading'
import { introTabs } from '@/components/about/introducao/data'

import {
  teamMembers,
  milestones,
  introStats,
  technologies
} from '@/components/about/constants'

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}

export default function IntroducaoPage() {
  const isVisible = usePageVisibility()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <HeroSection
        isVisible={isVisible}
        onExploreClick={() => scrollToSection('projetos')}
        onTeamClick={() => scrollToSection('equipe')}
      />

      <StatsSection stats={introStats} />

      <div className="max-w-6xl mx-auto px-6">
        <Tabs defaultValue="sobre" className="py-16">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-900 border-zinc-800">
            {introTabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:bg-lime-600"
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sobre" className="mt-8 space-y-8">
            <AboutTab />
          </TabsContent>

          <TabsContent value="missao" className="mt-8">
            <MissionTab />
          </TabsContent>

          <TabsContent value="tecnologias" className="mt-8">
            <TabHeading
              title="Nossa Stack Tecnológica"
              subtitle="Utilizamos as melhores tecnologias para criar experiências incríveis"
            />
            <TechnologyCards technologies={technologies} />
          </TabsContent>

          <TabsContent value="historia" className="mt-8">
            <TabHeading
              title="Nossa Jornada"
              subtitle="5 anos de evolução, criação e inovação"
              className="mb-12"
            />
            <Timeline milestones={milestones} />
          </TabsContent>
        </Tabs>
      </div>

      <TeamSection members={teamMembers} />
      <ProjectsTeaser />
      <ContactCTA />
    </div>
  )
}

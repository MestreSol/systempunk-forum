'use client'

import { usePageVisibility } from '@/components/about/usePageVisibility'

import { HeroSection } from '@/components/about/HeroSection'
import { StatsSection } from '@/components/about/StatsSection'
import { TeamSection } from '@/components/about/TeamSection'
import { ProjectsTeaser } from '@/components/about/ProjectsTeaser'
import { ContactCTA } from '@/components/about/ContactCTA'
import { SectionNav } from '@/components/about/introducao/SectionNav'
import { AboutSection } from '@/components/about/introducao/AboutSection'
import { MissionSection } from '@/components/about/introducao/MissionSection'
import { StackSection } from '@/components/about/introducao/StackSection'
import { HistorySection } from '@/components/about/introducao/HistorySection'

import { teamMembers, introStats } from '@/components/about/constants'

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
      <SectionNav />

      <AboutSection />
      <MissionSection />
      <StackSection />
      <HistorySection />
      <TeamSection members={teamMembers} />
      <ProjectsTeaser />
      <ContactCTA />
    </div>
  )
}

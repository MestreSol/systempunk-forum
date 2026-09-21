import { SectionHeading } from './SectionHeading'
import { TechnologyCards } from '@/components/about/TechnologyCards'
import { technologies } from '@/components/about/constants'

export function StackSection() {
  return (
    <section id="stack" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-14">
      <SectionHeading
        eyebrow="tech stack"
        title="Nossa stack tecnológica"
        subtitle="Utilizamos as melhores tecnologias para criar experiências incríveis."
      />
      <TechnologyCards technologies={technologies} />
    </section>
  )
}

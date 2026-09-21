import { SectionHeading } from './SectionHeading'
import { Timeline } from '@/components/about/Timeline'
import { milestones } from '@/components/about/constants'

export function HistorySection() {
  return (
    <section id="historia" className="py-20 px-6 bg-zinc-900/40 scroll-mt-14">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="história"
          title="Nossa jornada"
          subtitle="5 anos de evolução, criação e inovação."
        />
        <Timeline milestones={milestones} />
      </div>
    </section>
  )
}

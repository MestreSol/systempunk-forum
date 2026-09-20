import type { LucideIcon } from 'lucide-react'
import { SectionCard } from '@/components/about/common/SectionCard'
import { IconBox } from '@/components/about/common/IconBox'

interface PillarCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function PillarCard({ icon: Icon, title, description }: PillarCardProps) {
  return (
    <SectionCard>
      <div className="flex items-start gap-4">
        <IconBox>
          <Icon className="w-5 h-5 text-lime-400" />
        </IconBox>
        <div>
          <h3 className="text-lg font-semibold text-lime-200 mb-1">{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </SectionCard>
  )
}

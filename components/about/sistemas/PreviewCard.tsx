import type { LucideIcon } from 'lucide-react'
import { SectionCard } from '@/components/about/common/SectionCard'
import { IconBox } from '@/components/about/common/IconBox'
import { TechBadge } from '@/components/about/common/TechBadge'
import { Badge } from '@/components/ui/badge'
import type { PreviewItem } from './data'

const CATEGORY_STYLES: Record<PreviewItem['category'], string> = {
  Personagem: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
  Item: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
  Ataque: 'border-amber-500/30 text-amber-300 bg-amber-500/10'
}

interface PreviewCardProps {
  icon: LucideIcon
  category: PreviewItem['category']
  title: string
  teaser: string
  stats: string[]
}

export function PreviewCard({
  icon: Icon,
  category,
  title,
  teaser,
  stats
}: PreviewCardProps) {
  return (
    <SectionCard className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <IconBox>
          <Icon className="w-5 h-5 text-lime-400" />
        </IconBox>
        <Badge variant="outline" className={CATEGORY_STYLES[category]}>
          {category}
        </Badge>
      </div>

      <h3 className="text-lg font-semibold text-lime-200 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
        {teaser}
      </p>

      <div className="flex flex-wrap gap-2">
        {stats.map((stat) => (
          <TechBadge key={stat}>{stat}</TechBadge>
        ))}
      </div>
    </SectionCard>
  )
}

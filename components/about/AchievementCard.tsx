import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Achievement } from '@/types/Achievement.type'
import { Calendar } from 'lucide-react'
import { IconBox } from './common/IconBox'
import { StatusBadge } from './common/StatusBadge'

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  // status rendering delegated to StatusBadge

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-500/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <IconBox>
            <achievement.icon className="w-6 h-6 text-lime-400" />
          </IconBox>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">
                {achievement.title}
              </h3>
              <StatusBadge status={achievement.status} />
            </div>
            <p className="text-zinc-400 mb-3">{achievement.description}</p>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {achievement.date}
              </span>
              <Badge variant="outline" className="text-xs">
                {achievement.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

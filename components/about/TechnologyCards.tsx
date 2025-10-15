import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TechnologyCardProps {
  technologies: {
    name: string
    icon: React.ComponentType<{ className?: string }>
    category: string
  }[]
}

export function TechnologyCards({ technologies }: TechnologyCardProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {technologies.map((tech, index) => (
        <Card
          key={index}
          className="bg-zinc-900 border-zinc-800 hover:border-lime-500/50 transition-colors"
        >
          <CardContent className="p-6 text-center">
            <tech.icon className="w-12 h-12 mx-auto mb-4 text-lime-400" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {tech.name}
            </h3>
            <Badge variant="outline" className="text-zinc-400 border-zinc-600">
              {tech.category}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

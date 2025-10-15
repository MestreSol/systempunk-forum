import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface ProjectCategory {
  name: string
  count: number
  percentage: number
  color: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface ProjectDistributionProps {
  categories: ProjectCategory[]
}

export function ProjectDistribution({ categories }: ProjectDistributionProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">
          Distribuição de Projetos
        </CardTitle>
        <CardDescription>Breakdown por categoria e tipo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <category.icon className="w-5 h-5 text-zinc-400" />
                <span className="text-white font-medium">{category.name}</span>
              </div>
              <span className="text-zinc-400">{category.count} projetos</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={category.percentage} className="flex-1" />
              <span className="text-sm text-zinc-400 w-12">
                {category.percentage}%
              </span>
            </div>
            <p className="text-sm text-zinc-500">{category.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

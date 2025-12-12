import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'

interface ProjectStatusProps {
  completed: number
  inDevelopment: number
  planned: number
  total: number
}

export function ProjectStatus({
  completed,
  inDevelopment,
  planned,
  total
}: ProjectStatusProps) {
  const getPercentage = (value: number) => Math.round((value / total) * 100)

  const statusItems = [
    {
      icon: CheckCircle,
      label: 'Concluídos',
      value: completed,
      percentage: getPercentage(completed),
      color: 'text-green-400'
    },
    {
      icon: AlertCircle,
      label: 'Em Desenvolvimento',
      value: inDevelopment,
      percentage: getPercentage(inDevelopment),
      color: 'text-yellow-400'
    },
    {
      icon: Lightbulb,
      label: 'Planejados',
      value: planned,
      percentage: getPercentage(planned),
      color: 'text-blue-400'
    }
  ]

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200">Status dos Projetos</CardTitle>
        <CardDescription>Estado atual do nosso portfólio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white">{item.label}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-sm text-zinc-400">
                  {item.percentage}% do total
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<string, string> = {
    completed: 'bg-green-600 hover:bg-green-700 text-white',
    concluded: 'bg-green-600 hover:bg-green-700 text-white',
    'in-progress': 'bg-yellow-600 hover:bg-yellow-700 text-white',
    planned: 'bg-blue-600 hover:bg-blue-700 text-white'
  }

  const cls = map[status] ?? 'border-zinc-600 text-zinc-300'

  const label =
    status === 'completed' || status === 'concluded'
      ? 'Concluído'
      : status === 'in-progress'
        ? 'Em Andamento'
        : status === 'planned'
          ? 'Planejado'
          : 'Status'

  return <Badge className={cls}>{label}</Badge>
}

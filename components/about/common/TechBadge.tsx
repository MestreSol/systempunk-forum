import { Badge } from '@/components/ui/badge'

interface TechBadgeProps {
  children: React.ReactNode
}

export function TechBadge({ children }: TechBadgeProps) {
  return (
    <Badge variant="outline" className="text-xs border-zinc-600">
      {children}
    </Badge>
  )
}

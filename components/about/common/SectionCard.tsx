import { Card, CardContent } from '@/components/ui/card'

interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <Card className={`bg-zinc-900 border-zinc-800 ${className}`}>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}

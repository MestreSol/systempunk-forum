export interface Achievement {
  title: string
  description: string
  date: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  status: 'completed' | 'in-progress' | 'planned'
}

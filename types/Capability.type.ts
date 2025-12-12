export interface Capability {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  technologies: string[]
  strength: number
}

export interface Metric {
  label: string
  current: number
  previous: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  icon: React.ComponentType<{ className?: string }>
}

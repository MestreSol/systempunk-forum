import type { ReactNode } from 'react'

export interface Project {
  title: ReactNode
  timeline: ReactNode
  id: string
  name: string
  description: string
  status: string
  image: string
  tags: string[]
  downloads: string
  rating: number
  featured: boolean
}

export interface FutureProject {
  title: string
  description: string
  status: 'Planned' | 'In Development' | 'On Hold'
  expectedRelease: string
  technologies: string[]
  link?: string
}

export interface ProjectCategory {
  name: string
  count: number
  percentage: number
  color: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export interface FeaturedProject {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  stats: {
    type: 'rating' | 'downloads' | 'users'
    value: string
  }
}

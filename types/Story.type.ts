export interface Story {
  id: string
  title: string
  category:
    | 'character'
    | 'event'
    | 'location'
    | 'technology'
    | 'culture'
    | 'mystery'
  era:
    | 'pre-digital'
    | 'dawn-matrix'
    | 'neural-awakening'
    | 'neon-renaissance'
    | 'cyber-punk'
    | 'system-harmony'
  summary: string
  content: string
  intro?: string
  tags: string[]
  connections: string[] // IDs of connected stories
  position: {
    x: number
    y: number
    z: number
  }
  color: string
  importance: 'low' | 'medium' | 'high' | 'critical'
  status: 'draft' | 'complete' | 'archived'
  lastModified: string
  author?: string
  categorySource?: 'header' | 'fallback'
  filePath?: string // Relative path from content/ folder to the markdown file
}

export interface StoryConnection {
  from: string
  to: string
  type:
    | 'causes'
    | 'influences'
    | 'mentions'
    | 'precedes'
    | 'conflicts'
    | 'supports'
  strength: number // 0-1
  description?: string
}

export interface StoryCategory {
  id: string
  name: string
  color: string
  description: string
  icon: string
}

// Shape of the rich per-game content served from public/projects/jogo/{id}.json.
// Every field beyond `hero` is optional: games like MON only fill in a subset
// (hero/fastDescription/lastNews/lore/media/footer), so each detail-page
// section must render conditionally.

export interface ProjectHero {
  image: string
  title: string
  subtitle: string
}

export interface ProjectFastDescription {
  description: string
  video?: string
}

export interface ProjectNewsCard {
  tags: string[]
  title: string
  subtitle: string
  image: string
  year: number
  readingTime: string
}

export interface ProjectLoreItem {
  title: string
  description: string
  image: string
}

// Keys are free-form category names (e.g. "marketManagement"); each maps to
// a flat list of system/feature names for that category.
export type ProjectSystems = Record<string, string[]>

export type SprintActivityStatus = 'done' | 'ongoing' | 'stopped' | 'todo'

export interface ProjectSprintActivity {
  name: string
  status: SprintActivityStatus
}

export interface ProjectSprint {
  title: string
  activities: ProjectSprintActivity[]
}

export interface ProjectRoadmapItem {
  title: string
  date: string
  description: string
}

export interface ProjectTeamMember {
  name: string
  role: string
  photo: string
  description: string
}

export interface ProjectFooterInfo {
  company: string
  rating: string
  platforms: string[]
  copyright: string
  cnpj?: string
}

export interface ProjectDetail {
  hero: ProjectHero
  platforms?: string[]
  fastDescription?: ProjectFastDescription
  lastNews?: ProjectNewsCard[]
  lore?: ProjectLoreItem[]
  systems?: ProjectSystems
  media?: string[]
  sprints?: ProjectSprint[]
  roadmap?: ProjectRoadmapItem[]
  team?: ProjectTeamMember[]
  footer?: ProjectFooterInfo
}

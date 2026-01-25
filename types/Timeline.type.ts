export interface UniverseEra {
  id: string
  name: string
  period: string
  motto: string
  description: string
  backgroundImage?: string
  backgroundGradient: string
  textColor: string
  accentColor: string
  icon: any
  storyPath?: string
  details: {
    overview: string
    keyEvents: string[]
    technology: string[]
    culture: string
  }
}

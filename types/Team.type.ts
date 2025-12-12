export interface TeamMember {
  name: string
  role: string
  specialties: string[]
  avatar: string
  bio: string
  socials: {
    github?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

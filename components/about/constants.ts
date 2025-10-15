import { teamMembers as tm } from '@/mocks/Team'
import { milestones as ms } from '@/mocks/Milestones'
import { technologies as techs } from '@/mocks/Technology'
import { capabilities as caps, metrics as mtrs } from '@/mocks/Capability'
import { achievements as ach } from '@/mocks/Achievements'

// Exports expected by about pages
export const teamMembers = tm
export const milestones = ms
export const introStats = mtrs
export const technologies = techs
export const projectCategories: any[] = []
export const achievements = ach
export const metrics = mtrs
export const capabilities = caps
export const teamComposition: any[] = []
export const futureProjects: any[] = []
export const expansionItems: any[] = []

export const companyValues: string[] = [
  'Criatividade',
  'Qualidade',
  'Colaboração',
  'Inovação'
]

export const companyMission =
  'Criar experiências digitais que inspirem e conectem pessoas.'
export const companyVision =
  'Ser referência em projetos que unem arte e tecnologia.'

export const projectStats = {
  completed: 12,
  inDevelopment: 4,
  planned: 6,
  total: 22
}

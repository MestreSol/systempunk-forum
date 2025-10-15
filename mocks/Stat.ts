import { Stat } from '@/types/Stat.type'
import { Clock, Star, Target, Users } from 'lucide-react'

export const introStats: Stat[] = [
  { label: 'Projetos Concluídos', value: '15+', icon: Target },
  { label: 'Desenvolvedores', value: '8', icon: Users },
  { label: 'Anos de Experiência', value: '5', icon: Clock },
  { label: 'Downloads', value: '50K+', icon: Star }
]

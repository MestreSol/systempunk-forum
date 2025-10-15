import { StatItem } from '@/types/StatItem.type'
import { Download, Star, Trophy, Users } from 'lucide-react'

export const stats: StatItem[] = [
  { label: 'Jogadores Ativos', value: '25,000+', icon: Users },
  { label: 'Downloads Totais', value: '100,000+', icon: Download },
  { label: 'Avaliação Média', value: '4.7/5', icon: Star },
  { label: 'Projetos Lançados', value: '8+', icon: Trophy }
]

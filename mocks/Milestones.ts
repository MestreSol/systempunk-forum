import { Milestone } from '@/types/Milestone.type'
import { Award, Code, Gamepad2, Globe, Rocket, Users } from 'lucide-react'

export const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Fundação',
    description:
      'SystemPunk nasce da paixão por unir tecnologia e criatividade',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Primeiro Projeto',
    description: "Lançamento do nosso primeiro jogo indie 'Neon Runners'",
    icon: Gamepad2
  },
  {
    year: '2022',
    title: 'Expansão da Equipe',
    description: 'Crescimento para uma equipe multidisciplinar de 8 pessoas',
    icon: Users
  },
  {
    year: '2023',
    title: 'Open Source',
    description: 'Abertura de ferramentas e frameworks para a comunidade',
    icon: Code
  },
  {
    year: '2024',
    title: 'Reconhecimento',
    description: 'Prêmios em festivais indie e reconhecimento da crítica',
    icon: Award
  },
  {
    year: '2025',
    title: 'Futuro',
    description: 'Novos projetos ambiciosos e expansão internacional',
    icon: Globe
  }
]

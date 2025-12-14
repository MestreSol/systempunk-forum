import { Milestone } from '@/types/Milestone.type'
import { Award, Code, Gamepad2, Globe, Rocket, Users } from 'lucide-react'

export const milestones: Milestone[] = [
  {
    year: '2019',
    title: 'Início',
    description: 'Projeto começou em 2019 durante a pandemia com a ideia de um projeto muito grande',
    icon: Rocket
  },
  {
    year: '2020',
    title: 'Redução e Reestruturação',
    description: 'Equipe era enorme; reduzimos o escopo e a equipe de voluntários',
    icon: Users
  },
  {
    year: '2021',
    title: 'Livro',
    description: 'Iniciamos a construção do livro',
    icon: Code
  },
  {
    year: '2022',
    title: 'Sistema de RPG e Universo',
    description: 'Desenvolvimento do sistema de RPG e construção do universo',
    icon: Globe
  },
  {
    year: '2023',
    title: 'Tower of Fallmora & N.O.V.A.',
    description: 'Começamos o projeto 2D Tower of Fallmora e o protótipo do N.O.V.A.',
    icon: Gamepad2
  },
  {
    year: '2024',
    title: 'Monocrom & Rental Rush',
    description: 'Iniciamos Monocrom e Rental Rush',
    icon: Award
  }
]

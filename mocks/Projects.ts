import { Project } from '@/types/Project.type'

export const projects: Project[] = [
  {
    id: 'RR',
    name: 'Dawson Miller Supermarket Systems',
    description:
      'Gerencie seu próprio supermercado neste simulador de negócios realista e envolvente.',
    status: 'Beta 0.8',
    image: '/RR.png',
    tags: ['Simulação', 'Negócios', 'Estratégia'],
    downloads: '15k+',
    rating: 4.8,
    featured: true
  },
  {
    id: 'MON',
    name: 'Project MON',
    description:
      'Um projeto ambicioso que está sendo desenvolvido com muito carinho pela equipe.',
    status: 'Em Desenvolvimento',
    image: '/MON.png',
    tags: ['Aventura', 'RPG', 'Indie'],
    downloads: '2k+',
    rating: 4.5,
    featured: false
  },
  {
    id: 'A1',
    name: 'Project Alpha',
    description:
      'Novo projeto experimental com mecânicas inovadoras e gameplay único.',
    status: 'Alpha',
    image: '/A1.jpg',
    tags: ['Experimental', 'Inovação', 'Indie'],
    downloads: '500+',
    rating: 4.2,
    featured: false
  }
]

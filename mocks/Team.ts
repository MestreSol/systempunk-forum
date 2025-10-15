import { TeamMember } from '@/types/Team.type'

export const teamMembers: TeamMember[] = [
  {
    name: 'Alex Chen',
    role: 'Founder & Lead Developer',
    specialties: ['Full-Stack', 'Game Dev', 'AI/ML'],
    avatar: '/api/placeholder/100/100',
    bio: 'Apaixonado por criar experiências digitais únicas que unem tecnologia e criatividade.',
    socials: {
      github: 'alexchen',
      twitter: 'alexchen_dev',
      linkedin: 'alexchen'
    }
  },
  {
    name: 'Maya Rodriguez',
    role: 'Creative Director',
    specialties: ['UI/UX', 'Game Design', 'Art Direction'],
    avatar: '/api/placeholder/100/100',
    bio: 'Designer visionária com foco em narrativas visuais e experiências imersivas.',
    socials: {
      twitter: 'maya_creates',
      linkedin: 'mayarodriguez'
    }
  },
  {
    name: 'Lucas Silva',
    role: 'Tech Lead',
    specialties: ['Architecture', 'DevOps', 'Security'],
    avatar: '/api/placeholder/100/100',
    bio: 'Especialista em sistemas robustos e escaláveis para projetos de grande impacto.',
    socials: {
      github: 'lucas_silva',
      linkedin: 'lucassilva'
    }
  },
  {
    name: 'Sophie Kim',
    role: 'Community Manager',
    specialties: ['Marketing', 'Content', 'Events'],
    avatar: '/api/placeholder/100/100',
    bio: 'Conecta desenvolvedores e gamers, criando uma comunidade vibrante e inclusiva.',
    socials: {
      twitter: 'sophie_community',
      instagram: 'sophiekim_sm'
    }
  }
]

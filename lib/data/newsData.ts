export interface NewsArticle {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  category: 'update' | 'announcement' | 'feature' | 'community' | 'event'
  tags: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  readTime: number
  views: number
  featured: boolean
  image?: string
  imageAlt?: string
}

export const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Novo Sistema de Narrativas Interativas',
    slug: 'novo-sistema-narrativas-interativas',
    summary: 'Apresentamos o revolucionário sistema de histórias conectadas do SystemPunk.',
    content: 'Conteúdo completo do artigo...',
    category: 'feature',
    tags: ['narrativa', 'interativo', 'sistema'],
    author: 'Equipe SystemPunk',
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 5,
    views: 1250,
    featured: true,
    image: '/news/narrativas-sistema.avif',
    imageAlt: 'Sistema de Narrativas SystemPunk'
  },
  {
    id: '2',
    title: 'Atualização da Interface 3D',
    slug: 'atualizacao-interface-3d',
    summary: 'Melhorias significativas na experiência de navegação 3D.',
    content: 'Conteúdo completo do artigo...',
    category: 'update',
    tags: ['3d', 'interface', 'ux'],
    author: 'Equipe de Desenvolvimento',
    publishedAt: '2025-01-10T14:30:00Z',
    readTime: 3,
    views: 890,
    featured: false,
    image: '/news/interface-3d.avif',
    imageAlt: 'Nova Interface 3D'
  }
]

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    update: 'Atualização',
    announcement: 'Anúncio',
    feature: 'Novidade',
    community: 'Comunidade',
    event: 'Evento'
  }
  return labels[category] || category
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return mockArticles.find(article => article.slug === slug)
}

export function getRelatedArticles(currentId: string, limit = 3): NewsArticle[] {
  return mockArticles
    .filter(article => article.id !== currentId)
    .slice(0, limit)
}
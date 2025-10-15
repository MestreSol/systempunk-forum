export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  status: 'draft' | 'published' | 'archived'
  category: string
  tags: string[]
  featuredImage: string
  author: string
  publishDate: string
  lastModified: string
  views: number
  slug: string
}

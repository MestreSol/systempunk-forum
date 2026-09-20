import fs from 'fs/promises'
import path from 'path'
import { prisma } from './prisma'
import { parseBlockData, parseTags } from './serialize'
import { slugify } from '@/lib/utils'
import { mockArticles } from '@/mocks/NewsArticles'
import type { NewsArticle } from '@/types/NewsArticle.type'
import type { NewsBlockRecord } from './blockTypes'

const LEGACY_PROJECT_IDS = ['RR', 'MON', 'NOV']

export interface LegacyNewsCard {
  tags: string[]
  title: string
  subtitle: string
  image: string
  year: number
  readingTime: string
  content?: string
}

export interface LegacyProjectNews {
  projectId: string
  news: LegacyNewsCard
}

export interface DbArticleForDisplay {
  id: string
  title: string
  excerpt: string
  slug: string
  category: string
  tags: string[]
  coverImage: string | null
  author: string
  status: 'draft' | 'published'
  publishDate: string | null
  updatedAt: string
  views: number
  blocks: NewsBlockRecord[]
}

export type ArticleDisplayResult =
  | { source: 'db'; article: DbArticleForDisplay }
  | { source: 'mock'; article: NewsArticle }
  | { source: 'legacy'; article: LegacyProjectNews }

function estimateContentFromBlocks(blocks: NewsBlockRecord[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return block.data.text
        case 'paragraph':
          return block.data.markdown
        case 'quote':
          return block.data.text
        case 'callout':
          return block.data.text
        default:
          return ''
      }
    })
    .join(' ')
}

function toNewsBlockRecords(
  blocks: { id: string; order: number; type: string; data: string }[]
): NewsBlockRecord[] {
  return blocks.map((block) => ({
    id: block.id,
    order: block.order,
    type: block.type,
    data: parseBlockData(block.data)
  })) as NewsBlockRecord[]
}

export async function getAllPublishedArticles(): Promise<NewsArticle[]> {
  const dbArticles = await prisma.newsArticle.findMany({
    where: { status: 'published' },
    include: { blocks: true },
    orderBy: { publishDate: 'desc' }
  })

  const converted: NewsArticle[] = dbArticles.map((article) => {
    const blocks = toNewsBlockRecords(article.blocks)
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: estimateContentFromBlocks(blocks),
      status: article.status,
      category: article.category,
      tags: parseTags(article.tags),
      featuredImage: article.coverImage ?? '',
      author: article.author,
      publishDate: (article.publishDate ?? article.createdAt).toISOString(),
      lastModified: article.updatedAt.toISOString(),
      views: article.views,
      slug: article.slug
    }
  })

  return [
    ...mockArticles.filter((article) => article.status === 'published'),
    ...converted
  ]
}

export async function getArticleBySlugForDisplay(
  slug: string
): Promise<ArticleDisplayResult | null> {
  const dbArticle = await prisma.newsArticle.findUnique({
    where: { slug },
    include: { blocks: { orderBy: { order: 'asc' } } }
  })

  if (dbArticle) {
    return {
      source: 'db',
      article: {
        id: dbArticle.id,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        slug: dbArticle.slug,
        category: dbArticle.category,
        tags: parseTags(dbArticle.tags),
        coverImage: dbArticle.coverImage,
        author: dbArticle.author,
        status: dbArticle.status,
        publishDate: dbArticle.publishDate
          ? dbArticle.publishDate.toISOString()
          : null,
        updatedAt: dbArticle.updatedAt.toISOString(),
        views: dbArticle.views,
        blocks: toNewsBlockRecords(dbArticle.blocks)
      }
    }
  }

  const mockArticle = mockArticles.find((article) => article.slug === slug)
  if (mockArticle) {
    return { source: 'mock', article: mockArticle }
  }

  for (const projectId of LEGACY_PROJECT_IDS) {
    try {
      const filePath = path.join(
        process.cwd(),
        'public',
        'projects',
        'jogo',
        `${projectId}.json`
      )
      const raw = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(raw)
      if (Array.isArray(data.lastNews)) {
        const found = (data.lastNews as LegacyNewsCard[]).find(
          (news) => slugify(news.title) === slug
        )
        if (found) {
          return { source: 'legacy', article: { projectId, news: found } }
        }
      }
    } catch {
      continue
    }
  }

  return null
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/news/prisma'
import { parseTags, stringifyTags } from '@/lib/news/serialize'
import { slugify } from '@/lib/utils'

export async function GET() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { updatedAt: 'desc' }
  })

  return NextResponse.json({
    articles: articles.map((article) => ({
      ...article,
      tags: parseTags(article.tags)
    }))
  })
}

async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || 'noticia'
  let candidate = base
  let suffix = 1

  while (await prisma.newsArticle.findUnique({ where: { slug: candidate } })) {
    suffix += 1
    candidate = `${base}-${suffix}`
  }

  return candidate
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'Título é obrigatório' }, { status: 400 })
  }

  const slug = await generateUniqueSlug(body.title)

  const article = await prisma.newsArticle.create({
    data: {
      slug,
      title: body.title.trim(),
      excerpt: typeof body.excerpt === 'string' ? body.excerpt : '',
      coverImage:
        typeof body.coverImage === 'string' && body.coverImage
          ? body.coverImage
          : null,
      category: typeof body.category === 'string' ? body.category : 'geral',
      tags: stringifyTags(
        Array.isArray(body.tags)
          ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
          : []
      ),
      author: typeof body.author === 'string' ? body.author : ''
    }
  })

  return NextResponse.json(
    { article: { ...article, tags: parseTags(article.tags) } },
    { status: 201 }
  )
}

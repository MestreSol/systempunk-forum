import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/news/prisma'
import { parseBlockData, parseTags, stringifyTags } from '@/lib/news/serialize'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const article = await prisma.newsArticle.findUnique({
    where: { id },
    include: { blocks: { orderBy: { order: 'asc' } } }
  })

  if (!article) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  return NextResponse.json({
    article: {
      ...article,
      tags: parseTags(article.tags),
      blocks: article.blocks.map((block) => ({
        id: block.id,
        type: block.type,
        order: block.order,
        data: parseBlockData(block.data)
      }))
    }
  })
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Corpo inválido' }, { status: 400 })
  }

  const existing = await prisma.newsArticle.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  const data: Record<string, unknown> = {}
  if (typeof body.title === 'string') data.title = body.title.trim()
  if (typeof body.excerpt === 'string') data.excerpt = body.excerpt
  if (typeof body.coverImage === 'string' || body.coverImage === null) {
    data.coverImage = body.coverImage || null
  }
  if (typeof body.category === 'string') data.category = body.category
  if (Array.isArray(body.tags)) {
    data.tags = stringifyTags(
      body.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
    )
  }
  if (typeof body.author === 'string') data.author = body.author
  if (body.status === 'draft' || body.status === 'published') {
    data.status = body.status
    if (body.status === 'published' && !existing.publishDate) {
      data.publishDate = new Date()
    }
  }

  const article = await prisma.newsArticle.update({ where: { id }, data })

  return NextResponse.json({
    article: { ...article, tags: parseTags(article.tags) }
  })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  await prisma.newsArticle.delete({ where: { id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}

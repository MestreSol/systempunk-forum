import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/news/prisma'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function POST(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const article = await prisma.newsArticle.findUnique({ where: { slug } })

  if (!article) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  await prisma.newsArticle.update({
    where: { slug },
    data: { views: { increment: 1 } }
  })

  return NextResponse.json({ ok: true })
}

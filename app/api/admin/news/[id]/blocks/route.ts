import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/news/prisma'
import { parseBlockData, stringifyBlockData } from '@/lib/news/serialize'
import { isBlockType } from '@/lib/news/blockTypes'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface IncomingBlock {
  id?: string
  type: string
  data: unknown
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const body = await request.json().catch(() => null)

  if (!body || !Array.isArray(body.blocks)) {
    return NextResponse.json({ error: 'Corpo inválido' }, { status: 400 })
  }

  const article = await prisma.newsArticle.findUnique({ where: { id } })
  if (!article) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  const incoming = (body.blocks as IncomingBlock[]).filter(
    (block) => typeof block.type === 'string' && isBlockType(block.type)
  )

  const existingBlocks = await prisma.newsBlock.findMany({
    where: { articleId: id }
  })
  const existingIds = new Set(existingBlocks.map((block) => block.id))
  const incomingIds = new Set(
    incoming.filter((block) => block.id).map((block) => block.id as string)
  )
  const idsToDelete = [...existingIds].filter(
    (existingId) => !incomingIds.has(existingId)
  )

  await prisma.$transaction([
    ...(idsToDelete.length
      ? [prisma.newsBlock.deleteMany({ where: { id: { in: idsToDelete } } })]
      : []),
    ...incoming.map((block, index) =>
      block.id && existingIds.has(block.id)
        ? prisma.newsBlock.update({
            where: { id: block.id },
            data: {
              type: block.type,
              order: index,
              data: stringifyBlockData(block.data)
            }
          })
        : prisma.newsBlock.create({
            data: {
              articleId: id,
              type: block.type,
              order: index,
              data: stringifyBlockData(block.data)
            }
          })
    )
  ])

  const saved = await prisma.newsBlock.findMany({
    where: { articleId: id },
    orderBy: { order: 'asc' }
  })

  return NextResponse.json({
    blocks: saved.map((block) => ({
      id: block.id,
      type: block.type,
      order: block.order,
      data: parseBlockData(block.data)
    }))
  })
}

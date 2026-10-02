import { notFound } from 'next/navigation'
import { prisma } from '@/lib/news/prisma'
import { parseBlockData, parseTags } from '@/lib/news/serialize'
import { BlockEditor } from '@/components/admin/BlockEditor'
import type { BlockType } from '@/lib/news/blockTypes'

interface EditPageParams {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: EditPageParams) {
  const { id } = await params
  const article = await prisma.newsArticle.findUnique({
    where: { id },
    include: { blocks: { orderBy: { order: 'asc' } } }
  })

  if (!article) {
    notFound()
  }

  return (
    <BlockEditor
      article={{
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        coverImage: article.coverImage ?? '',
        category: article.category,
        tags: parseTags(article.tags),
        author: article.author,
        status: article.status,
        slug: article.slug
      }}
      initialBlocks={article.blocks.map((block) => ({
        id: block.id,
        order: block.order,
        type: block.type as BlockType,
        data: parseBlockData(block.data)
      }))}
    />
  )
}

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/news/prisma'
import { parseTags } from '@/lib/news/serialize'
import { Button } from '@/components/ui/button'
import { AdminNewsTable } from '@/components/admin/AdminNewsTable'

export const dynamic = 'force-dynamic'

export default async function AdminNewsListPage() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Notícias</h1>
        <Link href="/admin/news/new">
          <Button className="bg-lime-600 hover:bg-lime-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova notícia
          </Button>
        </Link>
      </div>

      <AdminNewsTable
        articles={articles.map((article) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          status: article.status,
          category: article.category,
          tags: parseTags(article.tags),
          updatedAt: article.updatedAt.toISOString()
        }))}
      />
    </div>
  )
}

import { getAllPublishedArticles } from '@/lib/news/getArticles'
import NewsPageClient from '@/components/news/NewsPageClient'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const articles = await getAllPublishedArticles()

  return <NewsPageClient initialArticles={articles} />
}

import { NextResponse } from 'next/server'
import path from 'path'
import { loadStoriesFromMarkdown } from '@/lib/content/markdownLoader'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0', 10) || 0)
    const limit = Math.max(1, Math.min(200, parseInt(url.searchParams.get('limit') || '50', 10) || 50))

    const root = process.env.CONTENT_ROOT || path.join(process.cwd(), 'content')
    const data = await loadStoriesFromMarkdown(root)

    const total = data.stories.length
    const slice = data.stories.slice(offset, offset + limit)
    const visibleIds = new Set(slice.map((s) => s.id))
    const connections = data.connections.filter(
      (c) => visibleIds.has(c.from) && visibleIds.has(c.to)
    )

    const hasMore = offset + slice.length < total
    const res = NextResponse.json({
      ok: true,
      total,
      offset,
      limit,
      hasMore,
      stories: slice,
      connections
    })
    res.headers.set('Cache-Control', 'no-store, max-age=0')
    return res
  } catch (err) {
    console.error('Failed to load historias content:', err)
    return NextResponse.json({ ok: false, error: 'Failed to load content' }, { status: 500 })
  }
}

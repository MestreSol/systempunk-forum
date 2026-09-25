import { cache } from 'react'
import { projects } from '@/data/projects'
import { universe } from '@/data/universe'
import { transmissions as fileTransmissions } from '@/data/transmissions'
import type {
  Localized,
  Project,
  ProjectTier,
  TransmissionCategory,
  TransmissionEntry,
  UniverseEntry,
  UniverseKind
} from '@/data/types'
import type { NewsBlockRecord } from '@/lib/news/blockTypes'

/* ─── Projects ──────────────────────────────────────────────────────────── */

const tierOrder: Record<ProjectTier, number> = {
  primary: 0,
  archive: 1,
  experiment: 2
}

export function getProjects(tier?: ProjectTier): Project[] {
  return projects
    .filter((project) => !tier || project.tier === tier)
    .sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier] || a.index - b.index)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** The project the home page features: first primary project in development. */
export function getFeaturedProject(): Project {
  return (
    getProjects('primary').find((project) => project.status === 'active') ??
    getProjects('primary')[0]
  )
}

/* ─── Universe ──────────────────────────────────────────────────────────── */

export function getUniverse(kind?: UniverseKind): UniverseEntry[] {
  return universe.filter((entry) => !kind || entry.kind === kind)
}

export function getUniverseEntry(slug: string): UniverseEntry | undefined {
  return universe.find((entry) => entry.slug === slug)
}

export function getUniverseKinds(): UniverseKind[] {
  return [...new Set(universe.map((entry) => entry.kind))]
}

/* ─── Transmissions ─────────────────────────────────────────────────────── */

export type TransmissionContent =
  | { kind: 'markdown'; body: Localized }
  | { kind: 'blocks'; blocks: NewsBlockRecord[] }

export interface Transmission extends Omit<
  TransmissionEntry,
  'body' | 'number'
> {
  number: number
  content: TransmissionContent
  source: 'file' | 'cms'
}

const legacyCategoryMap: Record<string, TransmissionCategory> = {
  devlog: 'DEVLOG',
  devlogs: 'DEVLOG',
  world: 'WORLD',
  system: 'SYSTEM',
  tutorials: 'SYSTEM',
  announcement: 'ANNOUNCEMENT',
  announcements: 'ANNOUNCEMENT',
  releases: 'ANNOUNCEMENT',
  community: 'ANNOUNCEMENT',
  project: 'PROJECT',
  updates: 'PROJECT',
  archive: 'ARCHIVE'
}

function toCategory(value: string): TransmissionCategory {
  return legacyCategoryMap[value.toLowerCase()] ?? 'DEVLOG'
}

type CmsTransmission = Omit<Transmission, 'number'> & { number?: number }

/**
 * Articles published through the admin block editor. The CMS is optional: if
 * no database is configured (or it is unreachable) the site keeps working with
 * file-based transmissions only.
 */
async function loadCmsTransmissions(): Promise<CmsTransmission[]> {
  if (!process.env.DATABASE_URL) return []
  try {
    const [{ prisma }, { parseBlockData, parseTags }] = await Promise.all([
      import('@/lib/news/prisma'),
      import('@/lib/news/serialize')
    ])
    const articles = await prisma.newsArticle.findMany({
      where: { status: 'published' },
      include: { blocks: { orderBy: { order: 'asc' } } },
      orderBy: { publishDate: 'desc' }
    })
    const projectSlugs = new Set(projects.map((project) => project.slug))

    return articles.map((article) => {
      const tags = parseTags(article.tags)
      return {
        slug: article.slug,
        title: { en: article.title },
        summary: { en: article.excerpt },
        category: toCategory(article.category),
        project: tags
          .find((tag) => projectSlugs.has(tag.toLowerCase()))
          ?.toLowerCase(),
        date: (article.publishDate ?? article.updatedAt).toISOString(),
        image: article.coverImage
          ? { src: article.coverImage, alt: { en: article.title } }
          : undefined,
        tags,
        content: {
          kind: 'blocks',
          blocks: article.blocks.map((block) => ({
            id: block.id,
            order: block.order,
            type: block.type,
            data: parseBlockData(block.data)
          })) as NewsBlockRecord[]
        },
        source: 'cms'
      }
    })
  } catch (error) {
    console.warn(
      '[transmissions] CMS unavailable, using file content only.',
      error
    )
    return []
  }
}

/** All transmissions, newest first, each with a stable sequential number. */
export const getTransmissions = cache(async (): Promise<Transmission[]> => {
  const fromFiles: CmsTransmission[] = fileTransmissions.map(
    ({ body, ...entry }) => ({
      ...entry,
      content: { kind: 'markdown', body },
      source: 'file'
    })
  )
  const fileSlugs = new Set(fromFiles.map((entry) => entry.slug))
  const fromCms = (await loadCmsTransmissions()).filter(
    (entry) => !fileSlugs.has(entry.slug)
  )

  const all = [...fromFiles, ...fromCms].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Explicit numbers win; everything else continues the sequence by date.
  let counter = Math.max(0, ...all.map((entry) => entry.number ?? 0))
  const numbered = all.map((entry) => ({
    ...entry,
    number: entry.number ?? ++counter
  }))

  return numbered.reverse()
})

export async function getTransmission(slug: string) {
  const all = await getTransmissions()
  const index = all.findIndex((entry) => entry.slug === slug)
  if (index === -1) return null
  return {
    transmission: all[index],
    newer: all[index - 1] ?? null,
    older: all[index + 1] ?? null
  }
}

export async function getTransmissionsForProject(slug: string) {
  return (await getTransmissions()).filter((entry) => entry.project === slug)
}

/** Plain text used for reading time and descriptions. */
export function transmissionText(
  transmission: Transmission,
  locale: 'en' | 'pt'
) {
  if (transmission.content.kind === 'markdown') {
    const body = transmission.content.body
    return (body as Record<string, string | undefined>)[locale] ?? body.en
  }
  return transmission.content.blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
        case 'quote':
        case 'callout':
          return block.data.text
        case 'paragraph':
          return block.data.markdown
        default:
          return ''
      }
    })
    .join(' ')
}

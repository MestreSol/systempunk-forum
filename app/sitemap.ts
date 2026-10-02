import type { MetadataRoute } from 'next'
import { locales, localizePath } from '@/i18n/config'
import { getProjects, getTransmissions, getUniverse } from '@/lib/site/content'
import { absoluteUrl, languageAlternates } from '@/lib/site/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const transmissions = await getTransmissions()
  const latest = transmissions[0]?.date

  const pages: { path: string; lastModified?: string; priority: number }[] = [
    { path: '/', lastModified: latest, priority: 1 },
    { path: '/projects', priority: 0.9 },
    { path: '/universe', priority: 0.8 },
    { path: '/transmissions', lastModified: latest, priority: 0.8 },
    { path: '/about', priority: 0.6 },
    { path: '/press', priority: 0.5 },
    ...getProjects().map((project) => ({
      path: `/projects/${project.slug}`,
      priority: project.tier === 'primary' ? 0.9 : 0.4
    })),
    ...getUniverse().map((entry) => ({
      path: `/universe/${entry.slug}`,
      priority: 0.6
    })),
    ...transmissions.map((transmission) => ({
      path: `/transmissions/${transmission.slug}`,
      lastModified: transmission.date,
      priority: 0.7
    }))
  ]

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, page.path)),
      lastModified: page.lastModified ? new Date(page.lastModified) : undefined,
      priority: page.priority,
      alternates: { languages: languageAlternates(page.path) }
    }))
  )
}

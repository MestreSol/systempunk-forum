import type { Metadata } from 'next'
import { site } from '@/data/site'
import {
  defaultLocale,
  localeTags,
  locales,
  localizePath,
  ogLocales,
  type Locale
} from '@/i18n/config'

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

/** hreflang map for a locale-neutral path. */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[localeTags[locale]] = absoluteUrl(localizePath(locale, path))
  }
  languages['x-default'] = absoluteUrl(localizePath(defaultLocale, path))
  return languages
}

export function ogImageUrl(title: string, label?: string) {
  const params = new URLSearchParams({ title })
  if (label) params.set('label', label)
  return `/api/og?${params.toString()}`
}

interface PageMetadataInput {
  locale: Locale
  /** Locale-neutral path, e.g. `/projects/nova`. */
  path: string
  title: string
  description: string
  /** Label shown on the generated OG card. */
  label?: string
  image?: { url: string; alt: string }
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
  /** Use the title as-is (home page) instead of "Title — Systempunk". */
  absoluteTitle?: boolean
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  label,
  image,
  type = 'website',
  publishedTime,
  tags,
  absoluteTitle
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(localizePath(locale, path))
  const images = [image ?? { url: ogImageUrl(title, label), alt: title }].map(
    (img) => ({ ...img, width: 1200, height: 630 })
  )
  const fullTitle = absoluteTitle ? title : `${title} — Systempunk`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path)
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images,
      ...(type === 'article' && publishedTime ? { publishedTime, tags } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((img) => img.url)
    }
  }
}

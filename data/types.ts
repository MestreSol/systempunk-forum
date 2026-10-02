import type { Locale } from '@/i18n/config'

/**
 * A value that can be translated. English is required and is the fallback
 * for every other locale.
 */
export type Localized<T = string> = { en: T } & Partial<
  Record<Exclude<Locale, 'en'>, T>
>

export interface MediaItem {
  kind: 'image' | 'video' | 'youtube'
  src: string
  /** Poster frame for `video`; thumbnail for `youtube`. */
  poster?: string
  alt: Localized
  width?: number
  height?: number
}

export interface ExternalLink {
  kind: 'site' | 'steam' | 'itch' | 'discord' | 'youtube' | 'press' | 'other'
  label: Localized
  href: string
}

/* ─── Projects ──────────────────────────────────────────────────────────── */

export type ProjectStatus =
  'active' | 'early' | 'released' | 'paused' | 'archived' | 'prototype'

/**
 * `primary` projects carry the brand and get full visual weight. `archive` and
 * `experiment` exist so old work stays reachable without competing with it.
 */
export type ProjectTier = 'primary' | 'archive' | 'experiment'

export type PlaceholderArt = 'schematic' | 'orbital'

export interface Project {
  slug: string
  name: string
  /** Display order within a tier (01, 02...). */
  index: number
  tier: ProjectTier
  status: ProjectStatus
  category: Localized
  /** Short statement lines, rendered one per line. */
  tagline: Localized<string[]>
  /** One or two sentences: cards, meta descriptions. */
  summary: Localized
  /** Markdown. */
  description: Localized
  heroImage?: MediaItem
  /** Technical art shown while no media is cleared. Defaults to `orbital`. */
  placeholderArt?: PlaceholderArt
  logo?: string
  screenshots: MediaItem[]
  videos: MediaItem[]
  /** Dedicated site, if the project has one. */
  website?: string
  /** Steam store URL. `null` means "coming", `undefined` means "not planned". */
  steam?: string | null
  links: ExternalLink[]
  /** ISO date the project was started / announced. */
  date: string
  releaseDate?: string
  platforms?: string[]
  tags: string[]
  /** Universe entries this project touches. */
  universe?: string[]
}

/* ─── Transmissions ─────────────────────────────────────────────────────── */

export const transmissionCategories = [
  'DEVLOG',
  'WORLD',
  'SYSTEM',
  'ANNOUNCEMENT',
  'PROJECT',
  'ARCHIVE'
] as const

export type TransmissionCategory = (typeof transmissionCategories)[number]

export interface TransmissionEntry {
  /** Sequential transmission number. Assigned automatically when omitted. */
  number?: number
  slug: string
  title: Localized
  summary: Localized
  category: TransmissionCategory
  /** Related project slug. */
  project?: string
  /** ISO date. */
  date: string
  image?: { src: string; alt: Localized }
  /** Markdown. */
  body: Localized
  tags: string[]
}

/* ─── Universe ──────────────────────────────────────────────────────────── */

export type UniverseKind =
  'organization' | 'technology' | 'location' | 'event' | 'concept'

export type Clearance = 'open' | 'restricted' | 'classified'

export interface UniverseEntry {
  slug: string
  name: string
  kind: UniverseKind
  /** Archive designation, e.g. `ORG-004`. */
  designation: string
  clearance: Clearance
  /** What it does, in a few words. */
  sector: Localized
  summary: Localized
  /** Markdown. */
  body: Localized
  /** Related project slugs. */
  projects?: string[]
  /** Related universe slugs. */
  related?: string[]
}

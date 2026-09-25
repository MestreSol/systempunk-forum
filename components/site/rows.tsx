import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizePath, type Locale } from '@/i18n/config'
import type { Project, UniverseEntry } from '@/data/types'
import type { Transmission } from '@/lib/site/content'
import { formatDate, pad, tr } from '@/lib/site/localize'
import { cn } from '@/lib/utils'
import { Arrow, StatusDot, Tag } from './primitives'

/* ─── Project row (primary tier) ───────────────────────────────────────── */

export function ProjectRow({
  project,
  locale,
  dict,
  delay = 0
}: {
  project: Project
  locale: Locale
  dict: Dictionary
  delay?: number
}) {
  return (
    <li data-reveal="" style={{ ['--reveal-delay' as string]: delay }}>
      <Link
        href={localizePath(locale, `/projects/${project.slug}`)}
        className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-3 border-b border-line py-8 sm:gap-x-10 sm:py-10 lg:grid-cols-12"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-system)] group-hover:scale-x-100"
        />
        <span className="font-mono text-sm text-signal lg:col-span-1">
          {pad(project.index, 2)}
        </span>
        <div className="min-w-0 lg:col-span-6">
          <h3 className="font-expanded text-[clamp(1.75rem,8vw,3.75rem)] font-semibold uppercase leading-none text-ink">
            {project.name}
          </h3>
          <p className="mt-3 text-sm text-dim sm:text-base">
            {tr(project.category, locale)}
          </p>
        </div>
        <span className="col-start-2 flex items-center gap-3 lg:col-span-4 lg:col-start-8">
          <StatusDot status={project.status} />
          <span className="label text-ink">{dict.status[project.status]}</span>
        </span>
        <Arrow className="col-start-3 row-start-1 size-5 self-center text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal lg:col-span-1 lg:col-start-12 lg:justify-self-end" />
      </Link>
    </li>
  )
}

/* ─── Project row (archive tier) — deliberately quiet ──────────────────── */

export function ArchiveRow({
  project,
  locale,
  dict
}: {
  project: Project
  locale: Locale
  dict: Dictionary
}) {
  return (
    <li>
      <Link
        href={localizePath(locale, `/projects/${project.slug}`)}
        className="group flex items-center gap-4 border-b border-line py-4 text-sm"
      >
        <span className="font-mono text-xs text-faint">
          A-{pad(project.index, 2)}
        </span>
        <span className="flex-1 text-dim transition-colors group-hover:text-ink">
          {project.name}
        </span>
        <span className="label hidden sm:inline">
          {tr(project.category, locale)}
        </span>
        <span className="label hidden w-28 text-right md:inline">
          {dict.status[project.status]}
        </span>
        <Arrow className="text-faint transition-colors group-hover:text-signal" />
      </Link>
    </li>
  )
}

/* ─── Transmission row ─────────────────────────────────────────────────── */

export function TransmissionRow({
  transmission,
  locale,
  dict,
  delay = 0,
  headingLevel = 3,
  as: Wrapper = 'li'
}: {
  transmission: Transmission
  locale: Locale
  dict: Dictionary
  delay?: number
  headingLevel?: 2 | 3
  as?: 'li' | 'div'
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <Wrapper data-reveal="" style={{ ['--reveal-delay' as string]: delay }}>
      <article className="group relative grid gap-3 border-b border-line py-7 sm:grid-cols-12 sm:items-baseline sm:gap-8">
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-system)] group-hover:scale-x-100 group-focus-within:scale-x-100"
        />
        <p className="label sm:col-span-3">
          <span className="text-signal">Transmission</span>{' '}
          {pad(transmission.number)}
        </p>
        <Heading className="text-xl font-medium leading-snug text-ink sm:col-span-6 sm:text-2xl">
          <Link
            href={localizePath(locale, `/transmissions/${transmission.slug}`)}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {tr(transmission.title, locale)}
          </Link>
        </Heading>
        <div className="flex items-center gap-4 sm:col-span-3 sm:justify-end">
          <Tag>{dict.categories[transmission.category]}</Tag>
          <time dateTime={transmission.date} className="label">
            {formatDate(transmission.date, locale)}
          </time>
        </div>
      </article>
    </Wrapper>
  )
}

/* ─── Universe entry card ──────────────────────────────────────────────── */

export function UniverseCard({
  entry,
  locale,
  dict,
  delay = 0,
  compact,
  as: Wrapper = 'li'
}: {
  entry: UniverseEntry
  locale: Locale
  dict: Dictionary
  delay?: number
  compact?: boolean
  as?: 'li' | 'div'
}) {
  const classified = entry.clearance === 'classified'
  return (
    <Wrapper className="h-full bg-void">
      <Link
        href={localizePath(locale, `/universe/${entry.slug}`)}
        data-reveal=""
        style={{ ['--reveal-delay' as string]: delay }}
        className={cn(
          'group relative flex h-full flex-col border border-line bg-void p-5 transition-colors hover:border-line-strong hover:bg-hull sm:p-6',
          compact ? 'min-h-40' : 'min-h-56'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="label">{entry.designation}</span>
          <span
            className={cn(
              'font-mono text-[0.625rem] uppercase tracking-[0.14em]',
              classified
                ? 'text-signal'
                : entry.clearance === 'restricted'
                  ? 'text-caution'
                  : 'text-faint'
            )}
          >
            {dict.clearance[entry.clearance]}
          </span>
        </div>
        <h3 className="font-expanded mt-auto pt-10 text-lg font-semibold uppercase leading-tight text-ink sm:text-xl">
          {entry.name}
        </h3>
        <p className="mt-2 text-sm text-dim">
          {classified ? (
            <>
              <span className="redacted" aria-hidden>
                {tr(entry.sector, locale)}
              </span>
              <span className="sr-only">{dict.clearance.classified}</span>
            </>
          ) : (
            tr(entry.sector, locale)
          )}
        </p>
        <Arrow className="absolute right-5 top-1/2 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal group-hover:opacity-100 sm:right-6" />
      </Link>
    </Wrapper>
  )
}

/* ─── Archive thumbnail card (projects page) ───────────────────────────── */

export function ArchiveCard({
  project,
  locale,
  dict
}: {
  project: Project
  locale: Locale
  dict: Dictionary
}) {
  return (
    <li data-reveal="">
      <Link
        href={localizePath(locale, `/projects/${project.slug}`)}
        className="group grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-hull">
          {project.heroImage?.kind === 'image' && (
            <Image
              src={project.heroImage.src}
              alt=""
              fill
              sizes="144px"
              className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
          )}
        </div>
        <div>
          <p className="label">
            A-{pad(project.index, 2)} · {dict.status[project.status]}
          </p>
          <h3 className="mt-1.5 text-lg font-medium text-ink">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-dim">{tr(project.summary, locale)}</p>
        </div>
        <Arrow className="hidden text-faint transition-colors group-hover:text-signal sm:block" />
      </Link>
    </li>
  )
}

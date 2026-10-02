import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath, locales } from '@/i18n'
import {
  getProject,
  getProjects,
  getTransmissionsForProject,
  getUniverseEntry
} from '@/lib/site/content'
import { formatDate, pad, tr } from '@/lib/site/localize'
import { absoluteUrl, pageMetadata } from '@/lib/site/seo'
import type { UniverseEntry } from '@/data/types'
import { PageHeader } from '@/components/site/PageHeader'
import { MediaFrame } from '@/components/site/MediaFrame'
import { Markdown } from '@/components/site/Markdown'
import { JsonLd } from '@/components/site/JsonLd'
import {
  LinkButton,
  PendingButton,
  SpecList,
  Status,
  Tag
} from '@/components/site/primitives'
import { TransmissionRow, UniverseCard } from '@/components/site/rows'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 300

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjects().map((project) => ({ locale, slug: project.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!isLocale(locale) || !project) return {}
  const media =
    project.heroImage?.kind === 'image' ? project.heroImage : undefined
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.name} — ${tr(project.category, locale)}`,
    description: tr(project.summary, locale),
    label: getDictionary(locale).status[project.status],
    image: media ? { url: media.src, alt: tr(media.alt, locale) } : undefined
  })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!isLocale(locale) || !project) notFound()
  const dict = getDictionary(locale)
  const t = dict.projectsPage

  const transmissions = await getTransmissionsForProject(project.slug)
  const connections = (project.universe ?? [])
    .map(getUniverseEntry)
    .filter((entry): entry is UniverseEntry => !!entry)
  const heroMedia =
    project.videos[0] ?? project.heroImage ?? project.screenshots[0]
  const isGame = !project.tags.includes('tabletop')

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': isGame ? 'VideoGame' : 'CreativeWork',
          name: project.name,
          description: tr(project.summary, locale),
          genre: tr(project.category, locale),
          url: absoluteUrl(localizePath(locale, `/projects/${project.slug}`)),
          inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
          dateCreated: project.date,
          creator: {
            '@type': 'Organization',
            name: 'Systempunk',
            url: absoluteUrl('/')
          },
          ...(project.heroImage
            ? { image: absoluteUrl(project.heroImage.src) }
            : {}),
          ...(isGame && project.platforms
            ? { gamePlatform: project.platforms }
            : {}),
          ...(project.website ? { sameAs: [project.website] } : {})
        }}
      />

      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[
          { label: dict.nav.projects, href: '/projects' },
          {
            label:
              project.tier === 'primary'
                ? pad(project.index, 2)
                : dict.tier[project.tier]
          }
        ]}
        kicker={tr(project.category, locale)}
        title={project.name}
        meta={
          <Status status={project.status} label={dict.status[project.status]} />
        }
      >
        <p className="font-expanded mt-10 text-xl font-medium uppercase leading-snug text-ink sm:text-2xl">
          {tr(project.tagline, locale).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </PageHeader>

      <div className="container-site py-12 sm:py-16">
        <MediaFrame
          media={heroMedia}
          locale={locale}
          priority
          sizes="(min-width: 1440px) 1360px, 100vw"
          placeholder={{
            title: dict.common.awaitingFootage,
            note: dict.common.feedPending
          }}
          art={project.placeholderArt}
        />
      </div>

      <div className="container-site grid gap-14 pb-20 sm:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Markdown className="text-lg">
            {tr(project.description, locale)}
          </Markdown>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-24">
            <p className="label mb-4">{dict.common.aSystempunkProject}</p>
            <SpecList
              items={[
                {
                  label: dict.common.status,
                  value: dict.status[project.status]
                },
                {
                  label: dict.common.category,
                  value: tr(project.category, locale)
                },
                { label: t.started, value: formatDate(project.date, locale) },
                ...(project.platforms
                  ? [
                      {
                        label: t.platforms,
                        value: project.platforms.join(' / ')
                      }
                    ]
                  : [])
              ]}
            />
            {project.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-col gap-3">
              {project.website && (
                <LinkButton
                  href={project.website}
                  external
                  externalLabel={dict.a11y.external}
                  variant="primary"
                >
                  {t.website}
                </LinkButton>
              )}
              {project.steam ? (
                <LinkButton
                  href={project.steam}
                  external
                  externalLabel={dict.a11y.external}
                >
                  {t.steam}
                </LinkButton>
              ) : project.steam === null ? (
                <PendingButton note={dict.common.soon}>{t.steam}</PendingButton>
              ) : null}
              {project.links.map((link) => (
                <LinkButton
                  key={link.href}
                  href={link.href}
                  external
                  externalLabel={dict.a11y.external}
                >
                  {tr(link.label, locale)}
                </LinkButton>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {project.screenshots.length > 0 && (
        <section
          aria-labelledby="media-title"
          className="border-t border-line py-16 sm:py-24"
        >
          <div className="container-site">
            <h2 id="media-title" className="label text-ink">
              {t.media}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <li
                  key={shot.src}
                  className="relative aspect-video overflow-hidden border border-line bg-hull"
                >
                  <Image
                    src={shot.src}
                    alt={tr(shot.alt, locale)}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {connections.length > 0 && (
        <section
          aria-labelledby="connections-title"
          className="border-t border-line py-16 sm:py-24"
        >
          <div className="container-site">
            <h2 id="connections-title" className="label text-ink">
              {t.connections}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {connections.map((entry, index) => (
                <UniverseCard
                  key={entry.slug}
                  entry={entry}
                  locale={locale}
                  dict={dict}
                  delay={index * 80}
                  compact
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section
        aria-labelledby="project-transmissions-title"
        className="border-t border-line py-16 sm:py-24"
      >
        <div className="container-site">
          <h2 id="project-transmissions-title" className="label text-ink">
            {t.transmissions}
          </h2>
          {transmissions.length > 0 ? (
            <ul className="mt-8 border-t border-line">
              {transmissions.map((transmission) => (
                <TransmissionRow
                  key={transmission.slug}
                  transmission={transmission}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-dim">{t.noTransmissions}</p>
          )}
          <div className="mt-10">
            <Link
              href={localizePath(locale, '/projects')}
              className="label inline-flex items-center gap-2 transition-colors hover:text-ink"
            >
              ← {dict.nav.projects}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}

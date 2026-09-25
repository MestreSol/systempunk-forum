import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath, locales } from '@/i18n'
import { getProject, getUniverse, getUniverseEntry } from '@/lib/site/content'
import { hasTranslation, tr } from '@/lib/site/localize'
import { absoluteUrl, pageMetadata } from '@/lib/site/seo'
import type { Project, UniverseEntry } from '@/data/types'
import { PageHeader } from '@/components/site/PageHeader'
import { Markdown } from '@/components/site/Markdown'
import { JsonLd } from '@/components/site/JsonLd'
import { Arrow, SpecList } from '@/components/site/primitives'
import { UniverseCard } from '@/components/site/rows'
import { cn } from '@/lib/utils'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getUniverse().map((entry) => ({ locale, slug: entry.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const entry = getUniverseEntry(slug)
  if (!isLocale(locale) || !entry) return {}
  return pageMetadata({
    locale,
    path: `/universe/${slug}`,
    title: entry.name,
    description: tr(entry.summary, locale),
    label: `${entry.designation} / ${getDictionary(locale).universeKinds[entry.kind]}`
  })
}

export default async function UniverseEntryPage({ params }: Props) {
  const { locale, slug } = await params
  const entry = getUniverseEntry(slug)
  if (!isLocale(locale) || !entry) notFound()
  const dict = getDictionary(locale)
  const t = dict.universePage
  const classified = entry.clearance === 'classified'

  const projects = (entry.projects ?? [])
    .map(getProject)
    .filter((p): p is Project => !!p)
  const related = (entry.related ?? [])
    .map(getUniverseEntry)
    .filter((e): e is UniverseEntry => !!e)

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: entry.name,
          description: tr(entry.summary, locale),
          genre: dict.universeKinds[entry.kind],
          url: absoluteUrl(localizePath(locale, `/universe/${entry.slug}`)),
          isPartOf: {
            '@type': 'CreativeWorkSeries',
            name: 'Systempunk Universe'
          },
          author: { '@type': 'Organization', name: 'Systempunk' }
        }}
      />
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[
          { label: dict.nav.universe, href: '/universe' },
          { label: entry.designation }
        ]}
        kicker={`${entry.designation} — ${dict.universeKinds[entry.kind]}`}
        title={entry.name}
        intro={tr(entry.summary, locale)}
      />

      <div className="container-site grid gap-14 py-16 sm:py-24 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-4 lg:col-start-9">
          <div className="brackets border border-line bg-hull p-5 sm:p-6 lg:sticky lg:top-24">
            <SpecList
              items={[
                {
                  label: t.designation,
                  value: <span className="font-mono">{entry.designation}</span>
                },
                {
                  label: t.clearance,
                  value: (
                    <span
                      className={cn(
                        'font-mono uppercase',
                        classified
                          ? 'text-signal'
                          : entry.clearance === 'restricted'
                            ? 'text-caution'
                            : ''
                      )}
                    >
                      {dict.clearance[entry.clearance]}
                    </span>
                  )
                },
                {
                  label: dict.common.category,
                  value: dict.universeKinds[entry.kind]
                },
                { label: t.sector, value: tr(entry.sector, locale) }
              ]}
            />
            {projects.length > 0 && (
              <div className="mt-8">
                <p className="label mb-3">{t.appearsIn}</p>
                <ul className="space-y-2">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={localizePath(locale, `/projects/${project.slug}`)}
                        className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-signal"
                      >
                        {project.name}
                        <Arrow className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <div className="lg:order-1 lg:col-span-7">
          {!hasTranslation(entry.body, locale) && (
            <p className="label mb-6 text-caution">
              {dict.common.untranslated}
            </p>
          )}
          <Markdown className="text-lg">{tr(entry.body, locale)}</Markdown>

          <div className="mt-14 space-y-3" aria-hidden>
            <span className="redacted block h-4 w-full" />
            <span className="redacted block h-4 w-11/12" />
            <span className="redacted block h-4 w-2/3" />
          </div>
          <p className="label mt-5">{t.redacted}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="border-t border-line py-16 sm:py-24"
        >
          <div className="container-site">
            <h2 id="related-title" className="label text-ink">
              {t.relatedEntries}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <UniverseCard
                  key={item.slug}
                  entry={item}
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
    </article>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale } from '@/i18n'
import { getUniverse, getUniverseKinds } from '@/lib/site/content'
import { pageMetadata } from '@/lib/site/seo'
import { PageHeader } from '@/components/site/PageHeader'
import { UniverseCard } from '@/components/site/rows'
import FilterableList from '@/components/site/FilterableList'
import { OrbitalField } from '@/components/site/OrbitalField'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: '/universe',
    title: dict.universePage.title,
    description: `${dict.home.universe.title} ${dict.universePage.intro}`,
    label: dict.universePage.kicker
  })
}

export default async function UniversePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.universePage
  const entries = getUniverse()

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[{ label: dict.nav.universe }]}
        kicker={t.kicker}
        title={t.title}
        intro={
          <>
            <span className="block text-ink">{dict.home.universe.title}</span>
            <span className="mt-3 block">{t.intro}</span>
          </>
        }
      >
        <OrbitalField className="pointer-events-none absolute -right-40 -top-10 hidden w-[42rem] opacity-40 lg:block" />
      </PageHeader>

      <section className="container-site py-16 sm:py-24" aria-label={t.title}>
        <div className="mb-10 grid gap-6 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.universe.lines.map((line, index) => (
            <p
              key={line}
              data-reveal=""
              style={{ ['--reveal-delay' as string]: index * 120 }}
              className="text-dim"
            >
              <span className="label mb-3 block text-signal">
                {String(index + 1).padStart(2, '0')}
              </span>
              {line}
            </p>
          ))}
        </div>

        <FilterableList
          label={t.filterLabel}
          allLabel={t.all}
          emptyLabel={t.empty}
          groups={getUniverseKinds().map((kind) => ({
            value: kind,
            label: dict.universeKinds[kind]
          }))}
          listClassName="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          itemClassName="bg-void"
          items={entries.map((entry, index) => ({
            key: entry.slug,
            group: entry.kind,
            node: (
              <UniverseCard
                as="div"
                entry={entry}
                locale={locale}
                dict={dict}
                delay={(index % 3) * 80}
              />
            )
          }))}
        />

        <p className="label mt-10 flex items-center gap-3">
          <span className="redacted w-24" aria-hidden>
            ████
          </span>
          {t.redacted}
        </p>
      </section>
    </>
  )
}

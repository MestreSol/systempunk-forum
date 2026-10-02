import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath } from '@/i18n'
import { getProject, getTransmissions } from '@/lib/site/content'
import { formatDate, pad, tr } from '@/lib/site/localize'
import { pageMetadata } from '@/lib/site/seo'
import { transmissionCategories } from '@/data/types'
import { PageHeader } from '@/components/site/PageHeader'
import { Arrow, Tag } from '@/components/site/primitives'
import { TransmissionRow } from '@/components/site/rows'
import FilterableList from '@/components/site/FilterableList'

type Props = { params: Promise<{ locale: string }> }

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: '/transmissions',
    title: dict.transmissionsPage.title,
    description: dict.transmissionsPage.intro,
    label: dict.nav.transmissions
  })
}

export default async function TransmissionsPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.transmissionsPage
  const all = await getTransmissions()
  const [latest, ...rest] = all
  const usedCategories = transmissionCategories.filter((category) =>
    rest.some((entry) => entry.category === category)
  )

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[{ label: dict.nav.transmissions }]}
        title={t.title}
        intro={t.intro}
        meta={
          <p className="label flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-online motion-safe:animate-pulse-dot"
              aria-hidden
            />
            {pad(all.length)} / {t.title}
          </p>
        }
      />

      {!latest ? (
        <p className="container-site py-24 text-dim">{t.empty}</p>
      ) : (
        <>
          <section
            aria-labelledby="latest-title"
            className="container-site py-16 sm:py-20"
          >
            <p id="latest-title" className="label mb-6 text-signal">
              {t.latest}
            </p>
            <Link
              href={localizePath(locale, `/transmissions/${latest.slug}`)}
              className="brackets group grid gap-8 border border-line bg-hull p-6 transition-colors hover:border-line-strong sm:p-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <p className="font-expanded text-6xl font-bold leading-none text-ink sm:text-7xl">
                  {pad(latest.number)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Tag>{dict.categories[latest.category]}</Tag>
                  <time dateTime={latest.date} className="label">
                    {formatDate(latest.date, locale)}
                  </time>
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                {latest.project && (
                  <p className="label mb-3">
                    {getProject(latest.project)?.name}
                  </p>
                )}
                <h2 className="text-3xl font-medium leading-tight text-ink transition-colors group-hover:text-signal-soft sm:text-4xl">
                  {tr(latest.title, locale)}
                </h2>
                <p className="mt-5 max-w-2xl text-lg text-dim">
                  {tr(latest.summary, locale)}
                </p>
                <p className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                  {dict.common.readTransmission}
                  <Arrow className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </section>

          {rest.length > 0 && (
            <section
              aria-label={t.title}
              className="container-site pb-24 sm:pb-32"
            >
              <FilterableList
                label={t.filterLabel}
                allLabel={t.all}
                emptyLabel={t.empty}
                groups={usedCategories.map((category) => ({
                  value: category,
                  label: dict.categories[category]
                }))}
                listClassName="border-t border-line"
                items={rest.map((transmission) => ({
                  key: transmission.slug,
                  group: transmission.category,
                  node: (
                    <TransmissionRow
                      as="div"
                      transmission={transmission}
                      locale={locale}
                      dict={dict}
                      headingLevel={2}
                    />
                  )
                }))}
              />
            </section>
          )}
        </>
      )}
    </>
  )
}

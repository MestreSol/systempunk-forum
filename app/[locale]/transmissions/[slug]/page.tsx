import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath, locales } from '@/i18n'
import {
  getProject,
  getTransmission,
  getTransmissions,
  transmissionText
} from '@/lib/site/content'
import { formatDate, hasTranslation, pad, tr } from '@/lib/site/localize'
import { absoluteUrl, pageMetadata } from '@/lib/site/seo'
import { site } from '@/data/site'
import { PageHeader } from '@/components/site/PageHeader'
import { Markdown } from '@/components/site/Markdown'
import { JsonLd } from '@/components/site/JsonLd'
import { SpecList, Tag } from '@/components/site/primitives'
import { BlockRenderer } from '@/components/news/blocks/BlockRenderer'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 300

export async function generateStaticParams() {
  const all = await getTransmissions()
  return locales.flatMap((locale) =>
    all.map((entry) => ({ locale, slug: entry.slug }))
  )
}

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const result = await getTransmission(slug)
  if (!result) return {}
  const { transmission } = result
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: `/transmissions/${slug}`,
    title: tr(transmission.title, locale),
    description: tr(transmission.summary, locale),
    label: `Transmission ${pad(transmission.number)} / ${dict.categories[transmission.category]}`,
    image: transmission.image
      ? { url: transmission.image.src, alt: tr(transmission.image.alt, locale) }
      : undefined,
    type: 'article',
    publishedTime: transmission.date,
    tags: transmission.tags
  })
}

export default async function TransmissionPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const result = await getTransmission(slug)
  if (!result) notFound()
  const { transmission, newer, older } = result
  const dict = getDictionary(locale)
  const t = dict.transmissionsPage
  const project = transmission.project
    ? getProject(transmission.project)
    : undefined
  const url = absoluteUrl(
    localizePath(locale, `/transmissions/${transmission.slug}`)
  )
  const translated =
    transmission.content.kind === 'markdown'
      ? hasTranslation(transmission.content.body, locale)
      : locale === 'en'

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: tr(transmission.title, locale),
          description: tr(transmission.summary, locale),
          datePublished: transmission.date,
          inLanguage: translated ? (locale === 'pt' ? 'pt-BR' : 'en') : 'en',
          url,
          mainEntityOfPage: url,
          keywords: transmission.tags.join(', '),
          articleSection: dict.categories[transmission.category],
          ...(transmission.image
            ? { image: absoluteUrl(transmission.image.src) }
            : {}),
          author: {
            '@type': 'Organization',
            name: 'Systempunk',
            url: site.url
          },
          publisher: { '@id': `${site.url}/#organization` }
        }}
      />

      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[
          { label: dict.nav.transmissions, href: '/transmissions' },
          { label: pad(transmission.number) }
        ]}
        kicker={`Transmission ${pad(transmission.number)}`}
        title={
          <span className="block max-w-[22ch] text-[clamp(2rem,6vw,4.75rem)] leading-[0.95]">
            {tr(transmission.title, locale)}
          </span>
        }
        intro={tr(transmission.summary, locale)}
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <Tag>{dict.categories[transmission.category]}</Tag>
            <time dateTime={transmission.date} className="label">
              {formatDate(transmission.date, locale, 'long')}
            </time>
            <span className="label">
              {readingMinutes(transmissionText(transmission, locale))} min
            </span>
          </div>
        }
      />

      {transmission.image && (
        <div className="container-site pt-12">
          <figure className="brackets relative aspect-[21/9] overflow-hidden border border-line bg-hull">
            <Image
              src={transmission.image.src}
              alt={tr(transmission.image.alt, locale)}
              fill
              priority
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      )}

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-3 lg:col-start-10">
          <div className="lg:sticky lg:top-24">
            <SpecList
              items={[
                {
                  label: 'No.',
                  value: (
                    <span className="font-mono">
                      {pad(transmission.number)}
                    </span>
                  )
                },
                {
                  label: dict.common.category,
                  value: dict.categories[transmission.category]
                },
                {
                  label: dict.common.date,
                  value: formatDate(transmission.date, locale)
                },
                ...(project
                  ? [
                      {
                        label: dict.common.project,
                        value: (
                          <Link
                            href={localizePath(
                              locale,
                              `/projects/${project.slug}`
                            )}
                            className="underline decoration-signal underline-offset-4 hover:text-signal"
                          >
                            {project.name}
                          </Link>
                        )
                      }
                    ]
                  : [])
              ]}
            />
            {transmission.tags.length > 0 && (
              <div className="mt-6">
                <p className="label mb-3">{dict.common.tags}</p>
                <div className="flex flex-wrap gap-2">
                  {transmission.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="min-w-0 lg:order-1 lg:col-span-8">
          {!translated && (
            <p className="label mb-8 text-caution">
              {dict.common.untranslated}
            </p>
          )}
          {transmission.content.kind === 'markdown' ? (
            <Markdown>{tr(transmission.content.body, locale)}</Markdown>
          ) : (
            <div className="prose-system">
              <BlockRenderer blocks={transmission.content.blocks} />
            </div>
          )}
          <p className="label mt-16 flex items-center gap-3 border-t border-line pt-6">
            <span className="size-1.5 bg-signal" aria-hidden />
            {t.endOfTransmission} — {pad(transmission.number)}
          </p>
        </div>
      </div>

      {(newer || older) && (
        <nav aria-label={t.title} className="border-t border-line">
          <div className="container-site grid sm:grid-cols-2">
            {[
              { entry: older, label: t.previous, align: 'left' },
              { entry: newer, label: t.next, align: 'right' }
            ].map(({ entry, label, align }) =>
              entry ? (
                <Link
                  key={label}
                  href={localizePath(locale, `/transmissions/${entry.slug}`)}
                  rel={align === 'left' ? 'prev' : 'next'}
                  className={`group block border-line py-10 sm:py-14 ${
                    align === 'right'
                      ? 'border-t sm:border-l sm:border-t-0 sm:pl-10 sm:text-right'
                      : 'sm:pr-10'
                  }`}
                >
                  <p className="label">
                    {align === 'left' ? '← ' : ''}
                    {label} · {pad(entry.number)}
                    {align === 'right' ? ' →' : ''}
                  </p>
                  <p className="mt-3 text-xl text-ink transition-colors group-hover:text-signal-soft">
                    {tr(entry.title, locale)}
                  </p>
                </Link>
              ) : (
                <span key={label} aria-hidden className="hidden sm:block" />
              )
            )}
          </div>
        </nav>
      )}
    </article>
  )
}

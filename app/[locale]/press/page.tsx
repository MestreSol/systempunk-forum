import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath } from '@/i18n'
import { site } from '@/data/site'
import { getFeaturedProject, getProjects } from '@/lib/site/content'
import { tr } from '@/lib/site/localize'
import { pageMetadata } from '@/lib/site/seo'
import { PageHeader } from '@/components/site/PageHeader'
import { Arrow, SpecList, StatusDot } from '@/components/site/primitives'

type Props = { params: Promise<{ locale: string }> }

// Files served from /public. Add more as key art is cleared for press.
const assets = [
  { file: '/logo.png', name: 'Systempunk — logo', format: 'PNG' },
  {
    file: '/systempunkBrand.webp',
    name: 'Systempunk — brand art',
    format: 'WEBP'
  }
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: '/press',
    title: dict.pressPage.title,
    description: dict.pressPage.intro,
    label: dict.nav.press
  })
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.pressPage
  const featured = getFeaturedProject()

  const Block = ({
    id,
    title,
    children
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => (
    <section
      aria-labelledby={id}
      className="grid gap-8 border-b border-line py-14 sm:py-16 lg:grid-cols-12"
    >
      <h2 id={id} className="label text-ink lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  )

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[{ label: dict.nav.press }]}
        title={t.title}
        intro={t.intro}
      />

      <div className="container-site pb-20">
        <Block id="facts" title={t.factSheet}>
          <SpecList
            className="max-w-2xl"
            items={[
              { label: t.facts.name, value: 'Systempunk' },
              { label: t.facts.type, value: t.facts.typeValue },
              { label: t.facts.based, value: t.facts.basedValue },
              {
                label: t.facts.current,
                value: (
                  <Link
                    href={localizePath(locale, `/projects/${featured.slug}`)}
                    className="underline decoration-signal underline-offset-4 hover:text-signal"
                  >
                    {featured.name}
                  </Link>
                )
              },
              {
                label: t.facts.web,
                value: site.url.replace(/^https?:\/\//, '')
              }
            ]}
          />
        </Block>

        <Block id="description" title={t.description}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label mb-3">{t.short}</p>
              <p className="text-lg leading-relaxed text-ink">{t.shortText}</p>
            </div>
            <div>
              <p className="label mb-3">{t.long}</p>
              <p className="leading-relaxed text-dim">{t.longText}</p>
            </div>
          </div>
        </Block>

        <Block id="assets" title={t.assets}>
          <p className="mb-8 text-dim">{t.assetsText}</p>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {assets.map((asset) => (
              <li key={asset.file} className="bg-void">
                <a href={asset.file} download className="group block p-5">
                  <div className="relative aspect-video overflow-hidden border border-line bg-hull">
                    <Image
                      src={asset.file}
                      alt={asset.name}
                      fill
                      sizes="(min-width: 640px) 40vw, 100vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm text-ink">{asset.name}</span>
                    <span className="label inline-flex items-center gap-2 transition-colors group-hover:text-signal">
                      {t.download} · {asset.format}
                      <Arrow className="rotate-90" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="projects" title={t.projectKits}>
          <ul className="border-t border-line">
            {getProjects('primary').map((project) => (
              <li key={project.slug}>
                <Link
                  href={localizePath(locale, `/projects/${project.slug}`)}
                  className="group flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line py-5"
                >
                  <span className="flex-1 text-lg text-ink">
                    {project.name}
                  </span>
                  <span className="label">{tr(project.category, locale)}</span>
                  <span className="label inline-flex items-center gap-2">
                    <StatusDot status={project.status} />
                    {dict.status[project.status]}
                  </span>
                  <Arrow className="text-faint transition-colors group-hover:text-signal" />
                </Link>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="press-contact" title={t.contact}>
          <a
            href={`mailto:${site.pressEmail}`}
            className="font-expanded inline-block break-all text-3xl font-semibold text-ink underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-signal sm:text-4xl"
          >
            {site.pressEmail}
          </a>
        </Block>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath } from '@/i18n'
import { site } from '@/data/site'
import { pageMetadata } from '@/lib/site/seo'
import { PageHeader } from '@/components/site/PageHeader'
import { SystemDiagram } from '@/components/site/SystemDiagram'
import { LinkButton } from '@/components/site/primitives'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: '/about',
    title: dict.aboutPage.title,
    description: dict.home.about.lead,
    label: dict.aboutPage.kicker
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.aboutPage

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[{ label: dict.nav.about }]}
        kicker={t.kicker}
        title="Systempunk"
        intro={dict.home.about.lead}
      />

      <div className="container-site">
        {t.sections.map((section, index) => (
          <section
            key={section.label}
            aria-labelledby={`about-${index}`}
            className="grid gap-6 border-b border-line py-16 sm:py-20 lg:grid-cols-12"
            data-reveal=""
          >
            <p className="label lg:col-span-3">
              <span className="text-signal">
                {String(index + 1).padStart(2, '0')}
              </span>{' '}
              / {section.label}
            </p>
            <h2
              id={`about-${index}`}
              className="font-expanded text-3xl font-semibold uppercase leading-tight text-ink sm:text-4xl lg:col-span-4"
            >
              {section.title}
            </h2>
            <p className="text-lg leading-relaxed text-dim lg:col-span-5">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <section
        aria-labelledby="principles-title"
        className="relative overflow-hidden bg-hull py-20 sm:py-28"
      >
        <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
        <div className="container-site relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="principles-title" className="label text-ink">
              {t.principlesLabel}
            </h2>
            <ol className="mt-8 border-t border-line">
              {t.principles.map((principle, index) => (
                <li
                  key={principle}
                  data-reveal=""
                  style={{ ['--reveal-delay' as string]: index * 90 }}
                  className="flex items-baseline gap-6 border-b border-line py-5"
                >
                  <span className="font-mono text-xs text-signal">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-expanded text-xl font-medium uppercase text-ink sm:text-2xl">
                    {principle}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-center">
            <SystemDiagram
              labels={dict.home.philosophy.pillars.map(
                (pillar) => pillar.title
              )}
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className="container-site py-20 sm:py-28"
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="contact-title" className="label text-ink lg:col-span-3">
            {t.contactLabel}
          </h2>
          <div className="lg:col-span-9">
            <p className="text-dim">{t.contactText}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-expanded mt-4 inline-block break-all text-3xl font-semibold text-ink underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-signal sm:text-5xl"
            >
              {site.contactEmail}
            </a>
            <div className="mt-12 flex flex-wrap gap-3">
              <LinkButton
                href={localizePath(locale, '/projects')}
                variant="primary"
              >
                {dict.nav.projects}
              </LinkButton>
              <LinkButton href={localizePath(locale, '/press')}>
                {dict.nav.press}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

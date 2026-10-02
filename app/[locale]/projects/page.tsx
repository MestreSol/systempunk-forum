import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, isLocale, localizePath } from '@/i18n'
import { getProjects } from '@/lib/site/content'
import { pad, tr } from '@/lib/site/localize'
import { pageMetadata } from '@/lib/site/seo'
import { PageHeader } from '@/components/site/PageHeader'
import { MediaFrame } from '@/components/site/MediaFrame'
import { Arrow, SectionLabel, Status } from '@/components/site/primitives'
import { ArchiveCard } from '@/components/site/rows'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return pageMetadata({
    locale,
    path: '/projects',
    title: dict.projectsPage.title,
    description: dict.projectsPage.intro,
    label: dict.nav.projects
  })
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const primary = getProjects('primary')
  const archive = getProjects('archive')
  const experiments = getProjects('experiment')

  return (
    <>
      <PageHeader
        locale={locale}
        breadcrumbLabel={dict.a11y.breadcrumb}
        crumbs={[{ label: dict.nav.projects }]}
        title={dict.projectsPage.title}
        intro={dict.projectsPage.intro}
      />

      <section
        aria-label={dict.tier.primary}
        className="container-site py-16 sm:py-24"
      >
        <ul className="space-y-24 sm:space-y-32">
          {primary.map((project, index) => (
            <li key={project.slug} data-reveal="">
              <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div
                  className={
                    index % 2 === 1
                      ? 'lg:order-2 lg:col-span-7 lg:col-start-6'
                      : 'lg:col-span-7'
                  }
                >
                  <Link
                    href={localizePath(locale, `/projects/${project.slug}`)}
                    tabIndex={-1}
                    aria-hidden
                  >
                    <MediaFrame
                      media={project.heroImage ?? project.screenshots[0]}
                      locale={locale}
                      placeholder={{
                        title: dict.common.awaitingFootage,
                        note: dict.common.feedPending
                      }}
                      art={project.placeholderArt}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </Link>
                </div>
                <div
                  className={
                    index % 2 === 1
                      ? 'flex flex-col lg:order-1 lg:col-span-5'
                      : 'flex flex-col lg:col-span-5'
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <SectionLabel index={pad(project.index, 2)}>
                      {tr(project.category, locale)}
                    </SectionLabel>
                  </div>
                  <h2 className="font-expanded mt-6 text-[clamp(2.25rem,9vw,3.75rem)] font-bold uppercase leading-[0.9] text-ink">
                    <Link
                      href={localizePath(locale, `/projects/${project.slug}`)}
                      className="transition-colors hover:text-signal"
                    >
                      {project.name}
                    </Link>
                  </h2>
                  <div className="mt-6">
                    <Status
                      status={project.status}
                      label={dict.status[project.status]}
                    />
                  </div>
                  <p className="mt-8 text-lg leading-relaxed text-dim">
                    {tr(project.summary, locale)}
                  </p>
                  <div className="mt-10 lg:mt-auto lg:pt-10">
                    <Link
                      href={localizePath(locale, `/projects/${project.slug}`)}
                      className="group inline-flex min-h-11 items-center gap-3 border-b border-line-strong pb-1 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-signal"
                    >
                      {dict.projectsPage.open}
                      <span className="sr-only">: {project.name}</span>
                      <Arrow className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {[
        { key: 'archive', items: archive, label: dict.tier.archive },
        { key: 'experiment', items: experiments, label: dict.tier.experiment }
      ]
        .filter((group) => group.items.length > 0)
        .map((group) => (
          <section
            key={group.key}
            aria-labelledby={`${group.key}-title`}
            className="border-t border-line py-16 sm:py-24"
          >
            <div className="container-site grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id={`${group.key}-title`} className="label text-ink">
                  {group.label}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
                  {dict.projectsPage.archiveIntro}
                </p>
              </div>
              <ul className="border-t border-line lg:col-span-8">
                {group.items.map((project) => (
                  <ArchiveCard
                    key={project.slug}
                    project={project}
                    locale={locale}
                    dict={dict}
                  />
                ))}
              </ul>
            </div>
          </section>
        ))}
    </>
  )
}

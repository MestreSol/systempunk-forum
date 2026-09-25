import type { Dictionary } from '@/i18n'
import { localizePath, type Locale } from '@/i18n/config'
import type { Project } from '@/data/types'
import { tr } from '@/lib/site/localize'
import { MediaFrame } from '../MediaFrame'
import {
  LinkButton,
  PendingButton,
  SectionLabel,
  SpecList,
  Status
} from '../primitives'

export function FeaturedProject({
  project,
  locale,
  dict
}: {
  project: Project
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.home.featured
  const media = project.videos[0] ?? project.heroImage ?? project.screenshots[0]

  return (
    <section
      id="current-project"
      aria-labelledby="featured-title"
      className="relative border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div className="container-site">
        <div
          className="flex flex-wrap items-center justify-between gap-4"
          data-reveal="fade"
        >
          <SectionLabel index={String(project.index).padStart(2, '0')}>
            {t.label}
          </SectionLabel>
          <Status status={project.status} label={dict.status[project.status]} />
        </div>

        <h2
          id="featured-title"
          className="font-expanded mt-8 text-[clamp(4rem,19vw,17rem)] font-bold uppercase leading-[0.82] tracking-[-0.04em] text-ink"
          data-reveal=""
        >
          {project.name}
        </h2>
        <p
          className="label mt-6 text-ink sm:text-sm"
          data-reveal=""
          style={{ ['--reveal-delay' as string]: 120 }}
        >
          {tr(project.category, locale)}
        </p>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div
            className="lg:col-span-8"
            data-reveal=""
            style={{ ['--reveal-delay' as string]: 150 }}
          >
            <MediaFrame
              media={media}
              locale={locale}
              placeholder={{
                title: dict.common.awaitingFootage,
                note: dict.common.feedPending
              }}
              art={project.placeholderArt}
            />
          </div>

          <div
            className="flex flex-col lg:col-span-4"
            data-reveal=""
            style={{ ['--reveal-delay' as string]: 250 }}
          >
            <p className="font-expanded text-2xl font-medium uppercase leading-tight text-ink sm:text-3xl">
              {tr(project.tagline, locale).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <SpecList
              className="mt-10"
              items={[
                {
                  label: dict.common.status,
                  value: dict.status[project.status]
                },
                {
                  label: dict.common.category,
                  value: tr(project.category, locale)
                },
                ...(project.platforms
                  ? [
                      {
                        label: dict.projectsPage.platforms,
                        value: project.platforms.join(' / ')
                      }
                    ]
                  : [])
              ]}
            />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:flex-col lg:pt-10">
              {project.website ? (
                <LinkButton
                  href={project.website}
                  external
                  externalLabel={dict.a11y.external}
                  variant="primary"
                  className="w-full sm:w-auto lg:w-full"
                >
                  {t.explore}
                </LinkButton>
              ) : (
                <LinkButton
                  href={localizePath(locale, `/projects/${project.slug}`)}
                  variant="primary"
                  className="w-full sm:w-auto lg:w-full"
                >
                  {t.explore}
                </LinkButton>
              )}
              {project.steam ? (
                <LinkButton
                  href={project.steam}
                  external
                  externalLabel={dict.a11y.external}
                  className="w-full sm:w-auto lg:w-full"
                >
                  {t.steam}
                </LinkButton>
              ) : project.steam === null ? (
                <PendingButton
                  note={dict.common.soon}
                  className="w-full sm:w-auto lg:w-full"
                >
                  {t.steam}
                </PendingButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

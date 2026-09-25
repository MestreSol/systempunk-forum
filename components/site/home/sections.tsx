import type { Dictionary } from '@/i18n'
import { localizePath, type Locale } from '@/i18n/config'
import type { Project, UniverseEntry } from '@/data/types'
import type { Transmission } from '@/lib/site/content'
import { socials } from '@/data/site'
import { LinkButton, Section, SectionLabel, Arrow } from '../primitives'
import { ArchiveRow, ProjectRow, TransmissionRow, UniverseCard } from '../rows'
import { SystemDiagram } from '../SystemDiagram'
import Terminal from '../Terminal'

/* ─── What is Systempunk? ──────────────────────────────────────────────── */

export function AboutBrand({
  locale,
  dict
}: {
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.home.about
  return (
    <Section labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="02">{t.label}</SectionLabel>
          <h2
            id="about-title"
            className="mt-8 text-2xl font-medium leading-snug text-ink sm:text-3xl lg:text-[2.1rem]"
            data-reveal=""
          >
            {t.lead}
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <ul className="space-y-0 border-t border-line">
            {t.lines.map((line, index) => (
              <li
                key={line}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: index * 120 }}
                className="flex gap-5 border-b border-line py-5 text-lg text-dim sm:text-xl"
              >
                <span className="font-mono text-xs leading-7 text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {line}
              </li>
            ))}
          </ul>
          <p
            className="font-expanded mt-12 text-2xl font-semibold uppercase leading-tight text-ink sm:text-3xl"
            data-reveal=""
          >
            {t.closing.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? 'block text-signal' : 'block'}
              >
                {line}
              </span>
            ))}
          </p>
          <div className="mt-10" data-reveal="">
            <LinkButton href={localizePath(locale, '/about')}>
              {t.cta}
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ─── Our worlds ───────────────────────────────────────────────────────── */

export function Worlds({
  primary,
  archive,
  locale,
  dict
}: {
  primary: Project[]
  archive: Project[]
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.home.projects
  return (
    <Section labelledBy="worlds-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="03">{t.label}</SectionLabel>
          <h2
            id="worlds-title"
            className="font-expanded mt-6 text-[clamp(1.625rem,7vw,3rem)] font-semibold uppercase leading-none text-ink"
          >
            {t.title}
          </h2>
        </div>
      </div>

      <ul className="mt-12 border-t border-line">
        {primary.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            locale={locale}
            dict={dict}
            delay={index * 100}
          />
        ))}
      </ul>

      {archive.length > 0 && (
        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <p className="label lg:col-span-3">{t.archiveLabel}</p>
          <ul className="border-t border-line lg:col-span-9">
            {archive.map((project) => (
              <ArchiveRow
                key={project.slug}
                project={project}
                locale={locale}
                dict={dict}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-14">
        <LinkButton href={localizePath(locale, '/projects')}>
          {t.cta}
        </LinkButton>
      </div>
    </Section>
  )
}

/* ─── Philosophy ───────────────────────────────────────────────────────── */

export function Philosophy({ dict }: { dict: Dictionary }) {
  const t = dict.home.philosophy
  return (
    <Section labelledBy="philosophy-title" className="overflow-hidden bg-hull">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div className="relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel index="04">{t.label}</SectionLabel>
          <h2
            id="philosophy-title"
            className="font-expanded mt-8 text-[clamp(1.875rem,4.2vw,3.75rem)] font-semibold uppercase leading-[0.98] text-ink"
            data-reveal=""
          >
            {t.title.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? 'block text-dim' : 'block'}
              >
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <SystemDiagram labels={t.pillars.map((pillar) => pillar.title)} />
        </div>
      </div>

      <ol className="relative mt-16 grid border-t border-line md:grid-cols-3 lg:mt-24">
        {t.pillars.map((pillar, index) => (
          <li
            key={pillar.key}
            data-reveal=""
            style={{ ['--reveal-delay' as string]: index * 140 }}
            className="border-b border-line py-10 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l"
          >
            <p className="font-mono text-xs text-signal">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-expanded mt-6 text-2xl font-semibold uppercase text-ink">
              {pillar.title}
            </h3>
            <p className="mt-4 text-lg text-ink">{pillar.lead}</p>
            <p className="mt-3 leading-relaxed text-dim">{pillar.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ─── Universe teaser ──────────────────────────────────────────────────── */

export function UniverseTeaser({
  entries,
  locale,
  dict
}: {
  entries: UniverseEntry[]
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.home.universe
  return (
    <Section labelledBy="universe-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="05">{t.label}</SectionLabel>
          <h2
            id="universe-title"
            className="font-expanded mt-8 text-[clamp(1.625rem,7vw,3rem)] font-semibold uppercase leading-[0.95] text-ink"
            data-reveal=""
          >
            {t.title}
          </h2>
          <div className="mt-10 space-y-3 text-lg text-dim">
            {t.lines.map((line, index) => (
              <p
                key={line}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: index * 160 }}
                className={
                  index === t.lines.length - 1 ? 'pt-3 text-ink' : undefined
                }
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-12">
            <LinkButton
              href={localizePath(locale, '/universe')}
              variant="primary"
            >
              {t.cta}
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="label mb-5 flex justify-between">
            <span>{t.indexLabel}</span>
            <span>{String(entries.length).padStart(3, '0')}</span>
          </p>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {entries.map((entry, index) => (
              <UniverseCard
                key={entry.slug}
                entry={entry}
                locale={locale}
                dict={dict}
                delay={index * 70}
                compact
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* ─── Transmissions ────────────────────────────────────────────────────── */

export function LatestTransmissions({
  transmissions,
  locale,
  dict
}: {
  transmissions: Transmission[]
  locale: Locale
  dict: Dictionary
}) {
  const t = dict.home.transmissions
  if (transmissions.length === 0) return null
  return (
    <Section labelledBy="transmissions-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="06">{t.label}</SectionLabel>
          <h2
            id="transmissions-title"
            className="font-expanded mt-6 text-[clamp(1.625rem,7vw,3rem)] font-semibold uppercase leading-none text-ink"
          >
            {t.title}
          </h2>
        </div>
        <LinkButton
          href={localizePath(locale, '/transmissions')}
          variant="ghost"
          className="hidden sm:inline-flex"
        >
          {t.cta}
        </LinkButton>
      </div>
      <ul className="mt-12 border-t border-line">
        {transmissions.map((transmission, index) => (
          <TransmissionRow
            key={transmission.slug}
            transmission={transmission}
            locale={locale}
            dict={dict}
            delay={index * 100}
          />
        ))}
      </ul>
      <div className="mt-10 sm:hidden">
        <LinkButton
          href={localizePath(locale, '/transmissions')}
          className="w-full"
        >
          {t.cta}
        </LinkButton>
      </div>
    </Section>
  )
}

/* ─── Community ────────────────────────────────────────────────────────── */

export function Community({ dict }: { dict: Dictionary }) {
  const t = dict.home.community
  return (
    <section
      aria-labelledby="community-title"
      className="relative overflow-hidden border-t border-line py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="07">{t.label}</SectionLabel>
          <h2
            id="community-title"
            className="font-expanded mt-8 text-[clamp(2.5rem,8vw,6.5rem)] font-bold uppercase leading-[0.9] text-ink"
            data-reveal=""
          >
            {t.title}
          </h2>
          <div className="mt-10 space-y-1 text-lg text-dim sm:text-xl">
            {t.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Terminal lines={t.terminal} />
          <ul className="mt-6 grid grid-cols-2 gap-px border border-line bg-line">
            {socials.map((channel) => (
              <li key={channel.key} className="bg-void">
                {channel.href ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-16 items-center justify-between gap-3 px-5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-void"
                  >
                    {channel.label}
                    <Arrow
                      external
                      className="text-signal transition-colors group-hover:text-void"
                    />
                    <span className="sr-only">({dict.a11y.external})</span>
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex min-h-16 flex-col justify-center gap-1 px-5 font-mono text-xs uppercase tracking-[0.14em] text-faint"
                  >
                    {channel.label}
                    <span className="text-[0.625rem] text-faint/80">
                      [{dict.common.standby}]
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

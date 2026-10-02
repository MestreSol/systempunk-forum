import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import {
  getFeaturedProject,
  getProjects,
  getTransmissions,
  getUniverse
} from '@/lib/site/content'
import { Hero } from '@/components/site/home/Hero'
import { FeaturedProject } from '@/components/site/home/FeaturedProject'
import {
  AboutBrand,
  Community,
  LatestTransmissions,
  Philosophy,
  UniverseTeaser,
  Worlds
} from '@/components/site/home/sections'

export const revalidate = 300

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  const featured = getFeaturedProject()
  const transmissions = (await getTransmissions()).slice(0, 3)
  const archive = [...getProjects('archive'), ...getProjects('experiment')]

  return (
    <>
      <Hero dict={dict} />
      <FeaturedProject project={featured} locale={locale} dict={dict} />
      <AboutBrand locale={locale} dict={dict} />
      <Worlds
        primary={getProjects('primary')}
        archive={archive}
        locale={locale}
        dict={dict}
      />
      <Philosophy dict={dict} />
      <UniverseTeaser entries={getUniverse()} locale={locale} dict={dict} />
      <LatestTransmissions
        transmissions={transmissions}
        locale={locale}
        dict={dict}
      />
      <Community dict={dict} />
    </>
  )
}

import Link from 'next/link'
import { buttonClass } from '@/components/site/primitives'
import { OrbitalField } from '@/components/site/OrbitalField'

// not-found receives no params, so it is bilingual by design.
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-16">
      <OrbitalField className="absolute left-1/2 top-1/2 w-[120vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="container-site relative">
        <p className="label text-signal">404 — Signal lost / Sinal perdido</p>
        <h1 className="font-expanded mt-6 max-w-[16ch] text-[clamp(2.5rem,8vw,6rem)] font-semibold uppercase leading-[0.92] text-ink">
          This sector does not exist.
        </h1>
        <p className="mt-6 text-lg text-dim">
          Or it has not been built yet.{' '}
          <span lang="pt-BR">/ Ou ainda não foi construído.</span>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass('primary')}>
            Return to origin
          </Link>
          <Link href="/pt" lang="pt-BR" className={buttonClass('outline')}>
            Voltar à origem
          </Link>
        </div>
      </div>
    </section>
  )
}

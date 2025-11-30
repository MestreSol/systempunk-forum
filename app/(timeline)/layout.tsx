import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Linha do Tempo do Universo - Systempunk',
  description:
    'Uma jornada imersiva através das eras que moldaram nosso universo digital'
}

export default function TimelineLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-black">
      {children}
    </main>
  )
}

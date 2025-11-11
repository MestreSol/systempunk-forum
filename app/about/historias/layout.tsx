import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Histórias do Universo - Systempunk',
  description: 'Mapa mental interativo e narrativas do universo Systempunk'
}

export default function HistoriasLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen w-full overflow-hidden">{children}</div>
}

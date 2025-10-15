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
  // Minimal layout: omit Toolbar and Footer for full-bleed interactive canvas pages
  return <div className="min-h-screen w-full overflow-hidden">{children}</div>
}

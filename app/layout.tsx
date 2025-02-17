import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Systempunk',
  description: 'A collaborative worldbuilding project',
  keywords: [
    'worldbuilding',
    'collaborative',
    'fiction',
    'scifi',
    'fantasy',
    'universe',
    'timeline',
    'projects',
    'contribute',
    'unreal',
    'unity',
    'games'
  ],
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

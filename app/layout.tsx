<<<<<<< HEAD
import type { Metadata } from 'next'
import './globals.css'
import SuperiorMenu from '@/components/Areas/SuperiorMenu'

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
      <body>
        <SuperiorMenu />
        {children}
      </body>
    </html>
  )
}
=======
import type { Metadata } from 'next'
import './globals.css'
import SuperiorMenu from '@/components/SuperiorMenu'

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
      <body>
        <SuperiorMenu />
        {children}
      </body>
    </html>
  )
}
>>>>>>> 605858d0075b12dd304514c1bed5bb3b884e2105

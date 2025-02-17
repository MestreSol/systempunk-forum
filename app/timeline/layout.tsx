import type { Metadata } from 'next'
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

export default function layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SuperiorMenu type={'superior'} hidden={true}></SuperiorMenu>
        {children}
      </body>
    </html>
  )
}

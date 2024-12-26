import type { Metadata } from 'next'
import './globals.css'
import SuperiorMenu from '@/components/SuperiorMenu'

export const metadata: Metadata = {
  title: 'Root Layout',
  description: 'Root layout for the app',
  keywords: ['root', 'layout'],
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

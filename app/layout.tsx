import type { Metadata } from 'next'
import './globals.css'
import SuperiorMenu from '@/components/SuperiorMenu'

export const meta: Metadata = {
  title: 'Root Layout',
  description: 'Root layout for the app',
  keywords: ['root', 'layout'],
  icons: ['/favicon.ico'],
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SuperiorMenu></SuperiorMenu>
        {children}
      </body>
    </html>
  )
}

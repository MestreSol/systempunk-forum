import Link from 'next/link'
import { LogoutButton } from '@/components/admin/LogoutButton'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin/news" className="font-semibold text-lime-400">
            SystemPunk Admin
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

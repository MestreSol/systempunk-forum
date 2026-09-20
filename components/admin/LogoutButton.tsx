'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sair
    </Button>
  )
}

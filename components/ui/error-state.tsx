'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ErrorStateProps {
  title: string
  message?: string
  backLink: string
  backLabel: string
}

export function ErrorState({
  title,
  message,
  backLink,
  backLabel
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-400 mb-4">{title}</h1>
          {message && <p className="text-zinc-400 mb-6">{message}</p>}
          <Link href={backLink}>
            <Button className="bg-lime-600 hover:bg-lime-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

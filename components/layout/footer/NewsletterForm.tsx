'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  onSubscribe?: (email: string) => void
}

export default function NewsletterForm({ onSubscribe }: Props) {
  const [email, setEmail] = React.useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (onSubscribe) onSubscribe(email)
    setEmail('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
      />
      <Button size="sm" className="bg-lime-600 hover:bg-lime-700" type="submit">
        Inscrever
      </Button>
    </form>
  )
}

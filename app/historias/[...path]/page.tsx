'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StoriesPathShim() {
  const router = useRouter()
  useEffect(() => {
    // If someone hits the catch-all route, redirect to the stories list
    router.replace('/about/historias')
  }, [router])

  return null
}

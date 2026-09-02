'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as nav from '@/lib/historiaNavigation'

// Navegação estilo Obsidian entre o grafo de Histórias e as notas individuais:
// Voltar/Avançar seguem a pilha de notas realmente visitadas (não o grafo sempre),
// com atalhos Alt+Seta. Ver lib/historiaNavigation.ts para a pilha em si.
export function useStoryNavigation() {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  const refresh = useCallback(() => {
    setCanGoBack(nav.canGoBack())
    setCanGoForward(nav.canGoForward())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const back = useCallback(() => {
    const target = nav.goBack()
    if (target) {
      router.push(`/historias/${target}`)
    } else {
      // Sem histórico próprio (ex.: acesso direto por URL, ou já na primeira
      // história visitada) — cai para o grafo, de onde a navegação começa.
      router.push('/about/historias')
    }
    refresh()
  }, [router, refresh])

  const forward = useCallback(() => {
    const target = nav.goForward()
    if (target) {
      router.push(`/historias/${target}`)
      refresh()
    }
  }, [router, refresh])

  const visitStory = useCallback(
    (id: string) => {
      nav.visit(id)
      refresh()
      router.push(`/historias/${id}`)
    },
    [router, refresh]
  )

  // Garante que o id atual (montagem direta por URL) fique registrado na pilha
  // para que back()/forward() funcionem a partir daqui.
  const registerCurrent = useCallback(
    (id: string) => {
      nav.visit(id)
      refresh()
    },
    [refresh]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.altKey) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        back()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        forward()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [back, forward])

  return { back, forward, canGoBack, canGoForward, visitStory, registerCurrent }
}

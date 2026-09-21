'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SafeImage } from './common'

export function MediaGallery({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            aria-label={`Abrir imagem ${i + 1}`}
            className="group overflow-hidden rounded-xl border border-zinc-800 hover:border-lime-500/60 transition-colors"
          >
            <SafeImage
              src={src}
              alt="Mídia do jogo"
              className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-[fade-in_0.2s_ease-out]"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Fechar"
            className="absolute top-4 right-4 p-2 text-white hover:text-lime-400"
            onClick={() => setOpen(null)}
          >
            <X className="w-7 h-7" />
          </button>
          <button
            aria-label="Anterior"
            className="absolute left-4 p-2 text-white hover:text-lime-400"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
          >
            <ChevronLeft className="w-9 h-9" />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <SafeImage
              src={items[open]}
              alt="Mídia do jogo"
              className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
            />
            <p className="mt-2 text-center text-sm text-zinc-400">
              {open + 1} / {items.length}
            </p>
          </div>
          <button
            aria-label="Próxima"
            className="absolute right-4 p-2 text-white hover:text-lime-400"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
          >
            <ChevronRight className="w-9 h-9" />
          </button>
        </div>
      )}
    </>
  )
}

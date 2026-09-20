'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import type { GalleryBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: GalleryBlockData
  onChange: (data: GalleryBlockData) => void
}

export function GalleryBlockForm({ data, onChange }: Props) {
  function updateImage(index: number, field: 'url' | 'alt', value: string) {
    const images = [...data.images]
    images[index] = { ...images[index], [field]: value }
    onChange({ images })
  }

  function removeImage(index: number) {
    onChange({ images: data.images.filter((_, i) => i !== index) })
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= data.images.length) return
    const images = [...data.images]
    const temp = images[index]
    images[index] = images[target]
    images[target] = temp
    onChange({ images })
  }

  return (
    <div className="space-y-4">
      {data.images.map((image, index) => (
        <div
          key={index}
          className="border border-zinc-800 rounded-lg p-3 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Imagem {index + 1}</span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-400"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-400"
                onClick={() => move(index, 1)}
                disabled={index === data.images.length - 1}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-400"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <Input
            value={image.url}
            onChange={(event) => updateImage(index, 'url', event.target.value)}
            placeholder="URL da imagem"
            className="bg-zinc-900 border-zinc-800"
          />
          <Input
            value={image.alt}
            onChange={(event) => updateImage(index, 'alt', event.target.value)}
            placeholder="Texto alternativo"
            className="bg-zinc-900 border-zinc-800"
          />
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full border-dashed border-zinc-700 text-zinc-300"
        onClick={() =>
          onChange({ images: [...data.images, { url: '', alt: '' }] })
        }
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar imagem
      </Button>
    </div>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ImageBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: ImageBlockData
  onChange: (data: ImageBlockData) => void
}

export function ImageBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>URL da imagem</Label>
        <Input
          value={data.url}
          onChange={(event) => onChange({ ...data, url: event.target.value })}
          placeholder="https://..."
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Texto alternativo</Label>
        <Input
          value={data.alt}
          onChange={(event) => onChange({ ...data, alt: event.target.value })}
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Legenda (opcional)</Label>
        <Input
          value={data.caption ?? ''}
          onChange={(event) =>
            onChange({ ...data, caption: event.target.value })
          }
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      {data.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.url}
          alt={data.alt}
          className="w-full rounded-lg border border-zinc-800 max-h-64 object-cover"
        />
      )}
    </div>
  )
}

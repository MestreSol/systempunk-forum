'use client'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuoteBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: QuoteBlockData
  onChange: (data: QuoteBlockData) => void
}

export function QuoteBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Citação</Label>
        <Textarea
          value={data.text}
          onChange={(event) => onChange({ ...data, text: event.target.value })}
          rows={4}
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Atribuição (opcional)</Label>
        <Input
          value={data.attribution ?? ''}
          onChange={(event) =>
            onChange({ ...data, attribution: event.target.value })
          }
          placeholder="Nome, cargo..."
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
    </div>
  )
}

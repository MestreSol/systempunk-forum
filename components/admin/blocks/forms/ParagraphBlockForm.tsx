'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { ParagraphBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: ParagraphBlockData
  onChange: (data: ParagraphBlockData) => void
}

export function ParagraphBlockForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Texto (markdown)</Label>
        <Textarea
          value={data.markdown}
          onChange={(event) => onChange({ markdown: event.target.value })}
          rows={8}
          className="bg-zinc-900 border-zinc-800 font-mono text-sm"
        />
      </div>
      {data.markdown && (
        <div className="space-y-1.5">
          <Label className="text-zinc-500">Pré-visualização</Label>
          <div className="text-sm text-zinc-300 border border-zinc-800 rounded-lg p-3 bg-zinc-950">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.markdown}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

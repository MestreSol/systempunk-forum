'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { VideoBlockData } from '@/lib/news/blockTypes'

interface Props {
  data: VideoBlockData
  onChange: (data: VideoBlockData) => void
}

export function VideoBlockForm({ data, onChange }: Props) {
  function handleUrlChange(url: string) {
    const isYouTube = /youtu\.?be/.test(url)
    onChange({ url, provider: isYouTube ? 'youtube' : data.provider })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>URL do vídeo</Label>
        <Input
          value={data.url}
          onChange={(event) => handleUrlChange(event.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="bg-zinc-900 border-zinc-800"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Tipo</Label>
        <Select
          value={data.provider}
          onValueChange={(next) =>
            onChange({ ...data, provider: next as VideoBlockData['provider'] })
          }
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="raw">Arquivo de vídeo direto (mp4)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

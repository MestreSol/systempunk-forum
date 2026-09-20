import type { NewsBlockRecord } from '@/lib/news/blockTypes'
import { HeadingBlock } from './HeadingBlock'
import { ParagraphBlock } from './ParagraphBlock'
import { ImageBlock } from './ImageBlock'
import { GalleryBlock } from './GalleryBlock'
import { QuoteBlock } from './QuoteBlock'
import { CalloutBlock } from './CalloutBlock'
import { VideoBlock } from './VideoBlock'
import { DividerBlock } from './DividerBlock'
import { ButtonBlock } from './ButtonBlock'

export function BlockRenderer({ blocks }: { blocks: NewsBlockRecord[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return <HeadingBlock key={block.id} data={block.data} />
          case 'paragraph':
            return <ParagraphBlock key={block.id} data={block.data} />
          case 'image':
            return <ImageBlock key={block.id} data={block.data} />
          case 'gallery':
            return <GalleryBlock key={block.id} data={block.data} />
          case 'quote':
            return <QuoteBlock key={block.id} data={block.data} />
          case 'callout':
            return <CalloutBlock key={block.id} data={block.data} />
          case 'video':
            return <VideoBlock key={block.id} data={block.data} />
          case 'divider':
            return <DividerBlock key={block.id} />
          case 'button':
            return <ButtonBlock key={block.id} data={block.data} />
          default:
            console.warn(
              `Tipo de bloco desconhecido: ${(block as { type: string }).type}`
            )
            return null
        }
      })}
    </div>
  )
}

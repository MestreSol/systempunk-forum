'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { BLOCK_TYPE_META, type EditorBlock } from '@/lib/news/blockTypes'
import { HeadingBlockForm } from './forms/HeadingBlockForm'
import { ParagraphBlockForm } from './forms/ParagraphBlockForm'
import { ImageBlockForm } from './forms/ImageBlockForm'
import { GalleryBlockForm } from './forms/GalleryBlockForm'
import { QuoteBlockForm } from './forms/QuoteBlockForm'
import { CalloutBlockForm } from './forms/CalloutBlockForm'
import { VideoBlockForm } from './forms/VideoBlockForm'
import { DividerBlockForm } from './forms/DividerBlockForm'
import { ButtonBlockForm } from './forms/ButtonBlockForm'

interface BlockEditSheetProps {
  block: EditorBlock | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onChange: (data: unknown) => void
}

export function BlockEditSheet({
  block,
  open,
  onOpenChange,
  onChange
}: BlockEditSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-zinc-950 border-zinc-800 text-white overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lime-400">
            {block ? BLOCK_TYPE_META[block.type].label : 'Editar bloco'}
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          {block && renderForm(block, onChange)}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function renderForm(block: EditorBlock, onChange: (data: unknown) => void) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlockForm data={block.data} onChange={onChange} />
    case 'paragraph':
      return <ParagraphBlockForm data={block.data} onChange={onChange} />
    case 'image':
      return <ImageBlockForm data={block.data} onChange={onChange} />
    case 'gallery':
      return <GalleryBlockForm data={block.data} onChange={onChange} />
    case 'quote':
      return <QuoteBlockForm data={block.data} onChange={onChange} />
    case 'callout':
      return <CalloutBlockForm data={block.data} onChange={onChange} />
    case 'video':
      return <VideoBlockForm data={block.data} onChange={onChange} />
    case 'divider':
      return <DividerBlockForm />
    case 'button':
      return <ButtonBlockForm data={block.data} onChange={onChange} />
    default:
      return null
  }
}

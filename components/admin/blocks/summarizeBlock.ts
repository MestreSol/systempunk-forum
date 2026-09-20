import type { EditorBlock } from '@/lib/news/blockTypes'

export function summarizeBlock(block: EditorBlock): string {
  switch (block.type) {
    case 'heading':
      return block.data.text || 'Sem texto'
    case 'paragraph':
      return block.data.markdown || 'Sem texto'
    case 'image':
      return block.data.url || 'Sem URL'
    case 'gallery':
      return `${block.data.images.length} imagem(ns)`
    case 'quote':
      return block.data.text || 'Sem texto'
    case 'callout':
      return block.data.text || 'Sem texto'
    case 'video':
      return block.data.url || 'Sem URL'
    case 'divider':
      return 'Separador visual'
    case 'button':
      return block.data.label || 'Sem rótulo'
    default:
      return ''
  }
}

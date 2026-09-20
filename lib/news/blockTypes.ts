import {
  Heading,
  Type,
  Image as ImageIcon,
  GalleryHorizontal,
  Quote,
  AlertCircle,
  Video,
  Minus,
  MousePointerClick,
  type LucideIcon
} from 'lucide-react'

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'gallery'
  | 'quote'
  | 'callout'
  | 'video'
  | 'divider'
  | 'button'

export interface HeadingBlockData {
  text: string
  level: 2 | 3
}

export interface ParagraphBlockData {
  markdown: string
}

export interface ImageBlockData {
  url: string
  alt: string
  caption?: string
}

export interface GalleryBlockData {
  images: { url: string; alt: string }[]
}

export interface QuoteBlockData {
  text: string
  attribution?: string
}

export interface CalloutBlockData {
  style: 'info' | 'warning' | 'success'
  text: string
}

export interface VideoBlockData {
  url: string
  provider: 'youtube' | 'raw'
}

export type DividerBlockData = Record<string, never>

export interface ButtonBlockData {
  label: string
  href: string
  variant?: 'default' | 'outline'
}

export interface BlockDataMap {
  heading: HeadingBlockData
  paragraph: ParagraphBlockData
  image: ImageBlockData
  gallery: GalleryBlockData
  quote: QuoteBlockData
  callout: CalloutBlockData
  video: VideoBlockData
  divider: DividerBlockData
  button: ButtonBlockData
}

// A block as rendered/persisted: no client-only bookkeeping fields.
export type NewsBlockRecord = {
  [K in BlockType]: { id: string; order: number; type: K; data: BlockDataMap[K] }
}[BlockType]

// A block as held in the editor's local state: `id` is only present once
// the block has been persisted at least once; `clientId` is always present
// and stable for the session, used as the dnd-kit sortable id / React key.
export type EditorBlock = {
  [K in BlockType]: { clientId: string; id?: string; type: K; data: BlockDataMap[K] }
}[BlockType]

export const BLOCK_TYPES: BlockType[] = [
  'heading',
  'paragraph',
  'image',
  'gallery',
  'quote',
  'callout',
  'video',
  'divider',
  'button'
]

interface BlockTypeMeta<T extends BlockType> {
  label: string
  icon: LucideIcon
  defaultData: () => BlockDataMap[T]
}

export const BLOCK_TYPE_META: { [K in BlockType]: BlockTypeMeta<K> } = {
  heading: {
    label: 'Título',
    icon: Heading,
    defaultData: () => ({ text: '', level: 2 })
  },
  paragraph: {
    label: 'Parágrafo',
    icon: Type,
    defaultData: () => ({ markdown: '' })
  },
  image: {
    label: 'Imagem',
    icon: ImageIcon,
    defaultData: () => ({ url: '', alt: '' })
  },
  gallery: {
    label: 'Galeria',
    icon: GalleryHorizontal,
    defaultData: () => ({ images: [] })
  },
  quote: {
    label: 'Citação',
    icon: Quote,
    defaultData: () => ({ text: '' })
  },
  callout: {
    label: 'Aviso',
    icon: AlertCircle,
    defaultData: () => ({ style: 'info', text: '' })
  },
  video: {
    label: 'Vídeo',
    icon: Video,
    defaultData: () => ({ url: '', provider: 'youtube' })
  },
  divider: {
    label: 'Divisor',
    icon: Minus,
    defaultData: () => ({})
  },
  button: {
    label: 'Botão',
    icon: MousePointerClick,
    defaultData: () => ({ label: '', href: '' })
  }
}

export function isBlockType(value: string): value is BlockType {
  return (BLOCK_TYPES as string[]).includes(value)
}

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ParagraphBlockData } from '@/lib/news/blockTypes'

export function ParagraphBlock({ data }: { data: ParagraphBlockData }) {
  if (!data.markdown) return null

  return (
    <div
      className="text-zinc-300 leading-relaxed space-y-4
        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-lime-100
        [&_strong]:text-white [&_strong]:font-semibold
        [&_a]:text-lime-400 [&_a]:underline
        [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1
        [&_blockquote]:border-l-2 [&_blockquote]:border-lime-500 [&_blockquote]:pl-4 [&_blockquote]:italic
        [&_code]:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-lime-300 [&_code]:text-sm"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.markdown}</ReactMarkdown>
    </div>
  )
}

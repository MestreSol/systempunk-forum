import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

const components: Components = {
  a: ({ href = '', children }) =>
    href.startsWith('/') ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  // Content headings start at h2; the page owns the h1.
  h1: ({ children }) => <h2>{children}</h2>
}

export function Markdown({
  children,
  className
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn('prose-system', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ButtonBlockData } from '@/lib/news/blockTypes'

export function ButtonBlock({ data }: { data: ButtonBlockData }) {
  if (!data.label || !data.href) return null

  const isExternal = /^https?:\/\//.test(data.href)
  const isOutline = data.variant === 'outline'

  return (
    <div>
      <Button
        asChild
        variant={isOutline ? 'outline' : 'default'}
        size="lg"
        className={
          isOutline
            ? 'border-lime-500/50 text-lime-300 hover:bg-lime-500/10'
            : 'bg-lime-600 hover:bg-lime-700 text-white'
        }
      >
        <Link
          href={data.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {data.label}
        </Link>
      </Button>
    </div>
  )
}

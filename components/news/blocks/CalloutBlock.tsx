import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { CalloutBlockData } from '@/lib/news/blockTypes'

const STYLE_MAP = {
  info: {
    icon: Info,
    className: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200 [&_svg]:text-cyan-400'
  },
  warning: {
    icon: AlertTriangle,
    className:
      'bg-amber-500/10 border-amber-500/30 text-amber-200 [&_svg]:text-amber-400'
  },
  success: {
    icon: CheckCircle2,
    className:
      'bg-lime-500/10 border-lime-500/30 text-lime-200 [&_svg]:text-lime-400'
  }
} as const

export function CalloutBlock({ data }: { data: CalloutBlockData }) {
  if (!data.text) return null

  const config = STYLE_MAP[data.style] ?? STYLE_MAP.info
  const Icon = config.icon

  return (
    <Alert className={config.className}>
      <Icon />
      <AlertDescription className="text-current">{data.text}</AlertDescription>
    </Alert>
  )
}

'use client'

import React from 'react'
import { Button } from './button'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onToggle?: () => void
  ariaLabel?: string
  isActive?: boolean
}

export default function ToggleButton({
  onToggle,
  ariaLabel,
  children,
  ...rest
}: Props) {
  return (
    <Button
      {...(rest as any)}
      variant="outline"
      size={(rest as any).size ?? 'icon'}
      aria-label={ariaLabel}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (onToggle) onToggle()
        if (rest && typeof rest.onClick === 'function') rest.onClick(e)
      }}
    >
      {children}
    </Button>
  )
}

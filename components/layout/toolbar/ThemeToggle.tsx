'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../../ui/button'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span aria-hidden suppressHydrationWarning>
        {theme === 'dark' ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3v1m0 16v1m8.66-13.66-.71.71M4.05 19.07l-.71.71m16.97 0-.71-.71M4.05 4.93l-.71-.71M21 12h-1M4 12H3m9-9a9 9 0 1 0 9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.07-1.41 1.41M6.05 17.95l-1.41 1.41m12.02 0-1.41-1.41M6.05 6.05 4.64 4.64"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </Button>
  )
}

'use client'

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({
  message = 'Carregando...'
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-lime-400">{message}</div>
        </div>
      </div>
    </div>
  )
}

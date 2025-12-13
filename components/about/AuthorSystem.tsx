import React from 'react'
import { Button } from '@/components/ui/button'
import PortifyIcon from '@/components/ui/icons/Portify'

interface AuthorProps {
  authors: { name: string; role?: string; url?: string }[]
}

export default function AuthorSystem({ authors }: AuthorProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <PortifyIcon className="w-6 h-6 text-lime-400" />
        <h4 className="text-white font-semibold">Créditos & Autoria</h4>
      </div>

      <ul className="space-y-2 mb-3">
        {authors.map((a, i) => (
          <li key={i} className="text-zinc-300 text-sm">
            <span className="text-zinc-200 font-medium">{a.name}</span>
            {a.role ? <span className="text-zinc-400"> — {a.role}</span> : null}
            {a.url ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-lime-400 hover:underline"
              >
                Perfil
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(JSON.stringify(authors))}>
          Copiar metadados
        </Button>
        <Button size="sm" onClick={() => alert('Marcar como autor principal (simulado)')}>
          Marcar como autor
        </Button>
      </div>
    </div>
  )
}

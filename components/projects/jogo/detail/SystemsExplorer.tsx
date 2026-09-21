'use client'

import { useState } from 'react'
import type { ProjectSystems } from '@/types/ProjectDetail.type'

function humanizeKey(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export function SystemsExplorer({ systems }: { systems: ProjectSystems }) {
  const keys = Object.keys(systems)
  const [active, setActive] = useState(keys[0])

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {keys.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full text-sm border transition-all ${
              active === key
                ? 'bg-lime-600 border-lime-500 text-white scale-105'
                : 'border-zinc-700 text-zinc-300 hover:border-lime-500/60 hover:text-white'
            }`}
          >
            {humanizeKey(key)}
            <span className="ml-2 text-xs opacity-70">
              {systems[key].length}
            </span>
          </button>
        ))}
      </div>

      <ul key={active} className="grid sm:grid-cols-2 gap-3">
        {systems[active].map((item, i) => (
          <li
            key={item}
            style={{ animationDelay: `${i * 40}ms` }}
            className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-300 opacity-0 animate-[fade-in_0.4s_ease-out_forwards] hover:border-lime-500/40"
          >
            <span className="text-lime-400">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

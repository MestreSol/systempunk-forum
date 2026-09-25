'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FilterItem {
  key: string
  group: string
  node: ReactNode
}

/**
 * Client-side filter over server-rendered items. Every item stays in the
 * HTML (good for crawlers and no-JS); filtering only toggles `hidden`.
 */
export default function FilterableList({
  label,
  allLabel,
  emptyLabel,
  groups,
  items,
  listClassName,
  itemClassName
}: {
  label: string
  allLabel: string
  emptyLabel: string
  groups: { value: string; label: string }[]
  items: FilterItem[]
  listClassName?: string
  itemClassName?: string
}) {
  const [active, setActive] = useState<string | null>(null)
  const visible = items.filter((item) => !active || item.group === active)
  const options = [{ value: null, label: allLabel }, ...groups]

  return (
    <div>
      {groups.length > 1 && (
        <div
          role="group"
          aria-label={label}
          className="-mx-1 mb-10 flex flex-wrap gap-2"
        >
          {options.map((option) => {
            const pressed = active === option.value
            const count = option.value
              ? items.filter((item) => item.group === option.value).length
              : items.length
            return (
              <button
                key={option.value ?? 'all'}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(option.value)}
                className={cn(
                  'inline-flex min-h-10 items-center gap-2 border px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors',
                  pressed
                    ? 'border-ink bg-ink text-void'
                    : 'border-line text-dim hover:border-line-strong hover:text-ink'
                )}
              >
                {option.label}
                <span className={pressed ? 'text-void/60' : 'text-faint'}>
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <ul className={listClassName}>
        {items.map((item) => (
          <li
            key={item.key}
            hidden={!!active && item.group !== active}
            className={itemClassName}
          >
            {item.node}
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="py-10 text-dim">{emptyLabel}</p>}
    </div>
  )
}

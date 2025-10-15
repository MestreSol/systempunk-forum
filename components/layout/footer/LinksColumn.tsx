'use client'

import Link from 'next/link'
import React from 'react'

type Item = {
  label: string
  href: string
}

export default function LinksColumn({
  title,
  items
}: {
  title: string
  items: Item[]
}) {
  return (
    <div>
      <h3 className="font-semibold text-lime-400 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

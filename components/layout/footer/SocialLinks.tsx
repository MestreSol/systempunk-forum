'use client'

import React from 'react'
import Link from 'next/link'

type Social = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
  label: string
  external?: boolean
}

export default function SocialLinks({ links }: { links: Social[] }) {
  return (
    <div className="flex space-x-3">
      {links.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          target={social.external ? '_blank' : undefined}
          rel={social.external ? 'noopener noreferrer' : undefined}
          className="text-zinc-400 hover:text-lime-400 transition-colors"
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  )
}

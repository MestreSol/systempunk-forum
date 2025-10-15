'use client'
import React from 'react'
import Link from 'next/link'
import { NavigationMenuLink } from '../../ui/navigation-menu'

type Props = React.ComponentPropsWithoutRef<'li'> & {
  href: string
  title: string
}

export default function ListItem({ title, children, href, ...props }: Props) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

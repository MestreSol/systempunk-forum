import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/data/types'

/* ─── Section label: "01 / CURRENT PROJECT" ─────────────────────────────── */

export function SectionLabel({
  index,
  children,
  className
}: {
  index?: string
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn('label flex items-center gap-3', className)}>
      {index && <span className="text-signal">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-line-strong" />}
      <span>{children}</span>
    </p>
  )
}

/* ─── Arrow glyph ───────────────────────────────────────────────────────── */

export function Arrow({
  className,
  external
}: {
  className?: string
  external?: boolean
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn('size-3.5 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {external ? (
        <path d="M5 11 11 5M6 5h5v5" strokeLinecap="square" />
      ) : (
        <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
      )}
    </svg>
  )
}

/* ─── Buttons ───────────────────────────────────────────────────────────── */

type ButtonVariant = 'primary' | 'outline' | 'ghost'

const buttonBase =
  'group inline-flex min-h-11 items-center justify-center gap-3 px-5 font-mono text-xs uppercase tracking-[0.14em] transition-[background-color,color,border-color] duration-200 select-none'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-signal text-void hover:bg-ink',
  outline:
    'border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-void',
  ghost: 'px-0 text-ink hover:text-signal'
}

export function buttonClass(
  variant: ButtonVariant = 'outline',
  className?: string
) {
  return cn(buttonBase, buttonVariants[variant], className)
}

type LinkButtonProps = {
  href: string
  variant?: ButtonVariant
  external?: boolean
  externalLabel?: string
  children: ReactNode
  className?: string
} & Omit<ComponentProps<'a'>, 'href'>

export function LinkButton({
  href,
  variant = 'outline',
  external,
  externalLabel,
  children,
  className,
  ...rest
}: LinkButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <Arrow
        external={external}
        className="transition-transform duration-300 ease-[var(--ease-system)] group-hover:translate-x-0.5"
      />
      {external && externalLabel && (
        <span className="sr-only">({externalLabel})</span>
      )}
    </>
  )
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  )
}

/** A CTA whose destination does not exist yet (e.g. Steam before launch). */
export function PendingButton({
  children,
  note,
  className
}: {
  children: ReactNode
  note: string
  className?: string
}) {
  return (
    <span
      aria-disabled="true"
      className={cn(
        buttonBase,
        'cursor-not-allowed border border-dashed border-line-strong text-faint',
        className
      )}
    >
      <span>{children}</span>
      <span className="text-[0.625rem] text-faint/80">[{note}]</span>
    </span>
  )
}

/* ─── Status indicator ──────────────────────────────────────────────────── */

const statusTone: Record<ProjectStatus, string> = {
  active: 'bg-online',
  early: 'bg-caution',
  released: 'bg-ink',
  paused: 'bg-faint',
  archived: 'bg-faint',
  prototype: 'bg-faint'
}

export function StatusDot({
  status,
  className
}: {
  status: ProjectStatus
  className?: string
}) {
  const live = status === 'active' || status === 'early'
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-1.5 rounded-full',
        statusTone[status],
        live && 'motion-safe:animate-pulse-dot',
        className
      )}
    />
  )
}

export function Status({
  status,
  label
}: {
  status: ProjectStatus
  label: string
}) {
  return (
    <span className="label inline-flex items-center gap-2 text-ink">
      <StatusDot status={status} />
      {label}
    </span>
  )
}

/* ─── Tag ───────────────────────────────────────────────────────────────── */

export function Tag({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-line px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim',
        className
      )}
    >
      {children}
    </span>
  )
}

/* ─── Key/value spec list ───────────────────────────────────────────────── */

export function SpecList({
  items,
  className
}: {
  items: { label: string; value: ReactNode }[]
  className?: string
}) {
  return (
    <dl className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline justify-between gap-6 py-3"
        >
          <dt className="label">{item.label}</dt>
          <dd className="text-right text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ─── Section wrapper ───────────────────────────────────────────────────── */

export function Section({
  id,
  children,
  className,
  labelledBy
}: {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative border-t border-line py-20 sm:py-28 lg:py-36',
        className
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

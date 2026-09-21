interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center'
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <span className="text-xs font-mono uppercase tracking-[0.25em] text-lime-400">
        // {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-zinc-400 text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

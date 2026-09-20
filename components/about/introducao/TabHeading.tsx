interface TabHeadingProps {
  title: string
  subtitle: string
  className?: string
}

export function TabHeading({
  title,
  subtitle,
  className = 'mb-8'
}: TabHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-4xl font-bold text-lime-200 mb-4">{title}</h2>
      <p className="text-zinc-400 text-lg">{subtitle}</p>
    </div>
  )
}

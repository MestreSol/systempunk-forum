interface IconBoxProps {
  children: React.ReactNode
  className?: string
}

export function IconBox({ children, className = '' }: IconBoxProps) {
  return (
    <div className={`p-3 bg-lime-500/20 rounded-lg flex-shrink-0 ${className}`}>
      {children}
    </div>
  )
}

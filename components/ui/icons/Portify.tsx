import * as React from 'react'

export default function PortifyIcon({ className = 'w-6 h-6', title = 'Portify', ...props }: React.SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <title>{title}</title>
      {/* circle base */}
      <circle cx="12" cy="12" r="9" className="text-lime-400/20" />
      {/* port-like wave */}
      <path d="M7 13c1.2-2 3.8-3.5 6-2.5 2 0.9 3 3 4 4" className="text-lime-400" />
      {/* arrow / marker representing publish/port */}
      <path d="M12 7v6" className="text-lime-400" />
      <path d="M10 9l2-2 2 2" className="text-lime-400" />
    </svg>
  )
}

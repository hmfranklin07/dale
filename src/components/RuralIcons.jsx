/* Simple line icons for home-page sections (barn, fence, field) */

export const iconClass = 'shrink-0 text-sage-600/85'

export function IconBarn({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20V14l10-8 10 8v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h16v5H8z" />
      <path strokeLinecap="round" d="M10 20v-2h2v2m10 0v-2h-2v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4-2 4 2" />
    </svg>
  )
}

export function IconFence({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M3 12h26M3 18h26" />
      <path strokeLinecap="round" d="M7 12v12M12 9v15M17 12v12M22 9v15M27 12v12" />
    </svg>
  )
}

export function IconHills({ className = 'h-7 w-7' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 24c4-5 6-5 9-1 3-6 6-6 9 0 2-3 3-3 4 0 1-1 1-1 1h16" />
      <path strokeLinecap="round" d="M10 20l2-1 2 1" />
    </svg>
  )
}

export function IconBarnRow({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sage-600/80 ${className}`}
      aria-hidden
    >
      <IconBarn className="h-6 w-6 sm:h-7 sm:w-7" />
      <IconFence className="h-6 w-6 sm:h-7 sm:w-7" />
      <IconHills className="h-6 w-6 sm:h-7 sm:w-7" />
    </div>
  )
}

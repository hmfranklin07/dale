import social from '../data/social.json'
import { YOUTUBE_CHANNEL_URL } from '../config/externalUrls'
import { PIN_BODY_DEFAULT, PIN_BODY_HOVER } from '../config/mapPinColors'

function YoutubeIcon({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M23.5 6.2A3 3 0 0 0 21.4 4c-1.9-.5-9.4-.5-9.4-.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 28 28 0 0 0 0 12a28 28 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5V8.5L16 12l-6.5 3.5z" />
    </svg>
  )
}

function InstagramIcon({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.4-1.1-.5-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.4 2.3-.5 1.3-.1 1.7-.1 4.9-.1zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.4-9.4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  )
}

const youtubeHref = social.youtubeUrl || YOUTUBE_CHANNEL_URL

export default function SocialLinks({ className = '', size = 'default', variant = 'buttons' }) {
  const btn =
    size === 'large'
      ? 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-base transition-colors'
      : 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors'

  if (variant === 'inline') {
    const pinIconStyle = {
      '--pin-icon': PIN_BODY_DEFAULT,
      '--pin-icon-hover': PIN_BODY_HOVER,
    }
    const linkClass =
      'group inline-flex items-center gap-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pin-icon)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-900 rounded-sm'
    const textClass =
      'font-medium text-white underline underline-offset-[0.2em] decoration-white/35 group-hover:decoration-white/55'
    const iconClass =
      'h-7 w-7 shrink-0 text-[color:var(--pin-icon)] transition-colors group-hover:text-[color:var(--pin-icon-hover)]'

    return (
      <div className={`flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8 ${className}`}>
        <a href={youtubeHref} target="_blank" rel="noreferrer" className={linkClass} style={pinIconStyle}>
          <YoutubeIcon className={iconClass} />
          <span className={textClass}>{social.youtubeLabel}</span>
        </a>
        <a href={social.instagramUrl} target="_blank" rel="noreferrer" className={linkClass} style={pinIconStyle}>
          <InstagramIcon className={iconClass} />
          <span className={textClass}>{social.instagramLabel}</span>
        </a>
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={youtubeHref}
        target="_blank"
        rel="noreferrer"
        className={`${btn} bg-red-600 text-white hover:bg-red-700 shadow-sm`}
      >
        <span aria-hidden>▶</span> {social.youtubeLabel}
      </a>
      <a
        href={social.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className={`${btn} bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white hover:opacity-95 shadow-sm`}
      >
        <span aria-hidden>◉</span> {social.instagramLabel}
      </a>
    </div>
  )
}

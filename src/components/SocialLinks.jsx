import social from '../data/social.json'

export default function SocialLinks({ className = '', size = 'default' }) {
  const btn =
    size === 'large'
      ? 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-base transition-colors'
      : 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors'

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={social.youtubeUrl}
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

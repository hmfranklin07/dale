import { Link } from 'react-router-dom'
import social from '../data/social.json'
import states from '../data/states.json'
import { YOUTUBE_CHANNEL_URL } from '../config/externalUrls'
import { SectionAmbience } from './SectionAmbience'

const shell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="relative from-zinc-950 via-earth-900 to-sage-900/98 bg-gradient-to-br text-sage-100/90">
        <SectionAmbience variant="dark" />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 to-black/20"
          aria-hidden
        />
        <div className={`relative z-10 ${shell} py-12`}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span>
                <span className="font-display text-xl text-white">STEM on the Road</span>
              </div>
              <p className="text-sm leading-relaxed text-sage-200/90">
                Field interviews and reflections from a summer 2026 road trip through six states, built to
                document rural STEM access with care and context.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="text-rust-200 transition-colors hover:text-amber-100/95"
              >
                  {social.youtubeLabel}
                </a>
                <span className="text-sage-500/80" aria-hidden>
                  ·
                </span>
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-rust-200 transition-colors hover:text-amber-100/95"
                >
                  {social.instagramLabel}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display mb-4 text-lg text-white">By state</h4>
              <ul className="space-y-2 text-sm">
                {states.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="text-sage-200/90 transition-colors hover:text-white"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="font-display mb-2 mt-6 text-lg text-white">Blog</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/blog" className="text-sage-200/90 transition-colors hover:text-white">
                    Latest posts &amp; videos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display mb-4 text-lg text-white">About the site</h4>
              <p className="text-sm leading-relaxed text-sage-200/90">
                Content is shared with consent. Short-form, written Q&amp;As, and personal reflections are
                labeled by state and town as the trip continues.
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

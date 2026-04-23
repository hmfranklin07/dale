import { Link } from 'react-router-dom'
import social from '../data/social.json'
import states from '../data/states.json'
import { YOUTUBE_CHANNEL_URL } from '../config/externalUrls'
import { SectionAmbience } from './SectionAmbience'

const shell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="bg-gradient-to-br from-earth-950 via-sage-900 to-rust-900 text-sage-200/95">
        <SectionAmbience variant="dark" />
        <div className={`relative z-10 ${shell} py-12`}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span>
                <span className="font-display text-xl text-white">STEM on the Road</span>
              </div>
              <p className="text-sm leading-relaxed text-sage-200/90">
                Field interviews and reflections from a summer 2026 road trip through five states, built to
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
              <h4 className="font-display mb-2 mt-6 text-lg text-white">Vlog</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/vlog" className="text-sage-200/90 transition-colors hover:text-white">
                    Vlog & B‑roll
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

          <div className="mt-8 border-t border-sage-500/35 pt-8 text-center text-sm text-sage-200/80">
            <p>
              &copy; {new Date().getFullYear()} STEM on the Road. Built for education, not profit.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

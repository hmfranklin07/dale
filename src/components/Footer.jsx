import { Link } from 'react-router-dom'
import social from '../data/social.json'
import states from '../data/states.json'

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-sage-200/95 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔬</span>
              <span className="font-display text-xl text-white">STEM on the Road</span>
            </div>
            <p className="text-sm leading-relaxed">
              Field interviews and reflections from a summer 2026 road trip through five states, built to
              document rural STEM access with care and context.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={social.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rust-300 hover:text-rust-200"
              >
                {social.youtubeLabel}
              </a>
              <span className="text-sage-400/90" aria-hidden>
                ·
              </span>
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rust-300 hover:text-rust-200"
              >
                {social.instagramLabel}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">By state</h4>
            <ul className="space-y-2 text-sm">
              {states.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-white text-lg mb-2 mt-6">Vlog</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/vlog" className="hover:text-white transition-colors">
                  Vlog & B‑roll
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-lg mb-4">About the site</h4>
            <p className="text-sm leading-relaxed">
              Content is shared with consent. Short-form, written Q&amp;As, and personal reflections are
              labeled by state and town as the trip continues.
            </p>
          </div>
        </div>

        <div className="border-t border-earth-500/50 mt-8 pt-8 text-center text-sm text-sage-200/90">
          <p>
            &copy; {new Date().getFullYear()} STEM on the Road. Built for education, not profit.
          </p>
        </div>
      </div>
    </footer>
  )
}

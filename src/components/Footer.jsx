import siteMeta from '../data/siteMeta.json'
import social from '../data/social.json'
import { YOUTUBE_CHANNEL_URL } from '../config/externalUrls'

const shell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

export default function Footer() {
  const mailto = `mailto:${siteMeta.contactEmail}`
  const youtubeHref = social.youtubeUrl || YOUTUBE_CHANNEL_URL

  return (
    <footer className="relative z-10 mt-auto overflow-hidden">
      <div className="relative bg-earth-900 text-sage-100/90">
        <div className={`relative z-10 ${shell} py-10 sm:py-12`}>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-6 md:text-left">
            <div className="md:pr-4">
              <h2 className="font-display mb-3 text-base text-white sm:text-lg">About this site</h2>
              <p className="text-sm leading-relaxed text-sage-200/90">
                Everything published here is shared only with informed consent.
              </p>
            </div>

            <div className="flex justify-center md:justify-center">
              <a
                href={mailto}
                className="group inline-flex flex-col items-center text-center transition-colors hover:text-rust-200"
              >
                <span className="font-display text-base text-white group-hover:text-rust-200 sm:text-lg">
                  Contact me
                </span>
                <span className="mt-1.5 text-sm text-rust-200/95 underline decoration-rust-400/45 underline-offset-[0.2em] group-hover:text-amber-100/90 group-hover:decoration-amber-200/50">
                  {siteMeta.contactEmail}
                </span>
              </a>
            </div>

            <div className="md:text-right">
              <h2 className="font-display mb-3 text-base text-white sm:text-lg">{siteMeta.researcherName}</h2>
              <div className="flex items-center justify-center gap-3 text-sm leading-relaxed md:justify-end">
                <a
                  href={youtubeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage-200/90 underline decoration-rust-300/45 underline-offset-2 transition-colors hover:text-rust-200"
                >
                  YouTube
                </a>
                <span className="text-sage-300/70" aria-hidden>
                  ·
                </span>
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage-200/90 underline decoration-rust-300/45 underline-offset-2 transition-colors hover:text-rust-200"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

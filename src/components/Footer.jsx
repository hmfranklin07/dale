import siteMeta from '../data/siteMeta.json'
import social from '../data/social.json'
import { YOUTUBE_CHANNEL_URL } from '../config/externalUrls'
import ScrollReveal from './ScrollReveal'

const shell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

export default function Footer() {
  const mailto = `mailto:${siteMeta.contactEmail}`
  const youtubeHref = social.youtubeUrl || YOUTUBE_CHANNEL_URL

  return (
    <footer className="relative z-10 mt-auto border-t border-rust-600 bg-earth-900 text-sage-100">
      <div className={`relative z-10 ${shell} py-12 sm:py-14`}>
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left">
            <div>
              <h2 className="font-sans mb-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-rust-300">
                About this site
              </h2>
              <p className="font-body text-[0.95rem] leading-relaxed text-sage-200">
                Everything published here is shared only with informed consent.
              </p>
            </div>

            <div className="flex justify-center">
              <a href={mailto} className="group inline-flex flex-col items-center text-center">
                <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-rust-300 group-hover:text-white">
                  Contact
                </span>
                <span className="mt-2 font-body text-[0.95rem] text-white underline decoration-rust-400/60 underline-offset-4 group-hover:decoration-white">
                  {siteMeta.contactEmail}
                </span>
              </a>
            </div>

            <div className="md:text-right">
              <h2 className="font-display mb-3 text-xl text-white">{siteMeta.researcherName}</h2>
              <div className="flex items-center justify-center gap-3 font-sans text-sm md:justify-end">
                <a
                  href={youtubeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage-200 underline decoration-transparent underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  YouTube
                </a>
                <span className="text-sage-400" aria-hidden>
                  ·
                </span>
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage-200 underline decoration-transparent underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

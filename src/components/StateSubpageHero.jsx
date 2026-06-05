import { Link } from 'react-router-dom'
import { HERO_ACCENT_RUST } from '../config/mapPinColors'
import { pageTitleClass } from './SectionHeading'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'

export default function StateSubpageHero({ backTo, backLabel, title, description }) {
  return (
    <section className="relative flex min-h-[14rem] flex-col overflow-hidden border-b border-sage-600/50 bg-sage-500 sm:min-h-[16rem] md:min-h-[17rem]">
      <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-orange-100"
        >
          <svg className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>

      <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col items-center justify-center">
        <div className={`${heroShell} w-full py-10 pt-14 sm:py-12 sm:pt-16 md:py-14 md:pt-[4.25rem]`}>
          <div
            className="mx-auto max-w-3xl rounded-2xl border-2 bg-white px-6 py-8 text-center shadow-lg shadow-sage-900/[0.08] sm:px-10 sm:py-10"
            style={{ borderColor: HERO_ACCENT_RUST }}
          >
            <h1 className={`font-display text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${pageTitleClass}`}>
              {title}
            </h1>
            {description && (
              <>
                <div className="mx-auto mt-3 h-0.5 w-16 bg-rust-400 sm:mt-4 sm:w-20" aria-hidden />
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-earth-800 sm:mt-4 sm:text-base">
                  {description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

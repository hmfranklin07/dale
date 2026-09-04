import { Link } from 'react-router-dom'
import literatureReview from '../data/literatureReview.json'
import LiteratureReviewPanel from '../components/LiteratureReviewPanel'
import PageContentBand from '../components/PageContentBand'
import ScrollReveal from '../components/ScrollReveal'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[14rem] sm:min-h-[15.5rem] md:min-h-[17rem]'

export default function LiteratureReview() {
  const doc = literatureReview

  return (
    <>
      <section className={`relative flex flex-col overflow-hidden border-b border-sage-300/40 bg-sage-700 ${HERO_MIN_H}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-sage-800 via-sage-700 to-earth-800" aria-hidden />
        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col">
          <div className={`${heroShell} pt-4 sm:pt-5 md:pt-6`}>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/95 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to About
            </Link>
          </div>

          <div className={`${heroShell} flex flex-1 flex-col items-center justify-center py-8 text-center sm:py-9`}>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[0.8rem]">
                {doc.eyebrow}
              </p>
              <h1 className="mt-2 font-display text-[2rem] leading-none text-white drop-shadow-sm sm:text-[2.75rem] lg:text-[3.25rem]">
                {doc.title}
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{doc.courseLine}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PageContentBand field="route" reveal={false}>
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-earth-800 sm:text-xl sm:leading-[1.65]">
            {doc.intro.includes('The Curious Scientist') ? (
              <>
                {doc.intro.slice(0, doc.intro.indexOf('The Curious Scientist'))}
                <em>The Curious Scientist</em>
                {doc.intro.slice(
                  doc.intro.indexOf('The Curious Scientist') + 'The Curious Scientist'.length,
                )}
              </>
            ) : (
              doc.intro
            )}
          </p>
          <LiteratureReviewPanel showHeader={false} />
        </div>
      </PageContentBand>
    </>
  )
}

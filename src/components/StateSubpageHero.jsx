import { Link } from 'react-router-dom'
import { pageTitleClass } from './SectionHeading'
import ScrollReveal from './ScrollReveal'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'

const heroStyles = {
  paper: {
    section: 'border-sage-600/50 bg-paper',
    link: 'text-earth-800 hover:text-rust-800',
    panel: 'rounded-md border border-rust-500 bg-white px-6 py-8 sm:px-10 sm:py-10',
    title: pageTitleClass,
    rule: 'h-0.5 w-16 bg-rust-400 sm:w-20',
    description: 'text-earth-800',
  },
  sage: {
    section: 'border-sage-900 bg-sage-800',
    link: 'text-sage-100 hover:text-rust-200',
    panel: 'px-3 sm:px-6',
    title: 'text-paper',
    rule: 'h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:w-20',
    description: 'text-sage-100',
  },
}

export default function StateSubpageHero({ backTo, backLabel, title, description, eyebrow, date, tone = 'paper' }) {
  const styles = heroStyles[tone]

  return (
    <section className={`relative flex min-h-[14rem] flex-col overflow-hidden border-b sm:min-h-[16rem] md:min-h-[17rem] ${styles.section}`}>
      <div className={`${heroShell} absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5 md:pt-6`}>
        <Link
          to={backTo}
          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${styles.link}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>

      <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col items-center justify-center">
        <div className={`${heroShell} w-full py-10 pt-14 sm:py-12 sm:pt-16 md:py-14 md:pt-[4.25rem]`}>
          <ScrollReveal>
            <div className={`mx-auto max-w-3xl text-center ${styles.panel}`}>
              {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage-200 sm:text-[0.8rem]">
                  {eyebrow}
                </p>
              )}
              <h1 className={`font-display text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${styles.title}`}>
                {title}
              </h1>
              {description && (
                <>
                  <div className={`mx-auto mt-3 sm:mt-4 ${styles.rule}`} aria-hidden />
                  <p className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:mt-4 sm:text-base ${styles.description}`}>
                    {description}
                  </p>
                </>
              )}
              {date && <time className={`mt-2 block text-xs sm:text-sm ${styles.description}`}>{date}</time>}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

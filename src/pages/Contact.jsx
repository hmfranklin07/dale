import PageContentBand from '../components/PageContentBand'
import { PageHeroPanel } from '../components/PageHeroPanel'
import { SectionAmbience } from '../components/SectionAmbience'
import { pageTitleClass } from '../components/SectionHeading'
import { stateHeroBandSectionClass } from '../config/mapPinColors'
import siteMeta from '../data/siteMeta.json'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

const CONTACT_LABELS = ['Connect', 'Share a story', 'Nominate someone', 'Questions']

export default function Contact() {
  const mailto = `mailto:${siteMeta.contactEmail}`

  return (
    <>
      <section
        className={`relative flex flex-col overflow-hidden border-b border-sage-400/45 ${HERO_MIN_H} ${stateHeroBandSectionClass}`}
      >
        <SectionAmbience variant="sage" />
        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col justify-center">
          <div className={`${heroShell} w-full py-10 sm:py-14 md:py-16`}>
            <PageHeroPanel
              tone="statePage"
              className="mx-auto w-full max-w-3xl text-center !py-6 sm:!py-7 md:!py-8"
            >
              <h1
                className={`font-display mt-0 text-[2.75rem] leading-none sm:text-[3.5rem] lg:text-[4rem] ${pageTitleClass}`}
              >
                Contact
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />
              <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-5 sm:gap-x-4">
                {CONTACT_LABELS.map((label, index) => (
                  <li key={label} className="flex items-center gap-x-3 sm:gap-x-4">
                    {index > 0 && (
                      <span className="hidden text-rust-400/70 sm:inline" aria-hidden>
                        ·
                      </span>
                    )}
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth-600 sm:text-xs sm:tracking-[0.18em]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl leading-snug text-earth-900 sm:text-3xl">
            I&apos;d love to hear from you!
          </p>
          <p className="mt-4 text-base leading-relaxed text-earth-700 sm:mt-5 sm:text-lg">
            Whether you&apos;d like to connect, share a story for the project, put me in touch with someone you know, or
            have any questions, send me an email!
          </p>

          <a
            href={mailto}
            className="mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-rust-500/80 bg-gradient-to-b from-white to-rust-50/40 px-6 py-5 shadow-lg shadow-rust-900/10 ring-2 ring-rust-300/50 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-rust-600 hover:shadow-xl hover:shadow-rust-900/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 motion-reduce:hover:translate-y-0 sm:mt-10 sm:px-10 sm:py-6"
          >
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-rust-700">Email me</span>
            <span className="font-display text-2xl text-earth-900 underline decoration-rust-400/55 underline-offset-[0.18em] sm:text-3xl lg:text-[2.1rem]">
              {siteMeta.contactEmail}
            </span>
          </a>
        </div>
      </PageContentBand>
    </>
  )
}

import PageContentBand from '../components/PageContentBand'
import contactHeroUrl from '../assets/contact/contact-hero.jpg?url'
import siteMeta from '../data/siteMeta.json'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

const CONTACT_LABELS = ['Connect', 'Share a story', 'Nominate someone', 'Questions']

export default function Contact() {
  const mailto = `mailto:${siteMeta.contactEmail}`

  return (
    <>
      <section
        className={`relative flex flex-col overflow-hidden border-b border-sage-800/30 ${HERO_MIN_H}`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={contactHeroUrl}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_32%] sm:object-[50%_30%] lg:object-[50%_28%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-sm sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
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
                      <span className="hidden text-white/55 sm:inline" aria-hidden>
                        ·
                      </span>
                    )}
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/92 drop-shadow-sm sm:text-xs sm:tracking-[0.18em]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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

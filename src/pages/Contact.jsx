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
            className="h-full w-full object-cover object-[50%_70%] sm:object-[50%_72%] lg:object-[50%_74%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sage-950/40 via-sage-950/10 to-sage-950/45"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-md sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                Contact
              </h1>
              <div
                className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                aria-hidden
              />

              <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5">
                {CONTACT_LABELS.map((label) => (
                  <li key={label}>
                    <span className="inline-flex items-center rounded-full border border-white/70 bg-white/92 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-earth-900 shadow-md shadow-sage-950/25 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.16em]">
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
          <p className="section-kicker mb-3 text-rust-700">Get in touch</p>
          <p className="font-display text-3xl leading-snug text-earth-900 sm:text-4xl">
            I&apos;d love to hear from you!
          </p>
          <div
            className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:w-24"
            aria-hidden
          />
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-earth-700 sm:mt-6 sm:text-lg">
            Whether you&apos;d like to connect, share a story for the project, put me in touch with someone you know, or
            have any questions, send me an email!
          </p>

          <div className="mt-9 sm:mt-11">
            <p className="mb-3 text-sm font-medium text-earth-600 sm:text-base">Reach me here:</p>
            <a
              href={mailto}
              className="group inline-flex w-full max-w-lg flex-col items-center gap-2 rounded-2xl border-2 border-rust-500 bg-gradient-to-b from-rust-500 to-rust-600 px-6 py-6 text-white shadow-xl shadow-rust-900/25 ring-2 ring-rust-300/60 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5 hover:from-rust-600 hover:to-rust-700 hover:shadow-2xl hover:shadow-rust-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-300 motion-reduce:hover:translate-y-0 sm:px-10 sm:py-7"
            >
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/90">
                Email me
              </span>
              <span className="font-display text-[1.65rem] leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
                {siteMeta.contactEmail}
              </span>
              <span className="mt-0.5 text-sm font-medium text-white/85 transition-transform duration-300 group-hover:translate-x-0.5">
                Click to open your email app →
              </span>
            </a>
          </div>
        </div>
      </PageContentBand>
    </>
  )
}

import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
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
            className="h-full w-full object-cover object-[50%_74%] sm:object-[50%_76%] lg:object-[50%_78%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-10 md:py-11`}>
            <div className="relative mx-auto w-full max-w-4xl py-5 sm:py-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-white/35 bg-white/45 shadow-[0_18px_45px_-20px_rgba(60,71,53,0.35)] backdrop-blur-md"
              />

              <h1
                className={`font-display text-[2.75rem] leading-none sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] ${pageTitleClass}`}
              >
                Contact
              </h1>
              <div className="mx-auto mt-2.5 h-px w-14 bg-rust-500 sm:mt-3 sm:w-20" aria-hidden />

              <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-0 gap-y-2 sm:mt-5">
                {CONTACT_LABELS.map((label, index) => (
                  <li key={label} className="flex items-center">
                    {index > 0 && (
                      <span
                        className="mx-2.5 hidden h-3 w-px bg-sage-600/35 sm:mx-3.5 sm:inline-block"
                        aria-hidden
                      />
                    )}
                    <span className="px-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-earth-800 sm:text-[0.78rem] sm:tracking-[0.2em]">
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
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[1.35rem] border-2 border-sage-300/80 bg-white shadow-xl shadow-sage-900/10 ring-1 ring-rust-200/30">
            <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
              <div className="border-b border-sage-200 px-6 py-8 sm:px-9 sm:py-10 md:border-b-0 md:border-r md:border-sage-200 md:px-10 md:py-12">
                <p className="font-display text-3xl leading-snug text-earth-900 sm:text-[2.35rem]">
                  I&apos;d love to hear from you!
                </p>
                <div className="mt-4 h-px w-14 bg-rust-500" aria-hidden />
                <p className="mt-5 text-base leading-relaxed text-earth-700 sm:text-lg">
                  Whether you&apos;d like to connect, share a story for the project, put me in touch with someone you
                  know, or have any questions, send me an email!
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border-t border-sage-200 bg-sage-100 px-6 py-10 text-center md:border-t-0 sm:px-8 sm:py-12 md:px-9 md:py-14">
                <div className="w-full max-w-sm">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sage-800">
                    Write to me
                  </p>
                  <div className="mx-auto mt-3 h-px w-10 bg-rust-500" aria-hidden />
                  <a
                    href={mailto}
                    className="mt-5 block rounded-2xl border-2 border-rust-500 bg-white px-4 py-5 shadow-md shadow-sage-900/10 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-rust-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 motion-reduce:hover:translate-y-0 sm:px-5 sm:py-6"
                  >
                    <span className="font-display text-[1.45rem] leading-snug text-earth-900 sm:text-[1.7rem]">
                      {siteMeta.contactEmail}
                    </span>
                  </a>
                  <p className="mt-4 text-sm leading-relaxed text-earth-700">
                    Tap the address to open your email app — I read every message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContentBand>
    </>
  )
}

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

      <section className="relative overflow-hidden border-b border-rust-200/50 bg-sage-100">
        {/* Warm pop in the empty field around the card — solid-color glows + dashed route marks */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-rust-400/35 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rust-500/30 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-1.5 bg-rust-500" />
          <svg
            className="absolute inset-0 h-full w-full text-rust-500/30"
            viewBox="0 0 1200 420"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M -20 90 C 220 40, 380 180, 560 120 S 860 40, 1100 160 S 1180 280, 1240 250"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeDasharray="7 12"
            />
            <path
              d="M -10 340 C 180 300, 340 380, 520 300 S 820 220, 1040 320 S 1180 380, 1250 360"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeDasharray="5 14"
              opacity="0.75"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[1.35rem] border-2 border-rust-400/55 bg-white shadow-xl shadow-rust-900/15 ring-2 ring-rust-300/35">
              <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
                <div className="border-b border-sage-200 bg-white px-6 py-8 sm:px-9 sm:py-10 md:border-b-0 md:border-r md:border-sage-200 md:px-10 md:py-12">
                  <p className="font-display text-3xl leading-snug text-earth-900 sm:text-[2.35rem]">
                    I&apos;d love to hear from you!
                  </p>
                  <div className="mt-4 h-1 w-14 rounded-full bg-rust-500" aria-hidden />
                  <p className="mt-5 text-base leading-relaxed text-earth-700 sm:text-lg">
                    Whether you&apos;d like to connect, share a story for the project, put me in touch with someone you
                    know, or have any questions, send me an email!
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center bg-sage-700 px-6 py-10 text-center sm:px-8 sm:py-12 md:px-9 md:py-14">
                  <div className="w-full max-w-sm">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sage-100/90">
                      Write to me
                    </p>
                    <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-rust-400" aria-hidden />
                    <a
                      href={mailto}
                      className="mt-5 block rounded-2xl border-2 border-rust-400 bg-white px-4 py-5 shadow-md shadow-sage-950/25 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-rust-500 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-300 motion-reduce:hover:translate-y-0 sm:px-5 sm:py-6"
                    >
                      <span className="font-display text-[1.45rem] leading-snug text-earth-900 sm:text-[1.7rem]">
                        {siteMeta.contactEmail}
                      </span>
                    </a>
                    <p className="mt-4 text-sm leading-relaxed text-sage-100/90">
                      Tap the address to open your email app — I read every message.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

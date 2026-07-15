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
      <section className={`relative flex flex-col overflow-hidden ${HERO_MIN_H}`}>
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

      <section className="relative overflow-hidden border-b border-rust-300/40 border-t-[5px] border-t-rust-500 bg-earth-100">
        {/* Solid earthy weight + dashed routes — no soft glows */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="absolute inset-y-0 left-0 w-[28%] max-w-xs bg-rust-200/45" />
          <div className="absolute inset-y-0 right-0 w-[22%] max-w-[14rem] bg-sage-200/70" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-rust-300/25" />
          <div className="absolute left-[18%] top-[12%] h-24 w-24 rotate-12 border-2 border-dashed border-rust-400/45 sm:h-28 sm:w-28" />
          <div className="absolute bottom-[14%] right-[16%] h-16 w-16 -rotate-6 border-2 border-dashed border-sage-500/40 sm:h-20 sm:w-20" />
          <svg
            className="absolute inset-0 h-full w-full text-rust-600/35"
            viewBox="0 0 1200 480"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M -20 70 C 200 30, 360 150, 540 95 S 820 30, 1040 130 S 1180 220, 1240 200"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="6 11"
            />
            <path
              d="M -30 200 C 160 160, 300 260, 480 190 S 780 120, 980 230 S 1160 300, 1260 280"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="4 13"
              opacity="0.7"
            />
            <path
              d="M -10 320 C 180 280, 340 380, 520 300 S 820 220, 1040 330 S 1180 400, 1250 370"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeDasharray="5 12"
              opacity="0.85"
            />
            <path
              d="M 80 -10 C 120 120, 60 220, 200 300 S 420 400, 560 360 S 780 280, 940 400 S 1100 460, 1220 420"
              stroke="#c45a3a"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeDasharray="3 14"
              opacity="0.45"
            />
            <path
              d="M 1100 -20 C 980 80, 1120 180, 900 240 S 620 200, 480 300 S 220 380, 40 440"
              stroke="#d9774f"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="4 16"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[1.35rem] border-2 border-rust-400/55 bg-white shadow-xl shadow-rust-900/15 ring-2 ring-rust-300/35">
              <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
                <div className="flex flex-col justify-center border-b border-sage-200 bg-white px-6 py-10 sm:px-9 sm:py-12 md:border-b-0 md:border-r md:border-sage-200 md:px-10 md:py-14 lg:px-12">
                  <p className="font-display text-[2.15rem] leading-[1.15] text-earth-900 sm:text-[2.65rem] lg:text-[2.9rem]">
                    I&apos;d love to hear from you!
                  </p>
                  <div className="mt-5 h-1 w-16 rounded-full bg-rust-500 sm:mt-6 sm:w-20" aria-hidden />
                  <p className="mt-6 max-w-none text-lg leading-relaxed text-earth-700 sm:mt-7 sm:text-xl sm:leading-[1.65]">
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

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
          {/* Soft darken so white type reads without a frost band */}
          <div
            className="absolute inset-0 bg-sage-950/40"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-10 md:py-11`}>
            <div className="relative mx-auto w-full max-w-4xl py-5 sm:py-6">
              <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-[0_2px_12px_rgba(20,28,18,0.55)] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                Contact
              </h1>
              <div className="mx-auto mt-2.5 h-1 w-14 rounded-full bg-rust-400 sm:mt-3 sm:w-20" aria-hidden />

              <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-0 gap-y-2 sm:mt-5">
                {CONTACT_LABELS.map((label, index) => (
                  <li key={label} className="flex items-center">
                    {index > 0 && (
                      <span
                        className="mx-2.5 hidden h-3 w-px bg-white/45 sm:mx-3.5 sm:inline-block"
                        aria-hidden
                      />
                    )}
                    <span className="px-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/95 drop-shadow-[0_1px_6px_rgba(20,28,18,0.45)] sm:text-[0.78rem] sm:tracking-[0.2em]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-sage-300/50 border-t-[5px] border-t-rust-500 bg-sage-100">
        {/* Quiet field: warm ground band + dotted routes */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-rust-200/55 sm:h-28" />
          <div className="absolute inset-x-0 bottom-24 h-px bg-rust-400/35 sm:bottom-28" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <path
              d="M -40 95 C 160 55, 280 165, 460 110 S 720 50, 900 140 S 980 210, 1040 190"
              stroke="#c45a3a"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeDasharray="5 13"
              opacity="0.42"
            />
            <path
              d="M -20 210 C 180 175, 320 265, 500 205 S 780 145, 960 245 S 1020 300, 1060 285"
              stroke="#b4532a"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeDasharray="4 15"
              opacity="0.32"
            />
            <path
              d="M -30 325 C 200 285, 360 365, 540 300 S 820 230, 1000 340"
              stroke="#d9774f"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="3 16"
              opacity="0.28"
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

import siteMeta from '../data/siteMeta.json'

const shell = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

export default function Footer() {
  const mailto = `mailto:${siteMeta.contactEmail}`

  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="relative bg-earth-900 text-sage-100/90">
        <div className={`relative z-10 ${shell} py-10 sm:py-12`}>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-6 md:text-left">
            <div className="md:pr-4">
              <h2 className="font-display mb-3 text-base text-white sm:text-lg">About this site</h2>
              <p className="text-sm leading-relaxed text-sage-200/90">
                Everything published here is shared only with informed consent.
              </p>
            </div>

            <div className="flex justify-center md:justify-center">
              <a
                href={mailto}
                className="group inline-flex flex-col items-center text-center transition-colors hover:text-rust-200"
              >
                <span className="font-display text-base text-white group-hover:text-rust-200 sm:text-lg">
                  Contact me
                </span>
                <span className="mt-1.5 text-sm text-rust-200/95 underline decoration-rust-400/45 underline-offset-[0.2em] group-hover:text-amber-100/90 group-hover:decoration-amber-200/50">
                  {siteMeta.contactEmail}
                </span>
              </a>
            </div>

            <div className="md:text-right">
              <h2 className="font-display mb-3 text-base text-white sm:text-lg">{siteMeta.researcherName}</h2>
              <p className="text-sm leading-relaxed text-sage-200/90">{siteMeta.affiliation}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

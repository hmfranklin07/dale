import PageContentBand from '../components/PageContentBand'
import ConstructionWorkerIcon from '../components/ConstructionWorkerIcon'
import { pageTitleClass } from '../components/SectionHeading'
import { innerPageTopBandSectionClass } from '../config/mapPinColors'

export default function Contact() {
  return (
    <>
      <section className={`border-b border-sage-400/45 ${innerPageTopBandSectionClass}`}>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
          <h1 className={`font-display text-4xl sm:text-5xl ${pageTitleClass}`}>Contact</h1>
        </div>
      </section>
      <PageContentBand>
        <div className="card card-body mx-auto max-w-2xl border-2 border-rust-400/80 text-center !ring-rust-300/55 ring-2 sm:p-10">
          <ConstructionWorkerIcon className="mx-auto h-[4.25rem] w-[4.25rem] text-rust-600 sm:h-20 sm:w-20" />
          <p className="mt-5 text-earth-700 leading-relaxed sm:text-lg">
            This website is currently under construction. Information will be updated soon.
          </p>
        </div>
      </PageContentBand>
    </>
  )
}

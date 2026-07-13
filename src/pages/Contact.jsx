import PageContentBand from '../components/PageContentBand'
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
      <PageContentBand />
    </>
  )
}

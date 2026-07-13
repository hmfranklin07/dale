import PageContentBand from '../components/PageContentBand'
import UnderConstructionCard from '../components/UnderConstructionCard'
import { PageHeroPanel } from '../components/PageHeroPanel'
import { SectionAmbience } from '../components/SectionAmbience'
import { pageTitleClass } from '../components/SectionHeading'
import { stateHeroBandSectionClass } from '../config/mapPinColors'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

export default function Contact() {
  return (
    <>
      <section
        className={`relative flex flex-col overflow-hidden border-b border-sage-400/45 ${HERO_MIN_H} ${stateHeroBandSectionClass}`}
      >
        <SectionAmbience variant="sage" />
        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col justify-center">
          <div className={`${heroShell} w-full py-12 sm:py-16 md:py-20`}>
            <PageHeroPanel
              tone="statePage"
              className="mx-auto w-full max-w-2xl text-center !py-5 sm:!py-6 md:!py-7"
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
            </PageHeroPanel>
          </div>
        </div>
      </section>

      <PageContentBand compact>
        <UnderConstructionCard />
      </PageContentBand>
    </>
  )
}

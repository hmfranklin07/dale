import literatureReview from '../data/literatureReview.json'
import ScrollReveal from './ScrollReveal'

const bodyClass = 'text-base leading-relaxed text-earth-800 sm:text-lg sm:leading-[1.65]'

function Paragraph({ children, className = '' }) {
  return <p className={`${bodyClass} ${className}`.trim()}>{children}</p>
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-3 pl-1">
      {items.map((item) => (
        <li key={item.slice(0, 64)} className={`flex gap-3 ${bodyClass}`}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rust-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LabeledText({ label, text }) {
  return (
    <div className="rounded-xl border border-sage-300/60 bg-sage-50/60 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">{label}</p>
      <p className={`mt-2 ${bodyClass} text-earth-900`}>{text}</p>
    </div>
  )
}

function SourceBlock({ source }) {
  return (
    <div className="mt-6 first:mt-5">
      <h4 className="font-display text-xl text-earth-900 sm:text-2xl">{source.cite}</h4>
      {source.items?.length > 0 && <BulletList items={source.items} />}
      {source.after?.map((text) => (
        <Paragraph key={text.slice(0, 48)} className="mt-4">
          {text}
        </Paragraph>
      ))}
    </div>
  )
}

function SectionBody({ section }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {section.blocks?.map((block, index) => {
        if (block.type === 'labeled') {
          return <LabeledText key={`${block.label}-${index}`} label={block.label} text={block.text} />
        }
        return (
          <Paragraph key={block.text.slice(0, 48)}>{block.text}</Paragraph>
        )
      })}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="space-y-4 border-t border-sage-200/80 pt-6 first:border-t-0 first:pt-0 sm:pt-8">
          <h3 className="font-display text-2xl italic leading-snug text-earth-900 sm:text-[1.75rem]">
            {sub.title}
          </h3>
          {sub.lead && <Paragraph>{sub.lead}</Paragraph>}
          {sub.blocks?.map((block) => (
            <Paragraph key={block.text.slice(0, 48)}>{block.text}</Paragraph>
          ))}
          {sub.sources?.map((source) => (
            <SourceBlock key={source.cite} source={source} />
          ))}
          {sub.items?.length > 0 && <BulletList items={sub.items} />}
        </div>
      ))}
    </div>
  )
}

export default function LiteratureReviewPanel() {
  const doc = literatureReview

  return (
    <ScrollReveal>
      <article
        id="literature-review"
        className="overflow-hidden rounded-[1.35rem] border-2 border-sage-500/50 bg-white shadow-xl shadow-sage-900/10 ring-2 ring-sage-300/25"
      >
        <div className="border-l-[14px] border-l-rust-500 px-6 py-8 sm:border-l-[18px] sm:px-9 sm:py-10 md:px-11 md:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700 sm:text-[0.8rem]">
            {doc.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-[1.85rem] italic leading-[1.15] text-earth-900 sm:text-[2.35rem] lg:text-[2.65rem]">
            {doc.title}
          </h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-sage-600 sm:mt-5 sm:w-16" aria-hidden />
          <Paragraph className="mt-6 max-w-3xl sm:mt-7">
            {doc.intro.includes('The Curious Scientist') ? (
              <>
                {doc.intro.slice(0, doc.intro.indexOf('The Curious Scientist'))}
                <em>The Curious Scientist</em>
                {doc.intro.slice(doc.intro.indexOf('The Curious Scientist') + 'The Curious Scientist'.length)}
              </>
            ) : (
              doc.intro
            )}
          </Paragraph>
          <p className="mt-3 text-sm text-earth-600 sm:text-base">{doc.courseLine}</p>

          <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
            {doc.sections.map((section) => (
              <section key={section.number} className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-semibold tabular-nums text-rust-600 sm:text-base">
                    {section.number}.
                  </span>
                  <h3 className="font-display text-[1.45rem] leading-snug text-earth-900 sm:text-3xl">
                    {section.title}
                  </h3>
                </div>
                <SectionBody section={section} />
              </section>
            ))}

            <section className="space-y-4 border-t border-sage-200/80 pt-8 sm:pt-10">
              <h3 className="font-display text-[1.45rem] leading-snug text-earth-900 sm:text-3xl">Sources</h3>
              <ol className="space-y-3 pl-0">
                {doc.sources.map((source, index) => (
                  <li
                    key={source.slice(0, 48)}
                    className="flex gap-3 text-sm leading-relaxed text-earth-700 sm:text-base sm:leading-relaxed"
                  >
                    <span className="w-5 shrink-0 tabular-nums text-sage-600">{index + 1}.</span>
                    <span className="min-w-0 break-words">{source}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

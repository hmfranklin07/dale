import literatureReview from '../data/literatureReview.json'

const prose = 'text-[1.05rem] leading-[1.75] text-earth-800 sm:text-lg sm:leading-[1.8]'

function Paragraph({ children, className = '' }) {
  return <p className={`${prose} ${className}`.trim()}>{children}</p>
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 list-none space-y-3.5 pl-0">
      {items.map((item) => (
        <li key={item.slice(0, 64)} className={`flex gap-3.5 ${prose}`}>
          <span
            className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-rust-600/80"
            aria-hidden
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LabeledText({ label, text }) {
  return (
    <div className="my-8 sm:my-10">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rust-700 sm:text-xs">
        {label}
      </p>
      <p className="mt-2 font-display text-xl italic leading-snug text-earth-900 sm:text-2xl sm:leading-snug">
        {text}
      </p>
    </div>
  )
}

function SourceBlock({ source }) {
  return (
    <div className="mt-10 first:mt-6 sm:mt-12">
      <h4 className="font-display text-lg text-earth-900 sm:text-xl">{source.cite}</h4>
      <div className="mt-1 h-px w-10 bg-sage-500/55" aria-hidden />
      {source.items?.length > 0 && <BulletList items={source.items} />}
      {source.after?.map((text) => (
        <Paragraph key={text.slice(0, 48)} className="mt-5">
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
        return <Paragraph key={block.text.slice(0, 48)}>{block.text}</Paragraph>
      })}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="pt-2 sm:pt-3">
          <h3 className="font-display text-xl italic leading-snug text-earth-900 sm:text-[1.65rem]">
            {sub.title}
          </h3>
          {sub.lead && <Paragraph className="mt-4">{sub.lead}</Paragraph>}
          {sub.blocks?.map((block) => (
            <Paragraph key={block.text.slice(0, 48)} className="mt-5">
              {block.text}
            </Paragraph>
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

export default function LiteratureReviewPanel({ showHeader = true }) {
  const doc = literatureReview

  return (
    <article id="literature-review" className="w-full">
      {showHeader && (
        <header className="mb-12 text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700 sm:text-[0.8rem]">
            {doc.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-[1.85rem] italic leading-[1.15] text-earth-900 sm:text-[2.35rem]">
            {doc.title}
          </h2>
          <Paragraph className="mx-auto mt-6 max-w-2xl">{doc.intro}</Paragraph>
          <p className="mt-3 text-sm text-earth-600">{doc.courseLine}</p>
        </header>
      )}

      <div className={showHeader ? 'space-y-16 sm:space-y-20' : 'mt-12 space-y-16 sm:mt-14 sm:space-y-20'}>
        {doc.sections.map((section) => (
          <section key={section.number}>
            <div className="mb-6 flex items-baseline gap-3 sm:mb-8">
              <span className="font-display text-sm tabular-nums tracking-wide text-rust-600 sm:text-base">
                {section.number}
              </span>
              <h2 className="font-display text-2xl leading-snug text-earth-900 sm:text-[1.85rem] lg:text-[2.1rem]">
                {section.title}
              </h2>
            </div>
            <SectionBody section={section} />
          </section>
        ))}

        <section className="border-t border-sage-400/35 pt-12 sm:pt-14">
          <h2 className="font-display text-2xl text-earth-900 sm:text-[1.85rem]">Sources</h2>
          <ol className="mt-6 space-y-4 sm:mt-8">
            {doc.sources.map((source, index) => (
              <li
                key={source.slice(0, 48)}
                className="flex gap-3 text-[0.92rem] leading-relaxed text-earth-700 sm:text-base sm:leading-relaxed"
              >
                <span className="w-5 shrink-0 tabular-nums text-sage-600">{index + 1}.</span>
                <span className="min-w-0 break-words">{source}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

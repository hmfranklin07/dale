const prose = 'text-[1.05rem] leading-[1.75] text-earth-800 sm:text-lg sm:leading-[1.8]'

function Paragraph({ children, className = '' }) {
  return <p className={`${prose} ${className}`.trim()}>{children}</p>
}

function QuestionCallout({ preface, text }) {
  return (
    <div className="my-10 space-y-5 sm:my-12 sm:space-y-6">
      {preface && (
        <Paragraph className="pl-5 text-earth-700 sm:pl-7">{preface}</Paragraph>
      )}
      <aside className="border-l-[3px] border-rust-500 pl-5 sm:pl-7">
        <p className="font-display text-[1.4rem] italic leading-snug text-earth-900 sm:text-[1.75rem] sm:leading-[1.35] lg:text-[1.95rem]">
          {text}
        </p>
      </aside>
    </div>
  )
}

function LabeledText({ label, text }) {
  return (
    <div className="my-8 border-l-[3px] border-sage-500/70 pl-5 sm:my-10 sm:pl-6">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rust-700 sm:text-xs">
        {label}
      </p>
      <p className="mt-2 font-display text-xl italic leading-snug text-earth-900 sm:text-2xl sm:leading-snug">
        {text}
      </p>
    </div>
  )
}

function Blocks({ blocks }) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-5 sm:space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'question') {
          return (
            <QuestionCallout
              key={`q-${index}`}
              preface={block.preface}
              text={block.text}
            />
          )
        }
        if (block.type === 'labeled') {
          return <LabeledText key={`${block.label}-${index}`} label={block.label} text={block.text} />
        }
        return <Paragraph key={block.text.slice(0, 48)}>{block.text}</Paragraph>
      })}
    </div>
  )
}

export default function ReflectionBody({ reflection }) {
  return (
    <article className="w-full">
      <div className="space-y-16 sm:space-y-20">
        {reflection.sections.map((section, sectionIndex) => (
          <section key={section.title} className="scroll-mt-24">
            <div className="mb-6 flex items-baseline gap-3 sm:mb-8">
              <span
                className="font-display text-sm tabular-nums tracking-wide text-rust-600 sm:text-base"
                aria-hidden
              >
                {String(sectionIndex + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-2xl leading-snug text-earth-900 sm:text-[1.85rem] lg:text-[2.1rem]">
                {section.title}
              </h2>
            </div>
            <div className="mb-6 h-px w-12 bg-gradient-to-r from-sage-500/80 to-transparent sm:mb-8 sm:w-14" aria-hidden />
            <Blocks blocks={section.blocks} />
            {section.subsections?.map((sub) => (
              <div
                key={sub.title}
                className="mt-10 border-t border-sage-300/50 pt-8 sm:mt-12 sm:pt-10"
              >
                <h3 className="font-display text-xl italic leading-snug text-earth-900 sm:text-[1.65rem]">
                  {sub.title}
                </h3>
                <div className="mt-4 sm:mt-5">
                  <Blocks blocks={sub.blocks} />
                </div>
              </div>
            ))}
          </section>
        ))}

        {reflection.sources?.length > 0 && (
          <section className="border-t border-sage-400/35 pt-12 sm:pt-14">
            <h2 className="font-display text-2xl text-earth-900 sm:text-[1.85rem]">Sources</h2>
            <div className="mt-3 h-px w-12 bg-gradient-to-r from-rust-400/80 to-transparent" aria-hidden />
            <ol className="mt-6 space-y-3.5 sm:mt-8">
              {reflection.sources.map((source, index) => (
                <li
                  key={source.url ?? source.label}
                  className="flex gap-3 text-[0.92rem] leading-relaxed text-earth-700 sm:text-base"
                >
                  <span className="w-5 shrink-0 tabular-nums text-sage-600">{index + 1}.</span>
                  <span className="min-w-0 break-words">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rust-800 underline decoration-rust-400/50 underline-offset-2 transition-colors hover:text-rust-950 hover:decoration-rust-600"
                      >
                        {source.label ?? source.url}
                      </a>
                    ) : (
                      source.label
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </article>
  )
}

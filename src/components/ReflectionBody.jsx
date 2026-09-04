const prose = 'text-[1.05rem] leading-[1.75] text-earth-800 sm:text-lg sm:leading-[1.8]'

function Paragraph({ children, className = '' }) {
  return <p className={`${prose} ${className}`.trim()}>{children}</p>
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

function Blocks({ blocks }) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-5 sm:space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'labeled') {
          return <LabeledText key={`${block.label}-${index}`} label={block.label} text={block.text} />
        }
        return (
          <Paragraph key={block.text.slice(0, 48)}>{block.text}</Paragraph>
        )
      })}
    </div>
  )
}

export default function ReflectionBody({ reflection }) {
  return (
    <article className="w-full">
      <div className="space-y-16 sm:space-y-20">
        {reflection.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-6 font-display text-2xl leading-snug text-earth-900 sm:mb-8 sm:text-[1.85rem] lg:text-[2.1rem]">
              {section.title}
            </h2>
            <Blocks blocks={section.blocks} />
            {section.subsections?.map((sub) => (
              <div key={sub.title} className="mt-10 sm:mt-12">
                <h3 className="font-display text-xl italic leading-snug text-earth-900 sm:text-[1.65rem]">
                  {sub.title}
                </h3>
                <div className="mt-4">
                  <Blocks blocks={sub.blocks} />
                </div>
              </div>
            ))}
          </section>
        ))}

        {reflection.sources?.length > 0 && (
          <section className="border-t border-sage-400/35 pt-12 sm:pt-14">
            <h2 className="font-display text-2xl text-earth-900 sm:text-[1.85rem]">Sources</h2>
            <ol className="mt-6 space-y-4 sm:mt-8">
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

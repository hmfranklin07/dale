export default function ComingSoonReflectionCard({ item, badge }) {
  const label = badge ?? item.townLabel

  return (
    <article className="card overflow-hidden !border-2 !border-dashed !border-sage-500/75 !bg-gradient-to-br !from-sage-50/95 !via-white !to-rust-50/40 !ring-0 !shadow-sm">
      <div className="card-body p-5 sm:p-6">
        {label && <span className="badge-rust inline-block">{label}</span>}
        <h2 className="font-display mt-3 text-xl leading-snug text-earth-900 sm:mt-3.5 sm:text-2xl">
          {item.title}
        </h2>
        <div className="mt-2.5 h-px w-14 bg-gradient-to-r from-rust-400/90 to-transparent sm:w-16" aria-hidden />
        {item.credit && <p className="mt-2.5 text-sm font-medium text-sage-800/90">{item.credit}</p>}
        {item.summary && (
          <p className="mt-3 text-sm leading-relaxed text-earth-800 sm:text-base">{item.summary}</p>
        )}
      </div>
    </article>
  )
}

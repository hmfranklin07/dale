import roadSignUrl from '../assets/icons/construction-road-sign.png?url'

/** Exact construction road sign graphic. */
export default function ConstructionWorkerIcon({ className = 'mx-auto h-20 w-20' }) {
  return (
    <img
      src={roadSignUrl}
      alt="Under construction"
      width={80}
      height={80}
      className={className}
      decoding="async"
    />
  )
}

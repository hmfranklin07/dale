import ConstructionWorkerIcon from './ConstructionWorkerIcon'

/** Under-construction message used on About / Contact. */
export default function UnderConstructionCard() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-6 text-center sm:py-8">
      <ConstructionWorkerIcon className="h-36 w-36 sm:h-44 sm:w-44" />
      <p className="mt-7 max-w-md font-display text-2xl leading-snug text-earth-900 sm:mt-8 sm:text-3xl">
        This website is currently under construction.
      </p>
      <p className="mt-3 max-w-md text-lg leading-relaxed text-earth-700 sm:mt-4 sm:text-xl">
        Information will be updated soon.
      </p>
    </div>
  )
}

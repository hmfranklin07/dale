import ConstructionWorkerIcon from './ConstructionWorkerIcon'

/** Under-construction message used on About / Contact. */
export default function UnderConstructionCard() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-2 text-center">
      <ConstructionWorkerIcon className="h-28 w-28 sm:h-32 sm:w-32" />
      <p className="mt-4 max-w-md font-display text-2xl leading-snug text-earth-900 sm:mt-5 sm:text-3xl">
        This website is currently under construction.
      </p>
      <p className="mt-2 max-w-md text-base leading-snug text-earth-700 sm:text-lg">
        Information will be updated soon.
      </p>
    </div>
  )
}

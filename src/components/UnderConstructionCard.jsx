import ConstructionWorkerIcon from './ConstructionWorkerIcon'

/** Under-construction message used on About. */
export default function UnderConstructionCard() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-2 text-center">
      <ConstructionWorkerIcon className="h-36 w-36 sm:h-44 sm:w-44" />
      <p className="mt-4 max-w-lg font-display text-3xl leading-snug text-earth-900 sm:mt-5 sm:text-4xl">
        This website is currently under construction.
      </p>
      <p className="mt-2 max-w-lg text-lg leading-snug text-earth-700 sm:text-xl">
        Information will be updated soon.
      </p>
    </div>
  )
}

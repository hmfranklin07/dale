import { STATE_PHOTO_HEROES } from '../lib/statePhotoHeroes'

/**
 * Keeps hero photos in the DOM for the whole session so the browser decodes them once
 * and they stay in memory when switching state tabs (no re-fetch / re-decode flash).
 */
export default function StatePhotoHeroCache() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[100] overflow-hidden opacity-0">
      {Object.entries(STATE_PHOTO_HEROES).map(([slug, hero]) => (
        <img
          key={slug}
          src={hero.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${hero.positionClass}${hero.imageClass ? ` ${hero.imageClass}` : ''}`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      ))}
    </div>
  )
}

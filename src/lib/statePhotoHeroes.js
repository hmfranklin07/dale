/** Bundled as-is (no Vite resize). Replace files in repo for full camera resolution. */
import nyHeroUrl from '../assets/state-heroes/new-york.jpg?url'
import ilHeroUrl from '../assets/state-heroes/illinois.jpg?url'

/** Full-res photo behind state intro heroes (editorial vignette, no card overlay). */
export const STATE_PHOTO_HEROES = {
  'new-york': {
    src: nyHeroUrl,
    positionClass: 'object-[70%_34%] sm:object-[72%_30%] lg:object-[50%_26%] xl:object-[50%_22%]',
  },
  illinois: {
    src: ilHeroUrl,
    positionClass: 'object-[50%_42%] sm:object-[48%_40%]',
  },
}

const warmed = new Set()

/** Warm the browser image cache so state heroes paint on first navigation. */
export function preloadStatePhotoHeroes() {
  for (const { src } of Object.values(STATE_PHOTO_HEROES)) {
    if (warmed.has(src)) continue
    warmed.add(src)
    const img = new Image()
    img.src = src
  }
}

export function preloadStatePhotoHero(slug) {
  const hero = STATE_PHOTO_HEROES[slug]
  if (!hero || warmed.has(hero.src)) return
  warmed.add(hero.src)
  const img = new Image()
  img.src = hero.src
}

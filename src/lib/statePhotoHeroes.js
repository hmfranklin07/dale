/** Bundled as-is (no Vite resize). Replace files in repo for full camera resolution. */
import nyHeroUrl from '../assets/state-heroes/new-york.jpg?url'
import ilHeroUrl from '../assets/state-heroes/illinois.jpg?url'

/** Full-res photo behind the frosted hero card (`statePageCompact`). */
export const STATE_PHOTO_HEROES = {
  'new-york': {
    src: nyHeroUrl,
    positionClass: 'bg-[70%_40%] sm:bg-[72%_38%]',
  },
  illinois: {
    src: ilHeroUrl,
    positionClass: 'bg-[50%_42%] sm:bg-[48%_40%]',
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

/** Bundled as-is (no Vite resize). Replace files in repo for full camera resolution. */
import nyHeroUrl from '../assets/state-heroes/new-york.jpg?url'
import arHeroUrl from '../assets/state-heroes/arkansas.jpg?url'
import ilHeroUrl from '../assets/state-heroes/illinois.jpg?url'
import neHeroUrl from '../assets/state-heroes/nebraska.jpg?url'
import idHeroUrl from '../assets/state-heroes/idaho.jpg?url'
import moreHeroUrl from '../assets/state-heroes/more.jpg?url'

/** Full-res photo behind state intro heroes (editorial vignette, no card overlay). */
export const STATE_PHOTO_HEROES = {
  'new-york': {
    src: nyHeroUrl,
    positionClass: 'object-[70%_34%] sm:object-[72%_30%] lg:object-[50%_26%] xl:object-[50%_22%]',
  },
  arkansas: {
    src: arHeroUrl,
    positionClass: 'object-[50%_62%] sm:object-[50%_66%] lg:object-[50%_70%]',
  },
  illinois: {
    src: ilHeroUrl,
    positionClass: 'object-[50%_62%] sm:object-[48%_60%] lg:object-[48%_64%]',
  },
  nebraska: {
    src: neHeroUrl,
    positionClass: 'object-[50%_78%] sm:object-[50%_82%] lg:object-[50%_86%] xl:object-[50%_90%]',
    imageClass: 'scale-[1.07] -rotate-[1.25deg]',
  },
  idaho: {
    src: idHeroUrl,
    positionClass: 'object-[50%_58%] sm:object-[50%_62%] lg:object-[50%_66%]',
  },
  more: {
    src: moreHeroUrl,
    positionClass: 'object-[50%_66%] sm:object-[50%_68%] lg:object-[50%_70%] xl:object-[50%_72%]',
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

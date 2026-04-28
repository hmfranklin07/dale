/** Light sage band (flat) — kept for reference / one-off uses */
export const STATE_HERO_BAND_BG = '#CED6C4'

/**
 * Tailwind utility string: soft sage gradient for blog + state intro bands
 * (replaces flat STATE_HERO_BAND_BG for more depth).
 */
/** Dark on the left → light on the right; slight amber lift on the right for warmth */
export const stateHeroBandSectionClass =
  'bg-gradient-to-r from-sage-700/90 via-sage-400/95 to-amber-50/80'

/**
 * Inner page headers — right stop stays sage-tinted so white content blocks don’t disappear into it.
 */
export const innerPageTopBandSectionClass =
  'bg-gradient-to-r from-sage-600/90 via-sage-300/85 to-sage-200'

/** Hero panel left bar + navbar accents — matches Tailwind `rust-500` (blog hero stripe) */
export const HERO_ACCENT_RUST = '#e2724d'

/** US map marker colors — shared with SocialLinks inline icons */
export const PIN_BODY_DEFAULT = '#c24e32'
export const PIN_BODY_HOVER = '#d85f3f'
export const PIN_RIM_COLOR = '#df8f72'
export const PIN_RIM_WIDTH = 1.05
export const PIN_INNER_FILL = '#faf9f5'

import { useState } from 'react'

/** Best → fallback. mqdefault is only 320×180 and looks soft in cards. */
const THUMBNAIL_SIZES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault']

export default function YouTubeThumbnail({ youtubeId, alt = '', className = '' }) {
  const [sizeIndex, setSizeIndex] = useState(0)
  const size = THUMBNAIL_SIZES[Math.min(sizeIndex, THUMBNAIL_SIZES.length - 1)]

  return (
    <img
      src={`https://img.youtube.com/vi/${youtubeId}/${size}.jpg`}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        setSizeIndex((i) => (i < THUMBNAIL_SIZES.length - 1 ? i + 1 : i))
      }}
    />
  )
}

import { useMemo, useState } from 'react'

/** Best → fallback. mqdefault is only 320×180 and looks soft in cards. */
const DEFAULT_SIZES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault']

function thumbnailSources(youtubeId, frame) {
  if (frame != null) {
    return [
      `https://i.ytimg.com/vi/${youtubeId}/maxres${frame}.jpg`,
      `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
    ]
  }
  return DEFAULT_SIZES.map((size) => `https://img.youtube.com/vi/${youtubeId}/${size}.jpg`)
}

export default function YouTubeThumbnail({ youtubeId, frame, alt = '', className = '' }) {
  const sources = useMemo(() => thumbnailSources(youtubeId, frame), [youtubeId, frame])
  const [sourceIndex, setSourceIndex] = useState(0)

  return (
    <img
      src={sources[Math.min(sourceIndex, sources.length - 1)]}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        setSourceIndex((i) => (i < sources.length - 1 ? i + 1 : i))
      }}
    />
  )
}

export default function YouTubeEmbed({ youtubeId, title }) {
  if (!youtubeId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-sage-100/80 ring-1 ring-sage-200/50">
        <div className="text-center text-earth-600">
          <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">Video coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl shadow-lg shadow-rust-900/10 ring-1 ring-sage-200/50">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

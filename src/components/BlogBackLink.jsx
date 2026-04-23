import { Link } from 'react-router-dom'

export default function BlogBackLink({ className = '' }) {
  return (
    <Link
      to="/blog"
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-sage-900 transition-colors hover:text-rust-800 ${className}`.trim()}
    >
      <span aria-hidden>←</span> Back to blog
    </Link>
  )
}

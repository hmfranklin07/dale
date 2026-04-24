import { Navigate, useParams } from 'react-router-dom'
import { innerPageTopBandSectionClass } from '../config/mapPinColors'
import { SectionAmbience } from '../components/SectionAmbience'
import PageContentBand from '../components/PageContentBand'
import { pageTitleClass } from '../components/SectionHeading'
import BlogBackLink from '../components/BlogBackLink'
import { formatDate, sectionShell, sortedBlogs } from './blogData'

export default function BlogPost() {
  const { postId } = useParams()
  const post = sortedBlogs.find((b) => String(b.id) === String(postId))

  if (!post) {
    return <Navigate to="/blog/posts" replace />
  }

  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-sage-200/60 ${innerPageTopBandSectionClass}`}
      >
        <SectionAmbience variant="paper" />
        <div className="relative z-10">
          <div className={`${sectionShell} py-8 sm:py-10`}>
            <BlogBackLink />
            <p className="mt-4 text-xs text-earth-500">{formatDate(post.date)}</p>
            <h1 className={`font-display mt-2 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${pageTitleClass}`}>
              {post.title}
            </h1>
            {post.townLabel && (
              <span className="badge-sage mt-4 inline-block">{post.townLabel}</span>
            )}
          </div>
        </div>
      </section>

      <PageContentBand>
        <article className="max-w-none">
          <p className="text-earth-800 text-base leading-relaxed whitespace-pre-line sm:text-lg">
            {post.text}
          </p>
        </article>
      </PageContentBand>
    </>
  )
}

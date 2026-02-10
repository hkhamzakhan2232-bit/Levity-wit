import BlogLayout from '@/components/Blog/BlogLayout'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import { getAllTags, getCategories, getPostBySlug, getRecentPosts } from '@/lib/posts'
import { marked } from 'marked'
import Image from 'next/image'

export default function BlogDetailPage({ params }) {
  const { slug } = params
  const post = getPostBySlug(slug)

  const categories = getCategories()
  const recent = getRecentPosts(5)
  const tags = getAllTags()

  if (!post) {
    return (
      <BlogLayout>
        <div style={{ padding: '40px 0' }}>
          <h1 style={{ fontSize: '32px', color: '#333' }}>Post Not Found</h1>
          <p style={{ color: '#666' }}>
            The post you are looking for does not exist.
          </p>
        </div>
      </BlogLayout>
    )
  }

  const html = marked(post.content || '')

  return (
    <BlogLayout
      sidebar={
        <BlogSidebar
          categories={categories}
          recent={recent}
          tags={tags}
          currentCategory={post.category}
        />
      }
    >
      <article className="post">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span className="dot">•</span>
            <span className="category">{post.category}</span>
          </div>
        </div>

        {post.cover && (
          <div className="cover">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="post-footer">
          <div className="author">
            <Image
              src={post.author_avatar || '/images/avatar.jpg'}
              alt={post.author || 'Author'}
              width={48}
              height={48}
              className="author-avatar"
            />
            <div className="author-info">
              <div className="name">{post.author}</div>
              <div className="date">
                {new Date(post.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
          {post.tags?.length ? (
            <div className="tags">
              {post.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>

    </BlogLayout>
  )
}

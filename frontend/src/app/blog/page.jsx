// app/blog/page.jsx
import BlogLayout from '@/components/Blog/BlogLayout'
import BlogList from '@/components/Blog/BlogList'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import { getAllPosts, getAllTags, getCategories, getRecentPosts } from '@/lib/posts'

export default function BlogPage({ searchParams }) {
  // Get all posts (this will include both your markdown files)
  const allPosts = getAllPosts()
  
  // Filter by category if provided
  let posts = allPosts
  if (searchParams?.category) {
    posts = allPosts.filter(post => 
      post.category?.toLowerCase() === searchParams.category.toLowerCase()
    )
  }

  // Filter by search query if provided
  if (searchParams?.q) {
    const query = searchParams.q.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Get sidebar data
  const categories = getCategories()
  const recent = getRecentPosts(3)
  const tags = getAllTags()

  return (
    <BlogLayout
      sidebar={
        <BlogSidebar
          categories={categories}
          recent={recent}
          tags={tags}
          currentCategory={searchParams?.category}
        />
      }
    >
      <BlogList posts={posts} />
    </BlogLayout>
  )
}
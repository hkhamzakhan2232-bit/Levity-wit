// lib/posts.js or utils/posts.js
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import 'server-only'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
    // Get all files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md')) // Only get .md files
        .map(fileName => {
            // Remove ".md" from file name to get slug
            const slug = fileName.replace(/\.md$/, '')

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')

            // Use gray-matter to parse the post metadata section
            const { data, content } = matter(fileContents)

            // Combine the data with the slug and content
            return {
                slug,
                title: data.title,
                date: data.date,
                category: data.category,
                tags: data.tags || [],
                cover: data.cover,
                excerpt: data.excerpt,
                author: data.author,
                author_avatar: data.author_avatar,
                content
            }
        })

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getPostBySlug(slug) {
    try {
        const safe = slug.toLowerCase().replace(/[^a-z0-9-]/g, '')
        const fullPath = path.join(postsDirectory, `${safe}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        return {
            slug: safe,
            title: data.title,
            date: data.date,
            category: data.category,
            tags: data.tags || [],
            cover: data.cover,
            excerpt: data.excerpt,
            author: data.author,
            author_avatar: data.author_avatar,
            content
        }
    } catch {
        return null
    }
}

export function getCategories() {
    const posts = getAllPosts()
    const categoryCount = {}

    posts.forEach(post => {
        if (post.category) {
            categoryCount[post.category] = (categoryCount[post.category] || 0) + 1
        }
    })

    return Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count
    }))
}

export function getRecentPosts(limit = 3) {
    const posts = getAllPosts()
    return posts.slice(0, limit).map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        cover: post.cover
    }))
}

export function getAllTags() {
    const posts = getAllPosts()
    const tagsSet = new Set()

    posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => tagsSet.add(tag))
        }
    })

    return Array.from(tagsSet)
}

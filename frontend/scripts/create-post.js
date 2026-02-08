import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: node scripts/create-post.js "<Category>" "<Title>" [--image "/images/path.jpg"] [--tags "a,b,c"] [--excerpt "text"] [--date "YYYY-MM-DD"]')
  process.exit(1)
}

const category = args[0]
const title = args[1]
function readFlag(name, def = '') {
  const i = args.findIndex(a => a === `--${name}`)
  if (i >= 0 && args[i + 1]) return args[i + 1]
  return def
}
const image = readFlag('image', '/images/news/news2.jpg')
const tags = readFlag('tags', 'blog,post').split(',').map(s => s.trim()).filter(Boolean)
const excerpt = readFlag('excerpt', 'Post excerpt goes here.')
const date = readFlag('date', new Date().toISOString().slice(0, 10))

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const base = path.join(process.cwd(), 'content', category.toLowerCase(), slug)
fs.mkdirSync(base, { recursive: true })
const md = `---
title: "${title}"
date: "${date}"
category: "${category}"
tags: [${tags.map(t => `"${t}"`).join(',')}]
cover: "${image}"
excerpt: "${excerpt}"
author: "Cristofer Vetrows"
author_avatar: "/images/meet-beth/beth-portrait.jpg"
---

Write your content in Markdown.`
fs.writeFileSync(path.join(base, 'index.md'), md, 'utf8')
console.log(`Created ${path.join('content', category.toLowerCase(), slug, 'index.md')}`)

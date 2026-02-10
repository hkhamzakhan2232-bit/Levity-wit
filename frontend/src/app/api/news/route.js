export async function GET() {
  try {
    const devtoPromise = fetch('https://dev.to/api/articles?per_page=6', {
      headers: { Accept: 'application/json' },
      next: { revalidate: 600 },
    }).then((r) => r.json())
    const redditPromise = fetch('https://www.reddit.com/r/fashion/top.json?limit=6&t=week', {
      headers: { Accept: 'application/json' },
      next: { revalidate: 600 },
    }).then((r) => r.json())
    const [devto, reddit] = await Promise.allSettled([devtoPromise, redditPromise])
    const items = []
    if (devto.status === 'fulfilled') {
      (devto.value || []).forEach((a, idx) => {
        const dateStr = new Date(a.published_at || a.created_at || Date.now()).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).toUpperCase()
        const image = a.cover_image || `https://source.unsplash.com/random/800x600?fashion,style&sig=${idx + 1}`
        items.push({
          id: `devto-${a.id}`,
          date: dateStr,
          title: a.title,
          description: a.description || a.tags || '',
          image,
          url: a.url,
          author: a.user?.name || a.user?.username,
          source: 'dev.to',
        })
      })
    }
    if (reddit.status === 'fulfilled') {
      ((reddit.value && reddit.value.data && reddit.value.data.children) || []).forEach((c, idx) => {
        const p = c.data || {}
        const title = p.title || ''
        const dateStr = new Date((p.created_utc || Date.now()) * 1000).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).toUpperCase()
        const image =
          (p.preview && p.preview.images && p.preview.images[0]?.source?.url?.replace(/&amp;/g, '&')) ||
          `https://source.unsplash.com/random/800x600?style,outfit&sig=${idx + 11}`
        items.push({
          id: `reddit-${p.id}`,
          date: dateStr,
          title,
          description: p.selftext?.slice(0, 160) || '',
          image,
          url: `https://www.reddit.com${p.permalink}`,
          author: p.author,
          source: 'reddit',
        })
      })
    }
    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  try {
    if (token && userId) {
      const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${token}&limit=8`
      const res = await fetch(url, { headers: { Accept: 'application/json' }, next: { revalidate: 600 } })
      const json = await res.json()
      const items = (json.data || []).map((m) => ({
        id: m.id,
        image: m.media_url,
        url: m.permalink,
        caption: m.caption,
        date: m.timestamp,
      }))
      return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const items = Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      image: `https://source.unsplash.com/random/300x300?fashion,style&sig=${i + 1}`,
      url: `https://instagram.com/`,
    }))
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

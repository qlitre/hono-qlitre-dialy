import { createRoute } from 'honox/factory'
import { config } from '../settings/siteSettings'
import type { MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post } from '../types/blog'
import { MicroCMSClient } from '../libs/microcmsClient'


export default createRoute(async (c) => {
    const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
    const r = await client.getListResponse<MicroCMSListResponse<Post>>('post', { limit: 0 })
    const tot = r.totalCount
    const cnt = Math.ceil(tot / 50)
    const posts: Post[] = []
    for (let i = 0; i < cnt; i++) {
        const offset = i * 50
        const postList = await client.getListResponse<MicroCMSListResponse<Post>>('post', { limit: 50, offset: offset })
        for (const post of postList.contents) {
            posts.push(post)
        }
    }

    const baseUrl = config.siteURL
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
    </url>
    ${posts.map(
        (article) => `
    <url>
      <loc>${baseUrl}/post/${article.id}</loc>
      <lastmod>${article.updatedAt.split("T")[0]}</lastmod>
    </url>`
    )
            .join("")}
  </urlset>`;
    return c.text(sitemap, 200, { "Content-Type": "application/xml" });
})

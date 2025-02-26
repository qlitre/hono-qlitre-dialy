import { createRoute } from 'honox/factory'
import { config } from '../settings/siteSettings'
import type { MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post } from '../types/blog'
import { MicroCMSClient } from '../libs/microcmsClient'


export default createRoute(async (c) => {
  const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
  const r = await client.getListResponse<MicroCMSListResponse<Post>>('post', { limit: 0 })
  const limit = 50
  const tot = r.totalCount
  const cnt = Math.ceil(tot / limit)
  const urls: string[] = []
  const baseUrl = config.siteURL
  for (let i = 0; i < cnt; i++) {
    const offset = i * limit
    const postList = await client.getListResponse<MicroCMSListResponse<Post>>('post', { limit: limit, offset: offset, fields: 'id,updatedAt' })
    for (const post of postList.contents) {
      urls.push(`
      <url>
        <loc>${baseUrl}/post/${post.id}</loc>
        <lastmod>${post.updatedAt.split("T")[0]}</lastmod>
      </url>`)
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
    </url>
    ${urls.join("")}
  </urlset>`;
  return c.text(sitemap, 200, { "Content-Type": "application/xml" });
})

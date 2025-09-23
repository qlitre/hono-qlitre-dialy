import { createRoute } from "honox/factory";
import { config } from "../settings/siteSettings";
import type { Post } from "../types/blog";
import { jstDatetime } from "../utils/jstDatetime";
import { getMicroCMSClient, getPosts } from "../libs/microcms";

export default createRoute(async (c) => {
  const client = getMicroCMSClient({
    serviceDomain: c.env.SERVICE_DOMAIN,
    apiKey: c.env.API_KEY,
  });
  const allPosts = await client.getAllContents<Post>({
    endpoint: "post",
    queries: { fields: "id,updatedAt" },
  });
  const r = await getPosts({ client, queries: { limit: 0 } });
  const limit = 50;
  const tot = r.totalCount;
  const cnt = Math.ceil(tot / limit);
  const urls: string[] = [];
  const baseUrl = config.siteURL;
  for (const post of allPosts) {
    const jst = jstDatetime(post.updatedAt).split("T")[0];
    urls.push(`
      <url>
        <loc>${baseUrl}/post/${post.id}</loc>
        <lastmod>${jst}</lastmod>
      </url>`);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
    </url>
    ${urls.join("")}
  </urlset>`;
  return c.text(sitemap, 200, { "Content-Type": "application/xml" });
});

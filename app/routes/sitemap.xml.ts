import { createRoute } from "honox/factory";
import { config } from "../settings/siteSettings";
import { jstDatetime } from "../utils/jstDatetime";
import { getMicroCMSClient, getAllPosts } from "../libs/microcms";

export default createRoute(async (c) => {
  const client = getMicroCMSClient({
    serviceDomain: c.env.SERVICE_DOMAIN,
    apiKey: c.env.API_KEY,
  });
  const allPosts = await getAllPosts({
    client: client,
    queries: { fields: "id,updatedAt" },
  });
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
